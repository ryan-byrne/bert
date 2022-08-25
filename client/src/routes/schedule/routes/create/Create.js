import { useEffect, useState,useReducer } from "react";
import { Form, Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Query } from "../../../../components/GraphQL";
import SetBlocks from "./components/SetBlocks";
import SetRecurring from "./components/SetRecurring";
import SetTimes from "./components/SetTimes";
import SetTools from "./components/SetTools";
import SetInfo from "./components/SetInfo";
import Submit from "./components/Submit";

Date.prototype.toFormDateString = () =>
    this.getFullYear() + "-" + (this.getMonth() + 1).toString().padStart(2, "0") + "-" + this.getDate().toString().padStart(2, "0")

export default ({show, onHide}) => {

    const [payload, setPayload] = useState({
        summary:"Test Event",
        description:"",
        times:[],
        locations:['classroom'],
        recurrence:null,
        tools:[],
        attendees:[]
    });
    const [options, setOptions] = useState({
        blockTime:true,
        division:"middle",
        date:"2022-08-23",
        recurring:true,
        recurringWeekly:false,
        recurringUntil:'2022-10-06',
        recurringDays:[0,1],
        times:[{start:"08:30",end:"13:50"}]
    });

    // TODO URL Params

    useEffect(()=> {

        // RECURRING
        let recurrence;
        if (options.recurring){
            const days = ['MO','TU','WE','TH','FR']
            const until = options.recurringUntil.replace(/[-:.]/g,'')
            const interval = options.recurringWeekly ? 1 : 2
            const byDay = options.recurringDays.length === 0 ? null : 
                `BYDAY=${options.recurringDays.map( d=>`${days[d]}`).join(',')}`
            
                recurrence = [
                `RRULE:FREQ=WEEKLY;UNTIL=${until};INTERVAL=${interval};${byDay}`
            ]
        } else {
            recurrence = null
        }

        // TIMES
        let times;
        if (options.date === "") {
            times = []
        } else {
            const date = new Date(options.date)
            date.setDate( date.getDate() + 1 )
            
            times = options.times.map( time => {
                if ( [time.start, time.end].includes("") ) return
                // Iterate through blocks or times
                const start = new Date(date);
                var [hr, min] = time.start.split(":");
                start.setHours(hr, min, 0, 0)
                const end = new Date(date);
                var [hr, min] = time.end.split(":");
                end.setHours(hr, min, 0, 0)
                return ({
                    start:start.toISOString(), 
                    end:end.toISOString()
                })
            }).filter(t=>t)
        }

        setPayload({...payload, times, recurrence});

    },[setPayload, options]);

    return(
        <Offcanvas show={show} onHide={onHide}>
            <Offcanvas.Header>
                <Offcanvas.Title>
                    Create an Event
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Form>

                    <SetInfo options={options} setOptions={setOptions} payload={payload} setPayload={setPayload}/>
                    <hr/>
                    <SetTimes options={options} setOptions={setOptions}/>
                    <SetBlocks options={options} setOptions={setOptions}/>
                    <hr/>
                    <SetRecurring options={options} setOptions={setOptions}/>
                    <hr/>
                    <SetTools times={payload.times}/>
                    <hr/>
                    <Submit payload={payload} options={options}/>

                </Form>
            </Offcanvas.Body>
            
        </Offcanvas>
    )
}