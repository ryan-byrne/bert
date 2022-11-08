import { useState, useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js'
import { Modal, Button, Row, Image, Table, Alert, Col, Badge, Accordion, ListGroup, FormText, Collapse, FormControl } from "react-bootstrap";
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Query } from '../../../components/GraphQL';
import Loading from '../../../components/Loading';

Date.prototype.toFormDateString = function(){
  return this.getFullYear() + "-" + (this.getMonth() + 1).toString().padStart(2, "0") + "-" + this.getDate().toString().padStart(2, "0")
}

const Reserve = ({id}) => {

  const canvasRef = useRef();

  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [schedule, setSchedule] = useState();

  const handleDateSelect = (e) => {
    const d = e.target.valueAsDate;
    d.setDate( d.getDate() + 1 );
    setDate(d)
  }

  useEffect(() => {
    if (!id) return
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
    `,{tools:[id], timeMin, timeMax, locations:["classroom","machineshop","powertool"]})
      .then( resp => resp.json() )
      .then( data => setSchedule(data.data.getCalendar) )
  }, [date, id]);

  useEffect(() => {
    if ( !schedule || !canvasRef ) return
    const ctx = canvasRef.current.getContext('2d');
    ctx.fillStyle = "green";
    ctx.fillRect(10, 10, 150, 100); 
  }, [schedule, canvasRef]);

  /*

  100%
  8 am - 6 pm

  10% = 1hr 

  0% ------ 100%

  */

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
              !schedule ? <Loading>Loading Tool Schedule...</Loading> :
              <canvas ref={canvasRef}></canvas>
            }
            </Col>
          </Row>
        </div>
      </Collapse>
    </div>
  )
}

const Viewer = ({id, show}) => {

  const navigate = useNavigate();
  const [tool, setTool] = useState();

  useEffect(() => {
    if (!id) navigate('/tools')
    else {
      Query(`
      query GetTool($id: String!) {
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
      }
      `,{id})
        .then(resp => resp.json())
        .then( data => setTool(data.data.getTool) )
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
              <Col><Image src={tool.photo} fluid/></Col>
              <Col>
                <Row>
                  {
                    !tool.training ||  tool.training.questions.length === 0 ? "None" :
                    <Button
                      as={Link}
                      to={`/training/${tool.training.id}`}
                      variant={authorized ? "success" : "warning"}
                    >
                      {tool.training.name} ({
                        !tool.training.completed ?
                        `${Math.floor(100*tool.training.questions.filter(q=>q.completed).length / tool.training.questions.length)}% Complete`:
                        tool.training.demo && !tool.training.demo_completed ? "Demo Not Completed" :
                        "Completed"
                      })
                    </Button>
                  }
                </Row>
                <Row className="mt-3">
                  <Button href={tool.manual} variant="outline-primary" target='_blank'>View Manual</Button>
                </Row>
                <Row className='mt-3'>
                  <FormText>Authorized Users</FormText>
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
                </Row>
              </Col>
            </Row>
            <Reserve id={tool._id}/>
          </Modal.Body>
      }
    </Modal>
  );
}

export default Viewer;