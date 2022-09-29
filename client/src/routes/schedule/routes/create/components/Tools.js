import {Row, Badge, Col, Image, Button, FormGroup, FormControl, FloatingLabel, ListGroup, Collapse, CloseButton, ButtonGroup, Alert, OverlayTrigger, Tooltip, FormText} from 'react-bootstrap'
import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../../../../components/Loading'
import { Query } from '../../../../../components/GraphQL';
import SearchSelect from '../../../../../components/SearchSelect';

export const Tools = (props) => {

  const [show, setShow] = useState(false);
  const [tools, setTools] = useState([]);

  const handleQuantity = (idx, amount) => {
    let prevTools = [...tools];
    prevTools[idx].requesting = prevTools[idx].requesting + amount;
    if (prevTools[idx].requesting == 0){
      prevTools.splice(idx, 1);
    }
    setTools(prevTools);
  }

  useEffect(() => props.setPayload({...props.payload, tools:tools.map(t=>({id:t._id, quantity:t.requesting}))}), [tools]);

  const handleAdd = (tool) => setTools([...tools, {...tool, requesting:1}])

  const toolQuery = `
    query ToolSearch($text: String!) {
      toolSearch(text: $text) {
        _id
        brand
        name
        quantity
        photo
        training {
          demo
          demo_completed
        }
      }
    }
  `

  const notAuthorized = (tool) => tool.training.demo && !tool.training.demo_completed

  return (
    <FormGroup as={Row}>
      <hr/>
      <ListGroup>
      {
        tools.map( (tool, idx) =>
          <ListGroup.Item variant={notAuthorized(tool) ? 'warning' : 'light'}>
            <Row key={idx}>
              <Col xs={8} className="mt-auto mb-auto">
                <div>{ notAuthorized(tool) ? <span>&#9888;</span> : null} {tool.brand} {tool.name}</div>
                <div>{ notAuthorized(tool) ? <FormText>Not an Authorized User</FormText> : null}</div>
              </Col>
              <Col xs={2} className="mt-auto mb-auto">
                <ButtonGroup>
                  <Button variant={tool.requesting === 1 ? 'danger' : 'primary'} onClick={()=>handleQuantity(idx, -1)}>-</Button>
                  <Button disabled>{tool.requesting}</Button>
                  <Button disabled={tool.requesting === tool.quantity} onClick={()=>handleQuantity(idx, 1)}>+</Button>
                </ButtonGroup>
              </Col>
            </Row>
          </ListGroup.Item>
        )
      }
      </ListGroup>
      <Collapse in={show}>
        <div>
          <SearchSelect name="Tools" query={toolQuery} queryName="toolSearch" columns={['photo','brand','name']} onSelect={(tool)=>handleAdd(tool)}/>
        </div>
      </Collapse>
      <Button
        onClick={()=>setShow(!show)} 
        variant={show?'outline-primary':'primary'} >
          {!show ? 'Add' : 'Hide'} Tool(s) {tools.length > 0 ? `(${tools.length} Added)` : ""}
      </Button>
    </FormGroup>
  )
}

export default Tools
