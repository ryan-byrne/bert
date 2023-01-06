import { useState, useEffect } from "react";
import { Form, Offcanvas } from "react-bootstrap";

import Describe from '../components/Describe';
import Times from '../components/times/Times';
//import SetTimes from '../components/SetTimes';
import Attendees from '../components/Attendees';
import Tools from '../components/Tools';
import Submit from '../components/Submit';
import { useLocation } from "react-router-dom";
import Materials from '../components/Materials';
import Storage from "../components/Storage";

export default function Create({ show, navigate }) {

  const search = useLocation().search;

  const [payload, setPayload] = useState({
    summary: "",
    description: "",
    times: [],
    locations: [],
    tools: [],
    attendees: [],
    materials:[],
    storage:[]
  });

  return (
    <Offcanvas show={show} onHide={() => navigate('/schedule')}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          Create an Event
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>

        <Describe payload={payload} setPayload={setPayload} search={search} enabled/>
        <Times payload={payload} setPayload={setPayload} search={search} enabled/>
        <Attendees payload={payload} setPayload={setPayload} enabled/>
        <Tools payload={payload} setPayload={setPayload} enabled/>
        <Materials payload={payload} setPayload={setPayload} enabled/>
        <Storage payload={payload} setPayload={setPayload} enabled />
        <Submit payload={payload} setPayload={setPayload} enabled/>

      </Offcanvas.Body>

    </Offcanvas>
  )
}