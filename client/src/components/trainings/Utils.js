import { useState, useEffect } from "react";
import { Row, Alert, Col, Form, Button, Accordion, Modal, ListGroup, Spinner, Container, Badge } from 'react-bootstrap'

// TODO: Separate training_completed, and authorized_users

const Note = ({children}) =>
    <Row className="justify-content-center p-3">
        <Col xs={12} md={10} lg={8}>
            <Alert variant="warning">
                <Alert.Heading>Note</Alert.Heading>
                {children}
            </Alert>
        </Col>
    </Row>

const Question = ({id, children, user, update}) => {

    const [guess, setGuess] = useState("");
    const [error, setError] = useState(null);
    const [question, setQuestion] = useState({answer:"", completed_by:[]});

    useEffect(()=>{

        user.mongoClient('mongodb-atlas').db('betty').collection('questions').findOne({_id:{$oid:id}})
            .then( resp => setQuestion(resp))
            .catch( err => console.error(err) )

    },[user]);

    const completed = question.completed_by.includes(user.id)

    const submitGuess = () => {

        if ( question.answer === guess.toLowerCase() ) {

            user.mongoClient('mongodb-atlas').db('betty').collection('questions').updateOne({_id:{$oid:id}}, {$set:{completed_by:[...question.completed_by, user.id]}})
                .then( resp => {
                    update();
                    setQuestion({...question, completed_by:[...question.completed_by, user.id]})
                } )
                .catch( err => console.error(err) )

        } else {
            setError("Incorrect!")
        }
    }

    useEffect(()=>error?setTimeout(()=>setError(null),3000):null,[error])

    return (
        <div>
            <hr/>
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
            <hr/>
        </div>
    )
}

const Topic = ({children, name, topicKey, user}) => {

    const [progress, setProgress] = useState([]);

    useEffect(()=>{

        const questions = children.filter( child => child.props.id ).map( q => ({$oid:q.props.id}) )
        user.mongoClient('mongodb-atlas').db('betty').collection('questions').aggregate([
            {$match:{_id:{$in:questions}}}
        ])
            .then( resp => setProgress(resp.map( q => q.completed_by.includes(user.id) )) )
            .catch(err => console.error(err))
    },[children, user])

    return (
        <Accordion.Item className="text-dark" eventKey={topicKey} id={name.replace(' ', '-').toLowerCase()}>
            <Accordion.Header>
                <Row className="w-100" sm={2} md={3} lg={4}>
                    <Col>
                        {topicKey+1}. {name}
                    </Col>
                    <Col>
                        {progress.length>0?progress.map( (q,idx) => <span key={idx} className={`progress-tile-${q?"1":"0"}`}></span> ):<Spinner animation="grow" size="sm" className="ml-3"/>}
                    </Col>
                </Row>
            </Accordion.Header>
            <Accordion.Body className="markdown-body p-3">
                {children}
            </Accordion.Body>
        </Accordion.Item>
    )
}

const Congrats = ({show, onHide, training, user}) => {

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

const Training = ({id, user, children}) => {

    const [training, setTraining] = useState({name:"",description:"", completed_by:null, prerequisites:[], id:""});
    const [missing, setMissing] = useState([]);
    const [progress, setProgress] = useState([]);
    const [status, setStatus] = useState("loading");

    // TODO: Check prerequisites
    // Map questions in each topic
    useEffect(()=>{

        const questions = children.map( child => child.props.children.filter( q => q.props.id )).flat().map( q => ({$oid:q.props.id}) );

        user.mongoClient('mongodb-atlas').db('betty').collection('questions').find({_id:{$in:questions}})
            .then( resp => setProgress(resp.map( q => q.completed_by.includes(user.id) )) )
            .catch( err => console.error(err) )

    },[user, children]);

    // Load Training Data and see if already completed
    useEffect(()=> {
        setStatus("loading");
        user.mongoClient('mongodb-atlas').db('betty').collection('trainings').aggregate([
            {
                $match:{id:id}
            },{
                $lookup:{
                    from:"trainings",
                    localField:"prerequisites",
                    foreignField:"id",
                    as:"prereqData"
                }
            }
        ])
            .then( resp => {
                if (!resp[0]){ setStatus('error') }
                else {
                    setMissing(resp[0].prereqData.filter(pr=>!pr.completed_by.includes(user.id)));
                    setTraining(resp[0]);
                    setStatus(resp[0].completed_by.includes(user.id)?'completed':"");
                }
            })
            .catch( err => {
                setStatus("error")
            } )
    },[user, setStatus, setTraining, setMissing]);

    const perComplete = Math.ceil(progress.filter(q=>q).length/progress.length*100);

    // Check to see if the training has already been completed
    useEffect(()=>{

        if ( perComplete == 100.0 && training.completed_by && !training.completed_by.includes(user.id) ){
            user.mongoClient('mongodb-atlas').db('betty').collection('trainings').updateOne({id}, {$push:{completed_by:user.id}})
                .then( resp => setStatus("completed"))
                .catch( err => console.error(err))
        }

    },[perComplete, user, training.completed_by, id])

    return (
        status === 'error' ? <Alert variant="danger" className="m-5">Unable to load <strong>{id}</strong></Alert> :
        status === "loading" ? <Alert className="m-5"><Spinner animation="grow" size="sm"/> Loading <strong>{id}</strong></Alert> :
        missing.length > 0 ? 
            <Row xs={1} md={2} lg={3} className="mt-5 justify-content-center">
                <Col>
                <Alert variant="warning">
                    <Alert.Heading>&#128274; Missing Trainings</Alert.Heading>
                    You must complete the following trainings to unlock <strong>{training.name} </strong>:
                    <ListGroup>
                        {missing.map((t, idx) =>
                            <ListGroup.Item key={idx} action className="mt-3" href={`/#/trainings/${t.id}`}>{t.name}</ListGroup.Item>
                        )}
                    </ListGroup>
                </Alert> 
                </Col>
            </Row>
        : 
        <Container>
            <Row className="mt-3 justify-content-center">
                <Col md={10} lg={8} xl={6}>
                    <h1>{training.name}</h1>
                </Col>
                <Col xs={2} lg={2} xl={2}>
                    <h2>
                        <Badge bg={perComplete===100?"success":"warning"}>{perComplete===100?"Completed":`${perComplete}%`}</Badge>
                    </h2>
                </Col>
            </Row>
            <Row className="mt-3 justify-content-center">
                <Col md={12} lg={10} xl={8}>
                    <p><i>{training.description}</i></p>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col md={12} lg={10} xl={8}>
                    <Accordion>
                        {children}
                    </Accordion>
                </Col>
            </Row>
            <Congrats show={status==="completed"} onHide={()=>setStatus("")} user={user} training={training}/>
        </Container>
    )
}

export {Question, Topic, Training, Note};