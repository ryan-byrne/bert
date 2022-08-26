import { useState, useEffect } from "react";
import { Row, Alert, Col, Form, Button } from 'react-bootstrap'
import { Query } from "../../../components/GraphQL";

export default function Question({id, children, update}) {

    const [question, setQuestion] = useState();
    const [status, setStatus] = useState('loading');
    const [guess, setGuess] = useState("");

    useEffect(()=>{
        setStatus('loading')
        Query(`
        query GetQuestions($questions: [String]) {
            getQuestions(questions: $questions) {
              completed
              answer
            }
          }
        `,{questions:[id]})
            .then( resp => resp.json()
            .then( data => {
                if ( data.error || !data.data) console.error(data)
                else {
                    setQuestion(data.data.getQuestions[0])
                    setStatus( data.data.getQuestions[0].completed ? 'completed' : 'waiting' )
                }
            }))
            .catch(err => console.error(err))
    },[id])

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
                    <Col xs={7}>
                        <Form.Control 
                            className="text-center" 
                            value={status==='completed'?question.answer:guess} 
                            disabled={status!=='waiting'} 
                            onChange={(e)=>setGuess(e.target.value)} 
                            placeholder="Enter your answer here"/>
                    </Col>
                    <Col xs={5}>
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