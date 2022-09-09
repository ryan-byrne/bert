import {Table, Alert, Image, Badge, FormGroup, Button, FormControl, Row, Collapse, Col} from 'react-bootstrap'
import {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { Query } from '../../../components/GraphQL';
import Loading from '../../../components/Loading';
export const Index = () => {

  const [tools, setTools] = useState();
  // Keyword Filters
  const [keywords, setKeywords] = useState([]);

  const navigate = useNavigate()

  useEffect(() => {
    setTools()
    Query(`
    query GetCalendar($keywords: [String], $id: [String]) {
      getTools(keywords: $keywords, id: $id) {
        _id
        name
        brand
        keywords
        photo
        quantity
        training {
          name
          id
          questions {
            completed
          }
          completed
        }
      }
    }
    `,{keywords})
      .then(resp=>resp.json())
      .then(data=>{
        if (data.errors) console.error(data.errors)
        else setTools(data.data.getTools)
      })
  }, [keywords]);

  const KeywordButton = ({children}) =>
    <Button
        size="sm"
        variant="outline-light"
        onClick={()=>setKeywords([...keywords].includes(children.toLowerCase())?[...keywords].splice([...keywords].indexOf(children.toLowerCase())+1, 1):[...keywords, children.toLowerCase()])} 
        active={[...keywords].includes(children.toLowerCase())}>
            {children}
    </Button>

  return (
    <div>

      <Row xs={1} md={2} lg={5} className="m-3 text-center justify-content-center">
              <Col className="mt-3">
                  <div >
                      Categories
                  </div>
                  {['Cutting','Drilling','Sanding', 'Fastening', '3D Printing','Laser Cutting','Clamping', 'Powered', 'Hand'].map((mat, idx)=>
                      <KeywordButton>{mat}</KeywordButton>
                  )}
              </Col>
              <Col className="mt-3">
                  <div>
                      Mobility
                  </div>
                  {['Cordless','Corded','Stationary'].map((mat, idx)=>
                      <KeywordButton>{mat}</KeywordButton>
                  )}
              </Col>
              <Col className="mt-3">
                  <div>
                      Materials
                  </div>
                  {['Wood','Metal','Plastic'].map((mat, idx)=>
                      <KeywordButton>{mat}</KeywordButton>
                  )}
              </Col>
              <Col className="mt-3">
                  <div>
                      Skill Level
                  </div>
                  {['Basic','Advanced','Expert'].map((mat, idx)=>
                      <KeywordButton>{mat}</KeywordButton>
                  )}
              </Col>
        </Row>

      <Row className="justify-content-center m-1">
          <Col xs={12} md={10} lg={8} className="mt-3">
              {
                !tools ? <Loading>Loading Tool Data...</Loading> :
                  tools.length === 0 ? <Alert variant="warning">No tools fit your criteria.</Alert> :
                      <Table variant="dark" hover>
                          <thead><th></th><th>Name</th><th>Training</th><th>Keywords</th><th>Quantity</th></thead>
                          <tbody>
                              {tools.map((tool, idx)=>
                                  <tr onClick={()=>{}} style={{cursor:"pointer"}} id={idx} key={idx}>
                                      <td className='text-center'>
                                        <Image src={tool.photo} height={50}/>
                                      </td>
                                      <td className='mt-auto mb-auto'>{tool.brand} {tool.name}</td>
                                      <td>
                                        <Badge 
                                        as={Link} to={`/training/${tool.training?tool.training.id:''}`}
                                          bg={
                                          !tool.training ? null :
                                          tool.training.completed? "success" : 
                                          tool.training.questions.filter(q=>q.completed).length > 0 ? "warning" :
                                          "primary"
                                        }>
                                          {tool.training ? tool.training.name : ""}
                                        </Badge>
                                      </td>
                                      <td style={{maxWidth:"190px"}}>
                                        {
                                          tool.keywords.map(word=>
                                          <Badge bg="secondary" className="m-1">{word}</Badge>
                                          )
                                        }
                                      </td>
                                      <td>{tool.quantity}</td>
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