import { useEffect } from 'react';
import { FormCheck, ToggleButton, FormSelect, Button, FormGroup, Row, FloatingLabel, FormControl, Col, FormText, Collapse, ToggleButtonGroup, CloseButton } from 'react-bootstrap';

export default function Recurrence(props){

  const {recurring, recurringWeekly, recurringUntil, useBlocks, division, date} = props.time

  useEffect(()=>{
    if ( useBlocks && division === 'upper' ){
        const start = new Date(props.time.date);
        start.setDate( start.getDate() + 13 );
        props.handleChange({
            target:{
                id:`newdate-recurring-${props.index}`,
                value:true
            }
        })
        props.handleChange({
            target:{
                id:`newdate-recurringWeekly-${props.index}`,
                value:false
            }
        })
    }
  },[useBlocks, division, date])

  return(        
    <FormGroup className="mt-3">
        <FormGroup as={Row} className="justify-content-center">
            <Col xs={2}>
                <FormCheck
                    disabled={useBlocks && division === 'upper'}
                    type="switch" 
                    id={`switch-recurring-${props.index}`} 
                    checked={recurring} 
                    onChange={props.handleChange}/>
            </Col>
            <Col xs={3}>
                <FormText>Recurring</FormText>
            </Col>
        </FormGroup>
        <Collapse in={recurring}>
            <FormGroup>
                <FormGroup as={Row} className="mt-3">
                    <ToggleButtonGroup 
                        type="radio"
                        name={`weekly-${props.index}`} 
                        id={`switch-recurringWeekly-${props.index}`} 
                        value={recurringWeekly} 
                        onChange={(v)=>props.handleToggle('recurringWeekly', v)}>
                        {['Weekly', 'Bi-Weekly'].map((weekly, widx)=>
                            <ToggleButton
                                disabled={useBlocks && division === 'upper'} 
                                id={`weekly-btn-${widx}-${props.index}`} 
                                variant="outline-primary" 
                                value={weekly==="Weekly"}>
                                    {weekly}
                            </ToggleButton>
                        )}
                    </ToggleButtonGroup>
                </FormGroup>
                <FormGroup as={Row} className="mt-3">
                    <Col>
                    <FloatingLabel label="Until">
                        <FormControl type="date" id={`date-recurringUntil-${props.index}`} value={recurringUntil.toFormDateString()} onChange={props.handleChange}/>
                    </FloatingLabel>
                    </Col>
                </FormGroup>
            </FormGroup>
        </Collapse>
    </FormGroup>
  )
}

