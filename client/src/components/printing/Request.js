import { useEffect, useState } from "react"
import { Button, Collapse, Container, Form, Modal, Row, Col, Table, Alert, Offcanvas, FloatingLabel } from "react-bootstrap"
import {Outlet, useNavigate, useParams, Link} from 'react-router-dom'

const layerHeightOptions = [
    "0.08mm (Super Detail)",
    "0.10mm (High Detial)",
    "0.12mm (Detail)",
    "0.16mm (Optimal)",
    "0.20mm (Normal)",
    "0.24mm (Draft)",
    "0.28mm (Super Draft)",
]

const infillOptions = [
"5%",
"10%",
"15%",
"20%",
"25%",
"30%",
"40%",
"50%",
"60%",
"70%",
"80%",
"90%",
"100%",
]

const materialOptions = [
"ABS",
"PLA",
"EPA",
"TPU"
]


const Request = (props) => {

    const navigate = useNavigate()

    const [payload, setPayload] = useState({
        scale:1.0, color:"#000000",material:"PLA",file:"", layer_height:"0.20mm (Normal)", infill:"10%", name:""
    });

    const [status, setStatus] = useState()

    const handleSubmit = () => {
        //setStatus(<Loading text="Submitting Print Request..."/>)
        props.user.functions.submitPrintRequest(payload)
            .then( resp =>  setStatus("Print Request Successfully Submitted"))
            .catch( err => setStatus(err.message) )
    }

    const handleChange = (e) => setPayload({...payload, [e.target.id]:e.target.value})

    const handleSelect = (e) => setPayload({...payload, [e.target.id]:e.currentTarget.value})

    return(
        <Offcanvas show={props.show} onHide={props.handleHide}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Request a 3D Print</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <hr/>
                <p>
                    For more information on 3D Printing, check out <a href="/#/learn/printing">Bert's 3D Printing Guide</a>
                </p>
                <hr/>
                <Form>
                    <Form.Group className="mt-3">
                        <FloatingLabel label="Name for your print">
                            <Form.Control value={payload.name} onChange={handleChange} id="name" placeholder="My Print"/>
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <Form.Control value={payload.file} onChange={handleChange} id="file" type="file"/>
                    </Form.Group>
                    <hr/>
                    <Form.Group as={Row} className="mt-3">
                        <Col>
                            <FloatingLabel label="Layer Height">
                                <Form.Control as="select" id="layer_height" onChange={handleSelect} value={payload.layer_height}>
                                    {layerHeightOptions.map((l,i)=><option key={i}>{l}</option>)}
                                </Form.Control>
                            </FloatingLabel>
                        </Col>
                        <Col>
                            <FloatingLabel label="Infill">
                                <Form.Control as="select" id="infill" onChange={handleSelect} value={payload.infill}>
                                    {infillOptions.map((i, x)=><option key={x}>{i}</option>)}
                                </Form.Control>
                            </FloatingLabel>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mt-3">
                        <Col>
                            <FloatingLabel label="Select a Material">
                                <Form.Control as="select" id="material" onChange={handleSelect} value={payload.material}>
                                    {materialOptions.map((m, i)=><option key={i}>{m}</option>)}
                                </Form.Control>
                            </FloatingLabel>
                        </Col>
                        <Col>
                            <Row className="text-center justify-content-center">
                                <Form.Text>Select a Color</Form.Text>
                                <Form.Control type="color" onChange={handleChange} id="color" value={payload.color}/>
                            </Row>
                        </Col>
                    </Form.Group>
                    <hr/>
                    <div className="print-request-footer">
                        {status}
                        <Button onClick={props.handleHide} variant="secondary">Close</Button>
                        <Button onClick={handleSubmit} className="m-1">Submit</Button>
                    </div>
                </Form>
            </Offcanvas.Body>
        </Offcanvas>
    )
}

export default Request;