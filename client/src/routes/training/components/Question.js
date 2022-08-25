import { useState, useEffect } from "react";
import { Row, Alert, Col, Form, Button, Accordion, Modal, ListGroup, Spinner, Container, Badge } from 'react-bootstrap'

export default ({id, children, update}) => {

    const [completed, setCompleted] = useState(null);

    const [guess, setGuess] = useState("");
    const [error, setError] = useState(null);
    const [question, setQuestion] = useState({answer:"", completed_by:[]});

    const submitGuess = () => {}

    return (
        <div>
            <Row className="justify-content-center" sm={1} md={2}>
                <Alert variant={completed?"success":error?"danger":"primary"}>
                    <Row className="mb-3 justify-content-center">
                        <Col>
                            <strong>Question: </strong>{children}
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Col xs={7} sm={8} md={7} lg={8}>
                            <Form.Control className="text-center" value={completed?question.answer:guess} disabled={completed} onChange={(e)=>setGuess(e.target.value)} placeholder="Enter your answer here"/>
                        </Col>
                        <Col xs={5} sm={4} md={5} lg={3}>
                            <Button disabled={completed || error} onClick={submitGuess} variant={error?"outline-danger":completed?"outline-success":"outline-primary"}>
                                {error?error:completed?'Completed':'Submit'}
                            </Button>
                        </Col>
                    </Row>
                </Alert>
            </Row>
        </div>
    )
}