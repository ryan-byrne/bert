import {Row, Badge, Col, Image, Button, FormGroup, FormControl, FloatingLabel, ListGroup, Collapse, CloseButton, ButtonGroup, Alert, OverlayTrigger, Tooltip, FormText} from 'react-bootstrap'
import {useState, useEffect} from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import Loading from '../../../../components/Loading'
import { Query } from '../../../../components/GraphQL';
import SearchSelect from '../../../../components/SearchSelect';

export const Tools = ({payload, setPayload, enabled}) => {

  const [show, setShow] = useState(false);
  const [tools, setTools] = useState(payload.tools);
  const search = useLocation().search
  const id = new URLSearchParams(search).get('tool');

  const handleQuantity = (idx, amount) => {
    let prevTools = [...tools];
    prevTools[idx].reserved = prevTools[idx].reserved + amount;
    if (prevTools[idx].reserved === 0){
      prevTools.splice(idx, 1);
    }
    setTools(prevTools);
  }

  const handleAdd = (tool) => setTools([...tools, {tool, reserved:1}]);

  const notAuthorized = (tool) =>  !tool.training.completed || (tool.training.demo && !tool.training.demo_completed)

  // TODO: Fix
  useEffect(() => {
    /*
    if (!id) return
    Query(`
    query GetTool($id: String!) {
      getTool(id: $id) {
        _id
        training {
          completed
          demo
          demo_completed
        }
        photo
        name
        brand
        quantity
      }
    }
    `, {id})
      .then( resp => resp.json() )
      .then( data => setPayload((payload)=>({...payload, tools:data.data.getTool})) )
    */
  }, [id]);

  useEffect(() => setPayload((payload)=>({...payload, tools:tools.map(t=>({id:t.tool._id, quantity:t.reserved}))})), [tools, setPayload]);

  const toolQuery = `
    query ToolSearch($search: String!) {
      tools(search: $search) {
        _id
        brand
        name
        quantity
        photo
        training {
          completed
          demo
          demo_completed
        }
      }
    }
  `

  return (
    <FormGroup as={Row}>
      <Button
        onClick={()=>setShow(!show)} 
        variant={show?'outline-primary':'primary'} >
          {!show ? 'Show' : 'Hide'} Tools {`(${payload.tools.length} Added)`}
      </Button>
      <Collapse in={show}>
        <div>
          <SearchSelect name="Tools" query={toolQuery} queryName="tools" columns={['photo','brand','name']} onSelect={(tool)=>handleAdd(tool)} disabled={!enabled}/>
          <ListGroup>
            {
              tools.map( (toolRes, idx) =>
                <ListGroup.Item variant={notAuthorized(toolRes.tool) ? 'warning' : 'light'}>
                  <Row key={idx}>
                    <Col xs={8} className="mt-auto mb-auto">
                      <div>{ notAuthorized(toolRes.tool) ? <span>&#9888;</span> : null} {toolRes.tool.brand} {toolRes.tool.name}</div>
                      <div>{ notAuthorized(toolRes.tool) ? <FormText>Not an Authorized User</FormText> : null}</div>
                    </Col>
                    <Col xs={2} className="mt-auto mb-auto">
                      <ButtonGroup>
                        <Button disabled={!enabled} variant={toolRes.reserved === 1 ? 'danger' : 'primary'} onClick={()=>handleQuantity(idx, -1)}>-</Button>
                        <Button disabled>{toolRes.reserved}</Button>
                        <Button disabled={toolRes.reserved === toolRes.quantity || !enabled} onClick={()=>handleQuantity(idx, 1)}>+</Button>
                      </ButtonGroup>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )
            }
          </ListGroup>
        </div>
      </Collapse>
      <hr className="mt-3"/>
    </FormGroup>
  )
}

export default Tools
