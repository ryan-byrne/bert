import { useState, useEffect } from "react";
import { Button, Col, Container, Row, ToggleButton, ToggleButtonGroup} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {Query} from '../../components/GraphQL'
import DayCard from './components/DayCard';
import {Day, Week, Month} from "./components/Controls";
import Create from "./routes/create/Create";

import './style.css';

Date.prototype.toFormDateString = function(){
    return this.getFullYear() + "-" + (this.getMonth() + 1).toString().padStart(2, "0") + "-" + this.getDate().toString().padStart(2, "0")
}

Date.prototype.getWeek = function(){
    // TODO Change first day each year
    const firstDay = new Date( this.getFullYear(), 9, 5 );
    const milliseconds = this - firstDay; // How many milliseconds have passed
    return Math.ceil(milliseconds / 1000 / 60 / 60 / 24 / 7)
}

export default function Schedule({create}){

    const [interval, setInterval] = useState('w');
    const [locations, setLocations] = useState(['classroom','machineshop','powertool'])
    const [from, setFrom] = useState(new Date());
    const [events, setEvents] = useState([null, null, null, null, null]);
    const navigate = useNavigate();

    const controls = {
        d:<Day {...{from, setFrom}}/>,
        w:<Week {...{from, setFrom}}/>,
        m:<Month {...{from, setFrom}}/>
    }

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

            <Row className="mt-3 text-center">
                <Col> 
                    <Link to="/schedule/create" className="text-light">
                        Create an Event
                    </Link>
                </Col>
            </Row>

            <Row className="m-3 justify-content-center" xl={6} md={3} xs={1}>
                {
                    events?
                    events.map( (day, idx) => <DayCard key={idx} day={day}/>) :
                    new Array(interval === 'm'?31:interval==='w'?5:1).fill().map( (day, idx) => <DayCard key={idx}/> )
                }
            </Row>

            <Create show={create} onHide={()=>navigate('/schedule')}/>

        </Container>
        
    )
    
    
}