import { Card, Container, Col, Row } from "react-bootstrap";

import classroomImage from './img/classroom.png';
import '../../styles/spaces.css'

const tools = []

const spaces = [
    {
        id:"classroom-area",
        title:"Classroom Area",
        description:"The largest of lab's spaces. Most activities happen here.",
        link:"https://calendar.google.com/calendar/u/0?cid=Y19zOG9jNTM3a2R0OXVhbDBnYWVjNGsydWUwNEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t",
        photo:classroomImage,
        tools:[
            "3D Printers",
            "Electronics",
            "Soldering Irons",
            "Hot Glue Guns"
        ]
    },
    {
        id:"power-tool-area",
        title:"Power Tool Area",
        description:"",
        link:"https://calendar.google.com/calendar/u/0?cid=Y18xdG5oZnR2dDkwOThnYnRtZG1ubjlqOGc1NEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t",
        photo:"",
        tools:[]
    },
    {
        id:"machine-shop",
        title:"Machine Shop",
        description:"",
        link:"https://calendar.google.com/calendar/u/0?cid=Y18zMXRsbHYwczFsc2JwbWNmdjVrZGFzcDllY0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t",
        photo:"",
        tools:[]
    }
]

const Spaces = () => 
  <Container className="spaces-container">
      <Row md={1} lg={3} className="justify-content-center">
      {spaces.map(space=>
        <Col>
            <Card className="m-3">
                <Card.Body>
                    <Card.Title><a href={`#/spaces#${space.id}`}>{space.title}</a></Card.Title>
                    <a href={`${space.link}`}>View Schedule</a>
                </Card.Body>
                <Card.Body>
                </Card.Body>
                <Card.Img variant="top" src={space.photo}></Card.Img>
                <Card.Body>
                    <Card.Text>
                        <p>{space.description}</p>
                        <p>Available Tools:</p>
                        <ul>
                            {space.tools.map(tool=>
                                <li>{tool}</li>
                            )}
                        </ul>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
        )}
      </Row>
  </Container>

export default Spaces;