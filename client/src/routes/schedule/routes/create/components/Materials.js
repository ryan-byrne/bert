import {Row, Badge, Col, Image, Button, FormGroup, FormControl, FloatingLabel, ListGroup, Collapse, CloseButton, ButtonGroup, Alert, OverlayTrigger, Tooltip, FormText} from 'react-bootstrap'
import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../../../../components/Loading'
import { Query } from '../../../../../components/GraphQL';
import SearchSelect from '../../../../../components/SearchSelect';

export default function Materials({payload, setPayload}){

  const [show, setShow] = useState(false);
  const [materials, setMaterials] = useState([]);

  const handleSelect = () => {}

  return(
    <FormGroup>
      <hr/>
      <Collapse in={show}>
        <FormGroup>
          <SearchSelect name="Materials" query queryName columns onSelect/>
        </FormGroup>
      </Collapse>
      <Row>
        <Button
          variant={show ? 'outline-primary' : 'primary'}
          onClick={()=>setShow(!show)}>
            {!show ? 'Add' : 'Hide'} Material(s) {materials.length > 0 ? `(${materials.length} Added)` : null}
        </Button>
      </Row>
    </FormGroup>
  )
}