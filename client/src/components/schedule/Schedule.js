import { useState, useEffect } from "react";
import { Col, Container, FormControl, FormSelect, Row, ToggleButton, ToggleButtonGroup, Card, OverlayTrigger, Table, FormLabel, Modal, Placeholder, Tooltip } from "react-bootstrap";
import {Query} from '../graphql/GraphQL'

import './style.css';

const calendars = {
    "classroom":{
      "calendar":"c_2l72cqq855fvcu8l0f35donqnc@group.calendar.google.com",
      "capacity":25
    },
    "machineshop":{
      "calendar":"c_cdm0jncrjj972nf6g6o6r2jhf4@group.calendar.google.com",
      "capacity":4
    },
    "powertool":{
      "calendar":"c_cdsr663bruijjo05637v89fh4k@group.calendar.google.com",
      "capacity":4
    }
  }

Date.prototype.toFormDateString = function(){
    return this.getFullYear() + "-" + (this.getMonth() + 1).toString().padStart(2, "0") + "-" + this.getDate().toString().padStart(2, "0")
}

Date.prototype.getWeek = function(){
    // TODO Change first day each year
    const firstDay = new Date( this.getFullYear(), 9, 5 );
    const milliseconds = this - firstDay; // How many milliseconds have passed
    return Math.ceil(milliseconds / 1000 / 60 / 60 / 24 / 7)
}

const MonthControls = ({user, locations, from, setFrom, events}) => {

    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    useEffect(()=>{
        const d = new Date(from);
        d.setDate(1);
        setFrom(d);
    },[setFrom]);

    const getMonths = () => {
        const d = new Date(from);
        let months = [];
        for (let i=0; i < 12; i++){
            const m = d.getMonth();
            months.push(month[m]);
            d.setMonth(m + 1);
        }
        return months
    }

    const getYears = () => {
        const d = new Date(from);
        let years = [];
        for ( let y = 2020; y < d.getFullYear()+3; y++ ) {
            years.push(y)
        }
        return years;
    }

    const handleMonthSelect = (e) => {
        const d = new Date(from);
        d.setHours(0,0,0,0);
        d.setMonth( e.target.value );
        d.setDate(1);
        setFrom(d);
    }

    const handleYearSelect = (e) => {
        const d = new Date(from);
        d.setHours(0,0,0,0);
        d.setFullYear( e.target.value );
        d.setDate(1);
        setFrom(d);
    }

    return (
        <div>
            <Row className="mt-3 justify-content-center">
                <Col xs={5} md={3} lg={2}>
                    <FormSelect onChange={handleMonthSelect} value={month[from.getMonth()]}>
                        {getMonths().map( (m, idx) => <option key={idx} value={month.indexOf(m)}>{m}</option> )}
                    </FormSelect>
                </Col>
                <Col xs={4} md={2}>
                    <FormSelect onChange={handleYearSelect} value={from.getFullYear()}>
                        {getYears().map( (m,idx) => <option key={idx}>{m}</option> )}
                    </FormSelect>
                </Col>
            </Row>

        </div>
    )
}

const WeekControls = ({user, locations, from, setFrom}) => {

    const [week, setWeek] = useState(51);
    const [weekOptions, setWeekOptions] = useState([]);

    useEffect(()=>{
        const d = new Date(weekOptions[week]);
        d.setDate( d.getDate() - d.getDay() + 1);
        d.setHours(0,0,0,0);
        setFrom(d);
    },[setFrom, week, weekOptions])

    useEffect(()=>{
        const d = new Date()
        let weeks = []
        d.setDate( d.getDate() - d.getDay() - 363);
        d.setHours(0,0,0,0);
        for (let i = -52; i < 52; i++){
            d.setDate( d.getDate() + 7 );
            weeks.push( new Date(d) )
        }
        setWeekOptions(weeks)
    },[setWeekOptions])

    return (
        <div>
            <Row className="mt-3 justify-content-center">
                <Col xs={3} md={2} lg={1} className="mt-auto mb-auto">
                    Week of:
                </Col>
                <Col xs={5} md={3} lg={2}>
                    <FormSelect value={week} onChange={(e) => setWeek(e.target.value)}>
                        {weekOptions.map( (d, idx) => <option key={idx} value={idx}>{d.toLocaleDateString()} ({d.getWeek()%2===0?'A':'B'})</option> )}
                    </FormSelect>
                </Col>
            </Row>
        </div>
    )
}

const DayControls = ({user, locations, from, setFrom}) => {

    const handleSelectDay = (e) => {
        const d = new Date(e.target.value);
        d.setHours(0,0,0,0);
        d.setDate( d.getDate() + 1 );
        setFrom(d);
    }

    return (
        <div>
            <Row className="mt-3 justify-content-center">
                <Col xs={6} md={3} lg={2}>
                    <FormControl type="date" value={from.toFormDateString()} onChange={handleSelectDay}/>
                </Col>
            </Row>
        </div>
    )
}

