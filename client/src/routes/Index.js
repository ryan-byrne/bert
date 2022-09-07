import { Col, Row, Image, Button, ButtonGroup, DropdownButton, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import whiteBrand from '../img/logos/whiteBrand.png';

const Landing = () =>
  <Row className="h-100">
    <Row className="mt-auto mb-auto justify-content-center">
      <Col xs={6} className="text-left">
        <h1>Welcome to...</h1>
      </Col>
      <Col xs={12} className="text-center">
        <Image src={whiteBrand} fluid/>
      </Col>
      <Col xs={3} className="text-center">
        <Button as={Link} to="getting-started" variant="outline-light">
          Getting Started
        </Button>
      </Col>
      <Col xs={3} className="text-center">
        <DropdownButton title="Jump to..." variant="outline-light">
          <Dropdown.Item as={Link} to="/schedule">Schedule</Dropdown.Item>
          <Dropdown.Item as={Link} to="/training">Trainings</Dropdown.Item>
          <Dropdown.Item as={Link} to="/tools">Tools</Dropdown.Item>
        </DropdownButton>
      </Col>
    </Row>
  </Row>

export default Landing;