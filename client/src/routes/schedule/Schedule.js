import { useState, useEffect } from "react";
import { Button, Col, Container, Badge, Row, ToggleButton, ToggleButtonGroup, ButtonGroup } from "react-bootstrap";
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

const getMonday = (date) => {
  const day = new Date(date);
  day.setDate( day.getDate() - day.getDay() + 1 )
  return day
}

export default function Schedule({ create }) {

  const [interval, setInterval] = useState('w');
  const [from, setFrom] = useState(getMonday(new Date()));
  const [events, setEvents] = useState();
  const navigate = useNavigate();

  const controls = {
    d: <Day {...{ from, setFrom }} />,
    w: <Week {...{ from, setFrom }} />,
    m: <Month {...{ from, setFrom }} />
  }

  const areaColors = {
    "classroom": "primary",
    "powertool": "warning",
    "machineshop": "secondary"
  }
  
  useEffect(() => {
    const d = new Date();
    if ( interval === 'm' ) d.setDate(1)
    else if ( interval === 'w' ) d.setDate( d.getDate() - d.getDay() + 1 )
    setFrom(d)
  }, [interval, setFrom]);

  // Query for Schedule
  useEffect(() => {

    if (from.toString() === 'Invalid Date') return

    const to = new Date(from);

    if (interval === 'm') to.setMonth(from.getMonth() + 1)
    else to.setDate(from.getDate() + (interval === 'w' ? 5 : 1))

    setEvents();
    Query(`
        query GetCalendar($timeMin: Date!, $timeMax: Date!, $locations: [EventLocation]!) {
          getCalendar(timeMin: $timeMin, timeMax: $timeMax, locations: $locations) {
            date
            events {
              summary
              id
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
      locations: ['classroom', 'powertool', 'machineshop'],
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
  }, [from, setEvents, create, interval]);

  return (
    <Container>

      <Create show={create} navigate={navigate} />

      <Row className="mt-3">
        <ButtonGroup>
          {
            [
              ['Classroom Area', 'classroom'],
              ['Power Tool Area', 'powertool'],
              ['Machine Shop', 'machineshop']
            ].map(([loc, id], idx) =>
              <Button disabled variant={areaColors[id]}>{loc}</Button>
            )
          }
        </ButtonGroup>
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