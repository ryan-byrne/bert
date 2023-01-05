import { useEffect, useState } from "react";
import { Button, ButtonGroup, FloatingLabel, FormGroup, Form, Offcanvas, Row, Col, FormControl, Collapse } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Query } from "../../../../components/GraphQL";
import Loading from "../../../../components/Loading";
import Attendees from "../components/Attendees";
import Describe from "../components/Describe";
import Materials from "../components/Materials";
import Storage from "../components/Storage";
import Submit from "../components/Submit";
import Tools from "../components/Tools";
import SetTime from "../components/times/Times";

const toFormTimeString = (dateString) => {
  const date = new Date(dateString);
  const hr = date.getHours();
  const min = date.getMinutes();
  return `${hr < 10 ? `0${hr}` : hr}:${min<10?`0${min}`:min}`
}

const toFormDateString = (dateString) => {
  //1993-12-18
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`
}

const getReccuringData = (recurring) => {
  
} 

const Time = ({payload, setPayload, enabled}) => {

  const [show, setShow] = useState(false);

  const handleDateChange = (e) => {
    const [y, m, d] = e.target.value.split("-");
    const start = new Date(payload.start.dateTime);
    const end = new Date(payload.end.dateTime);
    start.setFullYear(y);
    start.setMonth(m-1);
    start.setDate(d);
    end.setFullYear(y);
    end.setMonth(m-1);
    end.setDate(d);
    setPayload({...payload, start:{dateTime:start.toISOString()}, end:{dateTime:end.toISOString()}});
  } 

  const handleTimeChange = (e) => {
    const date = new Date(payload.start.dateTime);
    const [hr, min] = e.target.value.split(":");
    date.setHours(hr, min, 0, 0);
    setPayload({...payload, [e.target.id]:{dateTime:date.toISOString()}})
  }

  //const [recurringUntil, ] = getRecurringData(payload.recurring);

  return(
    <div>
      <hr/>
      <Row><Button onClick={()=>setShow(!show)}>{show?'Hide':'Show'} Time</Button></Row>
      <Collapse in={show}>

        <Form.Group>

          <Form.Group className="mt-3">
            <FloatingLabel label="Date">
              <FormControl disabled={!enabled} type="date" id="date" value={toFormDateString(payload.start.dateTime)} onChange={handleDateChange}/>
            </FloatingLabel>
          </Form.Group>

          <Form.Group as={Row} className="mt-3">
            <FormGroup as={Col}>
              <FloatingLabel label="Start Time">
                <FormControl disabled={!enabled} type="time" id="start" value={toFormTimeString(payload.start.dateTime)} onChange={handleTimeChange} />
              </FloatingLabel>
            </FormGroup>
            <FormGroup as={Col}>
              <FloatingLabel label="End Time">
                <FormControl disabled={!enabled} type="time" id="end" value={toFormTimeString(payload.end.dateTime)} onChange={handleTimeChange} />
              </FloatingLabel>
            </FormGroup>
          </Form.Group>

          <Form.Group as={Row} className="mt-3">
            <Form.Check type="switch" label="Recurring" checked={payload.recurrence}/>
          </Form.Group>
          

          <Collapse in={payload.recurrence}>
            <Form.Group>
              <Form.Group>
                <Form.Control/>
              </Form.Group>
            </Form.Group>
          </Collapse>

        </Form.Group>
      </Collapse>
      <hr/>
    </div>
  )
}

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

  const handleDelete = () => {};

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
        setEvent(results.data.event)
        setOriginalEvent(results.data.event)
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
              <Button variant="danger" onClick={()=>handleDelete()}>Yes, Delete</Button>
            </ButtonGroup>
          </Form.Group>
        </Form.Group> :
        <Offcanvas.Body>
          <Form.Group className="m-1">
            <Form.Text>Created By: {event.creator.name} on {new Date(event.created).toLocaleDateString()}</Form.Text>
            <Form.Group>
              <Form.Text>
                Last Updated on: {event.updated ? new Date(event.updated).toLocaleDateString() : 'None'}
              </Form.Text>
            </Form.Group>
          </Form.Group>
          <Describe payload={event} setPayload={setEvent} enabled={editing && event.owner}/>
          <Time payload={event} setPayload={setEvent} enabled={editing && event.owner}/>
          <Attendees payload={event} setPayload={setEvent} enabled={editing && event.owner}/>
          <Tools payload={event} setPayload={setEvent} enabled={editing && event.owner}/>
          <Materials payload={event} setPayload={setEvent} enabled={editing && event.owner}/>
          {
            !event.owner?null:
            <ButtonGroup>
              <Button size="sm" variant="danger" onClick={()=>setDeleting(true)}>Delete Event</Button>
              <Button size="sm" variant="secondary" onClick={handleReset}>Reset</Button>
              <Button size="sm" onClick={()=>editing?handleSubmit():setEditing(true)}>
                {editing?'Submit Changes':'Edit'}
              </Button>
            </ButtonGroup>
          }
        </Offcanvas.Body>
      }
    </Offcanvas>
  )
}