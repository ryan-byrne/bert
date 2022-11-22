import {Row, Badge, Col, Image, Button, FormGroup, FormControl, FloatingLabel, ListGroup, Collapse, CloseButton, ButtonGroup, Alert, OverlayTrigger, Tooltip, FormText, Form, ToggleButtonGroup, ToggleButton} from 'react-bootstrap'
import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../../../../components/Loading'
import { Query } from '../../../../../components/GraphQL';
import SearchSelect from '../../../../../components/SearchSelect';

export default function Materials({payload, setPayload}){

  const [show, setShow] = useState(false);
  const [mode, setMode] = useState();
  const [submitting, setSubmitting] = useState("error");
  const [materialPayload, setMaterialPayload] = useState({
    material:"",
    description:"",
    dimensions:[
      {dimension:"",value:0.0,unit:"in"}
    ],
    vendor:"",
    link:"",
    id:"",
    photo:"",
  });
  const [materials, setMaterials] = useState([]);

  const handleSelect = (m) => setMaterials([...materials, m]);

  const handleAddChange = (e) => setMaterialPayload({...materialPayload, [e.target.id]:e.target.value});

  const handleAddDimension = () => setMaterialPayload({
    ...materialPayload, dimensions:[...materialPayload.dimensions, {dimension:"",value:0.0,unit:"in"}]
  })

  // TODO
  const handleRemoveDimension = (index) => {
    let prevPayload = {...materialPayload};
    let newDim = [...prevPayload.dimensions].splice(index, 1);
    setMaterialPayload({...materialPayload, dimensions:newDim})
  };

  // TODO
  const handleSubmit = () => {
    setSubmitting(true)
    Query(``,)
    console.log(materialPayload);
  }

  const handleDimension = (index, key, value) => {
    let prevPayload = {...materialPayload};
    prevPayload.dimensions[index][key] = value;
    setMaterialPayload(prevPayload)
  }

  const materialQuery = `
  query Query($text: String!) {
    materialSearch(text: $text) {
      description
      material
      photo
      unit_price
      link
    }
  }
  `

  return(
    <FormGroup>
      <Row>
        <Button
          variant={show ? 'outline-primary' : 'primary'}
          onClick={()=>setShow(!show)}>
            {!show ? 'Show' : 'Hide'} Materials {`(${materials.length} Added)`}
        </Button>
      </Row>
      <Collapse in={show}>
        <Row className="mt-3">
          <ToggleButtonGroup type="radio" name="mode" onChange={(m)=>setMode(m)}>
            <ToggleButton id="search-existing" value="search" variant="outline-primary">
              Search for Existing Material
            </ToggleButton>
            <ToggleButton id="add-new" value="add" variant="outline-primary">
              Add New Material
            </ToggleButton>
          </ToggleButtonGroup>
        </Row>
      </Collapse>
      <Collapse in={mode==='add'}>
        <FormGroup>
          {
            submitting === true ? <Loading>Submitting Material...</Loading> :
            submitting === 'error' ? <Alert variant="danger">Something went wrong...</Alert> :
            Object.keys(materialPayload).map( (key, idx) =>
            <FormGroup className="mt-1">
              <Form.Text>{key.toUpperCase()}:</Form.Text>
              {
                key !== 'dimensions' ? <Form.Control value={materialPayload[key]} id={key} onChange={handleAddChange}/> :
                <div>
                  { materialPayload.dimensions.map( (dimension, didx) =>
                    <FormGroup>
                      <Row>
                        <Col xs={4}>
                          <Form.Select onChange={(o)=>handleDimension(didx, 'dimension', o.target.value)}>
                            <option>Height</option>
                            <option>Width</option>
                            <option>Tickness</option>
                            <option>Diameter</option>
                            <option>Radius</option>
                          </Form.Select>
                        </Col>
                        <Col>
                          <Form.Control value={dimension.value} type="number" onChange={(o)=>handleDimension(didx, 'value', o.target.value)}/>
                        </Col>
                        <Col>
                          <Form.Select onChange={(o)=>handleDimension(didx, 'unit', o.target.value)}>
                            <option>mm</option>
                            <option>cm</option>
                            <option>m</option>
                            <option>in</option>
                            <option>ft</option>
                          </Form.Select>
                        </Col>
                        <Col xs={1}>
                          {
                            didx === 0 ? null :
                            <CloseButton onClick={()=>handleRemoveDimension(didx)}/>
                          }
                        </Col>
                      </Row>
                    </FormGroup>
                  )}
                  <Row>
                    <Button className="mt-1" onClick={handleAddDimension}>Add Dimension</Button>
                  </Row>
                </div>
              }
            </FormGroup>
          )}
          <Row className="mt-3">
            <Button 
              onClick={handleSubmit}
              disabled={submitting}
            >Submit Material</Button>
          </Row>
        </FormGroup>
      </Collapse>
      <Collapse in={mode==='search'}>
        <FormGroup>
          <SearchSelect
            query={materialQuery}
            onSelect={handleSelect}
            name="Material"
            queryName="materialSearch"
            columns={['picture','material','description']}
          />
        </FormGroup>
      </Collapse>
      {
        materials.map( material =>
          <div>{material.description}</div>
        )
      }
      <hr/>
    </FormGroup>
  )
}