import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button, FormGroup, ListGroup, OverlayTrigger, Popover, Row, Col, Form, Table, Collapse } from "react-bootstrap";

import { Query } from "../../../../../components/GraphQL";
import Loading from "../../../../../components/Loading";

export default function Submit({ payload }) {

  const [status, setStatus] = useState({});
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [showErrors, setShowErrors] = useState(false);
  const [warnings, setWarnings] = useState([]);
  const [showWarnings, setShowWarnings] = useState(false);
  const [conflicts, setConflicts] = useState([]);
  const [showConflicts, setShowConflicts] = useState(false);

  useEffect(() => {
    if (status.variant === 'danger' ) setTimeout(()=>setStatus({}),3000)
  }, [status]);

  // Validate Payload
  useEffect(() => {
    setWarnings();
    setErrors();
    let tempErrors = [];
    let tempWarnings = [];
    if (payload.summary.length < 5) tempErrors.push(<span><b>Summary</b> is too short. (Must be longer than 4 characters)</span>)
    if (payload.locations.length < 1) tempErrors.push(<span>You must select a <b>Location</b>. (Tools cannot leave the lab)</span>)
    if (payload.times.length === 0) tempErrors.push(<span>You have not specified any <b>times</b> for your event(s).</span>)
    payload.times.map(({ start, end }, idx) => {
      if (new Date(start) < new Date() || end < new Date()) tempErrors.push(`Time ${idx}: Start and End Time must be in the future.`)
      else if (start > end) tempErrors.push(`Time ${idx}: Start Time cannot be after End Time`)
    })
    if (payload.tools.length === 0) tempWarnings.push(<span>No <b>tools</b> have been added.</span>)
    if (payload.attendees.length === 0) tempWarnings.push(<span>No <b>attendees</b> have been added.</span>)
    setWarnings(tempWarnings);
    setErrors(tempErrors)

  }, [payload])


  // Check for Conflicts
  useEffect(() => {
    if ([payload.times.length, payload.locations.length].includes(0)) return
    setConflicts();
    Query(`
    query CheckForConflicts($times: [TimeInput!]!, $locations: [EventLocation!], $storage: [String!], $attendees: [Attendee], $tools: [ToolInput!], $materials: [MaterialInput!]) {
      locations:events(times: $times, locations: $locations) {
        id
        summary
        locations
      }
      tools:events(times:$times, tools: $tools){
        id
        summary
        tools {
          brand
          name
        }
      }
      materials:events(times:$times, materials: $materials){
        id
        summary
        materials {
          vendor
          description
        }
      }
      storage:events(times:$times, storage: $storage){
        id
        summary
        storage
      }
      attendees:events(times: $times, attendees: $attendees) {
        id
        summary
        attendees {
          email
        }
      }
    }
    `, {
      times: payload.times,
      locations: payload.locations,
      tools: payload.tools,
      storage:payload.storage,
      materials:payload.materials,
      attendees:payload.attendees
    })
      .then(resp => resp.json()
      .then(query => {
        if (query.error) console.error(query.error)
        else setConflicts(query.data)
      }))
      .catch(err => console.error(err))
  }, [
    payload.storage,
    payload.materials,
    payload.times,
    payload.locations,
    payload.tools,
    payload.attendees
  ]);

  const handleSubmit = () => {
    setStatus({ text: "Submitting..." })
    Query(`
    mutation Mutation(
      $summary: String!, 
      $times: [TimeInput!]!, 
      $locations: [EventLocation!]!,
      $storage: [String],
      $tools: [ToolInput]!, 
      $description: String, 
      $attendees: [Attendee]!,
      $materials:[MaterialInput]
      ){
        createEvent(
          description: $description,
          summary: $summary, 
          times: $times,
          storage: $storage,
          locations: $locations,
          attendees: $attendees,
          materials: $materials,
          tools: $tools
        ) {
            id
        }
      }
        `, { ...payload })
      .then(resp => resp.json()
        .then(data => {
          if (data.errors) {
            console.error(data.errors);
            setStatus({ text: "Something went wrong...", variant: 'danger' })
          }
          else {
            setStatus({ text: 'Success!', variant: 'success' });
            navigate('/schedule')
          }
        })
      )
      .catch(err => setStatus({ text: err.message, variant: 'danger' }))
  };

  return (
    <FormGroup>
      {
        !warnings || !errors ? <Loading>Checking Payload...</Loading> :
        <div>
          {
            warnings.length === 0 ? null :
            <Row>
              <Button onClick={()=>setShowWarnings(!showWarnings)} variant={showWarnings ? "outline-warning": "warning"}>
                {!showWarnings ? `Show` : 'Hide'} {warnings.length} Warnings
              </Button>
              <Collapse in={showWarnings}>
                <ListGroup className="mt-1">
                  {
                    warnings.map( (warning, idx) =>
                      <ListGroup.Item variant="warning">
                        {warning}
                      </ListGroup.Item>
                    )
                  }
                </ListGroup>
              </Collapse>
            </Row>
          }
          {
            errors.length === 0 ? null :
            <Row className="mt-3">
              <Button onClick={()=>setShowErrors(!showErrors)} variant={showErrors ? "outline-danger": "danger"}>
                {!showErrors ? `Show` : 'Hide'} {errors.length} Errors
              </Button>
              <Collapse in={showErrors}>
                <ListGroup className="mt-1">
                  {
                    errors.map( (error, idx) =>
                      <ListGroup.Item variant="danger" className="mt-1">
                        {error}
                      </ListGroup.Item>
                    )
                  }
                </ListGroup>
              </Collapse>
            </Row>
          }
        </div>
      }
      {
        !conflicts ? <Loading>Checking for Conflicts...</Loading> :
        Object.values(conflicts).flat().length === 0 ? null :
        <Row className="mt-3">
          <Button variant={showConflicts ? "outline-danger" : "danger"} onClick={()=>setShowConflicts(!showConflicts)}>
            {showConflicts?"Hide":"Show"} {Object.values(conflicts).flat().length} Conflicts
          </Button>
          <Collapse in={showConflicts}>
            <ListGroup>
              {Object.entries(conflicts).map( ([cat, catConflicts], idx) =>
                catConflicts.map( (conflict, cidx) =>
                  <ListGroup.Item variant="danger" key={`${idx}-${cidx}`}>
                    <strong>{cat.slice(0,1).toUpperCase()}{cat.slice(1,cat.length)} Conflict</strong> with <Link to={`/schedule/view/${conflict.id}`}>{conflict.summary}</Link>
                  </ListGroup.Item>
                ).flat()
              )}
            </ListGroup>
          </Collapse>
        </Row>
      }
      <Row className="mt-3">
        <OverlayTrigger
          trigger={['focus', 'hover']}
          overlay={
            <Popover>
              <Popover.Header>
                Event Details
              </Popover.Header>
              <Popover.Body>
                <Table>
                  <tbody>
                    <tr><th>Summary</th><td colSpan={2}>{payload.summary}</td></tr>
                    <tr><th>Date</th><th>Start</th><th>End</th></tr>
                    {payload.times.map((time, idx) =>
                      idx > 4 ? null :
                        <tr key={idx}>
                          <td>{new Date(time.start).toLocaleDateString()}</td>
                          <td>{new Date(time.start).toLocaleTimeString()}</td>
                          <td>{new Date(time.end).toLocaleTimeString()}</td>
                        </tr>
                    )}
                    {payload.times.length > 5 ? <tr><td colSpan={3}>and {payload.times.length - 5} More</td></tr> : null}
                  </tbody>
                </Table>
              </Popover.Body>
            </Popover>
          }
        >
          <Button
            variant="success"
            disabled={
              status.text ||
              !(conflicts && Object.values(conflicts).flat().length === 0) ||
              errors.length > 0
            }
            onClick={handleSubmit}
          >Create {payload.times.length} Event(s)</Button>
        </OverlayTrigger>
      </Row>
      {
        status.text ?
          <Row>
            <Alert variant={status.variant}>
              {status.text}
            </Alert>
          </Row> : null
      }
    </FormGroup>
  )
}