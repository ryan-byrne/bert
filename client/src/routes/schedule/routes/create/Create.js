import { useState, useEffect } from "react";
import { Form, Offcanvas } from "react-bootstrap";

import Describe from './components/Describe';
import SetTimes from './components/SetTimes';
import Attendees from './components/Attendees';
import Tools from './components/Tools';
import Submit from './components/Submit';
import { useLocation, useNavigate } from "react-router-dom";
import Materials from './components/Materials';
import Storage from "./components/Storage";

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
        <Form>
          <Describe payload={payload} setPayload={setPayload} search={search}/>
          <SetTimes payload={payload} setPayload={setPayload} search={search} />
          <Attendees payload={payload} setPayload={setPayload} />
          <Tools payload={payload} setPayload={setPayload} />
          <Materials payload={payload} setPayload={setPayload} />
          <Storage payload={payload} setPayload={setPayload} />
          <Submit payload={payload} setPayload={setPayload} />
        </Form>
      </Offcanvas.Body>

    </Offcanvas>
  )
}