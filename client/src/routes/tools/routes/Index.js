import {Table, Alert, Image, Badge, FormGroup, Button, FormControl, Row, Collapse, Col, Container} from 'react-bootstrap'
import {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { Query } from '../../../components/GraphQL';
import Loading from '../../../components/Loading';
export const Index = () => {

  const [tools, setTools] = useState();
  // Keyword Filters
  const [keywords, setKeywords] = useState(['cutting']);
  // Text Filters
  const [search, setSearch] = useState("");

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
      }
    }
    `,{keywords, timeMin:now, timeMax:soon})
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
          <Col xs={12} md={8} lg={4} className="mt-3">
              {
                !tools ? <Loading>Loading Tool Data...</Loading> :
                  tools.length === 0 ? <Alert variant="warning">No tools fit your criteria.</Alert> :
                    <Table variant="dark" size="sm" className="text-center" hover>
                      <thead>
                        <tr>
                          <th>Picture</th>
                          <th>Brand</th>
                          <th>Name</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {tools.map( (tool, idx) =>
                          <tr onClick={()=>navigate(`/tools/view/${tool._id}`)}>
                            <td><Image src={tool.photo} height="50"/></td>
                            <td>{tool.brand}</td>
                            <td>{tool.name}</td>
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