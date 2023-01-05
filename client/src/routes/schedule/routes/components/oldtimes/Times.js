import { FormGroup, Row, FloatingLabel, FormControl, Col } from 'react-bootstrap';

const Times = ({ index, time, handleChange }) => {

  return (
    <FormGroup className="mt-3" as={Row}>
      <FormGroup as={Col}>
        <FloatingLabel label="Start Time">
          <FormControl type="time" id={`time-start-${index}`} value={time.start} onChange={handleChange} />
        </FloatingLabel>
      </FormGroup>
      <FormGroup as={Col}>
        <FloatingLabel label="End Time">
          <FormControl type="time" id={`time-end-${index}`} value={time.end} onChange={handleChange} />
        </FloatingLabel>
      </FormGroup>
    </FormGroup>
  )
}

export default Times;