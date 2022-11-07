import { useState, useEffect } from 'react';
import { Modal, Button, Row, Image, Table, Alert, Col, Badge, Accordion, ListGroup, FormText } from "react-bootstrap";
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Query } from '../../../components/GraphQL';
import Loading from '../../../components/Loading';

const Viewer = ({id, show}) => {

  const navigate = useNavigate();
  const [tool, setTool] = useState();

  useEffect(() => {
    if (!id) navigate('/tools')
    else {
      const timeMin = new Date();
      const timeMax = new Date();
      timeMax.setMinutes(timeMin.getMinutes() + 30)
      Query(`
      query GetTool($id: String!, $timeMin: Date!, $timeMax: Date!) {
        getTool(id: $id) {
          _id
          quantity
          available(timeMin: $timeMin, timeMax: $timeMax)
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
      `,{id, timeMin, timeMax})
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
            <Row>
              <Col><Image src={tool.photo} fluid/></Col>
              <Col>
                <Row className="mt-1">
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
                <Row className="mt-1">
                  <Button as={Link} to={`/schedule/create?tools=${JSON.stringify([{id:tool._id, quantity:1}])}`}>
                    Reserve ({tool.available} Available)
                  </Button>
                </Row>
                <Row className="mt-1">
                  <Button href={tool.manual} variant="outline-primary" target='_blank'>View Manual</Button>
                </Row>
                <Row>
                  <FormText>Authorized Users</FormText>
                  <ListGroup style={{maxHeight:"400px", overflowY:"scroll"}}>
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
          </Modal.Body>
      }
    </Modal>
  );
}

export default Viewer;