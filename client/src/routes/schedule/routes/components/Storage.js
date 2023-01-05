import {Row, Col, Button, FormGroup, Alert, Collapse} from 'react-bootstrap'
import {useState, useEffect} from 'react';
import Loading from '../../../../components/Loading'
import { Query } from '../../../../components/GraphQL';

import './style/storage.css'

export const Storage = ({payload, setPayload}) => {

  const [show, setShow] = useState(false);
  const [inUse, setInUse] = useState();
  const [isHover, setIsHover] = useState();

  const handleRemove = (id) => {
    let storage = [...payload.storage];
    storage.splice( storage.indexOf(id) , 1);
    setPayload({...payload, storage})
  }

  const handleClick = (id) =>
    payload.storage.includes(id) ? handleRemove(id) :
    setPayload({...payload, storage:[...payload.storage, id]})

  useEffect(() => {
    if (!payload.times[0]) return
    setInUse();
    const timeMin = payload.times[0].start;
    let timeMax;
    const last = payload.times[payload.times.length-1];
    if (last.recurrence){
      const year = last.recurrence[0].substring(24,28);
      const month = last.recurrence[0].substring(28,30) - 1;
      const day = last.recurrence[0].substring(30,32);
      timeMax = new Date(year, month, day)
    } else {
      timeMax = last.end
    }
    Query(`
    query StorageInUse($times: [TimeInput!]!) {
      events(times: $times) {
        storage
      }
    }
    `,{times:[{start:timeMin, end:timeMax}]})
      .then(resp=>resp.json())
      .then(query=>{
        if (query.errors) throw query.errors
        else setInUse(query.data.events.filter(e=>e.storage).map(e=>e.storage).flat())
      })
      .catch(err=>console.error(err))
  }, [payload.times]);

  return (
    <FormGroup as={Row}>
      <Button
        onClick={()=>setShow(!show)} 
        variant={show?'outline-primary':'primary'} >
          {!show ? 'Show' : 'Hide'} Storage {`(${payload.storage.length} Added)`}
      </Button>
      <Collapse in={show}>
        <div className="text-center mt-3">
          <Row>
            <Button variant="outline-secondary" onClick={()=>setPayload({...payload, storage:[]})}>Clear</Button>
          </Row>
          
          {
            payload.times.length === 0 ? <Alert variant="warning" className="mt-3">You must add times...</Alert> :
            !inUse ? <Loading>Checking Availability...</Loading> :
            [
              'purple','blue','green','yellow','orange','red','pink'
            ].map(color=>
              <Row className="mt-1" xs={2}>
                {
                  new Array(12).fill(0).map((_,idx)=> {
                    const id = `${color}-${idx+1}`;
                    const included = payload.storage.includes(id);
                    const unavailable = inUse.includes(id);
                    return (
                      <Col
                        id={id}
                        className={`storage-button ${unavailable?'storage-unavailable':""}`}
                        onMouseEnter={(e)=>unavailable?null:setIsHover(e.target.id)} 
                        onMouseLeave={()=>unavailable?null:setIsHover(null)}
                        onClick={(e)=>unavailable?null:handleClick(id)}
                        style={
                          isHover === id || unavailable || included ? {
                            backgroundColor:color,
                            color:"white",
                            borderColor:color
                          } : {
                            backgroundColor:"white",
                            color:color,
                            borderColor:color
                          }
                        }
                      >
                        {color.toUpperCase()} {idx+1}
                      </Col>
                    )}
                  )
                }
              </Row>
            )
          }
        </div>
      </Collapse>
      <hr className="mt-3"/>
    </FormGroup>
  )
}

export default Storage;
