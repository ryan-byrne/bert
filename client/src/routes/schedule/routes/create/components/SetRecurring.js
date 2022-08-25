import {Form, Collapse, ToggleButton, ToggleButtonGroup, Row, Col, FloatingLabel} from 'react-bootstrap'

export default ({setOptions, options}) => {

    return(
        <Form.Group className="mt-3">
            <Form.Group as={Row} className="justify-content-center">
                <Col xs={2}>
                    <Form.Check type="switch" checked={options.recurring} onChange={(e)=>setOptions({...options, recurring:e.target.checked})}/>
                </Col>
                <Col xs={3}>
                    <Form.Text>Recurring</Form.Text>
                </Col>
            </Form.Group>
            <Collapse in={options.recurring}>
                <Form.Group>
                    <Form.Group as={Row} className="mt-3">
                        <ToggleButtonGroup type="checkbox" name="days" value={options.recurringDays} onChange={(d)=>setOptions({...options, recurringDays:d})}>
                            {['M', 'T', 'W', 'Th', 'F'].map((day, didx)=>
                                <ToggleButton id={`day-btn-${didx}`} value={didx} variant="outline-primary">{day}</ToggleButton>
                            )}
                        </ToggleButtonGroup>
                    </Form.Group>
                    <Form.Group as={Row} className="mt-3">
                        <ToggleButtonGroup type="radio" name="weekly" value={options.recurringWeekly} onChange={(w)=>setOptions({...options, recurringWeekly:w})}>
                            {['Weekly', 'Bi-Weekly'].map((weekly, widx)=>
                                <ToggleButton id={`weekly-btn-${widx}`} variant="outline-primary" value={weekly==="Weekly"}>{weekly}</ToggleButton>
                            )}
                        </ToggleButtonGroup>
                    </Form.Group>
                    <Form.Group as={Row} className="mt-3">
                        <Col>
                        <FloatingLabel label="Until">
                            <Form.Control type="date" id="recurringUntil" value={options.recurringUntil} onChange={(e)=>setOptions({...options, recurringUntil:e.target.value})}/>
                        </FloatingLabel>
                        </Col>
                    </Form.Group>
                </Form.Group>
            </Collapse>
        </Form.Group>
    )
}