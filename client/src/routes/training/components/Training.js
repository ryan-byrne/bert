import { useState, useEffect } from "react";
import { Row, Alert, Col, Form, Button, Accordion, Modal, ListGroup, Spinner, Container, Badge } from 'react-bootstrap'
import { Query } from "../../../components/GraphQL";

export default ({id, children}) => {

    const [training, setTraining] = useState();
    const [progress, setProgress] = useState();

    useEffect(()=>
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
            }`,{id})
        .then( resp => resp.json()
        .then( data => setTraining(data.data.getTraining) ))
    ,[id]);

    return (
        !training ? <Alert className="m-5"><Spinner animation="grow" size="sm"/> Loading <strong>{id}</strong></Alert> :
        training.errors ? <Alert variant="danger" className="m-5">Unable to load <strong>{id}</strong></Alert> :
        <Container>
            <Row className="mt-3 justify-content-center">
                <Col md={6} xs={10}>
                    <h1>{training.name}</h1>
                </Col>
                <Col md={2} xs={2}>
                    <h2>
                        %
                    </h2>
                </Col>
            </Row>
            <Row className="mt-3 justify-content-center">
                <Col md={8} xs={12}>
                    <p><i>{training.description}</i></p>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col md={8} xs={12}>
                    <Accordion>
                        {children}
                    </Accordion>
                </Col>
            </Row>
        </Container>
    )
}