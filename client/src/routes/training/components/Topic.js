import { useEffect, useState } from "react";
import { Row, Col, Accordion, Spinner } from 'react-bootstrap'
import { Query } from "../../../components/GraphQL";


export default function Topics({children, name, topicKey}) {

    const [progress, setProgress] = useState(null);

    useEffect(()=>{
        const questionIds = children.filter( child => child.props.id ).map(c => c.props.id)
        Query(`
        query GetQuestions($questions: [String]) {
            getQuestions(questions: $questions) {
              completed
            }
          }
        `,{questions:questionIds})
            .then( resp => resp.json()
            .then( data => {
                if (data.error || !data.data) console.error(data)
                else setProgress(data.data.getQuestions.map(q=>q.completed))
            }))
            .catch( err => console.error(err) )
    },[children])

    return (
        <Accordion.Item eventKey={topicKey} id={name.replace(' ', '-').toLowerCase()}>
            <Accordion.Header>
                <Row className="w-100">
                    <Col xs={8}>
                        <strong>{name}</strong>
                    </Col>
                    <Col xs={4}>
                        {
                            !progress ?
                            <Spinner animation="grow" size="sm" className="ml-3"/>:
                            progress.length===0?null:
                            progress.map( (q,idx) => <span key={idx} className={`progress-tile-${q?"1":"0"}`}></span> )
                        }
                    </Col>
                </Row>
            </Accordion.Header>
            <Accordion.Body className="markdown-body p-3">
                {children}
            </Accordion.Body>
        </Accordion.Item>
    )
}