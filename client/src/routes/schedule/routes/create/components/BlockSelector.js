import { useState, useEffect } from "react";
import { FormSelect } from "react-bootstrap";
import {Query} from '../../../../../components/GraphQL';

const MSBlocks = ({date, handleChange}) => {

    const [options, setOptions] = useState([]);

    useEffect(()=>{
        if (date==='') setOptions([{name:"Select a Date",start:null, end:null}])
        else {
            const d = new Date(date);
            d.setHours(0,0,0,0);
            const days = ['Monday','Tuesday','Wednesday','Thursday','Friday']
            Query(`
            query MSBlocks($day: String, $division: String) {
                block(day: $day, division: $division) {
                  name
                  start
                  end
                }
            }`,{day:days[d.getDay()], division:'middle'})
                .then(resp => resp.json()
                    .then(data=>setOptions(data.data.block))
                )
                .catch(err => console.error(err))
        }
    },[date, setOptions]);

    return (
        <FormSelect onChange={handleChange} multiple size="30" className="mt-3">
            {options.map( (option, idx) =>
                <option key={idx} disabled={!option.start} value={`${option.name}-${option.start}-${option.end}`}>
                    {option.name} ({option.start} - {option.end})
                </option>
            )}
        </FormSelect>
    )
}

const USBlocks = ({date, handleChange}) => {
    return (
        <div>Upper School</div>
    )
}

export {MSBlocks, USBlocks}