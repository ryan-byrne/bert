import { useState, useEffect, useRef } from 'react';
import { Modal, Button, Row, Image, Table, Alert, Col, Badge, Accordion, ListGroup, FormText, Collapse, FormControl, ButtonGroup, Form } from "react-bootstrap";
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Query } from '../../../components/GraphQL';
import Loading from '../../../components/Loading';

import './styles/viewer.css'

Date.prototype.toFormDateString = function(){
  return this.getFullYear() + "-" + (this.getMonth() + 1).toString().padStart(2, "0") + "-" + this.getDate().toString().padStart(2, "0")
}

const Reserve = ({tool}) => {

  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [schedule, setSchedule] = useState();
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [reservation, setReservation] = useState();

  const handleDateSelect = (e) => {
    const d = e.target.valueAsDate;
    d.setDate( d.getDate() + 1 );
    setDate(d)
  }

  const handleClear = () => {
    setStart();
    setEnd();
    setReservation()
  }
  const handleClick = (e) => setStart(e.target.id);
  const handleHover = (e) => reservation ? null : start && (start <= e.target.id) ? setEnd(e.target.id) : setEnd()
  const handleRelease = () => {
    if ( (start && end) && ( start < end ) ) {
      const startDate = new Date(date)
      const startTime = (start * 15)/60 + 8;
      const startMin = startTime % 1;
      startDate.setHours( startTime-startMin, startMin*60, 0, 0 );
      const endDate = new Date(date)
      const endTime = (end * 15)/60 + 8;
      const endMin = endTime % 1;
      endDate.setHours( endTime-endMin, endMin*60, 0, 0 );
      setReservation([startDate, endDate])
    } else {
      handleClear()
    }
    
  }

  useEffect(() => {
    if (!tool._id) return
    setSchedule();
    const timeMin = new Date(date);
    const timeMax = new Date(date);
    timeMin.setHours(8,0,0,0);
    timeMax.setHours(18,0,0,0);
    Query(`
    query GetCalendar($timeMin: Date!, $timeMax: Date!, $locations: [EventLocation]!, $tools: [String!]) {
      getCalendar(timeMin: $timeMin, timeMax: $timeMax, locations: $locations, tools: $tools) {
        date
        events {
          summary
          description
          creator {
            email
          }
          start {
            dateTime
          }
          end {
            dateTime
          }
        }
      }
    }
    `,{tools:[tool._id], timeMin, timeMax, locations:["classroom","machineshop","powertool"]})
      .then( resp => resp.json() )
      .then( data => setSchedule(data.data.getCalendar) )
  }, [date, tool]);

  return(
    <div>
      <Row className="mt-3">
        <Button variant={show?"outline-primary":"primary"} onClick={()=>setShow(!show)}>{show? 'Hide': 'Reserve'}</Button>
      </Row>
      <Collapse in={show}>
        <div>
          <Row className="mt-3 justify-content-center">
            <Col xs={6} md={4}>
              <FormControl type="date" value={date.toFormDateString()} onChange={handleDateSelect}/>
            </Col>
          </Row>
          <Row>
            <Col>
            {
              !show ? null :
              !schedule ? <Loading>Loading Tool Schedule...</Loading> :
                  <div className="schedule-container mt-3">
                    {
                      new Array(40).fill(0).map((_, idx)=>
                        <div 
                          className={`${idx >= start && idx <= end ? 'schedule-selected' : "null"} schedule-tile`} 
                          style={{left:`${2.5*idx}%`}} 
                          id={idx} 
                          onMouseUp={handleRelease}
                          onMouseDown={handleClick}
                          onMouseEnter={handleHover}
                          >

                          </div>
                    )}
                    {
                      new Array(10).fill(0).map((_, idx)=>
                        <div className='schedule-label' style={{left:`${10*idx}%`}}>
                          {idx > 4 ? idx - 4 : idx + 8} {idx < 4 ? "AM" : "PM"}
                        </div>
                      )
                    }
                    {
                      schedule.map( (day, idx) =>
                        day.events.map( (event, idx) => {
                          const start = new Date(event.start.dateTime)
                          const end = new Date(event.end.dateTime)
                          const left = start.getHours() - 8 + start.getMinutes()/60;
                          const right = end.getHours() - 8 + end.getMinutes()/60;
                          return(
                            <div 
                              className="schedule-event" 
                              style={{left:`${10*left}%`, width:`${10*(right-left)}%`}}
                              onMouseEnter={handleClear}
                              ></div>
                          )
                        })
                      )
                    }
                  </div>
            }
            </Col>
          </Row>
          <Collapse in={reservation}>
            <Row className="mt-3">
              {
                !reservation ? null :
                <ButtonGroup>
                  <Button variant="outline-danger" onClick={handleClear}>Clear</Button>
                  <Button
                    as={Link}
                    to={`/schedule/create?startTime=${reservation[0].toISOString()}&endTime=${reservation[1].toISOString()}&summary=${tool.name} Reservation&tool=${tool._id}${tool.staionary?`&locations=["${tool.location}"]`:""}`}
                  >
                    Reserve from: <br/>
                    {reservation[0].toLocaleTimeString()} to {reservation[1].toLocaleTimeString()}

                  </Button>
                </ButtonGroup>
              }
            </Row>
          </Collapse>
        </div>
      </Collapse>
    </div>
  )
}

