import { useState, useEffect } from "react";
import { Row, Button, Alert, Collapse, FormGroup, Col, ButtonGroup, ToggleButtonGroup, ToggleButton, Form, FloatingLabel } from "react-bootstrap"
import { Query } from "../../../../../components/GraphQL";
import Loading from "../../../../../components/Loading";

const getFormDateString = (date) => {
  return date.getFullYear() + "-" + (date.getMonth() + 1).toString().padStart(2, "0") + "-" + date.getDate().toString().padStart(2, "0")
}

const getFormTimeString = (date) => {
  const hr = date.getHours();
  const min = date.getMinutes();
  return `${hr < 10 ? `0${hr}` : hr}:${min < 10 ? `0${min}` : min}`
}

const getWeek = (date) => {
  const firstDay = new Date(date.getFullYear(), 0, 1);
  const milliseconds = date - firstDay; // How many milliseconds have passed
  return Math.ceil(milliseconds / 1000 / 60 / 60 / 24 / 7) % 2 === 1 ? 'B' : 'A'
}

const getDayName = (date) => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return (days[date.getDay()]);
}

const handleDateSelect = (e) => {
  const date = new Date(e.target.value);
  date.setDate(date.getDate() + 1);
  return date
}

const Recurrence = ({ idx, time, setTime }) => {

  const handleToggle = (e) => setTime({ 
    ...time,
    block: time.block ? {
      ...time.block,
      selected:[]
    } : null,
    recurrence: e.target.checked ? { 
      until: new Date(), 
      interval: time.block && time.block.division === "upper" ? "bi-weekly" : "weekly"
    } : null 
  });

  const handleDateChange = (e) => setTime({ ...time, recurrence: { ...time.recurrence, until: handleDateSelect(e) } });
  
  return (
    <Form.Group>

      <Form.Group className="m-3 justify-content-center" as={Row}>
        <Col xs={5}>
          <Form.Check label="Recurring" type="switch" checked={time.recurrence ? true : false} onChange={handleToggle} />
        </Col>
      </Form.Group>

      <Collapse in={time.recurrence}>
        {
          !time.recurrence ? <div></div> :
            <Form.Group>

              <Row>
                <ToggleButtonGroup
                  value={time.recurrence.interval}
                  name={`recurrence-interval-${idx}`}
                  onChange={(interval) => setTime({ ...time, recurrence: { ...time.recurrence, interval } })}>
                  {['Weekly', 'Bi-Weekly'].map((interval, widx) =>
                    <ToggleButton
                      disabled={time.block && time.block.division === 'upper'}
                      id={`weekly-btn-${widx}-${idx}`}
                      variant="outline-primary"
                      value={interval.toLowerCase()}>
                      {interval}
                    </ToggleButton>
                  )}
                </ToggleButtonGroup>
              </Row>

              <Collapse in={time.recurrence && time.recurrence.interval !== ""}>
                <Form.Group className="mt-3">
                  <FloatingLabel label="Repeat Until">
                    <Form.Control value={getFormDateString(time.recurrence.until)} type="date" onChange={handleDateChange} />
                  </FloatingLabel>
                </Form.Group>
              </Collapse>

            </Form.Group>
        }
      </Collapse>

    </Form.Group>
  )
}

const SetTime = ({ idx, time, setTime }) => {

  const handleTimeChange = (e) => {
    const [_, type, __] = e.target.id.split("-");
    const [hr, min] = e.target.value.split(":");
    const date = new Date(time.start);
    date.setHours(hr, min, 0, 0);
    setTime({ ...time, [type]: date })
  };

  const handleDateChange = (e) => {
    const [year, month, day] = e.target.value.split("-");
    const start = new Date(time.start);
    start.setFullYear(year);
    start.setMonth(month);
    start.setDate(day);
    const end = new Date(time.end);
    end.setFullYear(year);
    end.setMonth(month);
    end.setDate(day);
    setTime({ ...time, start, end })
  };

  return (
    <Form.Group>
      <Form.Group className="mt-3">
        <FloatingLabel label="Select a Date">
          <Form.Control type="date" id={`time-date-${idx}`} value={getFormDateString(time.start)} onChange={handleDateChange} />
        </FloatingLabel>
      </Form.Group>
      <Form.Group as={Row} className="mt-3">
        <Form.Group as={Col}>
          <FloatingLabel label="Start Time">
            <Form.Control type="time" id={`time-start-${idx}`} value={getFormTimeString(time.start)} onChange={handleTimeChange} />
          </FloatingLabel>
        </Form.Group>
        <Form.Group as={Col}>
          <FloatingLabel label="End Time">
            <Form.Control type="time" id={`time-end-${idx}`} value={getFormTimeString(time.end)} onChange={handleTimeChange} />
          </FloatingLabel>
        </Form.Group>
      </Form.Group>
    </Form.Group>
  )
}

