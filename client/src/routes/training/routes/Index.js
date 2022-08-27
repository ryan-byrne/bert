import { useEffect, useState } from "react"
import { Container, ListGroup, Row, Col, Badge, Alert, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom"
import { Query } from "../../../components/GraphQL"

export default function Index() {

  const [trainings, setTrainings] = useState();

  useEffect(() => {
    Query(`
        query AllTrainings {
            getTrainings {
              name
              id
              completed
              description
              demo
              demo_completed
              questions {
                completed
              }
              prerequisites {
                name
                id
                completed
              }
            }
          }
        `)
      .then(resp => resp.json()
        .then(data => {
          if (data.error || !data.data) console.error(data)
          else setTrainings(data.data.getTrainings)
        }))
      .catch(err => console.error(err))
  }, []);

  const TrainingTile = ({ training }) => {
    const pre = training.prerequisites.filter(p => !p.completed)
    const q = training.questions
    const progress = q.length > 0 ?
      Math.floor(100 * q.filter(_ => _.completed).length / q.length) : 0

      return (
      <ListGroup.Item 
        action as={Link} to={training.id}
        disabled={pre.length !== 0 || q.length === 0}
        variant={
          training.completed && training.demo && !training.demo_completed ? 'warning' :
          training.completed ? 'success' :
          q.filter(q=>q.completed).length > 0 ? 'warning' :
          'info'
        }
      >

        <Row>
          <Col xs={6} className="mt-auto mb-auto">
            {training.name}
          </Col>
          <Col xs={6} className="mt-auto mb-auto">
            {
              training.completed && training.demo && !training.demo_completed ? <Badge bg="warning">Demo Not Completed</Badge> :
              training.completed ? <Badge bg="success">Completed</Badge> :
              q.length === 0 ? <Badge bg="secondary">Coming Soon</Badge> :
              q.filter(q=>q.completed).length > 0 ? <Badge bg="warning">In Progress</Badge>:
              pre.length > 0 ? <Badge bg="danger" className="text-wrap">Missing {pre[0].name}</Badge> :
              <Badge bg="primary">Start</Badge>
            }
          </Col>
        </Row>
      </ListGroup.Item>
    )
  }

  return (!trainings ? <Alert className="mt-5 text-center"><Spinner animation="grow" size="sm"/> Loading Trainings</Alert> :
    <Container className="mt-3">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={4}>
          <ListGroup>
            {trainings.map(training =>
              training.id !== 'introduction' ? null :
                <TrainingTile training={training} />
            )}
          </ListGroup>
          <ListGroup className="mt-3">
            {trainings.map(training =>
              training.id === 'introduction' ? null :
                <TrainingTile training={training} />
            )}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  )
}