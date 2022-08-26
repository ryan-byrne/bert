import { useEffect, useState } from "react";
import { Row, Col, Accordion, Spinner } from 'react-bootstrap'
import { Query } from "../../../components/GraphQL";


export default function Topics({children, name, topicKey}) {

    const [progress, setProgress] = useState([]);

    useEffect(()=>{
        const questionIds = children.filter( child => child.props.id ).map(c => c.props.id)
        Query(`
            query GetTopicProgress($ids: [String]){
                getQuestionProgress(ids: $ids)
            }
        `,{ids:questionIds})
            .then( resp => resp.json()
            .then( data => setProgress(data.data.getQuestionProgress)) )
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
                            progress.length>0?
                            progress.map( (q,idx) => <span key={idx} className={`progress-tile-${q?"1":"0"}`}></span> ):
                            <Spinner animation="grow" size="sm" className="ml-3"/>}
                    </Col>
                </Row>
            </Accordion.Header>
            <Accordion.Body className="markdown-body p-3">
                {children}
            </Accordion.Body>
        </Accordion.Item>
    )
}