const SetBlocks = ({ idx, time, setTime }) => {

  const [options, setOptions] = useState();

  useEffect(() => {

    setOptions();

    if (time.block.division === "") return
    else {
      Query(`
      query Query($division: [Division!], $day: [String!], $week: [String!]) {
        blocks(division: $division, day: $day, week: $week) {
          name
          start
          end
          day
          division
          week
        }
      }
      `, {
        division: time.block.division,
        week: getWeek(time.block.date),
        day: getDayName(time.block.date)
      })
        .then(resp => resp.json())
        .then(result => setOptions(result.data.blocks))
        .catch(err => console.error(err))
    }

  }, [time.block.division, time.block.date, time.recurrence]);

  const handleMSBlockSelect = (e) => {
    let selected = [];
    for (const selectedOption of e.target.selectedOptions) {
      selected.push(JSON.parse(selectedOption.value))
    }
    setTime({ ...time, block: { ...time.block, selected } })
  }

  const handleUSBlockSelect = (selected) => setTime({ ...time, block: { ...time.block, selected } });

  return (
    !time.block ? null :
      <div>
        <Row>
          <ToggleButtonGroup
            className="mt-3"
            type="radio"
            value={time.block.division}
            name={`${idx}-select-division`}
            onChange={(division) => setTime({ ...time, block: { ...time.block, selected: [], division } })}
          >
            <ToggleButton value="middle" id={`${idx}-division-1`} variant="outline-primary">
              Middle School
            </ToggleButton>
            <ToggleButton value="upper" id={`${idx}-division-2`} variant="outline-primary">
              Upper School
            </ToggleButton>
          </ToggleButtonGroup>
        </Row>

        <Collapse in={time.block.division !== ""}>
          <Form.Group className="mt-3">
            <FloatingLabel label="Select a Date">
              <Form.Control type="date" value={getFormDateString(time.block.date)} onChange={(e) => setTime({ ...time, block: { ...time.block, selected: [], date: handleDateSelect(e) } })} />
            </FloatingLabel>
          </Form.Group>
        </Collapse>

        <Collapse in={time.block.division === 'middle'}>
          <div>
            {
              time.block.division !== 'middle' ? null :
              !options ? <Loading>Loading Middle School Blocks...</Loading> :
              options.length === 0 ? <Alert variant="warning" className="mt-1">There are no classes today.</Alert> :
              <Form.Select className="mt-1" multiple onChange={handleMSBlockSelect} id={`ms-blocks-${idx}`}>
                {
                  options.map((o, idx)=>
                    <option key={idx} value={JSON.stringify(o)}>
                      {o.name} ({o.start} - {o.end})
                    </option>
                  )
                }
              </Form.Select>
            }
          </div>
        </Collapse>

        <Collapse in={time.block.division === 'upper'}>
          <div>
            {
              time.block.division !== 'upper' ? null :
              !options ? <Loading>Loading Upper School Blocks...</Loading> :
              options.length === 0 ? <Alert variant="warning" className="mt-1">There are no classes today.</Alert> :
              <ToggleButtonGroup vertical type="checkbox" className="mt-1" name={`us-block-select-${idx}`} onChange={handleUSBlockSelect}>
                {
                  options.map(b => 
                    <ToggleButton
                      id={`${idx}-${b}`}
                      value={b}
                      size="sm"
                      variant="outline-primary">
                      {b}
                    </ToggleButton>
                  )
                }
              </ToggleButtonGroup>
            }
          </div>
        </Collapse>

      </div>
  )
}

const Time = ({ time, setTime, handleRemoveTime, idx }) => {

  return (
    <div>

      <Row className="mt-3">
        <ToggleButtonGroup
          type="radio"
          value={time.block ? true : false}
          name={`${idx}-radio-mode`}
          onChange={(b) => setTime({ ...time, block: b ? { division: "", date: new Date(), selected: [] } : null })}>
          <ToggleButton value={false} id={`${idx}-btn-1`} variant="outline-primary">
            Time
          </ToggleButton>
          <ToggleButton value={true} id={`${idx}-btn-2`} variant="outline-primary">
            Block
          </ToggleButton>
        </ToggleButtonGroup>
      </Row>

      <Collapse in={time.block}>
        {!time.block ? <div></div> : <SetBlocks idx={idx} time={time} setTime={setTime} />}
      </Collapse>

      <Collapse in={!time.block}>
        {time.block ? <div></div> : <SetTime idx={idx} time={time} setTime={setTime} />}
      </Collapse>

      <Recurrence idx={idx} time={time} setTime={setTime} />

      <Row className="mt-3">
        <Button onClick={() => handleRemoveTime(idx)} variant="outline-danger" size="sm">Remove {time.block ? 'Block' : 'Time'}</Button>
      </Row>

      <hr />

    </div>
  )
}