const Viewer = ({id, show}) => {

  const navigate = useNavigate();
  const [supervisor, setSupervisor] = useState(false);
  const [showAuthUsers, setShowAuthUsers] = useState(false);
  const [tool, setTool] = useState();

  useEffect(() => {
    if (!id) return
    else {
      Query(`
      query GetTool($id: String!, $sid:String!) {
        getTool(id: $id) {
          _id
          quantity
          brand
          name
          manual
          photo
          training {
            id
            name
            demo_completed
            demo
            completed
            questions {
              completed
            }
          }
          authorized_users {
            name
          }
        }
        supervisor : getTraining(id:$sid){
          completed
        }
      }
      `,{id, sid:"supervisor"})
        .then(resp => resp.json())
        .then( data => {
          setTool(data.data.getTool);
          setSupervisor(data.data.supervisor.completed)
        } )
      setTool();
    }
  }, [id]);

  const authorized = tool ? tool.training.completed && (tool.training.demo && tool.training.demo_completed) : false;

  return (
    <Modal centered show={show} onHide={() => navigate('/tools')}>
      <Modal.Header closeButton>
        <Modal.Title>{tool ? `${tool.brand} ${tool.name}` : null}</Modal.Title>
      </Modal.Header>
      {
        !tool ? <Loading>Loading Tool Data...</Loading> :
          <Modal.Body>
            <Row className="m-1">
              <Col className="mt-auto mb-auto"><Image src={tool.photo} fluid/></Col>
              <Col>
                <Row>
                  {
                    !tool.training ||  tool.training.questions.length === 0 ? "None" :
                    <Form.Group>
                      <Button
                        as={Link}
                        to={`/training/${tool.training.id}`}
                        variant={authorized ? "success" : "warning"}
                      >
                        Training: {tool.training.name} ({
                          !tool.training.completed ?
                          `${Math.floor(100*tool.training.questions.filter(q=>q.completed).length / tool.training.questions.length)}% Complete`:
                          tool.training.demo && !tool.training.demo_completed ? "Demo Not Completed" :
                          "Completed"
                        })
                      </Button>
                    </Form.Group>
                  }
                </Row>
                <Row className="mt-3">
                  <Button href={tool.manual} variant="outline-primary" target='_blank'>View Manual</Button>
                </Row>
                {
                  <Row className='mt-3'>
                    <Button
                      variant={showAuthUsers ? 'primary' : 'outline-primary'}
                      onClick={()=>setShowAuthUsers(!showAuthUsers)}>
                        {showAuthUsers ? 'Hide' : `Show`} Authorized Users
                    </Button>
                    <Collapse in={showAuthUsers}>
                    <ListGroup style={{maxHeight:"400px", overflowY:"auto", overflowX:"hidden"}}>
                      {
                        !tool.training.demo ? <ListGroup.Item>N/A</ListGroup.Item> :
                        tool.authorized_users.length === 0 ? <ListGroup.Item>None</ListGroup.Item> :
                        tool.authorized_users.map(user=>
                          <ListGroup.Item>
                            <div>{user.name}</div>
                            <div><FormText>{user.email}</FormText> </div>
                          </ListGroup.Item>  
                        )
                      }
                    </ListGroup>
                    </Collapse>
                  </Row>
                }
                {
                  !supervisor || !authorized ? null :
                  <Row className="mt-3">
                    <Button as={Link} to={`/tools/demo/${tool.training.id}`}>Perform In-Person Demo</Button>
                  </Row>
                }
              </Col>
            </Row>
            <Reserve tool={tool}/>
          </Modal.Body>
      }
    </Modal>
  );
}

export default Viewer;