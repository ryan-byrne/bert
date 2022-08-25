import { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";

import {idToTitle, Statuses} from './Printing';

const settings = [
    "name", "link", "material", "layer_height", "infill", "color", "status"
]

const View = (props) => {

    const {printId} = useParams();

    const [print, setPrint] = useState(null);

    useEffect(()=>
        props.user.mongoClient("mongodb-atlas").db('betty').collection('3dprinting').findOne(
            {_id:{"$oid": printId}})
            .then( resp => setPrint(resp))
            .catch( err => setPrint({error:err}))
    ,[printId, props.user])

    return(
        <Modal show={props.show} centered onHide={props.handleHide}>
            <Modal.Header closeButton>
                <Modal.Title>Print ID: {printId}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {
                !print?"Loading Print Data...":
                print.error?`${print.error.statusText}: ${print.error.errorCode}`:
                <Table>
                    <tbody>
                        {settings.map((setting, idx)=>
                            <tr>
                                <th>{idToTitle(setting)}</th>
                                <td>{
                                    setting==='status'?
                                    <Button variant={Statuses[print[setting].id]} disabled>
                                        {idToTitle(print[setting].id)}
                                    </Button>:
                                    setting==='color'?
                                    <span style={{backgroundColor:print[setting]}}>{print[setting]}</span>:
                                    setting==="link"?
                                    <a href={print[setting]}>View the Model</a>:
                                    print[setting]
                                }</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            }
            </Modal.Body>

        </Modal>
    )
}

export default View;