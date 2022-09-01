import {useState, useEffect} from 'react';
import {Query} from "../../../../../../components/GraphQL"
import { ToggleButton, FormSelect, FormGroup, Row, Col, Collapse, ToggleButtonGroup } from 'react-bootstrap';

const getWeek = (date) => {
  var onejan = new Date(date.getFullYear(),0,1);
  var today = new Date(date.getFullYear(),date.getMonth(),date.getDate());
  var dayOfYear = ((today - onejan + 86400000)/86400000);
  return Math.floor(dayOfYear/7) % 2 === 1 ? "A" : "B"
}

export default function SetBlocks({time, index, handleChange, handleToggle}){

  const [msBlocks, setMSBlocks] = useState();

  useEffect(()=>{
      if ( time.division !== 'middle' ) setMSBlocks([])
      else {
        setMSBlocks();
        const d = new Date(time.date);
        d.setHours(0,0,0,0);
        const days = ['Monday','Tuesday','Wednesday','Thursday','Friday'];
        Query(`
        query GetBlocks($day: String, $division: String, $week:String) {
            getBlocks(day: $day, division: $division, week:$week) {
              name
              start
              end
            }
        }`,{day:days[d.getDay() - 1], division:time.division, week:time.division === "upper" ? getWeek(time.date) : null})
            .then(resp => resp.json()
                .then(data=>setMSBlocks(data.data.getBlocks))
            )
            .catch(err => console.error(err))
      }
  },[time.date, time.division, setMSBlocks]);

  return(
    <FormGroup>

    <FormGroup className="mt-3" as={Row}>
        <ToggleButtonGroup type="radio" value={time.division} onChange={(d)=>handleToggle('division', d)} name={`division-${index}`}>
            <ToggleButton value="middle" id={`div-btn-${index}-1`} variant="outline-primary">
                Middle School
            </ToggleButton>
            <ToggleButton value="upper" id={`div-btn-${index}-2`} variant="outline-primary">
                Upper School
            </ToggleButton>
        </ToggleButtonGroup>
    </FormGroup>

    <Collapse in={time.division === 'middle'}>
      <FormGroup className="mt-3">
        {
          !msBlocks
        }
        <FormSelect onChange={handleChange} multiple defaultValue="default" id={`msblocks-blocks-${index}`}>
            {
              !msBlocks ? <option disabled>Loading MS Blocks...</option> :
              msBlocks.map( (option, idx) =>
                <option key={idx} value={`${index}-${option.start}-${option.end}`}>
                    {option.name} ({option.start} - {option.end})
                </option>
            )}
        </FormSelect>
      </FormGroup>
    </Collapse>

    <Collapse in={time.division === 'upper'}>
      <ToggleButtonGroup as={Row} xs={6} className="mt-3"  type="checkbox" value={time.blocks} onChange={(b)=>handleToggle("blocks",b)} name={`usblocks-${index}`}>
        {
          ['A','B','C','D','E','F'].map( block =>
            ['1','2'].map(num =>
              <ToggleButton as={Col} variant="outline-primary" value={`${block}${num}`} id={`${block}${num}${index}`}>
                {block}{num}
              </ToggleButton>)
          ).flat()
        }
        <ToggleButton value="G" id={`G${index}`} variant="outline-primary">G</ToggleButton>
      </ToggleButtonGroup>
    </Collapse>

</FormGroup>
  
  )
}