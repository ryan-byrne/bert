import { useState, useEffect } from 'react';
import { Modal, Button, Row, Image, Table, Col, Badge } from "react-bootstrap";
import { useNavigate, useParams } from 'react-router-dom';
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
          training {
            completed
            name
            questions {
              completed
            }
          }
        }
      }
    `, { id })
      .then(resp => resp.json())
      .then(data => setTool(data.data.getTool))
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
              <Col><Button href={tool.manual}>View</Button></Col>
            </Row>
            <Row>
              <Col><strong>Training</strong></Col>
              <Col>
                {
                  !tool.training ? "None" :
                  <Badge bg={tool.training.completed ? "success" : "warning"}>
                    {tool.training.name} ({
                      tool.training.completed ? 'Completed' :
                      tool.training.questions.length === 0 ? "Unavailable" :
                      `${Math.floor(100*tool.training.questions.filter(q=>q.completed).length / tool.training.questions.length)}% Complete`
                    })
                  </Badge>
                }
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