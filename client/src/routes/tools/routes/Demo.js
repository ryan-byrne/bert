import { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import { Query } from "../../../components/GraphQL";
import Loading from "../../../components/Loading";

export const Demo = ({id, show, onHide}) => {

  const [training, setTraining] = useState();
  const [checklist, setChecklist] = useState([]);

  const checklistItems = [
    "Properly secure a screw bit into the chuck"
  ]

  useEffect(() => {
    setTraining();
    Query(`
    query GetTool($id: String!) {
      getTraining(id: $id) {
        checklist
        demo
        demo_completed
        completed
        name
      }
    }
    `, {id})
      .then(resp => resp.json())
      .then( data => setTraining(data.data.getTraining) )
      .catch(err=>console.error(err))
  }, [id, show]);

  useEffect(() => {
    
  }, [training]);

  //useEffect(() => !tool ? null : setChecklist( checklistItems.map(e=>false) ), [tool]);

  console.log( checklist );

  return(
    <Modal show={show} centered onHide={onHide}>
      {
        !training ? <Loading>Loading Training Checklist...</Loading> :
        <div>
          <Modal.Header>
            <Modal.Title>{training ? `Demo Checklist: ${training.name}` : null}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Text>Student Can:</Form.Text>
            {
              checklistItems.map( (item, idx) =>
                <Row key={idx}>
                  <Col xs={8}>{idx+1}. {item}</Col>
                  <Col xs={4}>
                    <Form.Text>No</Form.Text>
                    <Form.Check inline type="switch" id={idx} className="m-1 text-center" />
                    <Form.Text>Yes</Form.Text>
                  </Col>
                </Row>
              )
            }
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary">Close</Button>
            <Button>Submit</Button>
          </Modal.Footer>
        </div>
      }
    </Modal>
  )
}