const Schedule = ({user}) => {

    const [interval, setInterval] = useState('w');
    const [locations, setLocations] = useState(['classroom','machineshop','powertool'])
    const [from, setFrom] = useState(new Date());
    const [events, setEvents] = useState([null, null, null, null, null]);

    const controls = {
        d:<DayControls {...{user, locations, from, setFrom, events}}/>,
        w:<WeekControls {...{user, locations, from, setFrom, events}}/>,
        m:<MonthControls {...{user, locations, from, setFrom, events}}/>
    }

    useEffect(()=>{
        const d = new Date();
        if (interval === 'm') d.setDate(1);
        else return
        setFrom(d);
        
    },[interval])

    useEffect(()=>{
        setEvents(new Array(interval === 'm'?31:interval==='w'?5:1).fill(0).map(e=>null));
        Query(`
        query ViewSchedule($interval:ScheduleInterval!, $start:String!,$locations:[EventLocation!]) {
            schedule(interval:$interval, start:$start,locations: $locations){
              day
              events {
                start {
                  dateTime
                }
                end {
                  dateTime
                }
                summary
                location
                htmlLink
              }
            }
          }
        `,{
            interval,
            locations,
            start: from.toLocaleDateString()
        })
            .then( resp => resp.json() )
            .then( data => {
                const {schedule} = data.data;
                const currentDate = new Date(from);
                const endDate = new Date(from);
                endDate.setDate( endDate.getDate() + (interval === 'm' ? 31 : interval === 'w' ? 5 : 1))
                let tempEvents = [];
                while ( currentDate < endDate ) {
                    if ( interval === 'm' && currentDate.getMonth() !== from.getMonth() ) break
                    else if ( ![0,6].includes(currentDate.getDay()) ){
                        const e = schedule.filter(d=>d.day===currentDate.getDate())[0]
                        tempEvents.push({
                            date:new Date(currentDate),
                            events:e?e.events:[]
                        })
                    }
                    currentDate.setDate( currentDate.getDate() + 1 )
                }
                setEvents(tempEvents);
            })
            .catch( err => {
                console.error(err);
                throw err
            } )
        return () => setEvents([null, null, null, null, null])
    },[from, locations, interval, setEvents]);

    const TimeTicks = () =>
        <div className="time-tick-container">
            {new Array(10).fill().map( (_,hr) => 
                <div key={hr} className="time-tick" style={{top:`${hr*30}px`}}>
                    {hr<5?hr+8:hr-4} {hr>3?'PM':'AM'}
                </div>
            )}
        </div>

    const EventBadge = ({event}) => {

        const startTime = new Date(event.start.dateTime);
        const endTime = new Date(event.end.dateTime);
        const startHour = startTime.getHours() + startTime.getMinutes()/60 - 8;
        const endHour = endTime.getHours() + endTime.getMinutes()/60 - 8;
        return(
            <OverlayTrigger
                trigger={['hover','focus']}
                overlay={<Tooltip>View in Google Calendar</Tooltip>}>
                <a
                    className={`event-badge event-badge-${event.location}`}
                    style={{top:`${startHour*30}px`, height:`${30*(endHour-startHour)}px`}}
                    href={event.htmlLink}
                    rel="noreferrer"
                    target="_blank"
                >
                    {event.summary}
                </a>
            </OverlayTrigger>
        )
    }

    const DayContainer = ({day}) =>
        <Card as={Col} bg="dark" className={`day-container m-3`}>
            <Card.Header>
                {
                    day ?
                    <Card.Title className="text-center">{day.date.toDateString().substring(0,10)}</Card.Title>:
                    <Placeholder as={Card.Title} animation="glow">
                        <Placeholder xs={6}/>
                    </Placeholder>
                }
            </Card.Header>
            <Card.Body>
                <TimeTicks/>
                <div className="events-container">
                    {!day?null:day.events.map( (e,idx) => <EventBadge key={idx} event={e}/>)}
                </div>
            </Card.Body>
        </Card>

    return (
        <Container>

            <Row className="mt-3">
                <ToggleButtonGroup 
                    size="sm"
                    type="checkbox" 
                    value={locations} 
                    onChange={(v)=>setLocations(v)}>
                    {[
                        ['Classroom Area', 'classroom'], 
                        ['Power Tool Area', 'powertool'], 
                        ['Machine Shop', 'machineshop']
                    ].map(([loc, id], idx)=>
                        <ToggleButton key={idx} variant="outline-light" id={idx} value={id}>{loc}</ToggleButton>
                    )}
                </ToggleButtonGroup>
            </Row>

            <Row className="mt-3">
                <ToggleButtonGroup
                    size="sm"
                    type="radio"
                    name="interval" 
                    value={interval} 
                    onChange={(v)=>setInterval(v)}>
                    {['Day','Week','Month'].map((int, idx)=>
                        <ToggleButton key={idx} variant="outline-light" id={int} value={int.substring(0,1).toLowerCase()}>{int}</ToggleButton>
                    )}
                </ToggleButtonGroup>
            </Row>

            {controls[interval]}

            <Row className="m-3" xl={6} md={3} xs={1}>
                {
                    events?
                    events.map( (day, idx) => <DayContainer key={idx} day={day}/>) :
                    new Array(interval === 'm'?31:interval==='w'?5:1).fill().map( (day, idx) => <DayContainer key={idx}/> )
                }
            </Row>

        </Container>
        
    )
    
    
}

export default Schedule