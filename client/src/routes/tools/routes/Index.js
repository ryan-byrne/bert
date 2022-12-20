import {Table, Alert, Image, Badge, FormGroup, Button, FormControl, Row, Collapse, Col, Container, ToggleButtonGroup, ToggleButton, FormText, ButtonGroup, Form, DropdownButton} from 'react-bootstrap'
import {useState, useEffect} from 'react';
import {Link, useLocation, useNavigate, useParams} from 'react-router-dom';
import { Query } from '../../../components/GraphQL';
import Loading from '../../../components/Loading';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import Viewer from './Viewer';
import { Demo } from './Demo';

export const Index = ({view, demo}) => {

  const id = useParams().id

  const [tools, setTools] = useState();
  // Keyword Filters
  const [material, setMaterial] = useState();
  const [category, setCategory] = useState();
  const [skillLevel, setSkillLevel] = useState();
  const [location, setLocation] = useState();
  
  const navigate = useNavigate();

  const search = useLocation().search

  useEffect(() => {
    const params = new URLSearchParams(search);
    const loc = params.get("location")
    if ( !loc ) return
    else setLocation(loc)
  }, [search, setLocation]);

  useEffect(() => {
    const now = new Date();
    const soon = new Date();
    soon.setMinutes( soon.getMinutes() + 1 )
    setTools();
    const keywords = [category, material, skillLevel].filter(k=>k).map(k=>k.toLowerCase())
    Query(`
    query getTools($keywords: [String!], $locations: [EventLocation!], $timeMax:Date!, $timeMin:Date!) {
      tools(keywords: $keywords, locations: $locations) {
        _id
        name
        brand
        photo
        quantity
        available(timeMin:$timeMin, timeMax:$timeMax)
        training {
          id
          demo_completed
          demo
          completed
        }
      }
    }
    `,{
      keywords: keywords.length === 0 ? null : keywords, 
      locations:location ? location.toLowerCase().replace(" ", "") : null, 
      timeMin:now, 
      timeMax:soon
    })
      .then(resp=>resp.json())
      .then(query=>{
        if (query.errors) console.error(query.errors)
        else setTools(query.data.tools)
      })
  }, [category, material, skillLevel, location]);

  const Filter = ({name, value, onChange, options}) =>
    <FormGroup>
      <FormText>{name}</FormText>
      <FormGroup>
        <DropdownButton id={name} as={ButtonGroup} size="sm" variant="dark" title={value ? value : "Any"}>
          <DropdownItem onClick={(e)=>onChange()} eventKey={0} id={`${name}-any`}>Any</DropdownItem>
          {options.map((option, idx)=>
            <DropdownItem onClick={(e)=>onChange(e.target.id)} eventKey={idx+1} id={`${option}`}>
              {option}
            </DropdownItem>
          )}
        </DropdownButton>
      </FormGroup>
    </FormGroup>

  return (
    <div>
      <Viewer id={id} show={view}/>
      <Demo id={id} show={demo} onHide={()=>navigate("/tools")}/>
      <Row className="m-1 justify-content-center">
        <Col xs={4} md={2} lg={1}>
          <Filter 
            name="Category" 
            value={category} 
            onChange={(v)=>setCategory(v)} 
            options={["Cutting", "Sanding", "Fastening", "3D Printing", "Laser Cutting"]}
          />
        </Col>
        <Col xs={4} md={2} lg={1}>
          <Filter 
              name="Material" 
              value={material} 
              onChange={(v)=>setMaterial(v)} 
              options={["Wood", "Metal", "Plastic"]}
            />
        </Col>
        <Col xs={4} md={2} lg={1}>
          <Filter 
              name="Location" 
              value={location} 
              onChange={(l)=>setLocation(l)} 
              options={["Classroom", "Power Tool", "Machine Shop"]}
            />
        </Col>
        <Col xs={4} md={2} lg={1}>
          <Filter 
              name="Skill Level" 
              value={skillLevel} 
              onChange={(v)=>setSkillLevel(v)} 
              options={["Basic", "Advanced", "Expert"]}
            />
        </Col>
      </Row>

      <Row className="justify-content-center m-1">
          <Col xs={12} md={8} lg={4} className="mt-3">
              {
                  !tools ? <Loading>Loading Tool Data...</Loading> :
                  tools.length === 0 ? <Alert variant="warning">No tools fit your criteria.</Alert> :
                    <Table variant="dark" size="sm" hover>
                      <thead>
                        <tr>
                          <th></th>
                          <th>Name</th>
                          <th></th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {tools.map( (tool, idx) =>
                          <tr onClick={()=>navigate(`/tools/view/${tool._id}`)} style={{cursor:"pointer"}}>
                            <td className="text-center"><Image src={tool.photo} height="50"/></td>
                            <td>{tool.brand} {tool.name}</td>
                            <td>
                              <Badge
                                bg={
                                  !tool.training ? "secondary" :
                                  tool.training.demo && tool.training.demo_completed ? "success" :
                                  tool.training.completed && tool.training.demo ? "warning" :
                                  !tool.training.completed ? "danger" : "success"
                                }
                              >
                                {
                                  !tool.training ? "N/A" :
                                  tool.training.demo && tool.training.demo_completed ? "Authorized" :
                                  tool.training.completed && tool.training.demo ? "Demo Missing" :
                                  !tool.training.completed ? "Not Authorized" : "Authorized"
                                }
                              </Badge>
                            </td>
                            <td><Badge bg={tool.available === 0 ? 'danger':'success'} size="sm">{tool.available} Available</Badge></td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
            }
          </Col>
      </Row>

  </div>
  )
}