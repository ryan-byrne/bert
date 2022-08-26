import { useEffect, useState } from "react"
import { Container, ListGroup } from "react-bootstrap";
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
    },[]) 

    console.log(trainings);

    return( !trainings ? <div>Loading...</div> :
        <Container className="mt-3">
            <ListGroup>
                {trainings.map( training => 
                    training.id === 'introduction' ?
                    <div>
                    <Link to={training.id}>
                        <ListGroup.Item>
                            {training.name}
                        </ListGroup.Item>
                    </Link>
                </div>:null
                )}
                {trainings.map( training =>
                    training.id === 'introduction' ? null :
                    <div>
                        <Link to={training.id}>
                            <ListGroup.Item>
                                {training.name}
                            </ListGroup.Item>
                        </Link>
                    </div>
                )}
            </ListGroup>
        </Container>
    )
}