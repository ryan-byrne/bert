import {Table, Alert, Image, Badge, FormGroup, Button, FormControl, Row, Collapse, Col, Container} from 'react-bootstrap'
import {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { Query } from '../../../components/GraphQL';
import Loading from '../../../components/Loading';
export const Index = () => {

  const [tools, setTools] = useState();
  // Keyword Filters
  const [keywords, setKeywords] = useState(['cutting']);

  const navigate = useNavigate()

  useEffect(() => {
    setTools()
    Query(`
    query GetCalendar($keywords: [String]) {
      getTools(keywords: $keywords) {
        _id
        name
        brand
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
                    <Container>
                      {tools.map( (tool, idx) =>
                        <Row className="mt-5 justify-content-center">
                          <Col className="text-center" xs={2} lg={1}><Image fluid src={tool.photo}/></Col>
                          <Col xs={4} lg={3} className="mt-auto mb-auto">
                            <Link className="text-white" to={`/tools/view/${tool._id}`}>{tool.brand} {tool.name}</Link>
                          </Col>
                          <Col xs={4} lg={2} className="mt-auto mb-auto">
                            {!tool.training ? null :
                            <Badge bg={tool.training.completed ? 'success' : 'warning'} as={Link} to={`/training/${tool.training.id}`}>{tool.training.name}</Badge>}
                          </Col>
                          <Col xs={2} lg={1} className="text-center mt-auto mb-auto">{tool.quantity}</Col>
                        </Row>
                      )}
                    </Container>
              }
          </Col>
      </Row>
  </div>
  )
}