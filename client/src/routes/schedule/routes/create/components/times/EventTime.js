import { FormCheck, ToggleButton, FormSelect, Button, FormGroup, Row, FloatingLabel, FormControl, Col, FormText, Collapse, ToggleButtonGroup, CloseButton } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import SetBlocks from './Blocks';
import SetTime from './Times';
import Recurrence from './Recurrence';

const EventTime = (props) => {

  const [block, setBlock] = useState();

  return (
    <FormGroup className="mt-3">

      <FormGroup as={Row}>
        <FormText>Select a Date</FormText>
        <FormControl type="date" value={props.time.date.toFormDateString()} id={`date-${props.index}`} onChange={props.handleChange}/>
      </FormGroup>

      <Row className="mt-3">
        <ToggleButtonGroup type="radio" value={block} onChange={(v)=>setBlock(v)} name={`block-${props.index}`}>
            <ToggleButton value={false} id={`${props.index}-btn-1`} variant="outline-primary">
                Time
            </ToggleButton>
            <ToggleButton value={true} id={`${props.index}-btn-2`} variant="outline-primary">
                Block
            </ToggleButton>
        </ToggleButtonGroup>
      </Row>

      <Collapse in={block === false}>
        <div>
          <SetTime {...props}/>
        </div>
      </Collapse>
      <Collapse in={block === true}>
        <div>
          <SetBlocks {...props}/>
        </div>
      </Collapse>

      <Collapse in={![props.time.start, props.time.end].includes("")}>
        <div>
          <Recurrence {...props}/>
        </div>
      </Collapse>
      

      <Row className="mt-3">
        <Button onClick={props.handleRemove} variant="outline-secondary">Remove</Button>
      </Row>
    
    </FormGroup>
  )
}

export default EventTime;