import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Alert, Button, FormGroup, ListGroup, OverlayTrigger, Popover, Row, Col, Table } from "react-bootstrap";

import { Query } from "../../../../../components/GraphQL";
import Loading from "../../../../../components/Loading";

export default function Submit({ payload }) {

  const [status, setStatus] = useState({});
  const navigate = useNavigate();
  // TODO
  const [conflicts, setConflicts] = useState([]);
  const [invalid, setInvalid] = useState([]);

  // Validate Payload
  useEffect(() => {
    setInvalid();
    let validation = []
    console.log(payload.locations);
    if (payload.summary.length < 5) validation.push({ text: "Summary is too short", variant: 'danger' });
    if (payload.locations.length < 1) validation.push({ text: "You must select a Location!", variant: 'danger' })
    payload.times.map(({ start, end }) => {
      console.log(start < new Date().setHours(0, 0, 0, 0));
      if (new Date(start) < new Date() || end < new Date()) validation.push({ text: 'Start and End Time must be after Today', variant: 'danger' })
      else if (start > end) validation.push({ text: 'Start Time cannot be after End Time', variant: 'danger' })
    })
    if (payload.tools.length === 0) validation.push({ text: 'No tools have been added.', variant: 'warning' })
    if (payload.attendees.length === 0) validation.push({ text: "You have not added any attendees.", variant: "warning" })
    setInvalid(validation)

  }, [payload, setInvalid])


  // Check for Conflicts
  useEffect(() => {
    if ([payload.times.length, payload.locations.length].includes(0)) return
    setConflicts();
    Query(`
        query GetConflicts($times: [TimeInput]!, $locations: [EventLocation]!, $tools: [ToolInput]!) {
            getConflicts(times: $times, locations: $locations, tools: $tools) {
              summary
              htmlLink
              
              start {
                dateTime
              }
              end {
                dateTime
              }
            }
          }
        `, {
      times: payload.times,
      locations: payload.locations,
      tools: payload.tools
    })
      .then(resp => resp.json()
        .then(data => {
          console.log(data);
          if (data.error || !data.data) console.error(data)
          else setConflicts(data.data.getConflicts)
        }
        ))
      .catch(err => console.error(err))
  }, [
    payload.times,
    payload.locations,
    payload.tools,
    setConflicts,
  ]);


  const handleSubmit = () => {
    setStatus({ text: "Submitting..." })
    Query(`
        mutation Mutation($summary: String!, $times: [TimeInput]!, $locations: [EventLocation]!, $tools: [ToolInput]!) {
            createEvent(
              summary: $summary, 
              times: $times, 
              locations: $locations, 
              tools: $tools) {
                summary
            }
          }
        `, { ...payload })
      .then(resp => resp.json()
        .then(data => {
          if (data.errors) setStatus({ text: data.errors[0].message, variant: 'danger' })
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
      <FormGroup className="mt-3">
        {
          !invalid ?
            <Loading>Vaildating Form...</Loading> :
            <ListGroup>
              {
                invalid.map(invalid =>
                  <ListGroup.Item variant={invalid.variant}>
                    {invalid.text}
                  </ListGroup.Item>
                )
              }
            </ListGroup>
        }
      </FormGroup>
      <FormGroup className="mt-3">
        {
          !conflicts ?
            <Loading>Checking for Conflicts...</Loading> :
            <ListGroup style={{ maxHeight: '200px', overflowY: 'scroll' }}>
              {
                conflicts.map(conflict =>
                  <ListGroup.Item variant="danger">
                    Conflict found with <a href={conflict.htmlLink}>{conflict.summary} </a>
                    on <strong>{new Date(conflict.start.dateTime).toLocaleDateString()}</strong>
                  </ListGroup.Item>
                )
              }
            </ListGroup>
        }
      </FormGroup>
      <hr />
      <Row className="m-1">
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
            disabled={
              status.text ||
              payload.times.length === 0 ||
              !(conflicts && conflicts.length === 0) ||
              !(invalid && invalid.filter(i => i.variant === 'danger').length === 0)
            }
            onClick={handleSubmit}
          >Create {payload.times.length} Events</Button>
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