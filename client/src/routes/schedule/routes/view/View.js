import { useEffect, useState } from "react";
import { Button, ButtonGroup, FloatingLabel, FormGroup, Form, Offcanvas, Row, Col, FormControl, Collapse } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Query } from "../../../../components/GraphQL";
import Loading from "../../../../components/Loading";
import Attendees from "../components/Attendees";
import Describe from "../components/Describe";
import Materials from "../components/Materials";
import Times from '../components/times/Times';
import Storage from "../components/Storage";
import Submit from "../components/Submit";
import Tools from "../components/Tools";
import SetTime from "../components/times/Times";

export default function View({show, onHide}){

  const {id} = useParams();
  const [originalEvent, setOriginalEvent] = useState();
  const [event, setEvent] = useState();
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleHide = () => {
    setEvent();
    setOriginalEvent();
    setEditing(false);
    setDeleting(false);
    onHide();
  }

  const handleSubmit = () => {
    setEvent();
    setEditing(false);
    Query(
      `
      mutation EditEvent($eventId: ID!, $update: EventInput!) {
        editEvent(eventId: $eventId, update: $update) {
          owner
          summary
          start {
            dateTime
          }
          end {
            dateTime
          }
          storage
          tools {
            reserved
            tool {
              _id
              brand
              name
              quantity
              photo
              training {
                completed
                demo
                demo_completed
              }
            }
          }
          creator {
            name
          }
          attendees {
            email
            name
          }
          created
          description
          htmlLink
          id
          locations
          materials {
            material {
              id
              description
              material
              link
              _id
            }
            reserved
          }
          recurrence
          recurringEvents {
            dateTime
          }
        }
      }
      `,
      {
        update:{
          summary:event.summary,
          description:event.description,
          locations:event.locations,
          times:[{start:event.start, end:event.end}],
          tools:event.tools,
          attendees:event.attendees,
          materials:event.materials,
          storage:event.storage
        },
        eventId:id
      })
        .then(resp => resp.json())
        .then(results => {
          setEvent(results.data.editEvent[0]);
          setOriginalEvent(results.data.editEvent[0])
        })
        .catch(err=>console.error(err))
  };

  const handleReset = () => {
    setEditing(false);
    setDeleting(false);
    setEvent(originalEvent)
  };

  const handleDelete = () => {
    setDeleting(true);
    Query(`
    mutation Mutation($eventId: ID!) {
      deleteEvent(eventId: $eventId)
    }
    `,{eventId:id})
      .then(resp=>resp.json())
      .then(result=>{
        onHide();
        setDeleting(false);
      })
      .catch(err => console.error(err))
  };

  useEffect(() => {
    if (!id) return
    Query(`
    query Event($eventId: ID!) {
      event(eventId: $eventId) {
        owner
        summary
        start {
          dateTime
        }
        end {
          dateTime
        }
        storage
        tools {
          reserved
          tool {
            _id
            brand
            name
            quantity
            photo
            training {
              completed
              demo
              demo_completed
            }
          }
        }
        creator {
          name
        }
        created
        attendees {
          email
          name
        }
        created
        description
        htmlLink
        id
        locations
        materials {
          material {
            id
            description
            material
            link
            _id
          }
          reserved
        }
        recurrence
        recurringEventId
      }
    }
    `,{eventId:id})
      .then(resp=>resp.json())
      .then(results=>{
        setEvent({...results.data.event, times:[]})
        setOriginalEvent({...results.data.event, times:[]})
      })
      .catch(err=>console.error(err))
  }, [id]);
  
  return (
    <Offcanvas show={show} onHide={handleHide}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          {event ? `Viewing: ${originalEvent.summary}` : null }
        </Offcanvas.Title>
      </Offcanvas.Header>
      {!event?<Loading> Loading Event...</Loading>:
        deleting ? <Form.Group className="m-3">
          <Form.Text>Are you sure you wish to delete this event? This cannot be undone.</Form.Text>
          <Form.Group className="text-center">
            <ButtonGroup>
              <Button variant="secondary" onClick={()=>setDeleting(false)}>No, Go Back</Button>
              <Button variant="danger" onClick={handleDelete}>Yes, Delete</Button>
            </ButtonGroup>
          </Form.Group>
        </Form.Group> :
        <Offcanvas.Body>
          {
            !event.owner?null:
            <ButtonGroup className="w-100">
              <Button size="sm" onClick={()=>editing?handleSubmit():setEditing(true)}>
                {editing?'Submit Changes':'Edit Event'}
              </Button>
              {!editing?null:<Button size="sm" variant="secondary" onClick={handleReset}>Reset Changes</Button>}
              <Button size="sm" variant="danger" onClick={()=>setDeleting(true)}>Delete Event</Button>
            </ButtonGroup>
          }
          <Form.Group className="m-1">
            <Form.Text>Created By: {event.creator ? event.creator.name : null} on {new Date(event.created).toLocaleDateString()}</Form.Text>
            <Form.Group>
              <Form.Text>
                Last Updated on: {event.updated ? new Date(event.updated).toLocaleDateString() : 'None'}
              </Form.Text>
            </Form.Group>
          </Form.Group>

          <Describe payload={event} setPayload={setEvent} enabled={editing && event.owner}/>
          <Times payload={event} setPayload={setEvent}/>
          <Attendees payload={event} setPayload={setEvent} enabled={editing && event.owner}/>
          <Tools payload={event} setPayload={setEvent} enabled={editing && event.owner}/>
          <Materials payload={event} setPayload={setEvent} enabled={editing && event.owner}/>
          <Storage payload={event} setPayload={setEvent} enabled={editing && event.owner}/>

        </Offcanvas.Body>
      }
    </Offcanvas>
  )
}