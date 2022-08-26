import { useState, useEffect } from "react";
import { Row, Alert, Col, Accordion, Spinner, Container, Badge } from 'react-bootstrap'
import { Query } from "../../../components/GraphQL";

export default function Training({id, children}) {

    const [completed, setCompleted] = useState(false);
    const [training, setTraining] = useState();
    const [progress, setProgress] = useState([]);

    useEffect(()=> {
        const questionIds = children.map( topic => topic.props.children.filter( child => child.props.id ).map(c=>c.props.id) ).flat()
        Query(`
            query GetTraining($id: String) {
                getTraining(id: $id) {
                    name
                    demo
                    description
                    id
                    prerequisites {
                        id
                    }
                }
            }
        `,{id, questionIds})
        .then( resp => resp.json()
        .then( data => setTraining(data.data.getTraining)))
        return () => {
            setTraining()
        }
    },[id]);

    useEffect(()=>{
        const questionIds = children.map( topic => topic.props.children.filter( child => child.props.id ).map(c=>c.props.id) ).flat()
        Query(`
        query GetTrainingProgress($questionIds:[String]) {
            getQuestionProgress(ids:$questionIds)
        }
        `,{questionIds})
            .then( resp => resp.json()
            .then( data => setProgress(data.data.getQuestionProgress)) )
    },[children])

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
                        <Badge bg={completed ? 'success' :'warning'}>
                        { 
                            progress.length === 0 ? <Spinner animation="grow"/> :
                            `${Math.floor(100*progress.filter(p=>p).length/progress.length)}%`                      
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