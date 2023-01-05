import { useEffect, useState } from 'react'
import { Form, FloatingLabel, Row, ToggleButton, ToggleButtonGroup } from "react-bootstrap"
import { Link, useLocation } from 'react-router-dom';

export default function Describe({ payload, setPayload, search, enabled }) {

  const handlePayloadChange = (e) => setPayload({ ...payload, [e.target ? e.target.id : 'locations']: e.target ? e.target.value : e });

  useEffect(() => {
    if (!search) return
    const params = new URLSearchParams(search)
    const summary = params.get('summary');
    const description = params.get('description');
    const locations = params.get('locations');
    setPayload({
      ...payload,
      summary:summary ? summary : "",
      description:description?description:"",
      locations:locations?locations:[]
    })
  }, [search]);
  
  return (
    <Form.Group>
      <Form.Group>
        <FloatingLabel label="Summarize your Event">
          <Form.Control disabled={!enabled} value={payload.summary} id="summary" placeholder="Name Your Project" onChange={handlePayloadChange} />
        </FloatingLabel>
      </Form.Group>

      <Form.Group className="mt-3">
        <FloatingLabel label="Describe your Project (Optional)">
          <Form.Control disabled={!enabled} value={payload.description} id="description" as="textarea" placeholder="Describe Your Project" onChange={handlePayloadChange} />
        </FloatingLabel>
      </Form.Group>

      <Form.Group as={Row} className="mt-3">
        <ToggleButtonGroup type="checkbox" id="locations" value={payload.locations} onChange={handlePayloadChange}>
          <ToggleButton value="classroom" variant="outline-primary" id={`space-btn-1`} disabled={!enabled}>Classroom Area</ToggleButton>
          <ToggleButton value="powertool" variant="outline-primary" id={`space-btn-2`} disabled={!enabled}>Power Tool Area</ToggleButton>
          <ToggleButton value="machineshop" variant="outline-primary" id={`space-btn-3`} disabled={!enabled}>Machine Shop</ToggleButton>
        </ToggleButtonGroup>
        <div>
          <Link to="/training/introduction" style={{ textDecorationLine: "none" }}><Form.Text muted>Learn More</Form.Text></Link>
        </div>
      </Form.Group>

    </Form.Group>
  )

}