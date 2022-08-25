import { Form, FloatingLabel, Row, ToggleButton, ToggleButtonGroup } from "react-bootstrap"
import {Link} from 'react-router-dom';

export default ({options, payload, setOptions, setPayload}) => {

    const handlePayloadChange = (e) => setPayload({...payload, [e.target.id]:e.target.value});
    const handleOptionChange = (e) => setOptions({...options, [e.target.id]:e.target.value})

    return (
    <Form.Group>
        <Form.Group>
            <FloatingLabel label="Summarize your Event">
                <Form.Control required value={payload.summary} id="summary" placeholder="Name Your Project" onChange={handlePayloadChange}/>
            </FloatingLabel>
        </Form.Group>

        <Form.Group className="mt-3">
            <FloatingLabel label="Describe your Project (Optional)">
                <Form.Control value={payload.description} id="description" as="textarea" placeholder="Describe Your Project" onChange={handlePayloadChange}/>
            </FloatingLabel>
        </Form.Group>

        <Form.Group as={Row} className="mt-3">
            <ToggleButtonGroup type="checkbox" id="locations" value={payload.locations} onChange={(l)=>setPayload({...payload, locations:l})}>
                <ToggleButton value="classroom" variant="outline-primary" id={`space-btn-1`}>Classroom Area</ToggleButton>
                <ToggleButton value="powertool" variant="outline-primary" id={`space-btn-2`}>Power Tool Area</ToggleButton>
                <ToggleButton value="machineshop" variant="outline-primary" id={`space-btn-3`}>Machine Shop</ToggleButton>
            </ToggleButtonGroup>
            <div>
            <Link to="/locations" style={{textDecorationLine:"none"}}><Form.Text muted>Learn More</Form.Text></Link>
            </div>
        </Form.Group>

        <Form.Group className="mt-3">
            <FloatingLabel label="Date">
                <Form.Control type="date" id={`date`} value={options.date} onChange={handleOptionChange}/>
            </FloatingLabel>
        </Form.Group>

        <Form.Group as={Row} className="mt-3">
            <ToggleButtonGroup type="radio" value={options.blockTime} onChange={(b)=>setOptions({...options, blockTime:b})} name="blockTime">
                <ToggleButton value={false} id="type-btn-1" variant="outline-primary">
                    Time(s)
                </ToggleButton>
                <ToggleButton value={true} id="type-btn-2" variant="outline-primary">
                    Block(s)
                </ToggleButton>
            </ToggleButtonGroup>
        </Form.Group>
    </Form.Group>
    )
    
}