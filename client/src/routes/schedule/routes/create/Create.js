import { useState } from "react";
import { Form, Offcanvas } from "react-bootstrap";

import Describe from './components/Describe';
import SetTimes from './components/SetTimes';
import Attendees from './components/Attendees';
import Tools from './components/Tools';
import Submit from './components/Submit';

export default function Create({show, navigate}){

    const [payload, setPayload] = useState({
        summary:"",
        description:"",
        times:[],
        locations:[],
        tools:[],
        attendees:[]
    });

    // TODO URL Params

    /*
    <SetInfo options={options} setOptions={setOptions} payload={payload} setPayload={setPayload}/>
    <SetTimes options={options} setOptions={setOptions}/>
    <SetBlocks options={options} setOptions={setOptions}/>
    <SetRecurring options={options} setOptions={setOptions}/>
    <SetTools times={payload.times}/>
    <Submit payload={payload} options={options} navigate={navigate}/>
    */

    return(
        <Offcanvas show={show} onHide={()=>navigate('/schedule')}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>
                    Create an Event
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Form>
                    <Describe payload={payload} setPayload={setPayload}/>
                    <SetTimes payload={payload} setPayload={setPayload}/>
                    <Attendees payload={payload} setPayload={setPayload}/>
                    <Submit payload={payload} setPayload={setPayload}/>
                </Form>
            </Offcanvas.Body>
            
        </Offcanvas>
    )
}