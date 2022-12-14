import {useState, useEffect} from 'react';
import {Container, Collapse, Form, Image, Row, Col, Accordion} from 'react-bootstrap';
import { Query } from '../../../components/GraphQL';
import SearchSelect from '../../../components/SearchSelect';

const Trainings = ({user}) => {

  const [trainings, setTrainings] = useState();

  const trainingQuery = `
  
  `

  useEffect(() => {
    setTrainings();
    Query(trainingQuery, {})
  }, [user]);

  return(
    <div>Trainings</div>
  )
}
//user ? user : ctx.user.id, 
export const Users = () => {

  const [selectedUser, setSelectedUser] = useState();

  const userQuery= `
  query UserSearch($text: String!) {
    userSearch(text: $text) {
      email
      name
      id
    }
  }
  `

  const categories = [
    {
      title:"Trainings",
      icon:"https://journals.researchparks.org/public/journals/2/article_195_cover_en_US.png",
      body:!selectedUser?null:<Trainings user={selectedUser}/>
    }
  ]

  return(
    <Container>
      <Row className="justify-content-center text-dark">
        <Col xs={12} md={6}>
          <SearchSelect name="User" query={userQuery} queryName="userSearch" columns={['name','email']} onSelect={(u) => setSelectedUser(u)}/>
        </Col>
      </Row>
      <Collapse in={selectedUser}>
        <div>
          <h3>{!selectedUser ? null : selectedUser.name}</h3>
          {
            !selectedUser ? null:
            <Accordion defaultActiveKey="0">
              {categories.map(category=>
                <Accordion.Item>
                  <Accordion.Header><Image src={category.icon} height="50"/> <span className="m-3">{category.title}</span></Accordion.Header>
                  <Accordion.Body>{category.body}</Accordion.Body>
                </Accordion.Item>
              )}
            </Accordion>
          }
        </div>
      </Collapse>
    </Container>
  )
}