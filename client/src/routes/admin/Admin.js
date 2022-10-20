import {useState, useEffect} from 'react'
import { Accordion, Button, ButtonGroup, CloseButton, Col, Container, FloatingLabel, FormControl, FormGroup, FormText, ListGroup, Row, Tab, Table, Tabs } from "react-bootstrap"
import { Link } from 'react-router-dom';
import { Query } from '../../components/GraphQL';
import Loading from '../../components/Loading';

const SearchList = ({query, queryName, label}) => {

  const [text, setText] = useState("");
  const [options, setOptions] = useState();

  useEffect(() => {
    if ( text.length < 3 ){
      setOptions()
      return
    }
    Query(query, {text})
      .then( resp => resp.json() )
      .then( data => {
        if ( data.errors ) console.error(data.error)
        else setOptions(data.data[queryName])
      })
  }, [text, query, queryName]);

  return(
    <FormGroup>
      <FloatingLabel label={`Search for a ${label}...`}>
        <FormControl value={text} placeholder={`Search for a ${label}...`} onChange={(e)=>setText(e.target.value)}/>
      </FloatingLabel>
      <ListGroup>
        {
          !options ? null :
          options.length === 0 ? <ListGroup.Item variant="warning">No {label}(s) found...</ListGroup.Item> :
          options.map( option =>
            <ListGroup.Item>{option.name}</ListGroup.Item>
          )
        }
      </ListGroup>
    </FormGroup>
  )
}

const Demos = () => {

  const [user, setUser] = useState(null);
  const [userOptions, setUserOptions] = useState();
  const [userSearch, setUserSearch] = useState("");

  const [training, setTraining] = useState(null);
  const [trainingOptions, setTrainingOptions] = useState();
  const [trainingSearch, setTrainingSearch] = useState("");

  const [message, setMessage] = useState();

  useEffect(() => {
    if ( userSearch.length < 3 ) {
      setUserOptions()
      return
    }
    Query(`
    query Query($text: String!) {
      userSearch(text: $text) {
        name
        id
      }
    }   
    `,{text:userSearch})
      .then(resp => resp.json()
      .then( data => {
        if (data.errors) console.error(data.errors)
        else setUserOptions(data.data.userSearch)
      }))
      .catch( err => console.error(err))
  }, [userSearch]);

  useEffect(() => {
    if ( trainingSearch.length < 3 ) {
      setTrainingOptions()
      return
    }
    Query(`
    query Query($text: String!) {
      trainingSearch(text: $text) {
        name
        id
      }
    }   
    `,{text:trainingSearch})
      .then(resp => resp.json()
      .then( data => {
        if (data.errors) console.error(data.errors)
        else setTrainingOptions(data.data.trainingSearch)
      }))
      .catch( err => console.error(err))
  }, [trainingSearch]);

  const handleClear = () => {
    setUser(null);
    setTraining(null);
  }

  const handleSubmit = () => {
    setMessage("Loading")
    Query(`
    mutation Mutation($user: String!, $training: String!) {
      completeDemo(user: $user, training: $training)
    }
    `,{user:user.id, training:training.id})
      .then( resp => resp.json() )
      .then( data => {
        console.log(data);
        if (data.errors) throw data.errors
        else setMessage("Success!")
      })
      .catch( err => {
        console.error(err);
        setMessage("Error")
      } )
  }

  return (
    <FormGroup as={Col}>
      <h3>Demos</h3>
      <FormText>Who Completed the Demo?</FormText>
      <FloatingLabel label="Search for a user...">
        <FormControl value={user ? user.name : userSearch} disabled={user} onChange={(e)=>setUserSearch(e.target.value)} placeholder="Search for a user..." className="bg-dark text-light"/>
      </FloatingLabel>
      <ListGroup className="position-relative" style={{maxHeight:"200px", overflowY:"scroll"}}>
      {
        !userOptions || user ? null :
        userOptions.length === 0 ? <ListGroup.Item variant="warning">No users found</ListGroup.Item> :
        userOptions.map( u =>
          <ListGroup.Item onClick={()=>setUser(u)} action>{u.name}</ListGroup.Item>
        )
      }
      </ListGroup>
      <FormText>For what training?</FormText>
      <FloatingLabel label="Search for a training...">
        <FormControl placeholder="Search for a training..." disabled={training} value={training ? training.name: trainingSearch} onChange={(e)=>setTrainingSearch(e.target.value)} className="bg-dark text-light"/>
      </FloatingLabel>
      <ListGroup className="position-relative" style={{maxHeight:"200px", overflowY:"scroll"}}>
      {
        !trainingOptions || training ? null :
        trainingOptions.length === 0 ? <ListGroup.Item variant="warning">No trainings found</ListGroup.Item> :
        trainingOptions.map( t =>
          <ListGroup.Item onClick={()=>setTraining(t)} action>{t.name}</ListGroup.Item>
        )
      }
      </ListGroup>
      <Row className="mt-3">
        <ButtonGroup>
          <Button variant="secondary" onClick={handleClear}>Clear</Button>
          <Button onClick={handleSubmit} disabled={!user || !training || message}>Submit</Button>
        </ButtonGroup>
      </Row>
    </FormGroup>
  )
}

