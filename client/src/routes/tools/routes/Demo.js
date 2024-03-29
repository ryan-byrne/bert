import { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row, Alert, CloseButton, Badge, Collapse } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom";
import { Query } from "../../../components/GraphQL";
import SearchSelect from "../../../components/SearchSelect";
import Loading from "../../../components/Loading";

export const Demo = ({id, show, onHide}) => {

  const [training, setTraining] = useState();
  const [checklist, setChecklist] = useState([]);
  const [supervisor, setSupervisor] = useState();
  const [submitting, setSubmitting] = useState(false);
  const [users, setUsers] = useState();

  useEffect(() => {
    if (!id) return
    setTraining();
    Query(`
    query GetTool($id: [String], $sid: [String]) {
      training : trainings(id:$id) {
        checklist
        demo
        demo_completed
        completed
        name
      }
      supervisor : trainings(id: $sid) {
        completed
      }
    }
    `, {id:[id], sid:["supervisor"]})
      .then(resp => resp.json())
      .then( query => {
        setTraining(query.data.training[0]);
        setSupervisor(query.data.supervisor[0].completed)
      })
      .catch(err=>console.error(err))
  }, [id]);

  const userQuery = `
  query GetUser($search: String) {
    users(search: $search) {
      email
      name
      id
    }
  }
  `

  const handleClose = () => {
    setTraining();
    setUsers();
    onHide()
  }

  const handleChange = (idx, e) => {
    let newCheck = [...checklist]
    newCheck[idx] = e.target.checked
    setChecklist(newCheck);
  }

  const handleSubmit = () => {
    setSubmitting(true);
    Query(`
    mutation Mutation($users: [String!]!, $training: String!) {
      completeDemo(users: $users, training: $training)
    }
    `,{users:users.map(u=>u.id), training:id})
      .then( resp => {
        if (!resp) setSubmitting('error')
        else onHide()
      } )
      .catch( err => {
        console.error(err);
        setSubmitting('error')
      } )
  }

  return(
    <Modal show={show} centered onHide={()=>handleClose()}>
      {
        !training ? <Loading>Loading Training Checklist...</Loading> :
        !training.completed ? <Alert className="m-3" variant="danger"><CloseButton onClick={onHide}/> You have not completed <Link to={`/training/${id}`}> {training.name}</Link></Alert> :
        !supervisor ? <Alert className="m-3" variant="danger"><CloseButton onClick={onHide}/> You have not completed the <Link to="/training/supervisor">Lab Supervisor Training </Link></Alert> :
        submitting === true ? <Loading>Submitting Demo...</Loading> :
        submitting ==='error' ? <Alert className="m-3" variant="danger">Something went wrong...</Alert> :
        <div>
          <Modal.Header>
            <Modal.Title>{training ? `Demo Checklist: ${training.name}` : null}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <SearchSelect columns={['name','email']} name="User" query={userQuery} queryName="users" onSelect={(u)=>setUsers(!users ? [u] : [...users, u])}/>
            
            {
              !users ? null :
              <Form.Text>
                Completing Demo for {users.map(user=><Badge>{user.name}</Badge>)}
              </Form.Text>
            }
            <Collapse in={users}>
              <div>
                {training.checklist.map( (item, idx) =>
                <Row key={idx} className="mt-3">
                  <Col xs={9}>{idx+1}. {item}</Col>
                  <Col xs={3}>
                    <Form.Text>No</Form.Text>
                    <Form.Check inline type="switch" id={idx} onChange={(e)=>handleChange(idx, e)} className="m-1 text-center"/>
                    <Form.Text>Yes</Form.Text>
                  </Col>
                </Row>)}
              </div>
            </Collapse>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={()=>handleClose()}>Close</Button>
            <Button
              onClick={handleSubmit}
              disabled={ !supervisor || checklist.filter(l=>l).length < training.checklist.length}
            >
              Submit
            </Button>
          </Modal.Footer>
        </div>
      }
    </Modal>
  )
}