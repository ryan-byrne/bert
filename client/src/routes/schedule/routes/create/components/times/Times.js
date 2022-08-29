import { FormCheck, ToggleButton, FormSelect, Button, FormGroup, Row, FloatingLabel, FormControl, Col, FormText, Collapse, ToggleButtonGroup, CloseButton } from 'react-bootstrap';

const Times = (props) => {

  return(
    <FormGroup className="mt-3" as={Row}>
      <FormGroup as={Col}>
          <FloatingLabel label="Start Time">
              <FormControl type="time" id={`start-${props.index}`} value={props.time.start} onChange={props.handleChange}/>
          </FloatingLabel>
      </FormGroup>
      <FormGroup as={Col}>
          <FloatingLabel label="End Time">
              <FormControl type="time" id={`end-${props.index}`} value={props.time.end} onChange={props.handleChange}/>
          </FloatingLabel>
      </FormGroup>
  </FormGroup>
  )
}

export default Times;