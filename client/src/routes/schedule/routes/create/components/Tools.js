import {Row, Badge, FormText, FormGroup, FormControl, FloatingLabel, ListGroup} from 'react-bootstrap'
import {useState, useEffect} from 'react';
import Loading from '../../../../../components/Loading'
import { Query } from '../../../../../components/GraphQL';

export const Tools = (props) => {

  const [tools, setTools] = useState();
  const [search, setSearch] = useState("")
  const [options, setOptions] = useState(null);

  useEffect(() => {
    if (!tools || search.length < 3) setOptions(null)
    else setOptions(tools.map( tool => {
      if ( [...tool.keywords, tool.brand, tool.name].join(" ").match(search) ) return tool
    }).filter(t=>t))
  }, [tools, search]);

  useEffect(() => {
    setTools()
    Query(`
      query GetCalendar {
        getTools {
          _id
          name
          brand
          keywords
          training {
            completed
          }
        }
      }
    `,{})
      .then( resp => resp.json()
      .then( data =>{
        if (data.error || !data.data) console.error(data)
        else setTools(data.data.getTools)
      } ) )
  }, []);

  const handleAdd = (e) => props.setPayload({
    ...props.payload, 
    tools:[...props.payload.tools, {id:e.target.id, quantity:1}]
  })

  console.log(props.payload);

  return (
    !tools ? <Loading>Loading Tools...</Loading> :
    <div>
      {
        props.payload.tools.map( tool =>
          <Badge>
            {tool.id}
          </Badge>
        )
      }
      <FloatingLabel label="Search for a Tool...">
        <FormControl placeholder="Search for a Tool..." value={search} onChange={(e)=>setSearch(e.target.value)}/>
        {
          !options ? null :
          <ListGroup style={{maxHeight:"200px", overflowY:"scroll"}}>
            {
              options.length === 0 ?
              <ListGroup.Item variant='warning'>No tools found...</ListGroup.Item> :
              options.map( tool =>
                <ListGroup.Item 
                  id={tool._id} 
                  action
                  onClick={handleAdd}
                  disabled={(tool.training && !tool.training.completed) || props.payload.tools.map(t=>t.id).includes(tool.id)}>
                    {tool.brand} {tool.name}
                    <div>
                      <FormText>{tool.keywords.join(", ")}</FormText>
                    </div>
                 
                </ListGroup.Item>
              )
            }
          </ListGroup>
          
          
        }
      </FloatingLabel>
      
    </div>
  )
}

export default Tools
