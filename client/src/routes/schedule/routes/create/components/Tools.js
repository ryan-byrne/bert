import {Row, Badge, Col, Image, Button, FormGroup, FormControl, FloatingLabel, ListGroup, Collapse, CloseButton, ButtonGroup, Alert, OverlayTrigger, Tooltip, FormText} from 'react-bootstrap'
import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../../../../components/Loading'
import { Query } from '../../../../../components/GraphQL';

export const Tools = (props) => {

  const [show, setShow] = useState(false);
  const [allTools, setAllTools] = useState();
  const [tools, setTools] = useState([]);
  const [search, setSearch] = useState("")
  const [options, setOptions] = useState();

  useEffect(() => {
    if (!allTools || search.length < 3) setOptions(null)
    else setOptions(
      allTools.filter( t => [...t.keywords, t.brand, t.name].join(" ").toLowerCase().match(search.toLowerCase())
    ).filter(t=>t))
  }, [allTools, search]);

  useEffect(() => {
    setAllTools()
    Query(`
      query GetCalendar {
        getTools {
          _id
          name
          brand
          keywords
          quantity
          photo
          training {
            name
            completed
            id
          }
        }
      }
    `,{})
      .then( resp => resp.json()
      .then( data =>{
        if (data.error || !data.data) console.error(data)
        else setAllTools(data.data.getTools)
      } ) )
  }, []);

  const handleAdd = (e, tool) => {
    e.preventDefault();
    setSearch("");
    setTools([...tools, {...tool, requesting:1}])
  }

  const handleQuantity = (idx, amount) => {
    let prevTools = [...tools];
    prevTools[idx].requesting = prevTools[idx].requesting + amount;
    if (prevTools[idx].requesting == 0){
      prevTools.splice(idx, 1);
    }
    setTools(prevTools);
  }

  useEffect(() => props.setPayload({...props.payload, tools:tools.map(t=>({id:t._id, quantity:t.requesting}))}), [tools]);

  return (
    <FormGroup as={Row}>
      <hr/>
      <Collapse in={show}>
        <FormGroup className="mb-3">
          <FloatingLabel label="Search for a Tool...">
            <FormControl value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search for a Tool..."/>
          </FloatingLabel>
          <ListGroup style={{maxHeight:"200px", overflowY:"scroll"}}>
          {
            !options ? null :
            options.length === 0 ? <ListGroup.Item variant="warning">No tools found...</ListGroup.Item> :
            options.map( option =>
              !option.training ? null : 
              <ListGroup.Item
                disabled={tools.map(t=>t.id).includes(option._id) || !option.training.complete}
                id={option._id}
                action
                onClick={(e)=>handleAdd(e, option)}
              >
                <Row>
                  <Col xs={4} className="mt-auto mb-auto text-center"><Image width="80" src={option.photo}/></Col>
                  <Col className="mt-auto mb-auto" xs={8}>
                    <div>{option.brand} {option.name}</div>
                    {
                      option.training.complete ? null :
                      <FormText>
                        <span>&#9888;</span> {option.training.name} Training Not Completed
                      </FormText>
                    }
                  </Col>
                </Row>
              </ListGroup.Item>
            )
          }
          </ListGroup>
          <FormGroup className="mt-3">
          {
              tools.map((tool, idx)=>
                <FormGroup as={Row} className="mt-1">
                  <Col xs={3} className="mt-auto mb-auto text-center">
                    <Image width="50" src={tool.photo}/>
                  </Col>
                  <Col 
                    xs={6} 
                    as={Alert}
                    variant='primary' 
                    className="mt-auto mb-auto text-center">
                    <FormGroup>
                      <div>{tool.brand} {tool.name}</div>
                    </FormGroup>
                  </Col>
                  <Col xs={3} className="mt-auto mb-auto">
                    <ButtonGroup>
                      <Button size="sm" onClick={()=>handleQuantity(idx, -1)} variant={tool.requesting == "1" ? "danger": "primary"}>-</Button>
                      <Button size="sm" disabled variant="outline-primary">{tool.requesting}</Button>
                      <Button size="sm" onClick={()=>handleQuantity(idx, 1)} disabled={tool.requesting === tool.quantity}>+</Button>
                    </ButtonGroup>
                  </Col>
                </FormGroup>
              )
            }
          </FormGroup>
        </FormGroup>
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
