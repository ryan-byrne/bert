import { useState, useEffect } from 'react';
import {  Button, Collapse, FormGroup, FormText, Row } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { Query } from '../../../../../components/GraphQL';

import EventTime from './times/EventTime';

Date.prototype.toFormDateString = function(){
  return this.getFullYear() + "-" + (this.getMonth() + 1).toString().padStart(2, "0") + "-" + this.getDate().toString().padStart(2, "0")
}

const getWeek = (date) => {
  // TODO Change first day each year
  const firstDay = new Date(date.getFullYear(), 0, 1);
  const milliseconds = date - firstDay; // How many milliseconds have passed
  return Math.ceil(milliseconds / 1000 / 60 / 60 / 24 / 7) % 2 === 1 ? 'B' : 'A'
}

const SetTimes = ({ setPayload, payload, search }) => {
  
  const [times, setTimes] = useState([]);
  const [show, setShow] = useState(false);

  // Parse Query parameters and change payload
  useEffect(() => {
    const params = new URLSearchParams(search);
    const startTime = params.get('startTime');
    const endTime = params.get('endTime');
    if (!startTime || !endTime) return
    else {
      const start = new Date(startTime);
      const end = new Date(endTime);
      setTimes([{
        date: start,
        start:start.toTimeString().substring(0,5),
        end:end.toTimeString().substring(0,5),
        division:"",
        useBlocks:false,
        blocks:[],
        recurring: false,
        recurringWeekly: false,
        recurringUntil: start
      }])
    }
    
  }, [search]);

  // Hook for updating Times payload
  useEffect(() => {

    const getRecurrence = (time) => {
      const until = time.recurringUntil.toISOString().replace(/[-:.]/g, '').split("T")[0]
      return !time.recurring ? null : [
        `RRULE:FREQ=WEEKLY;UNTIL=${until};INTERVAL=${time.recurringWeekly ? 1 : 2 }`
      ]
    }

    setPayload({...payload, times:[]});

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

          const {blocks, date, recurringUntil} = time;

          Query(`
          query Blocks($division: [Division!], $day: [String!], $week: [String!], $name: [String!]) {
            blocks(division: $division, day: $day, week: $week, name: $name) {
              name
              start
              end
              week
              day
            }
          }
          `,{
            division:['upper'],
            name:blocks
          })
            .then(resp => resp.json())
            .then(result => {
              const foundBlocks = result.data.blocks;
              const start = new Date(date);
              const end = new Date(recurringUntil);
              let times = [];
              if (start > end) return
              else while (start < end) {

                const todaysBlocks = foundBlocks.filter(b=>
                  b.week===getWeek(start) && 
                  b.day===['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'][start.getDay()]
                );
                
                for (const block of todaysBlocks){

                  const blockStart = new Date(start);
                  const [shr, smin] = block.start.split(":");
                  blockStart.setHours(shr, smin, 0, 0);

                  const blockEnd = new Date(start);
                  const [hr, min] = block.end.split(":");
                  blockEnd.setHours(hr, min, 0, 0);

                  times.push({
                    start:new Date(blockStart),
                    end:new Date(blockEnd),
                    recurrence:getRecurrence(time)
                  })
                }

                start.setDate( start.getDate() + 1 )
              }
              setPayload({...payload, times})
            })
            .catch(err=>console.error(err))
        }

      }
    }

  }, [times]);

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

  return (
    <div className="mt-3">
      <Row className="mt-3">
        <Button onClick={()=>setShow(!show)} variant={show ? "outline-primary" : "primary"}>
          {show ? "Hide" : "Show"} Times ({payload.times.length} Added)
        </Button>
      </Row>
      <Collapse in={show}>
        <FormGroup>
          {times.map((time, idx) => 
            <EventTime index={idx} time={time} handleChange={handleChange} handleRemove={handleRemove}/>
          )}
          <Row className="mt-3">
            <Button onClick={handleAddTime} variant="outline-success">Add Time</Button>
          </Row>
        </FormGroup>
      </Collapse>
      <hr/>
    </div>
  )
}

export default SetTimes