const Home = () => {
  return(
    <div>
      Admin Page
    </div>
  )
}

const UserTraining = ({id}) => {

  const [trainings, setTrainings] = useState();
  const [demo, setDemo] = useState(null);

  useEffect(() => {
    const query = `
    query UserSearch($user:String!) {
      getTrainings {
        id
        completed(user: $user)
        demo_completed(user: $user)
        demo
        name
      }
    }
    `
    Query(query, {user:id})
      .then( resp => resp.json() )
      .then( data => setTrainings(data.data.getTrainings))
  }, []);

  const handleDemo = (trainingId) => {
    const mutation = `
    mutation Mutation($user: String!, $training: String!) {
      completeDemo(user: $user, training: $training)
    }`
    setDemo("Submitting")
    Query(mutation, {user:id, training:trainingId})
      .then( resp => resp.json() )
      .then( data => setDemo("Demo Completed") )
  }

  return(
    !trainings ? <Loading>Loading Trainings...</Loading> : 
    <Table size="sm" striped bordered hover>
    <thead><th>Name</th><th>Status</th></thead>
    <tbody>
    {trainings.map(training=>
      <tr>
        <td><Link to={`/training/${training.id}`}>{training.name}</Link></td>
        <td className="text-center">
          {
            (training.demo && training.demo_completed) || (training.completed && !training.demo) ? <span>&#9989;</span> :
            training.completed && training.demo ? 
            <Button
              disabled={demo} 
              size="sm" 
              onClick={()=>handleDemo(training.id)} 
              variant="outline-primary">
                {demo ? demo : "Complete Demo"}
            </Button> : null
          }
        </td>
      </tr>
    )}
    </tbody>
  </Table>
  )
}

const Trainings = () => {

  const [users, setUsers] = useState();

  useEffect(() => {
    const query = `
    query UserSearch($text: String!) {
      userSearch(text: $text) {
        id
        name
        email
      }
    }
    `
    setUsers()
    Query(query, {text:""})
      .then( resp => resp.json())
      .then( data => setUsers(data.data.userSearch))
      .catch(err => console.error(err))
  }, []);

  return(
      <div>
        {
          !users ? <Loading>Getting Users...</Loading> :
          <Accordion className="mt-3">
            {users.map( (user, idx) =>
              <Accordion.Item eventKey={idx}>
                <Accordion.Header>{user.name}</Accordion.Header>
                <Accordion.Body>
                  <UserTraining id={user.id}/>
                </Accordion.Body>
              </Accordion.Item>
            )}
          </Accordion>
        }
      </div>
  )
}

const Admin = () => {

  const [key, setKey] = useState('home');

  return (
    <Container className="mt-3">
      <Tabs defaultActiveKey="home" onSelect={(k)=>setKey(k)} activeKey={key}>
        <Tab eventKey="home" title="Home">
          <Home/>
        </Tab>
        <Tab eventKey="trainings" title="Trainings">
          <Trainings/>
        </Tab>
      </Tabs>
    </Container>
  )
}

export default Admin