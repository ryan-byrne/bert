import { useEffect, useState } from "react"
import { Container, ListGroup, Row, Col, Badge, Alert, Spinner, Accordion, Image } from "react-bootstrap";
import { Link } from "react-router-dom"
import { Query } from "../../../components/GraphQL"
import Loading from "../../../components/Loading";

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
              q.filter(q=>q.completed).length > 0 ? <Badge bg="warning">In Progress ({progress}%)</Badge>:
              pre.length > 0 ? <Badge bg="danger" className="text-wrap">Missing {pre[0].name}</Badge> :
              <Badge bg="primary">Start</Badge>
            }
          </Col>
        </Row>
      </ListGroup.Item>
    )
  }

  const modules = [
    {
      name:"Safety",
      icon:"https://cdn-icons-png.flaticon.com/512/2345/2345547.png",
      submodules:['introduction','fire-extinguisher', 'supervisor']
    },{
      name:"Basic Woodworking",
      icon:"https://cdn-icons-png.flaticon.com/512/1973/1973728.png",
      submodules:['hand-saws', 'sanding', 'hammering']
    },{
      name:"Power Tools (Handheld)",
      icon:"https://cdn0.iconfinder.com/data/icons/elasto-power-tools/26/04-ELASTOFONT-POWER-TOOLS-READY_drill-512.png",
      submodules:['power-drills', 'power-sanders', 'jig-saws', 'nail-guns']
    },{
      name:"Power Tools (Stationary)",
      icon:"https://cdn-icons-png.flaticon.com/512/1037/1037645.png",
      submodules:['drill-press', 'band-saws', 'hammering', 'circular-saws']
    },{
      name:"3D Printing",
      icon:"https://cdn-icons-png.flaticon.com/512/2628/2628492.png",
      submodules:['fdm-3d-printing','sla-3d-printing']
    },{
      name:"Laser Cutting",
      icon:"https://cdn-icons-png.flaticon.com/512/2162/2162429.png",
      submodules:['laser-cutting']
    },{
      name:"Advanced Woodworking",
      icon:"https://cdn-icons-png.flaticon.com/512/313/313674.png",
      submodules:['lathes', 'routers', 'table-saws']
    },{
      name:"Metalworking",
      icon:"https://cdn-icons-png.flaticon.com/512/1814/1814422.png",
      submodules:['chop-saws', 'horizontal-band-saws', 'grinders', 'soldering', 'welding']
    }
  ]

  return (!trainings ? <Loading>Loading Trainings...</Loading> :
    <Container className="mt-3">
      <Row xs={1} md={2} lg={3} className="justify-content-center">
        <Col>
          <Accordion>
          {modules.map((module, idx)=>
            <Accordion.Item eventKey={idx}>
              <Accordion.Header><Image height="50" src={module.icon}/><span className="m-3">{module.name}</span></Accordion.Header>
              <Accordion.Body>
                <ListGroup>
                  {trainings.filter(t=>module.submodules.includes(t.id)).map( (training, tid)=>
                    <TrainingTile training={training} />
                  )}
                </ListGroup>
              </Accordion.Body>
            </Accordion.Item>
          )}
        </Accordion>
        </Col>
      </Row>
    </Container>
  )
}