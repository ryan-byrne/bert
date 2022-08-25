import { FormGroup, Row, ToggleButton, Button, ToggleButtonGroup, ButtonGroup, Collapse, Col, FloatingLabel } from "react-bootstrap";
import {MSBlocks, USBlocks} from "./BlockSelector";

export default ({options, setOptions}) => {

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

                <Collapse in={options.division === 'middle'}>
                    <div>
                        <MSBlocks
                            date={options.date}
                            handleChange={handleBlockChange}
                        />
                    </div>
                </Collapse>

            </FormGroup>
        </Collapse>
    
    )
}
