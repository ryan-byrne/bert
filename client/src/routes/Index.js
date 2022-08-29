import { Col, Row, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import whiteBrand from '../img/logos/whiteBrand.png';

const Landing = () =>
  <Row className="h-100">
    <Row className="mt-auto mb-auto justify-content-center text-center">
      <Col md={12}>
        <Image src={whiteBrand} fluid/>
      </Col>
      <Col xs={4} md={2} lg={1} className="mt-auto mb-auto">
        <Link to='schedule'>
          <Button variant="outline-light">View Schedule</Button>
        </Link>
      </Col>
      <Col xs={4} md={2} lg={1} className="mt-auto mb-auto">
        <Link to='training'>
          <Button variant="outline-light">View Trainings</Button>
        </Link>
      </Col>
      <Col xs={4} md={2} lg={1} className="mt-auto mb-auto">
        <Link to='tools'>
          <Button variant="outline-light">View Tools</Button>
        </Link>
      </Col>
    </Row>
  </Row>

export default Landing;