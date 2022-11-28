import {Row, Badge, Col, Image, Button, FormGroup, FormControl, FloatingLabel, ListGroup, Collapse, CloseButton, ButtonGroup, Alert, OverlayTrigger, Tooltip, FormText, Form, ToggleButtonGroup, ToggleButton} from 'react-bootstrap'
import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../../../../components/Loading'
import { Query } from '../../../../../components/GraphQL';
import SearchSelect from '../../../../../components/SearchSelect';

export default function Materials({payload, setPayload}){

  const [show, setShow] = useState(false);
  const [mode, setMode] = useState();
  const [submitting, setSubmitting] = useState(false);
  const [ready, setReady] = useState(false);
  const [materialPayload, setMaterialPayload] = useState({
    description:"",
    material:"",
    dimensions:[
      {dimension:"Height",value:"",unit:"in"}
    ],
    id:"",
    available:0,
    unit_price:"",
    vendor:"",
    link:"",
    photo:"",
  });
  const [materials, setMaterials] = useState([]);

  const handleSelect = (m) => setMaterials([...materials, {...m, quantity:1}]);

  const handleRemove = (e) => {
    let prevMaterials = [...materials];
    prevMaterials.splice(e.target.id, 1);
    setMaterials(prevMaterials)
  }

  const handleAddChange = (e) => setMaterialPayload({...materialPayload, [e.target.id]:e.target.value});

  const handleAddDimension = () => setMaterialPayload({
    ...materialPayload, dimensions:[...materialPayload.dimensions, {dimension:"Height",value:"",unit:"in"}]
  })

  const handleRemoveDimension = (index) => {
    let prevDimensions = [...materialPayload.dimensions]
    prevDimensions.splice(index, 1)
    setMaterialPayload({...materialPayload, dimensions:prevDimensions})
  };

  const handleSubmit = () => {
    setSubmitting(true)
    Query(`
    mutation Mutation($material: String!, $description: String!, $dimensions: [MaterialDimension!]!, $id: String!, $photo: String, $vendor: String, $link: String, $unitPrice: Float) {
      addMaterial(material: $material, description: $description, dimensions: $dimensions, id: $id, photo: $photo, vendor: $vendor, link: $link, unit_price: $unitPrice) {
        _id
        available
        description
        dimensions {
          dimension
          unit
          value
        }
        id
        link
        material
        photo
        unit_price
        vendor
      }
    }
    `,{...materialPayload})
      .then( resp => resp.json() )
      .then( data => {
        if (data.errors) {
          setSubmitting("error");
          console.error(data.errors);
        } else {
          setSubmitting(false);
          handleSelect(data.data.addMaterial);
          setMode()
        }
      } )
      .catch(err=>{
        console.error(err)
        setSubmitting('error')
      })
  }

  const handleDimension = (index, key, value) => {
    let prevPayload = {...materialPayload};
    prevPayload.dimensions[index][key] = value;
    setMaterialPayload(prevPayload)
  }

  const handleQuantity = (e) => {
    let prevMaterials = [...materials]
    prevMaterials[e.target.id].quantity = parseInt(e.target.value);
    setMaterials(prevMaterials)
  }

  const materialQuery = `
  query Query($text: String!) {
    materialSearch(text: $text) {
      available
      description
      dimensions {
        dimension
        unit
        value
      }
      id
      link
      material
      photo
      unit_price
      vendor
    }
  }
  `
  useEffect(() => setReady(
      materialPayload.material.length > 2 &&
      materialPayload.description.length > 5 &&
      materialPayload.id.length > 0 &&
      !materialPayload.dimensions.map( dim => Object.values(dim) ).flat().includes("")
    )
  , [materialPayload]);

  useEffect(() => {
    if (submitting === 'error'){
      setTimeout(()=>setSubmitting(false),3000)
    }
  }, [submitting]);

  useEffect(() => setPayload({...payload, materials:materials.map(m=>({id:m.id, quantity:m.quantity}))}), [materials]);

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
              <Row>
                <Col xs={1} className="mt-auto mb-auto">
                  &#128270;
                </Col>
                <Col>
                  Search for Existing Material
                </Col>
              </Row>
            </ToggleButton>
            <ToggleButton id="add-new" value="add" variant="outline-success">
              <Row>
                <Col xs={1} className="mt-auto mb-auto">
                  &#10133;
                </Col>
                <Col>
                  Add New Material
                </Col>
              </Row>
            </ToggleButton>
          </ToggleButtonGroup>
          <Collapse in={mode==='add'}>
            <FormGroup className="p-3 bg-success">
              <FormGroup className="text-center">
                <Form.Text className="text-danger">* </Form.Text>
                <Form.Text className="text-light">= Required</Form.Text>
              </FormGroup>
              {
                submitting === true ? <Loading>Submitting Material...</Loading> :
                submitting === 'error' ? <Alert variant="danger">Something went wrong...</Alert> :
                Object.keys(materialPayload).map( (key, idx) =>
                <FormGroup className="m-1">
                  <Form.Text className="text-light">
                    {key.slice(0,1).toUpperCase()}{key.slice(1,key.length)}:
                    {
                      ['material','dimensions','description', 'id', 'available'].includes(key) ?
                      <Form.Text className="text-danger"> *</Form.Text> : null
                    }
                  </Form.Text>
                  {
                    key !== 'dimensions' ? 
                    <Form.Control type={['unit_price','available'].includes(key) ? 'number' : 'text'} value={materialPayload[key]} id={key} onChange={handleAddChange}/> :
                    <div>
                      { materialPayload.dimensions.map( (dimension, didx) =>
                        <FormGroup className="mt-1">
                          <Row>
                            <Col xs={1}>
                              {
                                didx === 0 ? null :
                                <CloseButton onClick={()=>handleRemoveDimension(didx)}/>
                              }
                            </Col>
                            <Col xs={4}>
                              <Form.Select onChange={(o)=>handleDimension(didx, 'dimension', o.target.value)}>
                                <option>Height</option>
                                <option>Width</option>
                                <option>Thickness</option>
                                <option>Length</option>
                                <option>Diameter</option>
                                <option>Radius</option>
                              </Form.Select>
                            </Col>
                            <Col xs={4}>
                              <Form.Control type="number" value={dimension.value} onChange={(o)=>handleDimension(didx, 'value', o.target.value)}/>
                            </Col>
                            <Col xs={3}>
                              <Form.Select onChange={(o)=>handleDimension(didx, 'unit', o.target.value)}>
                                <option>in</option>
                                <option>ft</option>
                                <option>mm</option>
                                <option>cm</option>
                                <option>m</option>
                              </Form.Select>
                            </Col>
                          </Row>
                        </FormGroup>
                      )}
                      <Row className="m-3">
                        <Button onClick={handleAddDimension} variant="outline-light">Add Dimension</Button>
                      </Row>
                    </div>
                  }
                </FormGroup>
              )}
              <Row className="mt-3">
                <Button onClick={handleSubmit} disabled={submitting || !ready} variant="outline-light">
                  Submit Material
                </Button>
              </Row>
            </FormGroup>
          </Collapse>
          <Collapse in={mode==='search'}>
            <FormGroup className="bg-primary p-3">
              <SearchSelect
                query={materialQuery}
                onSelect={handleSelect}
                name="Material"
                queryName="materialSearch"
                columns={['photo', 'description']}
              />
            </FormGroup>
          </Collapse>
          <FormGroup className="mt-3">
            {
              materials.map( (material, idx) =>
                <Alert variant={material.quantity > material.available ? "warning" : "primary"}>
                  <Row>
                    <Col xs={1} className="mt-auto mb-auto">
                      <CloseButton id={`${idx}`} onClick={handleRemove}/>
                    </Col>
                    <Col xs={4}>
                      <Image style={{maxWidth:"100px"}} height="100" src={material.photo}/>
                    </Col>
                    <FormGroup as={Col} className="mt-auto mb-auto">
                      <Form.Text>
                        {material.description}
                      </Form.Text>
                    </FormGroup>
                    <FormGroup as={Col} xs={3} className="mt-auto mb-auto">
                      
                      <Form.Text style={{fontSize:"10px"}}>Quantity:</Form.Text>
                      <Form.Control type="number" id={`${idx}`} min="1" value={material.quantity} onChange={handleQuantity}/>
                      <div style={{fontSize:"10px"}}>
                        <div>
                          <Form.Text >Available: {material.available}</Form.Text>
                        </div>
                        <div>
                          {
                            material.quantity > material.available ?
                              <Form.Text>&#9888; Must be ordered</Form.Text> : null
                          }
                          </div>
                      </div>
                      

                    </FormGroup>
                  </Row>
                </Alert>
              )
            }
          </FormGroup>
        </Row>
      </Collapse>
      <hr/>
    </FormGroup>
  )
}