import { Offcanvas, Form, Row, Col, Button, FloatingLabel, ToggleButtonGroup, ToggleButton, Collapse, CloseButton, Alert, Spinner, OverlayTrigger, Popover, ListGroup, Badge, ButtonGroup } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import book1 from './img/book1.png';
import book2 from './img/book2.png';
import book3 from './img/book3.png';

import '../../styles/schedule.css';

const weekdays = ['Monday','Tuesday','Wednesday','Thursday','Friday'];
const months = ['January', 'February', 'March','April','May','June','July','August','September','October','November','December']

const defaultStatus = {
    type:"",
    division:"", 
    recurring:"", 
    times:[{start:new Date(), end: new Date()}], 
    blockOptions:[],
    weeks:[], 
    weekly:true, 
    days:[], 
    blocks:[],
    selectedBlock:0,
    recurringStart:new Date(),
    recurringStartTime:"08:00",
    recurringEnd:new Date(),
    recurringEndTime:"09:00",
}

const defaultPayload = {
    name:"", 
    description:"", 
    times:[], 
    status:"requested", 
    spaces:[],
    requested_on:new Date()
}

const spaceStyles = {
    "power-tool-area":"warning",
    "classroom-area":"primary",
    "machine-shop":"secondary"
}

const middleSchoolTimes = [
    ["08:30","08:45"],
    ['08:50',"09:40"],
    ['09:45','10:00'],
    ['10:05','10:55'],
    ['11:00','11:50'],
    ['11:55','12:45'],
    ['12:50','13:40'],
    ['13:45','14:35'],
    ['14:40','15:30']
]

const upperSchoolSchedule = [
    ["08:30","09:40"],
    ["09:45","10:55"],
    ["11:00","11:45"],
    ["11:50","12:35"],
    ["12:40","13:25"],
    ["13:30","14:40"],
    ["14:45","15:30"]
]

const upperSchoolBlocks = [
    [
        ['E2','G','CC','C1','C1','A1','PE'],
        ['B1','F1','Ad','D2','D2','E1','H1'],
        ['H2', 'C2', 'G', 'A2', 'A2', 'D1', 'PE'],
        ['F2', 'D2', 'Aff', 'B1', 'B1', 'C1', 'E2'],
        ['A2', 'H1', 'SS', 'F1', 'F1', 'B2', 'OH']
    ],[
        ['H2', 'F2', 'MM', 'D1', 'D1', 'B1', 'PE'],
        ['A1', 'E1', 'GM', 'C2', 'C2', 'F1', 'H2'],
        ['G', 'D2', 'PEER', 'B2', 'B2', 'C1', 'PE'],
        ['E2', 'C2', 'CT', 'A1', 'A1', 'D1', 'F2'],
        ['B2', 'H1', 'SS', 'E1', 'E1', 'A2', 'OH']
    ]
]

Date.prototype.toFormDateString = function(){
    return this.getFullYear() + "-" + (this.getMonth() + 1).toString().padStart(2, "0") + "-" + this.getDate().toString().padStart(2, "0")
}

Date.prototype.toFormTimeString = function(){
    return this.getHours().toString().padStart(2, "0") + ":" + this.getMinutes().toString().padStart(2, "0")
}

const schedules = {
    middle:{
        times:[
            ["08:30","08:40"],
            ["08:40","09:30"],
            ["09:30","10:20"],
            ["10:20","10:30"],
            ["10:30","11:20"],
            ["11:20","12:10"],
            ["12:10","13:00"],
            ["13:00","13:50"],
            ["13:50","14:40"],
            ["14:40","15:20"]
        ],
        A:[
            ["Homeroom", "Period 1", "Period 2", "Break", "Period 3", "Period 4 (5/6 Lunch)", "Period 5 (7/8 Lunch)", "Period 6", "Period 7", "Advising"],
            ["Homeroom", "Period 1", "Period 2", "Break", "Period 3", "Period 4 (5/6 Lunch)", "Period 5 (7/8 Lunch)", "Period 6", "Period 7", "Study Hall"],
            ["Homeroom", "Period 1", "Period 2", "Break", "Period 3", "Period 4 (5/6 Lunch)", "Period 5 (7/8 Lunch)", "Period 6", "Period 7", "Elective"],
            ["Homeroom", "Period 1", "Period 2", "Break", "Period 3", "Period 4 (5/6 Lunch)", "Period 5 (7/8 Lunch)", "Period 6", "Period 7", "Affinity"],
            ["Homeroom", "Period 1", "Period 2", "Break", "Period 3", "Period 4 (5/6 Lunch)", "Period 5 (7/8 Lunch)", "Period 6", "Period 7", "Elective"],
        ],
        B:[
            ["Homeroom", "Period 1", "Period 2", "Break", "Period 3", "Period 4 (5/6 Lunch)", "Period 5 (7/8 Lunch)", "Period 6", "Period 7", "Elective"],
            ["Homeroom", "Period 1", "Period 2", "Break", "Period 3", "Period 4 (5/6 Lunch)", "Period 5 (7/8 Lunch)", "Period 6", "Period 7", "Study Hall"],
            ["Homeroom", "Period 1", "Period 2", "Break", "Period 3", "Period 4 (5/6 Lunch)", "Period 5 (7/8 Lunch)", "Period 6", "Period 7", "Elective"],
            ["Homeroom", "Period 1", "Period 2", "Break", "Period 3", "Period 4 (5/6 Lunch)", "Period 5 (7/8 Lunch)", "Period 6", "Period 7", "Affinity"],
            ["Homeroom", "Period 1", "Period 2", "Break", "Period 3", "Period 4 (5/6 Lunch)", "Period 5 (7/8 Lunch)", "Period 6", "Period 7", "Elective"],
        ]
    },
    upper:{
        times:[
            ["08:30","09:45"],
            ["09:45","10:30"],
            ["10:30","11:20"],
            ["11:20","12:35"],
            ["12:35","13:25"],
            ["13:25","14:40"],
            ["14:40","15:30"],
        ],
        A:[
            ["A1", "Grade Meeting / Advising", "B1", 'H1', 'Lunch', 'C1', 'G'],
            ["C2", "FLEX", "E2", 'H2', 'Lunch', 'F2', 'D2'],
            ['D1', 'Affinity','F1', 'B2', 'Lunch', 'A2', 'PE'],
            ['F2', 'Senior Speakers','A1', 'D2', 'Lunch', 'E1', 'C1'],
            ['E2', 'CoCurriculars','H1', 'G', 'Lunch', 'B1', 'PE']
        ],
        B:[
            ['D1','Peer','E1','G','Lunch','F1',''],
            ['C2','Grade Meeting / Advising','A2','H2','Lunch','B2','F2'],
            ['A1','Grade Meeting / Advising','D1','H1','Lunch','C1','PE'],
            ['E2','J/P/A','C2','D2','Lunch','A2','B2'],
            ['B1','Morning Meeting','H2','F1','Lunch','E1','PE']
        ]
    }
}

