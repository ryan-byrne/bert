import { useState, useEffect } from 'react';
import {  Button, FormGroup, Row } from 'react-bootstrap';

import EventTime from './times/EventTime';

Date.prototype.toFormDateString = function(){
  return this.getFullYear() + "-" + (this.getMonth() + 1).toString().padStart(2, "0") + "-" + this.getDate().toString().padStart(2, "0")
}

//  (Math.ceil((this - )/1000/60/60/24/7))%2===1?"B":"A"

const SetTimes = ({ setPayload, payload }) => {

  console.log(payload.times);

  const [times, setTimes] = useState([]);

  const handleAddTime = () => setTimes([...times, {
    date: new Date(), // 2022-08-01
    start: "", // 09:30
    end: "", // 10:30
    recurring: false,
    recurringWeekly: false,
    recurringUntil: new Date(), //
    division: "",
  }]);

  const handleChange = (e, index) => {

    const prevTimes = [...times]
    const [field, idx] = e.target.id.split("-");
    let value;
    if ( e.target.type === "select-one" ) {
      const [index, start, end] = e.target.value.split("-");
      prevTimes[index].start = start
      prevTimes[index].end = end
      setTimes(prevTimes)
      return
    } else if ( ["date", 'recurringUntil'].includes(field) ){
      const date = new Date(e.target.value);
      date.setDate( date.getDate() + 1 );
      date.setHours(0,0,0,0);
      value = date
    } else {
      value = e.target.value
    }
    prevTimes[idx][field] = value;
    setTimes(prevTimes)
  }

  const handleRemove = (index) => {
    const prevTimes = [...times]
    prevTimes.splice(index, 1)
    setTimes(prevTimes);
  }

  useEffect(() => setPayload({
    ...payload,
    times: times.map(time => {
      if ( [time.start, time.end].includes("") ) return null
      const start = new Date(time.date);
      const end = new Date(time.date);
      var [hr, min] = time.start.split(":");
      start.setHours(hr, min, 0, 0);
      var [hr, min] = time.end.split(":");
      end.setHours(hr, min, 0, 0);
      const until = time.recurringUntil.toISOString().replace(/[-:.]/g, '').split("T")[0]
      const recurrence = !time.recurring ? null : [
        `RRULE:FREQ=WEEKLY;UNTIL=${until};INTERVAL=${time.recurringWeekly ? 1 : 2 }`
      ]
      return ({ start:start.toISOString(), end:end.toISOString(), recurrence })
    }).filter(t=>t)
  }), [setPayload, times]);

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