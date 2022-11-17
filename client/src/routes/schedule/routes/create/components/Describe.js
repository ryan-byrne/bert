import { useEffect, useState } from 'react'
import { Form, FloatingLabel, Row, ToggleButton, ToggleButtonGroup } from "react-bootstrap"
import { Link, useLocation } from 'react-router-dom';

export default function Describe({ payload, setPayload, search }) {

  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [locations, setLocations] = useState([]);

  const handlePayloadChange = (e) => setPayload({ ...payload, [e.target.id]: e.target.value });

  useEffect(() => {
    const params = new URLSearchParams(search)
    const tempSum = params.get('summary');
    const tempDes = params.get('description');
    const tempLoc = params.get('locations');
    setSummary( tempSum ? tempSum : "");
    setDescription( tempDes ? tempDes : "" );
    setLocations( tempLoc ? JSON.parse(tempLoc) : [] )
  }, [search]);
  
  useEffect(() => setPayload({...payload, summary, description, locations}), [summary, description, locations]);

  return (
    <Form.Group>
      <Form.Group>
        <FloatingLabel label="Summarize your Event">
          <Form.Control value={summary} id="summary" placeholder="Name Your Project" onChange={(e)=>setSummary(e.target.value)} />
        </FloatingLabel>
      </Form.Group>

      <Form.Group className="mt-3">
        <FloatingLabel label="Describe your Project (Optional)">
          <Form.Control value={description} id="description" as="textarea" placeholder="Describe Your Project" onChange={(e)=>setDescription(e.target.value)} />
        </FloatingLabel>
      </Form.Group>

      <Form.Group as={Row} className="mt-3">
        <ToggleButtonGroup type="checkbox" id="locations" value={payload.locations} onChange={(l) => setLocations(l)}>
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