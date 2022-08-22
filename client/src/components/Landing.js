import {Container, Col, Row, Image, Button, ButtonGroup} from 'react-bootstrap';

import whiteBrand from '../img/logos/whiteBrand.png'

const Landing = () => 
    <Container className="h-100">

        <Row className="justify-content-center text-center h-100">
            <Col xs={12} sm={6} md={6} className="mt-auto mb-auto">
                <Image src={whiteBrand}/>
            </Col>
            <Col xs={5} sm={3} md={3} className="mt-auto mb-auto">
                <Button variant="outline-light"href="/schedule">View the Schedule</Button>
            </Col>
        </Row>
    </Container>

export default Landing;