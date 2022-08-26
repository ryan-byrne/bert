import { useState, useEffect } from "react";
import { Row, Alert, Col, Accordion, Spinner, Container, Badge } from 'react-bootstrap'
import { Query } from "../../../components/GraphQL";

export default function Training({id, children}) {

    const [training, setTraining] = useState();
    const [progress, setProgress] = useState();

    useEffect(()=>{
        Query(`
        query GetTrainings($trainings: [String]){
            getTrainings(trainings: $trainings) {
              name
              description
              prerequisites {
                completed
              }
              questions {
                completed
              }
              id
              completed
              demo
            }
          }
        `,{trainings:[id], users:["102846208888342692018"]})
            .then( resp => resp.json()
            .then( data => {
                setTraining(data.data.getTrainings[0]);
                const qu = data.data.getTrainings[0].questions;
                setProgress(100*Math.floor(qu.filter(q=>q.completed).length / qu.length ))
            }))
            .catch( err => console.error(err) )
    },[children]);

    return (
        !training ? <Alert className="m-5"><Spinner animation="grow" size="sm"/> Loading <strong>{id}</strong></Alert> :
        training.errors ? <Alert variant="danger" className="m-5">Unable to load <strong>{id}</strong></Alert> :
        <Container>
            <Row className="mt-3 justify-content-center">
                <Col lg={6} md={10} xs={10}>
                    <h1>{training.name}</h1>
                </Col>
                <Col lg={2} md={2} xs={2}>
                    <h2>
                        <Badge bg={training.completed ? 'success' :'warning'}>
                        { 
                            progress === undefined ? <Spinner animation="grow"/> :
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