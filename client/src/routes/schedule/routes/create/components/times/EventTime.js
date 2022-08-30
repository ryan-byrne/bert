import { FormCheck, ToggleButton, FormSelect, Button, FormGroup, Row, FloatingLabel, FormControl, Col, FormText, Collapse, ToggleButtonGroup, CloseButton } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import SetBlocks from './Blocks';
import SetTime from './Times';
import Recurrence from './Recurrence';

const EventTime = (props) => {

  useEffect(() => props.handleChange({
    target:{
      id:`change-blocks-${props.index}`,
      value:[]
  }}), [props.time.useBlocks, props.time.division]);

  const handleToggle = (key, value) => props.handleChange({
    target:{
      id:`toggle-${key}-${props.index}`,
      value
    }
  })

  return (
    <FormGroup className="mt-3">

      <FormGroup as={Row}>
        <FormText>Select a Start Date</FormText>
        <FormControl type="date" value={props.time.date.toFormDateString()} id={`date-date-${props.index}`} onChange={props.handleChange}/>
      </FormGroup>

      <Row className="mt-3">
        <ToggleButtonGroup type="radio" value={props.time.useBlocks} onChange={(v)=>handleToggle('useBlocks', v)} name={`toggle-useBlocks-${props.index}`}>
            <ToggleButton value={false} id={`${props.index}-btn-1`} variant="outline-primary">
                Time
            </ToggleButton>
            <ToggleButton value={true} id={`${props.index}-btn-2`} variant="outline-primary">
                Block
            </ToggleButton>
        </ToggleButtonGroup>
      </Row>

      <Collapse in={!props.time.useBlocks}>
        <div>
          <SetTime {...props}/>
        </div>
      </Collapse>
      <Collapse in={props.time.useBlocks}>
        <div>
          <SetBlocks {...props} handleToggle={handleToggle} />
        </div>
      </Collapse>

      <Collapse in={![props.time.start, props.time.end].includes("") || props.time.blocks.length > 0}>
        <div>
          <Recurrence {...props} handleToggle={handleToggle}/>
        </div>
      </Collapse>
      

      <Row className="mt-3">
        <Button onClick={props.handleRemove} variant="outline-secondary">Remove</Button>
      </Row>
    
    </FormGroup>
  )
}

export default EventTime;