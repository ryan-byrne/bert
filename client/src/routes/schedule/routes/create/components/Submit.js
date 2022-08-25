import { useState, useEffect } from "react";
import { Alert, Button, FormGroup, ListGroup, Row } from "react-bootstrap";

import { Mutation, Query } from "../../../../../components/GraphQL";

export default ({payload, options}) => {

    const [status, setStatus] = useState({});
    const [queryTimes, setQueryTimes] = useState([]);
    const [conflicts, setConflicts] = useState(null);
    const [invalid, setInvalid] = useState(null);

    // Validate Payload
    useEffect(()=>{

        let validation = []
        
        if ( payload.summary < 5 ) validation.push({text:"Summary is too short", variant:'danger'});
        if (payload.locations.length < 1) validation.push({text:"You must select a Location!", variant:'danger'})
        payload.times.map( ({start, end}) => {
            if ( start > end ) validation.push({text:'Start Time cannot be after End Time', variant:'danger'})
        })
        if (payload.tools.length === 0 ) validation.push({text:'No tools have been added.', variant:'warning'})
        if (payload.attendees.length === 0) validation.push({text:"You have not added any attendees.", variant:"warning"})
        setInvalid(validation)

    },[payload, setInvalid])

    // Get Times for Query
    useEffect(()=> {

        let tempTimes = []

        payload.times.map( time => {
            const start = new Date(time.start);
            const end = new Date(time.end);
            if (options.recurring) {
                const until = new Date(options.recurringUntil);
                while ( start < until ) {

                    if ( options.recurringDays.includes(start.getDay() - 1 ) ){
                        tempTimes.push({
                            start:start.toISOString(), 
                            end:end.toISOString()
                        })
                    }
                    
                    const inc = start.getDay() === 5 ? options.recurringWeekly ? 3 : 10: 1
                    start.setDate( start.getDate() + inc)
                    end.setDate( end.getDate() + inc)
                }
            } else tempTimes.push({start:start.toISOString(), end:end.toISOString()})
        });

        console.log(tempTimes);

        setQueryTimes(tempTimes);

    },[
        setQueryTimes,
        payload.times, 
        options.recurring,
        options.recurringUntil,
        options.recurringWeekly,
        options.recurringDays
    ])

    // Check for Conflicts
    useEffect(()=>{

        Query(`
        query($locations: [EventLocation], $times: [Time]) {
            checkForConflicts(locations: $locations, times: $times){
              event {
                summary
                htmlLink
              }
              start
              end
            }
          }
        `,{
            times:queryTimes,
            locations:payload.locations
        })
            .then( resp => resp.json()
                .then( body => setConflicts(body.data.checkForConflicts)
            ))
    },[
        queryTimes,
        payload.locations, 
        setConflicts,

    ])

    const handleSubmit = () => {
        setStatus({text:"Submitting..."})
        Mutation(`
            mutation CreateEvents($locations: [String!], $summary: String!, $description: String, $recurrence: [String], $tools: [ToolInput], $attendees: [Attendee], $times:[Time]) {
                createEvents(
                locations: $locations, 
                summary: $summary, 
                description: $description, 
                recurrence: $recurrence, 
                tools: $tools, 
                attendees: $attendees,
                times:$times
                )
            }
        `,{...payload})
            .then( resp => resp.json()
                .then( data => {
                    if (data.errors) setStatus({text:data.errors[0].message, variant:'danger'})
                    else setStatus({text:'Success!', variant:'success'})
                    window.location.reload();
                } )
            )
            .catch( err => setStatus({text:'Error', variant:'danger'}) )
    };

    return (
        <FormGroup>
            <FormGroup className="m-3">
                {
                    !invalid ?
                    <Alert>Validating Form...</Alert> :
                    <ListGroup>
                        {
                            invalid.map( invalid => 
                                <ListGroup.Item variant={invalid.variant}>
                                    {invalid.text}
                                </ListGroup.Item>
                            )
                        }
                    </ListGroup>
                }
            </FormGroup>
            <FormGroup className="m-3">
                {
                    !conflicts ?
                    <Alert>Checking for Conflicts...</Alert>:
                    <ListGroup style={{maxHeight:'200px', overflowY:'scroll'}}>
                        {
                            conflicts.map( conflict =>
                                <ListGroup.Item variant="danger">
                                    Conflict found with <a href={conflict.event.htmlLink}>{conflict.event.summary} </a>
                                    on <strong>{new Date(conflict.start).toLocaleDateString()}</strong>
                                </ListGroup.Item>
                            )
                        }
                    </ListGroup>
                }
            </FormGroup>
            <hr/>
            <Row className="m-1">
                <Button 
                    disabled={
                        !(conflicts && conflicts.length === 0) ||
                        !(invalid && invalid.filter(i=>i.variant==='danger').length === 0)
                    }
                    onClick={handleSubmit}
                >Create {queryTimes.length} Events</Button>
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