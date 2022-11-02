import {Table, Alert, Image, Badge, FormGroup, Button, FormControl, Row, Collapse, Col, Container, ToggleButtonGroup, ToggleButton, FormText, ButtonGroup, Form} from 'react-bootstrap'
import {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { Query } from '../../../components/GraphQL';
import Loading from '../../../components/Loading';

export const Index = () => {

  const [tools, setTools] = useState();
  // Keyword Filters
  const [material, setMaterial] = useState("wood");
  const [category, setCategory] = useState("cutting");
  const [skillLevel, setSkillLevel] = useState('advanced');
  const [handheld, setHandheld] = useState(false);
  const [powered, setPowered] = useState(true);
  

  const navigate = useNavigate();

  useEffect(() => {
    const now = new Date();
    const soon = new Date();
    soon.setMinutes( soon.getMinutes() + 1 )
    setTools()
    Query(`
    query GetCalendar($keywords: [String], $timeMax:Date!, $timeMin:Date!) {
      getTools(keywords: $keywords) {
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
    `,{keywords:[category, material, skillLevel], timeMin:now, timeMax:soon})
      .then(resp=>resp.json())
      .then(data=>{
        if (data.errors) console.error(data.errors)
        else setTools(data.data.getTools)
      })
  }, [category, material, skillLevel]);

  const Filter = ({name, value, onChange, options}) =>
    <FormGroup as={Col}>
      <FormText>{name}</FormText>
      <FormGroup>
        <ToggleButtonGroup type="radio" name={name} onChange={(v)=>onChange(v)} value={value} id={name} vertical>
          {options.map((option, idx)=>
            <ToggleButton size="sm" value={option.toLowerCase()} id={option} variant="dark" name={option}>
              {option}
            </ToggleButton>
          )}
        </ToggleButtonGroup>
      </FormGroup>
    </FormGroup>

  return (
    <div>
      <FormGroup as={Row} className="justify-content-center m-1" xs={3} md={6}>
        <Filter 
          name="Category" 
          value={category} 
          onChange={(v)=>setCategory(v)} 
          options={["Cutting", "Sanding", "Fastening", "3D Printing", "Laser Cutting"]}
        />

        <Filter 
          name="Material" 
          value={material} 
          onChange={(v)=>setMaterial(v)} 
          options={["Wood", "Metal", "Plastic"]}
        />

        <Filter 
          name="Skill Level" 
          value={skillLevel} 
          onChange={(v)=>setSkillLevel(v)} 
          options={["Basic", "Advanced", "Expert"]}
        />
      </FormGroup>

      <Row className="justify-content-center m-1">
          <Col xs={12} md={8} lg={4} className="mt-3">
              {
                  !tools ? <Loading>Loading Tool Data...</Loading> :
                  tools.length === 0 ? <Alert variant="warning">No tools fit your criteria.</Alert> :
                    <Table variant="dark" size="sm" hover>
                      <thead className="text-center">
                        <tr>
                          <th>Picture</th>
                          <th>Name</th>
                          <th></th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {tools.map( (tool, idx) =>
                          <tr onClick={()=>navigate(`/tools/view/${tool._id}`)}>
                            <td className="text-center"><Image src={tool.photo} height="50"/></td>
                            <td>{tool.brand} {tool.name}</td>
                            <td>
                              <Badge>
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