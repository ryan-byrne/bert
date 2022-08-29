import {useState, useEffect} from 'react';
import {Query} from "../../../../../../components/GraphQL"
import { FormCheck, ToggleButton, FormSelect, Button, FormGroup, Row, FloatingLabel, FormControl, Col, FormText, Collapse, ToggleButtonGroup, CloseButton } from 'react-bootstrap';

const getWeek = (date) => {
  var onejan = new Date(date.getFullYear(),0,1);
  var today = new Date(date.getFullYear(),date.getMonth(),date.getDate());
  var dayOfYear = ((today - onejan + 86400000)/86400000);
  return Math.floor(dayOfYear/7) % 2 === 1 ? "A" : "B"
}

export default function SetBlocks({time, index, handleChange}){

  const [blocks, setBlocks] = useState([]);
  const [week, setWeek] = useState();
  const [division, setDivision] = useState();

  useEffect(()=>setWeek(getWeek(time.date)),[time.date])

  useEffect(()=>{
      if (!division ) setBlocks([])
      else {
          const d = new Date(time.date);
          d.setHours(0,0,0,0);
          const days = ['Monday','Tuesday','Wednesday','Thursday','Friday']
          Query(`
          query GetBlocks($day: String, $division: String, $week:String) {
              getBlocks(day: $day, division: $division, week:$week) {
                name
                start
                end
              }
          }`,{day:days[d.getDay()], division:division, week:division === "upper" ? week : null})
              .then(resp => resp.json()
                  .then(data=>setBlocks(data.data.getBlocks))
              )
              .catch(err => console.error(err))
      }
  },[time.date, division, week, setBlocks]);

  return(
    <FormGroup>

    <FormGroup className="mt-3" as={Row}>
        <ToggleButtonGroup type="radio" value={division} onChange={(d)=>setDivision(d)} name={`division-${index}`}>
            <ToggleButton value="middle" id={`div-btn-${index}-1`} variant="outline-primary">
                Middle School
            </ToggleButton>
            <ToggleButton value="upper" id={`div-btn-${index}-2`} variant="outline-primary">
                Upper School
            </ToggleButton>
        </ToggleButtonGroup>
    </FormGroup>

    <Collapse in={blocks.length > 0}>
      <FormGroup className="mt-3">
        <FormSelect onChange={handleChange} defaultValue="default">
            <option disabled value="default">Select a Block</option>
            {blocks.map( (option, idx) =>
                <option key={idx} value={`${index}-${option.start}-${option.end}`}>
                    {option.name} ({option.start} - {option.end})
                </option>
            )}
        </FormSelect>
      </FormGroup>
    </Collapse>

</FormGroup>
  
  )
}