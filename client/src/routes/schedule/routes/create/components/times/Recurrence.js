import { FormCheck, ToggleButton, FormSelect, Button, FormGroup, Row, FloatingLabel, FormControl, Col, FormText, Collapse, ToggleButtonGroup, CloseButton } from 'react-bootstrap';

export default function Recurrence(props){

  const {recurring, recurringWeekly, recurringUntil} = props.time

  const handleChange = (value, id) => {

    const [type, _] = id.split("-");

    let e = {
      target:{
        id,
        value: type === 'recurring' ? value.target.checked : value
      }
    }
    props.handleChange(e);
  }

  return(        
    <FormGroup className="mt-3">
        <FormGroup as={Row} className="justify-content-center">
            <Col xs={2}>
                <FormCheck type="switch" id={`recurring-${props.index}`} checked={recurring} onChange={(v)=>handleChange(v, `recurring-${props.index}`)}/>
            </Col>
            <Col xs={3}>
                <FormText>Recurring</FormText>
            </Col>
        </FormGroup>
        <Collapse in={recurring}>
            <FormGroup>
                <FormGroup as={Row} className="mt-3">
                    <ToggleButtonGroup type="radio" name={`weekly-${props.index}`} id={`recurringWeekly-${props.index}`} value={recurringWeekly} onChange={(v)=>handleChange(v, `recurringWeekly-${props.index}`)}>
                        {['Weekly', 'Bi-Weekly'].map((weekly, widx)=>
                            <ToggleButton id={`weekly-btn-${widx}-${props.index}`} variant="outline-primary" value={weekly==="Weekly"}>{weekly}</ToggleButton>
                        )}
                    </ToggleButtonGroup>
                </FormGroup>
                <FormGroup as={Row} className="mt-3">
                    <Col>
                    <FloatingLabel label="Until">
                        <FormControl type="date" id={`recurringUntil-${props.index}`} value={recurringUntil.toFormDateString()} onChange={props.handleChange}/>
                    </FloatingLabel>
                    </Col>
                </FormGroup>
            </FormGroup>
        </Collapse>
    </FormGroup>
  )
}

