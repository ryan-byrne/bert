import { useEffect, useState } from "react";
import { Modal, Row, Table, Col, Alert, Spinner, Form, Button, Badge, Collapse, Image, ListGroup } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const Loading = ({children}) => <Alert><Spinner animation="grow" size="sm"/> Loading {children}...</Alert>

const View = ({tool, hide, user}) => 
    <Modal show={tool} onHide={hide}>
        <Modal.Header closeButton>
            <Modal.Title>{tool?`${tool.brand} ${tool.name}`:""}</Modal.Title>
        </Modal.Header>
        {
            !tool?null:
            <Modal.Body>
                <Row className="text-center">
                    <Col>
                        <Image src={tool.photo} fluid/>
                    </Col>
                    
                </Row>
                <Table>
                    <tbody>
                        <tr>
                            <td><b>Description</b></td>
                            <td>{tool.description}</td>
                        </tr>
                        <tr><td><b>Manual</b></td><td><a href={tool.manual} target="_blank">View</a></td></tr>
                        <tr><td><b>Training</b></td><td><a href={`/#/trainings/${tool.training}`}>
                            <Badge bg={tool.authorizedUsers.map(u=>u.realm_id).includes(user.id)?"success":"danger"}>
                                {tool.authorizedUsers.map(u=>u.realm_id).includes(user.id)?"":"Not"} Completed
                            </Badge>
                        </a></td></tr>
                        <tr>
                            <td><b>Authorized Users</b></td>
                            <td>
                                {
                                    tool.authorizedUsers.length === 0 ? <Alert variant="warning">None</Alert>:
                                    <ListGroup>
                                        {tool.authorizedUsers.map( user => 
                                            <ListGroup.Item>{user.first_name} {user.last_name} ({user.email})</ListGroup.Item>
                                        )}
                                    </ListGroup>
                                }
                                
                            </td>
                        </tr>
                        <tr>
                            <td><b>Common Issues</b></td>
                            <td>
                                {tool.issues.map( issue =>
                                    <Alert variant="warning">
                                        <b>{issue.description.toUpperCase()}</b>
                                        <br/>
                                        <strong>Caused by:</strong> {issue.cause}
                                    </Alert>
                                )}
                            </td>
                        </tr>
                    </tbody>
                </Table>
                <Row>
                    
                </Row>
            </Modal.Body>
        }
    </Modal>

/*
Keywords:

* Sanding
* Cutting
* Drilling
* Clamping
* Fastening
* 3d printing
* laser cutting

* Powered
* Hand

* corded
* cordless
* stationary

* basic
* advanced
* expert

* metal
* wood
* plastic

* welding
*/

const Tools = ({user}) => {

    const {toolId} = useParams();
    const [tools, setTools] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    // Keyword Filters
    const [keywords, setKeywords] = useState([]);

    const navigate = useNavigate()

    useEffect(()=>{
        user.mongoClient('mongodb-atlas').db('betty').collection('tools').aggregate([
            {
                $match:keywords.length===0?{}:{keywords:{$all:keywords}}
            },{
                $lookup:{
                    from:"trainings",
                    localField:"training",
                    foreignField:"id",
                    as:"trainingData"
                }
            }, {
                $unwind:"$trainingData"
            },{
                $lookup:{
                    from:"users",
                    let:{completed_by:"$trainingData.completed_by"},
                    pipeline:[
                        {
                            $match:{
                                $expr:{
                                    $in:["$realm_id", "$$completed_by"]
                                }
                            }
                        },{
                                $project:{
                                    first_name:1,
                                    last_name:1,
                                    email:1,
                                    realm_id:1
                                }
                        }
                    ],
                    as:"authorizedUsers"
                }
            },{
                $sort:{name:1}
            }
        ])
            .then( resp => setTools(resp))
            .catch( err => console.error(err) )
    },[user, keywords]);

    const KeywordButton = ({children}) =>
        <Button
            size="sm"
            variant="outline-light"
            onClick={()=>setKeywords([...keywords].includes(children.toLowerCase())?[...keywords].splice([...keywords].indexOf(children.toLowerCase())+1, 1):[...keywords, children.toLowerCase()])} 
            active={[...keywords].includes(children.toLowerCase())}>
                {children}
        </Button>

    const handleToolSelect = (e) => navigate(`/tools/${tools[e.target.parentNode.id]._id.toString()}`);

    return (
        <div>
            <Form.Group as={Row} className="justify-content-center">
                <Col xs={12} md={6} lg={3} className="mt-3">
                    <Form.Control placeholder="Search for a Tool"/>
                </Col>
                <Col xs={12} md={6} lg={3} className="mt-3 text-center">
                    <Button variant="outline-light" onClick={()=>setShowFilters(!showFilters)} active={showFilters}>{showFilters?"Hide":"Show"} Filters</Button>
                </Col>
            </Form.Group>
            <Collapse in={showFilters}>
                <Row xs={1} md={2} lg={5} className="m-3 text-center justify-content-center">
                    <Col className="mt-3">
                        <div >
                            Categories
                        </div>
                        {['Cutting','Drilling','Sanding', 'Fastening', '3D Printing','Laser Cutting','Clamping', 'Powered', 'Hand'].map((mat, idx)=>
                            <KeywordButton>{mat}</KeywordButton>
                        )}
                    </Col>
                    <Col className="mt-3">
                        <div>
                            Mobility
                        </div>
                        {['Cordless','Corded','Stationary'].map((mat, idx)=>
                            <KeywordButton>{mat}</KeywordButton>
                        )}
                    </Col>
                    <Col className="mt-3">
                        <div>
                            Materials
                        </div>
                        {['Wood','Metal','Plastic'].map((mat, idx)=>
                            <KeywordButton>{mat}</KeywordButton>
                        )}
                    </Col>
                    <Col className="mt-3">
                        <div>
                            Skill Level
                        </div>
                        {['Basic','Advanced','Expert'].map((mat, idx)=>
                            <KeywordButton>{mat}</KeywordButton>
                        )}
                    </Col>
                </Row>
            </Collapse>
            <Row className="justify-content-center m-1">
                <Col xs={12} md={10} lg={8} className="mt-3">
                    {
                        tools.length === 0 ? <Alert variant="warning">No tools fit your criteria.</Alert> :
                            <Table variant="dark" hover>
                                <thead><th>Brand</th><th>Name</th><th>Training</th><th>Description</th><th>Quantity</th></thead>
                                <tbody>
                                    {tools.map((tool, idx)=>
                                        <tr onClick={handleToolSelect} style={{cursor:"pointer"}} id={idx} key={idx}>
                                            <td>{tool.brand}</td>
                                            <td>{tool.name}</td>
                                            <td>
                                                <a href={`/#/trainings/${tool.training}`}>
                                                    <Badge bg={tool.authorizedUsers.map(u=>u.realm_id).includes(user.id)?"success":"danger"}>{tool.authorizedUsers.map(u=>u.realm_id).includes(user.id)?`Completed`:'Not Completed'}</Badge>
                                                </a>
                                            </td>
                                            <td>{tool.description}</td>
                                            <td>{tool.quantity}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                    }
                </Col>
            </Row>
            <View tool={tools.filter(t=>t._id.toString()===toolId)[0]} user={user} hide={()=>navigate('/tools')}/>
        </div>
    )
}

export default Tools;