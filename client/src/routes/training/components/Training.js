import { useState, useEffect } from "react";
import { Row, Alert, Col, Accordion, Spinner, Container, Badge } from 'react-bootstrap'
import { Query } from "../../../components/GraphQL";
import Loading from "../../../components/Loading";
import Announcement from "./Announcement";

export default function Training({ id, children }) {

  const [training, setTraining] = useState();
  const [progress, setProgress] = useState();
  const [announcement, showAnnouncement] = useState();

  useEffect(() => {
    Query(`
        query GetTrainings($id: [String]){
            trainings(id: $id) {
              name
              description
              required_by {
                name
                description
                id
              }
              tools {
                brand
                name
                _id
              }
              prerequisites {
                name
                id
                completed
              }
              questions {
                completed
              }
              id
              completed
              demo_completed
              demo
            }
          }
        `, { id: [id] })
      .then(resp => resp.json()
        .then(data => {
          setTraining(data.data.trainings[0]);
          const qu = data.data.trainings[0].questions;
          setProgress(Math.floor(100 * qu.filter(q => q.completed).length / qu.length))
        }))
      .catch(err => console.error(err))
  }, [children]);

  useEffect(()=>{
    if (!training) return
    showAnnouncement( training.completed || training.prerequisites.filter(p=>!p.completed).length > 0 )
  },[training])

  return (
    !training ? <Loading>Loading <strong>{id}</strong>...</Loading> :
      training.errors ? <Alert variant="danger" className="m-5">Unable to load <strong>{id}</strong></Alert> :
        <Container>
          <Announcement show={announcement} onHide={()=>showAnnouncement(false)} training={training}/>
          <Row className="mt-3 justify-content-center">
            <Col lg={6} md={10} xs={10}>
              <h1>{training.name}</h1>
            </Col>
            <Col lg={2} md={2} xs={2}>
              <h2>
                <Badge bg={training.completed ? 'success' : 'warning'}>
                  {
                    progress === undefined ? <Spinner animation="grow" /> :
                      `${progress}%`
                  }
                </Badge>
              </h2>
            </Col>
          </Row>
          <Row className="mt-3 justify-content-center">
            <Col lg={8} md={12}>
              <p><i>{training.description}</i></p>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col lg={8} md={12}>
              <Accordion>
                {children}
              </Accordion>
            </Col>
          </Row>
        </Container>
  )
}