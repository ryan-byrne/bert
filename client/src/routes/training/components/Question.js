import { useState, useEffect } from "react";
import { Row, Alert, Col, Form, Button, Accordion, Modal, ListGroup, Spinner, Container, Badge } from 'react-bootstrap'
import { Query } from "../../../components/GraphQL";

export default ({id, children, update}) => {

    const [completed, setCompleted] = useState(null);
    const [status, setStatus] = useState('completed');
    const [guess, setGuess] = useState("");
    const [error, setError] = useState(null);
    const [question, setQuestion] = useState({answer:"", completed_by:[]});

    useEffect(()=>{

    },[])

    const submitGuess = () => {
        Query(``,{})
    }

    return (
        <div>
            <Row className="justify-content-center" sm={1} md={2}>
                <Alert variant={status==='completed'?"success":status==='incorrect'?"danger":"primary"}>
                    <Row className="mb-3 justify-content-center">
                        <Col>
                            <strong>Question: </strong>{children}
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Col xs={8}>
                            <Form.Control className="text-center" value={status==='completed'?question.answer:guess} disabled={completed} onChange={(e)=>setGuess(e.target.value)} placeholder="Enter your answer here"/>
                        </Col>
                        <Col xs={4}>
                            <Button disabled={status==='completed' || status==='error'} onClick={submitGuess} variant={status==='incorrect'?"outline-danger":status==='completed'?"outline-success":"outline-primary"}>
                                {status==='incorrect'?'Incorrect!':status==='completed'?'Complete':'Submit'}
                            </Button>
                        </Col>
                    </Row>
                </Alert>
            </Row>
        </div>
    )
}