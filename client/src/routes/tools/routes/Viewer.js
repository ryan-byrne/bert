import { useState, useEffect } from 'react';
import { Modal, Button, Row, Image, Table, Alert, Col, Badge, ListGroup, FormText } from "react-bootstrap";
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Query } from '../../../components/GraphQL';

const Viewer = () => {

  const navigate = useNavigate();
  const id = useParams().id;
  const [tool, setTool] = useState();

  useEffect(() => {
    setTool();
    Query(`
      query GetTool($id: String!) {
        getTool(id: $id) {
          brand
          name
          quantity
          photo
          manual
          authorized_users {
            name
            email
            id
          }
          training {
            id
            completed
            name
            demo_completed
            demo
            questions {
              completed
            }
          }
        }
      }
    `, { id })
      .then(resp => resp.json())
      .then(data => {
        if (data.errors) console.error(data.errors)
        else  setTool(data.data.getTool)
      })
  }, [id]);

  return (!id ? navigate('/tools') :
    <Modal centered show={id} onHide={() => navigate('/tools')}>
      <Modal.Header closeButton>
        <Modal.Title>{tool ? `${tool.brand} ${tool.name}` : "Loading..."}</Modal.Title>
      </Modal.Header>
      {
        !tool ? null :
          <Modal.Body>
            <p className='text-center'>
              <Image src={tool.photo} fluid />
            </p>
            <Row>
              <Col><strong>Manual</strong></Col>
              <Col><Button href={tool.manual}>Open</Button></Col>
            </Row>
            <Row className='mt-3'>
              <Col><strong>Training</strong></Col>
              <Col>
                {
                  !tool.training ||  tool.training.questions.length === 0 ? "None" :
                  <Button
                    as={Link}
                    to={`/training/${tool.training.id}`}
                    variant={
                      tool.training.completed && (tool.training.demo && tool.training.demo_completed) ? "success" : "warning"}
                  >
                    {tool.training.name} ({
                      !tool.training.completed ?
                      `${Math.floor(100*tool.training.questions.filter(q=>q.completed).length / tool.training.questions.length)}% Complete`:
                      tool.training.demo && !tool.training.demo_completed ? "Demo Not Completed" :
                      "Completed"
                    })
                  </Button>
                }
              </Col>
            </Row>
            <Row className="mt-3">
              <Col><strong>Authorized Users</strong></Col>
              <Col>
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
              </Col>
            </Row>


          </Modal.Body>
      }
      <Modal.Footer>
        <Button onClick={() => navigate(-1)} variant="secondary">Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Viewer;