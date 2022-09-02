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
  }, [attendees]);

  const handleUserSelect = (e, user) => {
    e.preventDefault()
    setAttendees([...attendees, user])
  }

  const handleUserDelete = (idx) => {
    const prev = [...attendees]
    prev.splice(idx, 1);
    setAttendees(prev);
  }

  const handleClassSelect = (e, courseId) => {
    e.preventDefault()
    Query(`query Query($courseId: String!) {
      getClassRoster(courseId: $courseId) {
        id
        name
        email
      }
    }`,{courseId})
    .then(resp => resp.json()
    .then( data => {
      setAttendees([...attendees, ...data.data.getClassRoster])
      setImportedClassIds([...importedClassIds, courseId])
    }))
  }

  useEffect(() => {
    if (text.length === 0 || !search) return
    Query(`
    query Query($text: String) {
      userSearch(text: $text) {
        name
        email
      }
    }   
    `,{text})
      .then(resp => resp.json()
      .then( data => setUserOptions(data.data.userSearch)))
  }, [text, search]);

  useEffect(() => {
    if (search) return
    Query(`query Query {
      getCourses {
        name
        description
        id
      }
    }`)
    .then(resp => resp.json()
    .then( data => setClassOptions(data.data.getCourses)))
  }, [search]);

  return (
    <FormGroup as={Row}>
      <Collapse in={show}>
        <FormGroup className="mb-3">
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
                      <ListGroup.Item action disabled={payload.attendees.map(u=>u.email).includes(user.email)} onClick={(e)=>handleUserSelect(e, user)}>
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
                  <ListGroup.Item action disabled={importedClassIds.includes(classOption.id)} onClick={(e)=>handleClassSelect(e, classOption.id)}>
                    <div><strong>{classOption.name}</strong></div>
                    <div><FormText>{classOption.description}</FormText></div>
                  </ListGroup.Item>
                )
              }
            </ListGroup>
          </Collapse>

          <Collapse in={payload.attendees.length > 0}>
            <FormGroup className="mt-3">
              <FormText>Attendees:</FormText>
              <FormGroup>
                <Badge>You</Badge>
                {attendees.map((user, idx)=>
                  <Badge bg="secondary" className="m-1">
                    <Row>
                      <Col className="mt-auto mb-auto">{user.name}</Col>
                      <Col><CloseButton onClick={()=>handleUserDelete(idx)}/></Col>
                    </Row>
                  </Badge>
                )}
              </FormGroup>
            </FormGroup>
          </Collapse>


        </FormGroup>
      </Collapse>
        <Button
          variant={show?'outline-primary':'primary'} 
          onClick={()=>setShow(!show)}>
          {show ? 'Hide' : 'Add'} Attendees {payload.attendees.length > 0 ? `(${payload.attendees.length} Added)` : null}
        </Button>
      <hr/>
    </FormGroup>
  )
}

export default Attendees