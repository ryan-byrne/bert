import { useEffect } from 'react'
import { Form, FloatingLabel, Row, ToggleButton, ToggleButtonGroup } from "react-bootstrap"
import { Link, useLocation } from 'react-router-dom';

export default function Describe({ payload, setPayload }) {

  const handlePayloadChange = (e) => setPayload({ ...payload, [e.target.id]: e.target.value });

  const search = useLocation().search
  const params = new URLSearchParams(search);
  useEffect(() => {
    const tempSum = params.get('summary');
    const tempDes = params.get('description');
    if ( tempSum ) setPayload({...payload, summary:tempSum})
    if ( tempDes ) setPayload({...payload, description:tempDes})
  }, [params, setPayload]);

  return (
    <Form.Group>
      <Form.Group>
        <FloatingLabel label="Summarize your Event">
          <Form.Control value={payload.summary} id="summary" placeholder="Name Your Project" onChange={handlePayloadChange} />
        </FloatingLabel>
      </Form.Group>

      <Form.Group className="mt-3">
        <FloatingLabel label="Describe your Project (Optional)">
          <Form.Control value={payload.description} id="description" as="textarea" placeholder="Describe Your Project" onChange={handlePayloadChange} />
        </FloatingLabel>
      </Form.Group>

      <Form.Group as={Row} className="mt-3">
        <ToggleButtonGroup type="checkbox" id="locations" value={payload.locations} onChange={(l) => setPayload({ ...payload, locations: l })}>
          <ToggleButton value="classroom" variant="outline-primary" id={`space-btn-1`}>Classroom Area</ToggleButton>
          <ToggleButton value="powertool" variant="outline-primary" id={`space-btn-2`}>Power Tool Area</ToggleButton>
          <ToggleButton value="machineshop" variant="outline-primary" id={`space-btn-3`}>Machine Shop</ToggleButton>
        </ToggleButtonGroup>
        <div>
          <Link to="/training/introduction" style={{ textDecorationLine: "none" }}><Form.Text muted>Learn More</Form.Text></Link>
        </div>
      </Form.Group>

    </Form.Group>
  )

}