const getWeek = (date) => (Math.ceil((date - new Date(date.getFullYear(),0, 1))/1000/60/60/24/7))%2===1?"B":"A";

/*

TODO:

    * Actually edit entries

*/
const View = ({user, projectId, handleHide}) => {

    const [meetingData, setMeetingData] = useState({requested_by:{}, requested_on:new Date(), spaces:[], times:[]});
    const [initialData, setInitialData] = useState({});
    const [payload, setPayload] = useState({});
    const [message, setMessage] = useState({variant:"", content:""});
    const [editing, setEditing] = useState(false);
    const [editingTime, setEditingTime] = useState(-1);

    useEffect(()=>{
        if(!projectId){
            return
        }
        setMessage({variant:"primary", content:<span><Spinner animation="grow" size="sm"/> Loading meeting data...</span>})
        user.mongoClient("mongodb-atlas").db("betty").collection("meetings").find({_id:{$oid:projectId}})
            .then(resp=>{
                setMessage(resp[0]?{variant:"",content:""}:{variant:"warning", content:"Unable to find project."});
                setMeetingData(resp[0]);
                setInitialData(resp[0]);
            })
            .catch( err =>  setMessage({variant:"danger", content:`Invalid Project ID`}))
    },[user, projectId])

    const handleChange = (e) => {
        // Add key to payload and update meeting data
    }

    const handleReset = () => {
        setMeetingData(initialData);
        setEditing(false);
        setPayload({});
    }

    const handleTimeChange = () => {

    }

    return(
        <Offcanvas show={projectId} onHide={handleHide}>
            <Offcanvas.Header>
                <Offcanvas.Title>{editing?'Editing':'Viewing'}: {meetingData.name}</Offcanvas.Title>
                {
                meetingData.owner_id !== user.id ? null :
                    editing ? <Button variant="outline-primary" onClick={handleReset}>Reset</Button> :
                    <Button onClick={()=>setEditing(true)}>Edit</Button>
                }
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Collapse in={message.content !== ""}>
                    <Form.Group>
                        <Alert variant={message.variant}>{message.content}</Alert>
                    </Form.Group>
                </Collapse>
                <Form.Group className="m-3">
                    <Form.Text>Requested By <strong>{meetingData.requested_by.name}</strong> on <strong>{meetingData.requested_on.toLocaleDateString()}</strong></Form.Text>
                </Form.Group>
                <Form.Group>
                    <FloatingLabel label="Project Name">
                        <Form.Control value={meetingData.name} disabled={!editing} id="name" onChange={handleChange}/>
                    </FloatingLabel>
                    <FloatingLabel label="Description" className="mt-3">
                        <Form.Control value={meetingData.description} disabled={!editing} as="textarea" id="description" onChange={handleChange}/>
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mt-3">
                    <Form.Text>Spaces: </Form.Text>
                    {meetingData.spaces.map((space, idx)=>
                        <Badge bg={spaceStyles[space]}>{space}</Badge>
                    )}
                </Form.Group>
                <Form.Group>
                    <Form.Text>Upcoming Meetings</Form.Text>
                        {meetingData.times.map((time, tidx)=>
                            <Row className="mt-3">
                                <Col>
                                    <Row>
                                        <Col>
                                            <Form.Control type="date" disabled={!editing} value={time.start.toFormDateString()} onChange={handleTimeChange}/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={6}>
                                            <Form.Control type="time" disabled={!editing} value={time.start.toFormTimeString()} onChange={handleTimeChange}/>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Control type="time" disabled={!editing} value={time.end.toFormTimeString()} onChange={handleTimeChange}/>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs={2} className="mt-auto mb-auto">
                                    <CloseButton/>
                                </Col>
                            </Row>
                        )}
                </Form.Group>
            </Offcanvas.Body>
        </Offcanvas>
    )
} 

