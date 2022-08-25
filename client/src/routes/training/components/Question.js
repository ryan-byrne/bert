import { useState, useEffect } from "react";
import { Row, Alert, Col, Form, Button } from 'react-bootstrap'
import { Query } from "../../../components/GraphQL";

export default ({id, children, update}) => {

    const [answer, setAnswer] = useState("");
    const [status, setStatus] = useState('loading');
    const [guess, setGuess] = useState("");

    useEffect(()=>{
        // On first load, get status
        setStatus('waiting')
        Query(`
            query GetQuestion($id: String) {
                getQuestion(id: $id) {
                answer
                completed
                }
            }
        `,{id})
            .then( resp => resp.json()
            .then( data => {
                setStatus( data.data.getQuestion.completed ? 'completed' : 'waiting')
                setAnswer(data.data.getQuestion.answer)
            }))
    },[])

    useEffect(()=>{
        if ( status === 'incorrect' ) setTimeout(()=>setStatus('waiting'), 2000)
    },[status])

    const submitGuess = () => {
        setStatus('loading')
        Query(`
            mutation SubmitGuess($text: String, $questionId: String) {
                submitGuess(text: $text, questionId: $questionId)
            }
        `,{text:guess, questionId:id})
            .then( resp => resp.json()
            .then( data => {
                setStatus(data.data.submitGuess ? 'completed' : 'incorrect')
                update()
            } ) )
    }

    return (
        <Row className="justify-content-center" xs={1} md={2}><Col>
            <Alert variant={
                status==='completed'?"success":
                status==='incorrect'?"danger":
                status==='loading'?'warning':
                "primary"}>
                <Alert.Heading>
                    <strong>Question: </strong>
                </Alert.Heading>
                <Row>
                    <Col>
                        {children}
                    </Col>
                </Row>
                <Row className="text-center mt-3">
                    <Col xs={8}>
                        <Form.Control 
                            className="text-center" 
                            value={status==='completed'?answer:guess} 
                            disabled={status!=='waiting'} 
                            onChange={(e)=>setGuess(e.target.value)} 
                            placeholder="Enter your answer here"/>
                    </Col>
                    <Col xs={4}>
                        <Button 
                            disabled={status!=='waiting'} 
                            onClick={submitGuess} 
                            variant={status==='incorrect'?"outline-danger":status==='completed'?"outline-success":"outline-primary"}
                        >
                            {
                                status==='incorrect'?'Incorrect!':
                                status==='completed'?'Complete':
                                status==='loading'?'Submitting':
                                'Submit'
                            }
                        </Button>
                    </Col>
                </Row>
            </Alert>
        </Col></Row>
    )
}