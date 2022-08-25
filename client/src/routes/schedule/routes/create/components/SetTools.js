import { useEffect, useState } from "react";
import { FloatingLabel, Form, FormControl, FormGroup } from "react-bootstrap"
import { Query } from "../../../../../components/GraphQL";

export default ({times}) => {

    const [tools, setTools] = useState([]);
    const [searching, setSearching] = useState(false);
    const [search, setSearch] = useState("");

    // TODO

    return(
        <div className="mt-3">
            <Form.Text>Tool Reservations Coming Soon!</Form.Text>
        </div>
    )
}