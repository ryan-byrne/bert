import { useState, useEffect } from "react";
import { Row, Alert, Col, Form, Button, Accordion, Modal, ListGroup, Spinner, Container, Badge } from 'react-bootstrap'


export default ({children, name, topicKey}) => {

    const [progress, setProgress] = useState([]);

    return (
        <Accordion.Item classNage="bg-dark" eventKey={topicKey} id={name.replace(' ', '-').toLowerCase()}>
            <Accordion.Header>
                <Row className="w-100">
                    <Col xs={8}>
                        {topicKey+1}. {name}
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