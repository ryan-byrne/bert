import { useEffect, useState } from "react";
import { FloatingLabel, Form, FormControl, FormGroup } from "react-bootstrap"
import { Query } from "../../../../../components/GraphQL";

export default ({times}) => {

    const [tools, setTools] = useState([]);
    const [searching, setSearching] = useState(false);
    const [search, setSearch] = useState("");

    useEffect(()=>{

        if ( search.length < 3 ) return

        const getAvailability = async (start, end) => await Query(`
            query FindTool ($search: String, $start: String, $end: String){
                toolAvailability (search: $search, start: $start, end: $end) {
                quantity
                tool {
                    name
                    brand
                    photo
                }
                }
            }
        `,{search,start,end})

        const toolAvailability = {}

        times.map( async time => {
            try {
                const resp = await getAvailability(time.start, time.end)
                const body = await resp.json();
                body.data.toolAvailability.map( tool )
            } catch (e) {
                console.error(e);
            }
            console.log(body);
        })

        /*
        var [hr, min] = options.start.split(':')
        start.setHours(hr, min, 0, 0);
        var [hr, min] = options.end.split(':');
        end.setHours(hr, min, 0, 0);
        console.log(start, end);
        
        */
    },[setTools, search, times])

    // TODO

    return(
        <div className="mt-3">
            <Form.Text>Tool Reservations Coming Soon!</Form.Text>
        </div>
    )
}