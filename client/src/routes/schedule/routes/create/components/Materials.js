import {Row, Badge, Col, Image, Button, FormGroup, FormControl, FloatingLabel, ListGroup, Collapse, CloseButton, ButtonGroup, Alert, OverlayTrigger, Tooltip, FormText} from 'react-bootstrap'
import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../../../../components/Loading'
import { Query } from '../../../../../components/GraphQL';
import SearchSelect from '../../../../../components/SearchSelect';

export default function Materials({payload, setPayload}){

  const [show, setShow] = useState(false);
  const [materials, setMaterials] = useState([]);

  const handleSelect = (m) => setMaterials([...materials, m]);

  const materialQuery = `
  query Query($text: String!) {
    materialSearch(text: $text) {
      description
      material
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
        <FormGroup>
          <SearchSelect 
            name="Material" 
            query={materialQuery} 
            queryName="materialSearch" 
            columns={['description']} onSelect={handleSelect}/>
        </FormGroup>
      </Collapse>
      <hr/>
    </FormGroup>
  )
}