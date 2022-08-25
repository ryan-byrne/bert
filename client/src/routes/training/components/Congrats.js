import { useState, useEffect } from "react";
import { Row, Alert, Col, Form, Button, Accordion, Modal, ListGroup, Spinner, Container, Badge } from 'react-bootstrap'
import { Query } from "../../../components/GraphQL";

export default ({show, onHide, training, user}) => {

    const [newTrainings, setNewTrainings] = useState([]);
    const [newTools, setNewTools] = useState([]);

    useEffect(()=>{
        user.mongoClient('mongodb-atlas').db('betty').collection('trainings').aggregate([
            {$match:{
                prerequisites:training.id,
            }}
        ])
            .then( resp => setNewTrainings(resp) )
            .catch( err => console.error(err) )

        user.mongoClient('mongodb-atlas').db('betty').collection('tools').aggregate([
            {$match:{
                training:training.id
            }}
        ])
            .then( resp => setNewTools(resp) )
            .catch( err => console.error(err) )
    },[training, user])

    const demoLink = `https://calendar.google.com/calendar/event?action=TEMPLATE&dates=20211001T100000Z/20211001T110000Z&text=${user._profile.data.firstName}%27s+${training.name.replace(' ','+')}+Demo&location=Beta+Lab`

    return (
        <Modal {...{show, onHide}} centered>
            <Modal.Header closeButton>
                <Modal.Title>&#127882; Congratulations!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    You have successfully completed the <strong>{training.name} Training</strong>,
                </p>
                {newTrainings.length === 0 ? null :
                    <div>
                        <p>
                         &#128275; Unlocked access to the following trainings:
                        </p>
                        <ListGroup>
                            {newTrainings.map((newTraining ,idx)=>
                                <ListGroup.Item action href={`/#/trainings/${newTraining.id}`} disabled={newTraining.completed_by.includes(user.id)} key={idx}>
                                    <strong>{newTraining.name}</strong> {newTraining.completed_by.includes(user.id)?"(Completed)":null}
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                    </div>
                }
                {newTools.length === 0 ? null :
                    <div className="mt-3">
                        <p>
                            &#128736; And can now reserve the following tools:
                        </p>
                        <ListGroup>
                            {newTools.map((newTool ,idx)=>
                                <ListGroup.Item action href={`/#/tools/${newTool._id.toString()}`} key={idx}>
                                    <strong>{newTool.brand} {newTool.name}</strong>
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                    </div>
                }
                {
                    training.demo ? 
                    <Alert variant="warning" className="mt-3">
                        <Alert.Heading>&#9888; Schedule Demo</Alert.Heading>
                        Before you can <b><i>use</i></b> {newTools.length>1?'these tools':'this tool'} on your own,
                        you must <a href={demoLink}>Schedule a Demo with Mr. Byrne</a>
                    </Alert> :null
                }
            </Modal.Body>
        </Modal>
    )
}