import { useEffect, useState } from "react";
import { Container, Form, Row } from "react-bootstrap"

const Bugs = ({ user }) => {

  const [payload, setPayload] = useState({
    description: ""
  });

  const handleChange = () => { }

  return (
    <Container>
      <Form>
        <Form.Group as={Row}>
          <Form.Control value={payload.description} onChange={handleChange} />
        </Form.Group>
      </Form>
    </Container>
  )
}

export default Bugs