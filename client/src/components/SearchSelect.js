import {useState, useEffect} from 'react';
import { FloatingLabel, FormControl, FormGroup, ListGroup, Row, Col, Image, Button  } from 'react-bootstrap';
import { Query } from './GraphQL';

const SearchSelect = ({name, query, queryName, columns, onSelect}) => {

  const [search, setSearch] = useState("");
  const [added, setAdded] = useState([]);
  const [options, setOptions] = useState(null);

  useEffect(() => {
    if (search.length === 0) {
      setOptions();
      return
    }
    setOptions(true);
    Query(query, {text:search})
      .then( resp => resp.json() )
      .then( data => {
        if (data.errors) console.error(data.errors)
        else setOptions(data.data[queryName])
      } )
  }, [search, query, queryName]);

  const handleSelect = (e, option) => {
    e.preventDefault();
    setAdded([...added, option]);
    setSearch("");
    onSelect(option);
  }

  return (
    <FormGroup className="m-3">
      <FloatingLabel label={`Search for ${name}`}>
        <FormControl value={search} onChange={(e)=>setSearch(e.target.value)} placeholder={`Search for ${name}`}/>
      </FloatingLabel>
      <ListGroup style={{maxHeight:"200px", overflowY:"scroll", position:"relative", zIndex:"1"}}>
          {
            !options ? null :
            options === true ? <ListGroup.Item variant="info">Loading {name}...</ListGroup.Item> :
            options.length === 0 ? <ListGroup.Item variant="warning">No {name} found...</ListGroup.Item> :
            options.map( option =>
              <ListGroup.Item
                disabled={added.includes(option)}
                id={option._id}
                action
                onClick={(e)=>handleSelect(e, option)}
              >
                <Row>
                  {columns.map( column =>
                    <Col className="mt-auto mb-auto">{
                      column === 'photo' ?
                      <Image src={option[column]} height="50" style={{maxWidth:"50px"}}/> :
                      option[column]
                    }</Col>  
                  )}
                </Row>
              </ListGroup.Item>
            )
          }
        </ListGroup>
    </FormGroup>
  )
}

export default SearchSelect