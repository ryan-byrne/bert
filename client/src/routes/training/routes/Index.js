import { useEffect, useState } from "react"
import { Container, ListGroup, Row, Col, Badge } from "react-bootstrap";
import { Link } from "react-router-dom"
import { Query } from "../../../components/GraphQL"

export default function Index(){

    const [trainings, setTrainings] = useState();

    useEffect(()=>{
        Query(`
        query AllTrainings {
            getTrainings {
              name
              id
              completed
              description
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
          .then( resp => resp.json()
          .then( data => {
            if (data.error || !data.data) console.error(data)
            else setTrainings(data.data.getTrainings)
          }) )
          .catch( err => console.error(err))
    },[]);

    const TrainingTile = ({training}) => {
        const pre = training.prerequisites.filter(p=>!p.completed)
        const q = training.questions
        const progress = q.length > 0 ?
            Math.floor(100*q.filter(_=>_.completed).length / q.length) : 0
        return (
            <ListGroup.Item action as={Link} to={training.id} 
                disabled={pre.length !== 0 || q.length === 0}>
                <Row>
                    <Col xs={1}>{
                        training.completed ? <span>&#9989;</span> :
                        pre.length !== 0 ? <span>&#128274;</span> :
                        q.length === 0 ? <span>&#128284;</span> :
                        null
                    }</Col>
                    <Col>
                        {training.name}
                    </Col>
                    <Col>
                        
                    </Col>
                </Row>
            </ListGroup.Item>
        )
    }

    return( !trainings ? <div>Loading...</div> :
        <Container className="mt-3">
            <Row className="justify-content-center">
                <Col xs={12} md={8}>
                <ListGroup>
                    {trainings.map( training => 
                        training.id !== 'introduction' ? null :
                        <TrainingTile training={training}/>
                    )}
                </ListGroup>
                <ListGroup className="mt-3">
                    {trainings.map( training =>
                        training.id === 'introduction' ? null :
                        <TrainingTile training={training}/>
                    )}
                </ListGroup>
                </Col>
            </Row>
        </Container>
    )
}