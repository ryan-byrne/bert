import { useEffect, useState } from "react"
import { Button, Collapse, Container, Form, Modal, Row, Col, Table, Alert, ButtonGroup } from "react-bootstrap"
import {Outlet, useNavigate, useParams, Link} from 'react-router-dom'

import '../../styles/printing.css'

import Request from './Request';
import View from './View';

const Statuses = {
    "pending_approval":"outline-info",
    "denied":"danger",
    "pending_print":"warning",
    "currently_printing":"outline-info",
    "ready_for_pickup":"success",
    "picked_up":"outline-secondary"
}

const idToTitle = (id) => id.split('_').map(w=>(w[0].toUpperCase()+w.slice(1))).join(" ")

const Printing = (props) => {

    const navigate = useNavigate();
    const [prints, setPrints] = useState(null);

    useEffect(()=>props.user.mongoClient('mongodb-atlas').db('betty').collection('3dprinting').find()
        .then( resp => setPrints(resp) )
        .catch( err => console.error(err) )
    ,[props.user])

    const handleHide = () => navigate("/printing")

    return(
        <>
            <Container className="printer-container mt-5">
                <Row xs={2} md={3} lg={5} className="justify-content-center mt-3 mb-3">
                    <Col className="text-center mt-auto mb-auto">
                        <Button variant="outline-secondary" href={`/#/learn/printing`}>Learn About 3D Printing</Button>
                    </Col>
                    <Col className="text-center mt-auto mb-auto">
                        <Button variant="outline-info" href={`/#/printing/request`}>Request a 3D Print</Button>
                    </Col>
                </Row>
                {
                <Table variant="dark" style={{maxWidth:"600px", textAlign:"center"}} checkered>
                    <thead>
                    <tr><th>Print Name</th><th>Requested On</th><th>Last Updated</th><th>Current Status</th></tr>
                    </thead>
                    <tbody>
                    {
                    !prints?<tr><td colSpan={4}><div>Loading...</div></td></tr>:
                    prints.length===0?<tr><td colSpan={4}><Alert variant="warning">No prints. <Link to="request">Request One</Link></Alert></td></tr>:
                    prints.map((print, idx)=>
                        <tr>
                            <td>{print.name}</td>
                            <td>{print.requested_on.toLocaleDateString('en-US')}</td>
                            <td>{print.status.updated.toLocaleDateString('en-US')}</td>
                            <td>
                                <Button variant={Statuses[print.status.id]} size="sm" href={`/#/printing/${print._id.toString()}`}>
                                    {idToTitle(print.status.id)}
                                </Button>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </Table>
                }
                
            </Container>
            <Request show={props.request} user={props.user} handleHide={handleHide}/>
            <View show={props.viewing} user={props.user} handleHide={handleHide}/>
            <Outlet/>
        </>

    )
}
export {Statuses, idToTitle};
export default Printing;