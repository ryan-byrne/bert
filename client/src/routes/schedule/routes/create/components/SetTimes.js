import { FormGroup, FormText, FormCheck, Collapse, FormControl, Row, Col, Button, FloatingLabel, ButtonGroup } from "react-bootstrap";

export default ({options, setOptions}) => {
    const handleChange = (e) => {
        const [time, id] = e.target.id.split('-');
        let times = [...options.times];
        times[id][time] = e.target.value;
        setOptions({...options, times});
    }
    const handleAdd = () => setOptions({...options, times:[...options.times, {start:"",end:""}]})
    const handleRemove = (idx) => {
        let times = [...options.times];
        times.splice(idx, 1);
        setOptions({...options, times})
    }
    return (
        <Collapse in={!options.blockTime}>
            <FormGroup>
                {
                    options.times.map( (time, idx) =>
                    <div>
                        <FormGroup className="mt-3" as={Row}>
                            <FormGroup as={Col}>
                                <FloatingLabel label="Start Time">
                                    <FormControl type="time" id={`start-${idx}`} value={time.start} onChange={handleChange}/>
                                </FloatingLabel>
                            </FormGroup>
                            <FormGroup as={Col}>
                                <FloatingLabel label="End Time">
                                    <FormControl type="time" id={`end-${idx}`} value={time.end} onChange={handleChange}/>
                                </FloatingLabel>
                            </FormGroup>
                            <ButtonGroup as={Col} xs={2} vertical>
                                <Button onClick={()=>handleRemove(idx)} size="sm" variant="secondary" disabled={idx===0}>-</Button>
                                <Button onClick={handleAdd} size="sm">+</Button>
                            </ButtonGroup>
                        </FormGroup>
                    </div>
                    )
                }
            </FormGroup>
    </Collapse>
    )
}