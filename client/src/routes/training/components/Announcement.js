import { Alert, FormGroup, FormText, ListGroup, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Announcement({training, show, onHide}){

  const missingPrerequisites = training.prerequisites.filter(p=>!p.completed)
  const demo = training.demo && !training.demo_completed;

  return( !training ? null :
    <Modal show={show} centered onHide={onHide} backdrop={missingPrerequisites.length > 0 ? 'static' : true}>
      <Modal.Header closeButton={training.completed}>
        <Modal.Title>
          {
            missingPrerequisites.length > 0 ?
            <span>&#128721; Missing Prerequisites </span> :
            "Training Completed!"
          }
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {
          missingPrerequisites.length > 0 ? 
          <Alert variant="danger">
            You must complete the following training(s) before you
              can access <strong>{training.name}:</strong>
              <ListGroup className="mt-3">
                {missingPrerequisites.map(p=>
                  <ListGroup.Item action as={Link} to={`/training/${p.id}`}>
                    {p.name}
                  </ListGroup.Item>
                )}
              </ListGroup>
          </Alert> : 
          <div>
            <p>
              You have completed <strong>{training.name}</strong>, and
              can return to this page at any time for reference.
            </p>
            {
              training.id === 'introduction' ? null :
              <Alert>
                <Alert.Heading>&#128275; Unlocked Trainings</Alert.Heading>
                <ListGroup>
                  {training.required_by.map(t=>
                    <ListGroup.Item action as={Link} to={`/training/${t.id}`}>
                      <FormGroup>
                        <div><strong>{t.name}</strong></div>
                        <FormText>{t.description}</FormText>
                      </FormGroup>
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Alert>
            }
            {
              training.tools.length === 0 ? null :
              <Alert variant={demo ? "warning" : "info"}>
                <Alert.Heading>
                  { demo ? <span>&#9888; Demo Required</span> : <span>&#128275; Unlocked Tools</span> }
                </Alert.Heading>
                { demo ?                
                  <p>
                    You must <Link to="/schedule">schedule a demo</Link> to use
                    the following tools:
                  </p> :
                  <p>
                    You have unlocked the following tools:
                  </p>
                }
                {
                  training.tools.length === 0 ? null :
                    <ListGroup>
                    {
                      training.tools.map( tool => 
                        <ListGroup.Item>
                          {tool.name}
                        </ListGroup.Item>
                      )
                    }
                  </ListGroup>
                }
              </Alert>
            }
          </div>
        }

      </Modal.Body>
    </Modal>
  )
}

/*
          training.demo && !training.demo_completed ?
          <Alert variant='warning'>
            <Alert.Heading>Demo Required</Alert.Heading>
            <p>
              You must complete a demo before 
            </p>
          </Alert> :
*/