/*

TODO:
    
    * Fix multiple copying previous
    * Save recurring block info in case it is changed

*/

const Book = ({handleHide, show, user, allowed}) => {

    // Info to be sent to DB
    const [payload, setPayload] = useState({...defaultPayload, owner_id:user.id, requested_by:user._profile.data });

    // Info for generating times
    const [status, setStatus] = useState(defaultStatus);

    // Message for feedback
    const [message, setMessage] = useState({variant:"",text:""})

    const handleClear = () => {
        setStatus(defaultStatus);
        setPayload({...defaultPayload, owner_id:user.id, requested_by:user._profile.data})
    }

    const handleAddTime = () => {
        let prevTimes = [...status.times];
        let lastTime = prevTimes[prevTimes.length-1];
        setStatus({...status, times:[...prevTimes, lastTime]})
    }

    const handleRemoveTime = (idx) => {
        let prevTimes = [...status.times];
        prevTimes.splice(idx, 1);
        setStatus({...status, times:prevTimes});
    }

    const handleChangeDate = (e) => {

        const [type, idx] = e.target.id.split("-");
        const newDate = e.target.value === "" ? new Date() : new Date(e.target.value);
        newDate.setDate( newDate.getDate() + 1 );

        if ( type === "recurring" ){
            setStatus({...status, [idx === "end" ? "recurringEnd" : "recurringStart"]:newDate});
        } else {
            let newTimes = [...status.times];
            const {start, end} = newTimes[idx];
    
            const newStart = new Date(newDate);
            const newEnd = new Date(newDate);
    
            newStart.setHours(
                start.getHours(),
                start.getMinutes(),
                0,
                0
            )
            newEnd.setHours(
                end.getHours(),
                end.getMinutes(),
                0,
                0
            )
    
            newTimes[idx] = {start: newStart, end: newEnd};
    
            setStatus({...status, times:newTimes});
        }

    }

    const handleChangeTime = (e) => {

        // start-0
        const [field, idx] = e.target.id.split("-")
        // 09:00
        const [hours, min] = e.target.value.split(":");

        // Get current datetimes at index
        let newTimes = [...status.times];

        const {start, end} = newTimes[idx];

        
        const newTime = new Date( start );
        newTime.setHours(hours, min, 0, 0);
        newTimes[idx][field] = newTime;

        setStatus({...status, times:newTimes})

    }

    const handleBlockSelect = (e) => {

        let newTimes = [...status.times];

        const {value, id} = e.target;
        const [start, end] = value.slice(0, value.length-1).split("(")[1].split(" - ");

        const [startHour, startMin] = start.split(":");
        const newStart = new Date(newTimes[id].start);
        newStart.setHours(startHour, startMin, 0, 0);

        const [endHour, endMin] = end.split(":");
        const newEnd = new Date(newTimes[id].end);
        newEnd.setHours(endHour, endMin, 0, 0);

        newTimes[id] = {start:newStart, end:newEnd};
        setStatus({...status, times:newTimes});

    }

    const handlePeriodSelect = (e) => {

        let prevPeriods = [...status.blocks];

        if ( prevPeriods.includes(e.target.id) ){
            const idx = prevPeriods.indexOf(e.target.id);
            prevPeriods.splice(idx, 1);
        } else {
            prevPeriods.push(e.target.id);
        }

        setStatus({...status, blocks:prevPeriods});

    }

    const handleSubmit = () => {

        setMessage({variant:"info", content:"Sending request to database..."})

        const meetings = user.mongoClient("mongodb-atlas").db("betty").collection("meetings");

        meetings.insertOne(payload)
            .then( resp => setMessage({variant:"success", content:"Request successfully sent!"}) )
            .catch( err =>  setMessage({variant:"danger", content:`Error: ${err.error}`}))
        
    }

    // Update block options for single or multiple selection
    useEffect(()=>{

        const {division, type, times} = status;

        if (division === "" || !times[0] || type === "time"){
            setStatus({...status, blockOptions:[]})
        } else {

            const date = new Date( times[0].start )
            const week = getWeek(date);
            const blocks = schedules[division][week][date.getDay()-1];
            const blockTimes = schedules[division].times;

            if (!blocks){
                setStatus({...status, blockOptions:[<option>No blocks available</option>]})
            } else {
                setStatus({
                    ...status,
                    blockOptions:blocks.map((block,idx)=><option key={idx}>{block} ({blockTimes[idx][0]} - {blockTimes[idx][1]})</option>)
                })
            }
        }
    },[status.division, status.type, status.times]);

    // Reset times when recurring changes
    useEffect(()=>setStatus({...status, times:[{start:new Date(), end:new Date()}]}),[status.recurring])

    // Transfer status times to payload
    useEffect(()=> {

        // Capture Variables
        const { division, times, recurring, type, weekly, days, blocks, recurringEnd, recurringStart, recurringEndTime, recurringStartTime } = status;

        let newTimes = [];

        if ( recurring === "" ){

        } else if (['single', 'multiple'].includes(recurring)) {

            const beforeToday = times.filter(time=>time.start < new Date());
            const startAfter = times.filter(time=>time.start>=time.end);

            if (beforeToday.length > 0){
                setMessage({variant:"warning", content:<span><strong>Start Date</strong> can not be before <strong>Today</strong></span>})
            } else if (startAfter.length > 0 ){
                setMessage({variant:"warning", content:<span><strong>Start Date/Time</strong> can not be the same or after <strong>End Date/Time</strong></span>})
            } else {
                newTimes = times;
            }

        } else {

            const currentDay = new Date( recurringStart );
            const endDay = new Date( recurringEnd );

            if ( currentDay >=  endDay ){
                setMessage({variant:"warning", content:<span><strong>End Date</strong> must be after <strong>Start Date</strong></span>})
            } else if ( type === "block" && division === "" ) {
                setMessage({variant:"warning", content:<span>You must select a <strong>Division</strong></span>})
            } else {

                while ( currentDay < endDay ) {

                    if ( type === "time" ){

                        if ( days.includes( currentDay.getDay() - 1 ) ){
                            // Start time in start date, end time in end date
                            const [startHour, startMin] = recurringStartTime.split(":");
                            const [endHour, endMin] = recurringEndTime.split(":");

                            // Create new date objects
                            const start = new Date(currentDay);
                            start.setHours(startHour, startMin, 0, 0)
                            const end = new Date(currentDay);
                            end.setHours(endHour, endMin, 0, 0);
                            // Push to array
                            newTimes.push({start, end});
                        }
    
                    } else {

                        const day = currentDay.getDay() - 1;
                        const week = getWeek(currentDay);
                        if (!schedules[division] || !schedules[division][week][day]) {
                            
                        } else {

                            schedules[division][week][day].map(
                                (block, idx) => {

                                    const [startString, endString] = schedules[division].times[idx];

                                    const startTime = new Date(currentDay);
                                    const [startHour, startMin] = startString.split(":");
                                    startTime.setHours(startHour, startMin, 0, 0);

                                    const endTime = new Date(currentDay);
                                    const [endHour, endMin] = endString.split(":");
                                    endTime.setHours(endHour, endMin, 0, 0);

                                    if ( blocks.includes(block) ||  blocks.includes(`${week}${day}${idx}`)){
    
                                        newTimes.push({
                                            start:startTime,
                                            end:endTime
                                        })
                                    }
                                }
                            )
                        }
                    }
                    
                    currentDay.setDate( currentDay.getDate() + 1 );
                }
            }
        }

        setPayload({...payload, times:newTimes})

    },[status])

    // Checks for conflicts in the payload times
    useEffect( async () => {

        if ( [...payload.times].length === 0 ){
            return
        }

        setMessage({variant:"primary", content:<span><Spinner animation="grow" size="sm"/> Checking for conflicts...</span>})

        const conflicts = await user.mongoClient("mongodb-atlas").db("betty").collection("meetings").aggregate([
            {
                $unwind:"$times"
            },{
                $project:{
                    start:"$times.start",
                    end:"$times.end",
                    status:1,
                    spaces:1,
                    name:1,
                    conflictsWith:{
                        $filter:{
                            input:payload.times,
                            as:"time",
                            cond:{
                                $or:[
                                    {$and:[
                                        {$gt:["$times.start", "$$time.start"]},
                                        {$lt:["$times.start", "$$time.end"]}
                                    ]},
                                    {$and:[
                                        {$lt:["$times.start", "$$time.start"]},
                                        {$gt:["$times.end", "$$time.start"]}
                                    ]},
                                    {$and:[
                                        {$eq:["$times.start", "$$time.start"]},
                                        {$eq:["$times.end", "$$time.end"]},
                                    ]}
                                ]
                                
                            }
                        }
                    }
                }
            },{
                $match:{
                    status:"approved",
                    "conflictsWith.0":{$exists:true},
                    spaces:{$in:payload.spaces}
                }
            }
        ]);

        if ( conflicts.length > 0 ){
            setMessage({
                variant:"warning", 
                content:
                    <span>
                        <OverlayTrigger
                            placement="right" 
                            overlay={
                                <Popover>
                                    <Popover.Header>Conflicts</Popover.Header>
                                    <Popover.Body>
                                        {conflicts.map((conflict, idx)=>
                                            <div>
                                                <div><strong>{conflict.name}</strong></div>
                                                <div>{new Date(conflict.start).toDateString()}</div>
                                                <div>{new Date(conflict.start).toLocaleTimeString()} - {new Date(conflict.end).toLocaleTimeString()}</div>
                                                <hr/>
                                            </div>
                                        )}
                                    </Popover.Body>
                                </Popover>
                            }>
                            <strong style={{cursor:"pointer"}}>{conflicts.length} Conflicts </strong>
                        </OverlayTrigger>
                        have been found
                    </span>
            })
        } else {
            setMessage({
                variant:"info", 
                content:
                <span>
                <OverlayTrigger
                    placement="right" 
                    overlay={
                        <Popover>
                            <Popover.Header>Meetings</Popover.Header>
                            <Popover.Body>
                                <ListGroup>
                                    {payload.times.map((time, idx)=>
                                        <ListGroup.Item>
                                            <strong>{new Date(time.start).toLocaleDateString()}</strong>
                                            {` ${new Date(time.start).toLocaleTimeString()} - ${new Date(time.end).toLocaleTimeString()}`}
                                        </ListGroup.Item>
                                    )}
                                </ListGroup>
                            </Popover.Body>
                        </Popover>
                    }>
                    <strong style={{cursor:"pointer"}}>{payload.times.length} Meetings </strong>
                </OverlayTrigger>
                will be requested
            </span>
            })
        }

    },[payload.times, payload.spaces, payload.project, user])


    return(
        <Offcanvas show={show} onHide={handleHide}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Book the Lab</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {
                    !allowed?
                    <Alert variant="warning" className="mt-3">
                        <a href="/#/trainings/introduction">General Safety</a> must be completed before you can book the lab.
                    </Alert>
                    :
                    <Form>

                    <Form.Group>
                        <FloatingLabel label="Name your Project">
                            <Form.Control value={payload.name} placeholder="Name Your Project" onChange={(e)=>setPayload({...payload, name:e.target.value})}/>
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group className="mt-3">
                        <FloatingLabel label="Describe your Project (Optional)">
                            <Form.Control value={payload.description} as="textarea" placeholder="Describe Your Project" onChange={(e)=>setPayload({...payload, description:e.target.value})}/>
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group as={Row} className="mt-3">
                        <ToggleButtonGroup type="checkbox" value={payload.spaces} onChange={(s)=>setPayload({...payload, spaces:s})}>
                            <ToggleButton value="classroom-area" variant="outline-primary" id={`space-btn-1`}>Classroom Area</ToggleButton>
                            <ToggleButton value="power-tool-area" variant="outline-primary" id={`space-btn-2`}>Power Tool Area</ToggleButton>
                            <ToggleButton value="machine-shop" variant="outline-primary" id={`space-btn-3`}>Machine Shop</ToggleButton>
                        </ToggleButtonGroup>
                    </Form.Group>

                    <Collapse in={payload.spaces.length>0}>

                        <Form.Group>

                            <Form.Group className="mt-3" as={Row}>
                                <ToggleButtonGroup type="radio" value={status.recurring} onChange={(r)=>setStatus({...status, recurring:r})} name="recurring">
                                    <ToggleButton value="single" id="recur-btn-1" variant="outline-primary">
                                        Single
                                    </ToggleButton>
                                    <ToggleButton value="multiple" id="recur-btn-2" variant="outline-primary">
                                        Multiple
                                    </ToggleButton>
                                    <ToggleButton value="recurring" id="recur-btn-3" variant="outline-primary">
                                        Recurring
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </Form.Group>

                            <Collapse in={status.recurring !== ""}>
                                <Form.Group className="mt-3" as={Row}>
                                    <ToggleButtonGroup type="radio" value={status.type} onChange={(v)=>setStatus({...status, type:v})} name="type">
                                        <ToggleButton value="block" id="type-btn-2" variant="outline-primary">
                                            Block/Period
                                        </ToggleButton>
                                        <ToggleButton value="time" id="type-btn-1" variant="outline-primary">
                                            Time
                                        </ToggleButton>
                                    </ToggleButtonGroup>
                                </Form.Group>
                            </Collapse>

                            <Collapse in={status.type === "block"}>
                                <Form.Group>
                                    <Form.Group className="mt-3" as={Row}>
                                        <ToggleButtonGroup type="radio" value={status.division} onChange={(d)=>setStatus({...status, division:d})} name="division">
                                            <ToggleButton value="middle" id="div-btn-1" variant="outline-primary">
                                                Middle School
                                            </ToggleButton>
                                            <ToggleButton value="upper" id="div-btn-2" variant="outline-primary">
                                                Upper School
                                            </ToggleButton>
                                        </ToggleButtonGroup>
                                    </Form.Group>
                                </Form.Group>
                            </Collapse>

                            <Collapse in={status.recurring === "recurring"}>
                                <Form.Group>

                                    <Form.Group as={Row} className="mt-3">
                                        <Col>
                                            <FloatingLabel label="Start Date">
                                                <Form.Control type="date" id="recurring-start" value={status.recurringStart.toFormDateString()} onChange={handleChangeDate}/>
                                            </FloatingLabel>
                                        </Col>
                                        <Col>
                                            <FloatingLabel label="End Date">
                                                <Form.Control type="date" id="recurring-end" value={status.recurringEnd.toFormDateString()} onChange={handleChangeDate}/>
                                            </FloatingLabel>    
                                        </Col>  
                                    </Form.Group>

                                    <Collapse in={status.type==='block'}>
                                        <Form.Group>

                                            <Collapse in={status.recurring==="recurring"}>
                                                <Form.Group>
                                                
                                                    <Collapse in={status.division==="upper"}>
                                                        <Form.Group as={Row} className="mt-3">
                                                            <ToggleButtonGroup type="checkbox" value={status.blocks} onChange={(d)=>setStatus({...status, blocks:d})} name="blocks">
                                                                {['A1','A2','B1','B2','C1','C2','D1','D2','E1','E2','F1',"F2", "G", "H1", "H2"].map(
                                                                    (block, idx)=><ToggleButton variant="outline-primary" size="sm" style={{padding:"0"}} value={block} id={`block-btn-${idx}`}>{block}</ToggleButton>
                                                                )}
                                                            </ToggleButtonGroup>
                                                        </Form.Group>
                                                    </Collapse>

                                                    <Collapse in={status.division==="middle"}>
                                                        <Form.Group as={Row} className="mt-3">
                                                            <ToggleButtonGroup type="checkbox" value={status.weeks} onChange={(w)=>setStatus({...status, weeks:w})} name="weeks">
                                                                <ToggleButton value="A" id="weeks-btn-1" variant="outline-primary">
                                                                    A
                                                                </ToggleButton>
                                                                <ToggleButton value="B" id="weeks-btn-2" variant="outline-primary">
                                                                    B
                                                                </ToggleButton>
                                                            </ToggleButtonGroup>
                                                        </Form.Group>
                                                    </Collapse>

                                                    <Collapse in={status.weeks.length>0 && status.division==="middle"}>
                                                        <Form.Group className="mt-3">
                                                            {status.weeks.map((week,idx)=>
                                                                <Form.Group as={Row} className="text-center">
                                                                    <Col xs={12}>
                                                                        <Form.Text>Week {week}</Form.Text>
                                                                    </Col>
                                                                    {['M','T','W','Th','F'].map((day, didx)=>
                                                                        <Col xs={4}>
                                                                            <strong>{day}</strong>
                                                                            {schedules.middle[week][didx].map((period, pidx)=>
                                                                                <Row>
                                                                                    <Button size="sm" variant={status.blocks.includes(`${week}${didx}${pidx}`)?"primary":"outline-primary"} id={`${week}${didx}${pidx}`} style={{fontSize:"11px"}} onClick={handlePeriodSelect}>
                                                                                        {period}
                                                                                    </Button>
                                                                                </Row>
                                                                            )}
                                                                        </Col>
                                                                    
                                                                    )}
                                                                </Form.Group>
                                                            )}
                                                        </Form.Group>
                                                    </Collapse>

                                                </Form.Group>


                                            </Collapse>

                                        </Form.Group>
                                    </Collapse>

                                    <Collapse in={status.type==="time"}>
                                        
                                        <Form.Group>

                                            <Form.Group as={Row} className="mt-3">
                                                <Col>
                                                    <FloatingLabel label="Start Time">
                                                        <Form.Control type="time" id="start-0-time" value={status.recurringStartTime} onChange={(e)=>setStatus({...status, recurringStartTime:e.target.value})}/>
                                                    </FloatingLabel>
                                                </Col>
                                                <Col>
                                                    <FloatingLabel label="End Time">
                                                        <Form.Control type="time" id="end-0-time" value={status.recurringEndTime} onChange={(e)=>setStatus({...status, recurringEndTime:e.target.value})}/>
                                                    </FloatingLabel>
                                                </Col>
                                            </Form.Group>

                                            <Form.Group as={Row} className="mt-3">
                                                <ToggleButtonGroup type="radio" name="weekly" value={status.weekly} onChange={(w)=>setStatus({...status, weekly:w})}>
                                                    {['Weekly', 'Bi-Weekly'].map((weekly, widx)=>
                                                        <ToggleButton id={`weekly-btn-${widx}`} variant="outline-primary" value={weekly==="Weekly"}>{weekly}</ToggleButton>
                                                    )}
                                                </ToggleButtonGroup>
                                            </Form.Group>

                                            <Form.Group as={Row} className="mt-3">
                                                <ToggleButtonGroup type="checkbox" name="days" value={status.days} onChange={(d)=>setStatus({...status, days:d})}>
                                                    {['M', 'T', 'W', 'Th', 'F'].map((day, didx)=>
                                                        <ToggleButton id={`day-btn-${didx}`} value={didx} variant="outline-primary">{day}</ToggleButton>
                                                    )}
                                                </ToggleButtonGroup>
                                            </Form.Group>

                                        </Form.Group>
                                    </Collapse>

                                </Form.Group>
                            </Collapse>

                            <Collapse in={['single', 'multiple'].includes(status.recurring)}>
                            <Form.Group className="mt-3" as={Row}>

                                {status.times.map((time, idx)=>
                                    <Form.Group key={idx} as={Row} xs={8} className="justify-content-center mt-1">

                                        <Col xs={1} className="mt-auto mb-auto">
                                            {idx!==0 && status.recurring==="multiple"?<CloseButton onClick={()=>handleRemoveTime(idx)}/>:null}
                                        </Col>

                                        <Col xs={6} className="mt-auto mb-auto">
                                            <FloatingLabel label="Date">
                                                <Form.Control value={time.start.toFormDateString()} type="date" id={`date-${idx}`} onChange={handleChangeDate}/>
                                            </FloatingLabel>
                                        </Col>

                                        <Collapse in={status.type==="time"}>
                                            <Form.Group as={Col} xs={5}>
                                                <FloatingLabel label="Start Time">
                                                    <Form.Control type="time" id={`start-${idx}-time`} value={time.start.toFormTimeString()} onChange={handleChangeTime}/>
                                                </FloatingLabel>
                                                <FloatingLabel label="End Time">
                                                    <Form.Control type="time" id={`end-${idx}-time`} value={time.end.toFormTimeString()} onChange={handleChangeTime}/>
                                                </FloatingLabel>
                                            </Form.Group>
                                        </Collapse>

                                        <Collapse in={status.type==="block"}>
                                            <Form.Group as={Col} xs={5}>
                                                <FloatingLabel label="Block/Period">
                                                    <Form.Control as="select" id={`${idx}`} onChange={handleBlockSelect}>
                                                        {status.blockOptions}
                                                    </Form.Control>
                                                </FloatingLabel>
                                            </Form.Group>
                                        </Collapse>
                                        
                                    </Form.Group>
                                )}
                                </Form.Group>
                            </Collapse>

                        </Form.Group>

                    </Collapse>

                    <Collapse in={status.recurring==='multiple'}>
                        <Form.Group as={Row} className="mt-3">
                            <Button variant="outline-primary" onClick={handleAddTime}>
                                Add a Meeting
                            </Button>
                        </Form.Group>
                    </Collapse>

                    <Collapse in={message.variant!==""}>
                        <Form.Group className="mt-3">
                            <Alert variant={message.variant}>{message.content}</Alert>
                        </Form.Group>
                    </Collapse>

                    <Collapse in={ message.variant === "info" && payload.spaces.length>0 && payload.times.filter( (time, idx) => ![time.start.toString(), time.start.toString()].includes("Invalid Date") ).length>0}>
                        <Form.Group as={Row} className="mt-3">
                            <Button onClick={handleSubmit}>Submit</Button>
                        </Form.Group>
                    </Collapse>

                    <Form.Group as={Row} className="mt-3">
                        <Button variant="outline-secondary" onClick={handleClear}>Clear</Button>
                    </Form.Group>

                </Form>
                }
            </Offcanvas.Body>
        </Offcanvas>

    )
}

