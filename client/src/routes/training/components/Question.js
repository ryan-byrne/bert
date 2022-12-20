import { useState, useEffect, useRef } from "react";
import { Row, Alert, Col, Form, Button, ListGroup } from 'react-bootstrap'
import { Query } from "../../../components/GraphQL";

export default function Question({ id, children, update, choices }) {

  const formRef = useRef();
  const [question, setQuestion] = useState();
  const [status, setStatus] = useState('loading');
  const [guess, setGuess] = useState("");

  const submitGuess = (newGuess) => {
    setStatus('loading');
    Query(`
        mutation SubmitGuess($text: String, $questionId: String) {
            submitGuess(text: $text, questionId: $questionId)
        }
        `, { text: newGuess, questionId: id })
      .then(resp => resp.json()
        .then(data => {
          setStatus(data.data.submitGuess ? 'completed' : 'incorrect')
          update()
        }))
  }

  const handleSelectChoice = (e) => {
    e.preventDefault();
    submitGuess(e.target.id);
  }

  useEffect(() => {
    const listener = event => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();

        if (document.activeElement === formRef.current) submitGuess(guess)
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [formRef, guess]);

  useEffect(() => {
    setStatus('loading')
    Query(`
        query GetQuestions($id: [String]) {
            questions(id: $id) {
              completed
              answer
            }
          }
        `, { id:[id] })
      .then(resp => resp.json()
      .then(query => {
        if (query.error || !query.data) console.error(query)
        else {
          setQuestion(query.data.questions[0])
          setStatus(query.data.questions[0].completed ? 'completed' : 'waiting')
        }
      }))
      .catch(err => console.error(err))
  }, [id])

  useEffect(() => {
    if (status === 'incorrect') setTimeout(() => setStatus('waiting'), 2000)
  }, [status])

  return (
    <Row className="justify-content-center mt-3" xs={1} md={2}><Col>
      <Alert variant={
        status === 'completed' ? "success" :
          status === 'incorrect' ? "danger" :
            status === 'loading' ? 'warning' :
              "primary"}>
        <Alert.Heading>
          <strong>Question: </strong>
        </Alert.Heading>
        <Row>
          <Col>
            {children}
          </Col>
        </Row>
        {
          !choices ?
          <Row className="text-center mt-3">
          <Col xs={7}>
            <Form.Control
              ref={formRef}
              id={id}
              className="text-center"
              value={status === 'completed' ? question.answer : guess}
              disabled={status !== 'waiting'}
              onChange={(e) => setGuess(e.target.value)}
              placeholder="Enter your answer here" />
          </Col>
          <Col xs={5}>
            <Button
              disabled={status !== 'waiting'}
              onClick={e=>submitGuess(guess, e)}
              variant={status === 'incorrect' ? "outline-danger" : status === 'completed' ? "outline-success" : "outline-primary"}
            >
              {
                status === 'incorrect' ? 'Incorrect!' :
                  status === 'completed' ? 'Complete' :
                    status === 'loading' ? 'Submitting' :
                      'Submit'
              }
            </Button>
          </Col>
        </Row> :
          <ListGroup className="mt-3">
            {
              status === 'completed' ? <ListGroup.Item disabled>{question.answer}</ListGroup.Item> :
              status === 'loading' ? <ListGroup.Item disabled>Loading...</ListGroup.Item> :
              status === 'incorrect' ? <ListGroup.Item disabled>Incorrect!</ListGroup.Item> :
              choices.map( (choice,idx) =>
                <ListGroup.Item action key={idx} id={choice} onClick={handleSelectChoice}>{choice}</ListGroup.Item>
              )
            }
          </ListGroup>
        }
      </Alert>
    </Col></Row>
  )
}