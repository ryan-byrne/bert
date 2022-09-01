import { useState, useEffect } from "react";
import { Button, Col, Container, Badge, Row, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Query } from '../../components/GraphQL'
import DayCard from './components/DayCard';
import { Day, Week, Month } from "./components/Controls";
import Create from "./routes/create/Create";

import './style.css';
import Loading from "../../components/Loading";

Date.prototype.toFormDateString = function () {
  return this.getFullYear() + "-" + (this.getMonth() + 1).toString().padStart(2, "0") + "-" + this.getDate().toString().padStart(2, "0")
}

export default function Schedule({ create }) {

  const [interval, setInterval] = useState('w');
  const [locations, setLocations] = useState(['classroom', 'machineshop', 'powertool'])
  const [from, setFrom] = useState(new Date());
  const [events, setEvents] = useState();
  const navigate = useNavigate();

  const controls = {
    d: <Day {...{ from, setFrom }} />,
    w: <Week {...{ from, setFrom }} />,
    m: <Month {...{ from, setFrom }} />
  }

  // Query for Schedule
  useEffect(() => {
    if (from.toString() === 'Invalid Date') return

    const to = new Date( from );

    if ( interval === 'm' ) to.setMonth( from.getMonth() + 1 )
    else to.setDate( from.getDate() + ( interval === 'w' ? 5 : 1 ) )

    setEvents();
    Query(`
        query GetCalendar($timeMin: Date!, $timeMax: Date!, $locations: [EventLocation]!) {
          getCalendar(timeMin: $timeMin, timeMax: $timeMax, locations: $locations) {
            date
            events {
              summary
              htmlLink
              location
              start {
                dateTime
              }
              end {
                dateTime
              }
            }
          }
        }
        `, {
      locations,
      timeMin: from,
      timeMax: to
    })
      .then(resp => resp.json()
        .then(data => {
          if (data.errors || !data.data) console.error(data)
          setEvents(data.data.getCalendar)
        }))
      .catch(err => console.error(err))
    return () => setEvents()
  }, [from, locations, setEvents, create, interval]);

  return (
    <Container>

      <Create show={create} navigate={navigate} />

      <Row className="mt-3">
        <ToggleButtonGroup
          size="sm"
          type="checkbox"
          value={locations}
          onChange={(v) => setLocations(v)}>
          {[
            ['Classroom Area', 'classroom'],
            ['Power Tool Area', 'powertool'],
            ['Machine Shop', 'machineshop']
          ].map(([loc, id], idx) =>
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
          onChange={(v) => setInterval(v)}>
          {['Day', 'Week', 'Month'].map((int, idx) =>
            <ToggleButton key={idx} variant="outline-light" id={int} value={int.substring(0, 1).toLowerCase()}>{int}</ToggleButton>
          )}
        </ToggleButtonGroup>
      </Row>

      {controls[interval]}

      <Row className="mt-3 text-center">
        <Col>
          <Button as={Link} variant="outline-light" to="/schedule/create">
            Create an Event
          </Button>
        </Col>
      </Row>

      <Row xs={3} className="mt-3">
      <Button style={{backgroundColor:"blueviolet", borderColor:"transparent"}}>Classroom Area</Button>
      <Button style={{backgroundColor:"darkgreen", borderColor:"transparent"}}>Power Tool Area</Button>
      <Button style={{backgroundColor:"darkorange", borderColor:"transparent"}}>Machine Shop</Button>
      </Row>

      {
        !events ?
          <Loading>
            Loading Events ...
          </Loading> :
          <Row className="m-3 justify-content-center" xl={6} md={3} xs={1}>
            {events.map((day, idx) => <DayCard key={idx} day={day} />)}
          </Row>

      }

    </Container>

  )


}