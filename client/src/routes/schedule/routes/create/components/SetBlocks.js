import { FormGroup, FormSelect, Row, ToggleButton, Button, ToggleButtonGroup, ButtonGroup, Collapse, Col, FloatingLabel } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Query } from "../../../../../components/GraphQL";

export default function SetBlocks ({options, setOptions}) {

    const [blocks, setBlocks] = useState([]);

    useEffect(()=>{
        const {date, division, week} = options
        if ([date, division, week].includes("")) setBlocks([])
        else {
            
            const d = new Date(options.date);
            d.setHours(0,0,0,0);
            const days = ['Monday','Tuesday','Wednesday','Thursday','Friday']
            console.log(days[d.getDay()], division, week);
            Query(`
            query GetBlocks($day: String, $division: String, $week:String) {
                getBlocks(day: $day, division: $division, week:$week) {
                  name
                  start
                  end
                }
            }`,{day:days[d.getDay()], division:options.division, week:options.week})
                .then(resp => resp.json()
                    .then(data=>setBlocks(data.data.getBlocks))
                )
                .catch(err => console.error(err))
        }
    },[options.date, options.division, options.week, setBlocks]);

    useEffect(()=> setOptions({
        ...options, 
        week:options.division === 'middle' ? null : ""
    }) ,[options.division])

    const handleBlockChange = (e) => {
        const blocks = Object.values(e.target.selectedOptions).map( (option) => {
            const [_, start, end] = option.value.split('-')
            return { start, end }
        })
        setOptions({...options, times:blocks});
    }

    return(
        <Collapse in={options.blockTime}>
            <FormGroup>

                <FormGroup className="mt-3" as={Row}>
                    <ToggleButtonGroup type="radio" value={options.division} id="division" onChange={(d)=>setOptions({...options, division:d})} name="division">
                        <ToggleButton value="middle" id="div-btn-1" variant="outline-primary">
                            Middle School
                        </ToggleButton>
                        <ToggleButton value="upper" id="div-btn-2" variant="outline-primary">
                            Upper School
                        </ToggleButton>
                    </ToggleButtonGroup>
                </FormGroup>

                <Collapse in={options.division === 'upper'}>
                    <Row className="mt-3">
                        <hr/>
                        <ToggleButtonGroup type="radio" value={options.week} onChange={(w)=>setOptions({...options, week:w})} name="weeks">
                            <ToggleButton value="A" id="weeks-btn-1" variant="outline-primary">
                                A
                            </ToggleButton>
                            <ToggleButton value="B" id="weeks-btn-2" variant="outline-primary">
                                B
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Row>
                </Collapse>

                <Collapse in={blocks.length > 0}>
                    <FormSelect onChange={handleBlockChange} multiple size="30" className="mt-3">
                        {blocks.map( (option, idx) =>
                            <option key={idx} disabled={!option.start} value={`${option.name}-${option.start}-${option.end}`}>
                                {option.name} ({option.start} - {option.end})
                            </option>
                        )}
                    </FormSelect>
                </Collapse>

            </FormGroup>
        </Collapse>
    
    )
}
