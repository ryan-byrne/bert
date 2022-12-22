import {useState, useEffect} from 'react';
import {Row, Button, FormGroup, Image, Collapse, Badge, CloseButton, FormText, FormControl, Col, FloatingLabel, ToggleButtonGroup, ToggleButton, ListGroup, FormSelect} from 'react-bootstrap';
import { Query } from '../../../../../components/GraphQL';
import classroomIcon from './img/classroomIcon.png';
import searchIcon from './img/searchIcon.png';

const Attendees = ({payload, setPayload}) => {

  const [attendees, setAttendees] = useState([]);
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState();
  const [text, setText] = useState("");
  const [userOptions, setUserOptions] = useState();
  const [classOptions, setClassOptions] = useState();
  const [importedClassIds, setImportedClassIds] = useState([]);

  useEffect(() => {
    setPayload((payload)=>({...payload, attendees:attendees.map(a=>({email:a.email}))}))
  }, [attendees, setPayload]);

  const handleUserSelect = (e, user) => {
    e.preventDefault();
    setText("");
    setAttendees([...attendees, user])
  }

  const handleUserDelete = (idx) => {
    const prev = [...attendees]
    prev.splice(idx, 1);
    setAttendees(prev);
  }

  const handleClear = (e) => {
    e.preventDefault();
    setImportedClassIds([]);
    setAttendees([]);
  }

  const handleClassSelect = (e, id) => {
    e.preventDefault();
    setImportedClassIds([...importedClassIds, id]);
    setAttendees([...attendees, ...classOptions.filter(c=>c.id===id)[0].roster.map(u=>({name:u.name, email:u.email}))]);
  }

  useEffect(() => {
    if (text.length === 0 || !search) return
    Query(`
    query Query($search: String!) {
      users(search: $search) {
        name
        email
      }
    }   
    `,{search:text})
      .then(resp => resp.json()
      .then( data => {
        if (data.errors) console.error(data.errors)
        else setUserOptions(data.data.users)
      }))
      .catch( err => console.error(err))
  }, [text, search]);

  useEffect(() => {
    if (search) return
    Query(`query Query {
      courses {
        name
        description
        id
        roster {
          name
          email
        }
      }
    }`)
    .then(resp => resp.json()
    .then( query => {
      if (query.errors) console.error(query.errors)
      else setClassOptions(query.data.courses)
    }))
    .catch( err => console.log(err) )
  }, [search]);

  return (
    <FormGroup as={Row}>
      <Button
        variant={show?'outline-primary':'primary'} 
        onClick={()=>setShow(!show)}>
        {show ? 'Hide' : 'Show'} Attendees {`(${payload.attendees.length} Added)`}
      </Button>
      
      <Collapse in={show}>
        <FormGroup>
          <FormGroup className="mt-3">
            {attendees.map((user, idx)=>
              <Badge bg="secondary" className="m-1">
                <Row>
                  <Col className="mt-auto mb-auto">{user.name}</Col>
                  <Col><CloseButton onClick={()=>handleUserDelete(idx)}/></Col>
                </Row>
              </Badge>
            )}
          </FormGroup>
          <Row className="mt-3">
            <ToggleButtonGroup value={search} type="radio" onChange={(s)=>setSearch(s)} name="searchUser">
              <ToggleButton size="sm" variant="outline-primary" value={true} id="attendees-search">
                <Image src={searchIcon} height="20" className="m-1" />
                Search for Users
              </ToggleButton>
              <ToggleButton value={false} size="sm" variant="outline-primary" id="attendees-import">
                <Image src={classroomIcon} height="20" className="m-1"/>
                  Import from Classroom
              </ToggleButton>
            </ToggleButtonGroup>
          </Row>

          <Collapse in={search === true}>
            <FormGroup className="mt-3">
                <FloatingLabel label="Search for users...">
                  <FormControl placeholder="Search for users..." value={text} onChange={(e)=>setText(e.target.value)}/>
                </FloatingLabel>
                <ListGroup className="position-relative" style={{maxHeight:"200px", overflowY:"scroll"}}>
                  {
                    text.length === 0 ? null :
                    !userOptions ? <ListGroup.Item variant="info">Searching for Users...</ListGroup.Item> :
                    userOptions.length === 0 ? <ListGroup.Item variant="warning">No users found...</ListGroup.Item> :
                    userOptions.map( user =>
                      <ListGroup.Item action disabled={payload.attendees.map(u=>u.email).includes(user.email)} onClick={handleUserSelect}>
                        <div><strong>{user.name}</strong></div>
                        <div><FormText muted>{user.email}</FormText></div>
                      </ListGroup.Item>
                    )
                  }
                </ListGroup>
            </FormGroup>
          </Collapse>

          <Collapse in={search === false}>
            <ListGroup className="mt-3">
              {
                !classOptions ? <ListGroup.Item variant="info">Loading Classes...</ListGroup.Item> :
                classOptions.length === 0 ? <ListGroup.Item variant="warning">No Classes found...</ListGroup.Item> :
                classOptions.map( classOption =>
                  <ListGroup.Item action id={classOption.id}  disabled={importedClassIds.includes(classOption.id)} onClick={(e)=>handleClassSelect(e, classOption.id)}>
                    <div><strong>{classOption.name}</strong></div>
                    <div><FormText>{classOption.description}</FormText></div>
                  </ListGroup.Item>
                )
              }
            </ListGroup>
          </Collapse>
        </FormGroup>
      </Collapse>
      <hr className="mt-3"/>
    </FormGroup>
  )
}

export default Attendees