/*
TODO:
    * Add viewing of individual meetings
    * Create automatically create google calendar event

* Admin Page
    * Accept/deny requests
    * Delete meetings
    * Update Google Calendar
* Add tool reservation

*/

const Schedule = ({book, user}) => {

    const {projectId} = useParams();
    const navigate = useNavigate();
    const [days, setDays] = useState([]);
    const [message, setMessage] = useState({variant:"",content:""});
    const [scope, setScope] = useState({range:"day", date:new Date()});
    const [introCompleted, setIntroCompleted] = useState(false);

    const handleHide = () => navigate('/schedule');

    const handleDateSelect = (e) => {

        let newDate;

        const {id, value} = e.target;

        if ( id === "year" ) {
            newDate = new Date( scope.date );
            newDate.setFullYear( value );
        } else if ( id === "month" ) {
            newDate = new Date( scope.date );
            newDate.setMonth( value )
        } else {
            newDate = new Date( value );
            newDate.setDate( newDate.getDate() + 1 )
        }

        setScope({...scope, date:newDate})
    }

    const handleButton = (e) => {

        let newDay = new Date(scope.date);

        const {id} = e.target;
        const f = e.target.id === "increase" ? 1 : -1 

        if ( scope.range === "day" ){
            newDay.setDate( newDay.getDate() + f*1 )
        } else if ( scope.range === 'week' ){
            newDay.setDate( newDay.getDate() + f*7 )
        } else {
            newDay.setMonth( newDay.getMonth() + f*1 )
        }

        setScope({...scope, date: newDay})

    };

    useEffect(()=> {
        
        setMessage({variant:"info", content:<span><Spinner animation="grow" size="sm"/> Loading Meetings</span>});
        setDays([]);
        const { range, date } = scope;

        let [lower, upper] = [ new Date(date), new Date(date) ]
        
        if (range === "day") {
            lower.setHours(0,0,0,0)
            upper.setHours(23,0,0,0);
        } else if ( range === "week" ) {
            const day = date.getDay();
            lower.setDate( lower.getDate() - day );
            upper.setDate( upper.getDate() + (6 - day) );
        } else {
            lower.setDate(1);
            upper = new Date( upper.getFullYear(), upper.getMonth()+1, 0 )
        }

        user.mongoClient("mongodb-atlas").db('betty').collection("meetings")
            .aggregate([
                {
                    $unwind:"$times"
                },
                {
                    $project:{
                        name:1,
                        status:1,
                        date:{
                            $dateToString: { 
                                format: "%Y-%m-%d", 
                                date: "$times.start" 
                            }
                        },
                        start:"$times.start",
                        end:"$times.end",
                        spaces:1
                    }
                },{
                    $match:{
                        start:{$lt:upper, $gt:lower},
                        status:"approved"
                    }
                },{
                    $sort:{start:1}
                },{
                    $group:{
                        _id:"$date",
                        meetings:{
                            $push:{
                                _id:"$_id",
                                start:"$start",
                                end:"$end",
                                name:"$name",
                                spaces:"$spaces"
                            }
                        },
                    }
                },{
                    $project:{
                        date:{
                            $toDate:"$_id"
                        },
                        meetings:1
                    }
                },{
                    $sort:{date:1}
                }
            ])
            .then( resp => {
                setDays(resp);
                setMessage({variant:resp.length===0?"warning":"", content:resp.length===0?"No meetings found":""});

            })
            .catch( err => {
                setMessage({variant:"danger", content:`ERROR: ${err.error}`})
            })
    }
    ,[user, scope]);

    useEffect(()=>user.mongoClient("mongodb-atlas").db('betty').collection("trainings").findOne({id:"introduction"})
        .then(resp => setIntroCompleted(resp.completed_by.includes(user.id)))
        .catch( err => console.error(err) )
    ,[user])

    const Day = ({meetings}) => 
        <div className="p-5">
            {meetings.map((meeting, idx)=>
                <Row className="mt-3 justify-content-center" lg={4}>
                    <Col>
                        {meeting.start.toLocaleTimeString()} - {meeting.end.toLocaleTimeString()}
                     </Col>
                    <Col>
                        <Row>
                            <Col><a className="text-white" href={`/#/schedule/${meeting._id.toString()}`}>{meeting.name}</a></Col>
                            <Col>{meeting.spaces.map((space, sidx)=><Badge bg={spaceStyles[space]}>{space}</Badge>)}</Col>   
                        </Row>
                    </Col>
                </Row>
            )} 
        </div>

    const Week = ({days}) =>
        <Row lg={5} xs={2} className="week-container m-3">
            {days.map((day, didx)=>
                <Col className="week-day-container">
                    <h1>{weekdays[didx]}</h1>
                    {day.meetings.map((meeting, idx)=>
                        <div>
                            <hr/>
                            <div><a className="text-white" href={`/#/schedule/${meeting._id.toString()}`}>{meeting.name}</a></div>
                            <div>
                                {meeting.spaces.map((space, sidx)=>
                                    <Badge bg={spaceStyles[space]}>{space}</Badge>
                                )}
                            </div>
                            <div>{meeting.start.toLocaleTimeString()} - {meeting.end.toLocaleTimeString()}</div>
                        </div>
                    )}
                </Col>
            )}
        </Row>

    const Month = ({days}) => {

        const firstDay = new Date(days[0]._id);

        return(
            <Row lg={5} md={2} xs={1} className="month-container p-5">
                {new Array(firstDay.getDay()).fill(0).map(i=><Col></Col>)}
                {days.map((day, idx)=>{

                    const today = new Date( day._id );
                    today.setDate( today.getDate() + 1 )

                    return(
                        <Col className="month-day-container p-3">
                            <h3 className="text-center">{weekdays[today.getDay()-1].slice(0,3)}  {today.toLocaleDateString()}</h3>
                            {day.meetings.map((meeting, midx)=>
                                <div>{meeting.start.toLocaleTimeString()} - <a className="text-white" href={`/#/schedule/${meeting._id.toString()}`}>{meeting.name}</a></div>
                            )}
                        </Col>
                    )
                })}
            </Row>
        )
    }

    return(
        <div className="schedule-container">

            <Row className="mt-3 justify-content-center">
                <Col xs={12} lg={4}>
                    <Row>
                        <ToggleButtonGroup type="radio" value={scope.range} onChange={(s)=>setScope({...scope, range:s})} name="scope">
                            <ToggleButton value="day" id="scope-btn-1" variant="outline-light">
                                Day
                            </ToggleButton>
                            <ToggleButton value="week" id="scope-btn-2" variant="outline-light">
                                Week
                            </ToggleButton>
                            <ToggleButton value="month" id="scope-btn-3" variant="outline-light">
                                Month
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Row>
                </Col>
            </Row>

            <Row className="mt-3 justify-content-center text-center">
                <Col xs={2} className="mt-auto mb-auto"><Button variant="outline-light" onClick={handleButton} id="decrease">{`<`}</Button></Col>
                <Col xs={7} sm={4} className="justify-content-center">
                    {
                        scope.range === "month" ?
                        <Form.Group as={Row} className="justify-content-center">
                            <Col xs={12} sm={6} md={6}>
                                <Form.Control as="select" value={scope.date.getMonth()} onChange={handleDateSelect} id="month" className="text-center m-1">
                                    {
                                        months.map((month, idx)=>
                                            <option value={idx}>{month}</option>
                                    )}
                                </Form.Control>
                            </Col>
                            <Col xs={8} sm={6} md={4}>
                                <Form.Control as="select" className="text-center m-1" value={scope.date.getFullYear()} onChange={handleDateSelect} id="year">
                                    {
                                        [0,1,2].map((year, idx)=>
                                            <option value={new Date().getFullYear()+idx}>{new Date().getFullYear()+idx}</option>
                                    )}
                                </Form.Control>
                            </Col>
                        </Form.Group>
                        :<Form.Control type="date" value={scope.date.toFormDateString()} onChange={handleDateSelect}/>
                    }
                </Col>
                <Col xs={2} className="mt-auto mb-auto"><Button variant="outline-light" onClick={handleButton} id="increase">{`>`}</Button></Col>
            </Row>

            <Row className="text-center mt-3">
                <Col>
                    {
                        introCompleted?
                        <Button href="/#/schedule/book" variant="outline-light" disabled={!introCompleted}>Book the Lab</Button> : 
                        <Alert variant="warning" className="mt-3">
                            <a href="/#/trainings/introduction">General Safety</a> must be completed before you can book the lab.
                        </Alert>
                    }
                    
                </Col>
            </Row>

            <Collapse in={message.variant!==""}>
                <Row className="mt-3 text-center">
                    <Alert variant={message.variant}>{message.content}</Alert>
                </Row>
            </Collapse>
            
            <Row>
                {
                    days.length === 0 ? null :
                    scope.range === "day" ? <Day meetings={days[0].meetings}/> :
                    scope.range === "week" ? <Week {...{days}}/> :
                    <Month {...{days}}/>
                }
            </Row>
            
            <View projectId={projectId} handleHide={handleHide} user={user}/>
            <Book show={book} handleHide={handleHide} user={user} allowed={introCompleted}/>

        </div>
    )
}

export default Schedule;