export default function Times({ payload, setPayload, search, enabled }) {

  const [show, setShow] = useState(false);
  const [times, setTimes] = useState([]);

  const handleAddTime = () => setTimes([...times, {
    block: null,
    start: new Date(),
    end: new Date(),
    recurrence: null
  }]);

  const handleAddBlock = () => setTimes([...times, {
    block: {
      date: new Date(),
      selected: [],
      division: ""
    },
    start: new Date(),
    end: new Date(),
    recurrence: null
  }]);

  const handleTimeChange = (idx, time) => {
    let prevTimes = [...times];
    prevTimes[idx] = time;
    setTimes(prevTimes);
  }

  const handleRemoveTime = (idx) => {
    let prevTimes = [...times];
    prevTimes.splice(idx, 1);
    setTimes(prevTimes);
  }

  useEffect(() => {

    let payloadTimes = []

    for (const time of times){
      if (time.block){
        if (time.block.division === 'upper'){
          Query(`
            query Query($division: [Division!], $name: [String!]) {
              blocks(division: $division, name: $name) {
                name
                day
                week
                start
                end
              }
            }`, {
              division:["upper"],
              name:time.block.selected
          })
            .then(resp => resp.json())
            .then(results => {
              // Given blocks, find times on a given day;
              const startDate = new Date(time.block.date);
              const endDate = new Date(time.block.date);
              endDate.setDate(startDate.getDate() + time.recurrence ? 14 : 1);
              while (startDate < endDate) {
                const blocks = results.data.blocks
                  .filter( b => (b.week === getWeek(startDate)) && (b.day === getDayName(startDate)))
                  .map( block => {
                    const start = new Date(startDate);
                    const end = new Date(startDate);
                    var [hr, min] = block.start.split(":");
                    start.setHours(hr, min, 0, 0);
                    var [hr, min] = block.end.split(":");
                    end.setHours(hr, min, 0, 0);
                    return ({start, end, recurrence:time.recurrence})
                  })
                console.log(blocks);
                setPayload((payload)=>({...payload, times:[payload.times, ...blocks]}))
                startDate.setDate( startDate.getDate() + 1 )
              }
            })
        } else {
          for (const block of time.block.selected){

          }
        }
      } else payloadTimes.push({ start: time.start, end: time.end, recurrence: time.recurrence })
    }

  }, [times, setPayload]);

  useEffect(() => {
    console.log(payload);
  }, [payload]);

  return (
    <div className="mt-3">
      <Row className="mt-3">
        <Button onClick={() => setShow(!show)} variant={show ? "outline-primary" : "primary"}>
          {show ? "Hide" : "Show"} Times ({times.length} Added)
        </Button>
      </Row>
      <Collapse in={show}>
        <FormGroup>
          {times.map((time, idx) =>
            <Time setTime={(t) => handleTimeChange(idx, t)} {...{ time, handleRemoveTime, enabled }} idx={idx} key={idx} />
          )}
          <ButtonGroup className="mt-3 w-100">
            <Button disabled={!enabled} onClick={handleAddTime} variant="outline-success">Add Time</Button>
            <Button disabled={!enabled} onClick={handleAddBlock} variant="outline-success">Add Block</Button>
          </ButtonGroup>
        </FormGroup>
      </Collapse>
      <hr />
    </div>
  )
}

/*

        <Collapse in={time.block.division === 'upper'}>
          <div className="text-center">
            {
              time.block.division !== 'upper' ? null :
              !options ? <Loading>Loading Upper School Blocks...</Loading> :
                options.length === 0 ? <Alert variant="warning" className="mt-1">There are no classes today.</Alert> :
                  <ToggleButtonGroup vertical type="checkbox" className="mt-1" name={`us-block-select-${idx}`} onChange={handleUSBlockSelect}>
                    {
                      options.map(b => 
                        <ToggleButton
                          id={`${idx}-${b}`}
                          value={b}
                          size="sm"
                          variant="outline-primary">
                          {b}
                        </ToggleButton>
                      )
                    }
                  </ToggleButtonGroup>
            }
          </div>
        </Collapse>
*/