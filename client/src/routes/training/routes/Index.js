import { useEffect, useState } from "react"
import { Container, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom"
import { Query } from "../../../components/GraphQL"

export default function Index(){

    const [trainings, setTrainings] = useState([]);

    useEffect(()=>{
        Query(`
        query TrainingStatus {
            getTrainingStatus {
              completed
              training {
                name
                description
                id
              }
            }
          } 
        `)
          .then(resp => resp.json()
          .then( data => setTrainings(data.data.getTrainingStatus) ))

    },[])

    return(
        <Container className="mt-3">
            <ListGroup>
                {trainings.map( training => 
                    training.training.id === 'introduction' ?
                    <div>
                    <Link to={training.training.id}>
                        <ListGroup.Item>
                            {training.training.name}
                        </ListGroup.Item>
                    </Link>
                </div>:null
                )}
                {trainings.map( training =>
                    training.training.id === 'introduction' ? null :
                    <div>
                        <Link to={training.training.id}>
                            <ListGroup.Item>
                                {training.training.name}
                            </ListGroup.Item>
                        </Link>
                    </div>
                )}
            </ListGroup>
        </Container>
    )
}