import { useState, useEffect } from 'react';
import {  Button, FormGroup, Row } from 'react-bootstrap';
import { Query, SyncQuery } from '../../../../../components/GraphQL';

import EventTime from './times/EventTime';

Date.prototype.toFormDateString = function(){
  return this.getFullYear() + "-" + (this.getMonth() + 1).toString().padStart(2, "0") + "-" + this.getDate().toString().padStart(2, "0")
}

//  (Math.ceil((this - )/1000/60/60/24/7))%2===1?"B":"A"

const SetTimes = ({ setPayload, payload }) => {
  
  const [times, setTimes] = useState([{
    date: new Date(), // 2022-08-01
    start: "", // 09:30
    end: "", // 10:30
    division:"upper",
    useBlocks:true,
    blocks:[],
    recurring: false,
    recurringWeekly: false,
    recurringUntil: new Date(), //
  }]);


  const handleAddTime = () => setTimes([...times, {
    date: new Date(), // 2022-08-01
    start: "", // 09:30
    end: "", // 10:30
    division:"",
    useBlocks:false,
    blocks:[],
    recurring: false,
    recurringWeekly: false,
    recurringUntil: new Date(), //
  }]);

  const handleChange2 = (key, value, index) => {
    var prevTimes = [...times]
    prevTimes[index][key] = value
    setTimes(prevTimes)
  }

  const handleChange = (event) => {

    const prevTimes = [...times]
    const [type, key, index] = event.target.id.split("-");
    let value;

    if ( type === 'date' ){
      const date = new Date(event.target.value);
      date.setDate( date.getDate() + 1 );
      date.setHours(0,0,0,0);
      value = date
    }

    else if ( type === 'switch' ) {
      value = event.target.checked
    }

    else if ( type === 'msblocks' ) {
      let msblocks = []
      for ( const option of event.target.selectedOptions ) {
        msblocks.push(option.value)
      }
      value = msblocks
    }

    else {
      value = event.target.value
    }

    prevTimes[index][key] = value
    setTimes(prevTimes)

  }

  const handleRemove = (index) => {
    const prevTimes = [...times]
    prevTimes.splice(index, 1)
    setTimes(prevTimes);
  }

  useEffect(() => {

    const getRecurrence = (time) => {
      const until = time.recurringUntil.toISOString().replace(/[-:.]/g, '').split("T")[0]
      return !time.recurring ? null : [
        `RRULE:FREQ=WEEKLY;UNTIL=${until};INTERVAL=${time.recurringWeekly ? 1 : 2 }`
      ]
    }

    setPayload((payload)=>({...payload, times:[]}));

    for ( const time of times) {

      if ( !time.useBlocks ) {

        if ( [time.start, time.end].includes("") ) {}
        else {

          const start = new Date(time.date);
          const end = new Date(time.date);
          var [hr, min] = time.start.split(":");
          start.setHours(hr, min, 0, 0);
          var [hr, min] = time.end.split(":");
          end.setHours(hr, min, 0, 0);
          setPayload(payload=>({...payload, times:[...payload.times, {
            start, end, recurrence:getRecurrence(time)
          }]}))
        }

      } else {

        if ( time.division === 'middle' ) {

          for ( const block of time.blocks ) { 
            const start = new Date(time.date)
            const end = new Date(time.date);
            let [_, startTime, endTime] = block.split("-");
            var [hr, min] = startTime.split(":");
            start.setHours(hr, min, 0 ,0);
            var [hr, min] = endTime.split(":");
            end.setHours(hr, min, 0 ,0);
            setPayload(payload=>({...payload, times:[...payload.times, {
              start, end, recurrence:getRecurrence(time)
            }]}))
          }
        } 
        
        else if ( time.division === 'upper' ) {
          Query(`
          query GetCalendar($blocks: [String]!, $start: Date!, $end: Date!) {
            getBlockTimes(blocks: $blocks, start: $start, end: $end) {
              start
              end
            }
          }
          `,{ blocks:time.blocks, start: time.date, end:time.recurringUntil })
            .then( resp => resp.json()
            .then( data => {
              const newTimes = data.data.getBlockTimes.map( t => ({...t, recurrence:getRecurrence(time)}) )
              setPayload((payload)=>({...payload, times:[...payload.times, ...newTimes]}))
            }))
        }

      }
    }

  }, [times]);

  return (
    <FormGroup className="mt-3">
      {times.map((time, idx) => 
        <EventTime index={idx} time={time} handleChange={handleChange} handleRemove={handleRemove}/>
      )}
      <Row className="mt-3">
        <Button onClick={handleAddTime}>Add Time(s)</Button>
      </Row>
      <hr/>
    </FormGroup>
  )
}

export default SetTimes