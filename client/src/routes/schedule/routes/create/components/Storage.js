import {Row, Col, Button, FormGroup, Alert, Collapse} from 'react-bootstrap'
import {useState, useEffect} from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import Loading from '../../../../../components/Loading'
import { Query } from '../../../../../components/GraphQL';
import SearchSelect from '../../../../../components/SearchSelect';

import './style/storage.css'

export const Storage = ({payload, setPayload}) => {

  const [show, setShow] = useState(false);
  const [inUse, setInUse] = useState();

  const handleClick = (e) => 
    inUse.includes(e.target.id) || payload.storage.includes(e.target.id) ? null : 
    setPayload({...payload, storage:[...payload.storage, e.target.id]})

  useEffect(() => {
    if (!payload.times[0]) return
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
    query Query($timeMin: Date!, $timeMax: Date!) {
      getEvents(timeMin: $timeMin, timeMax: $timeMax) {
        storage
      }
    }
    `,{timeMin, timeMax})
      .then(resp=>resp.json())
      .then(data=>{
        if (data.errors) throw data.errors
        else setInUse(data.data.getEvents.filter(e=>e.storage).map(e=>e.storage).flat())
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
          {
            payload.times.length === 0 ? <Alert variant="warning" className="mt-3">You must add times...</Alert> :
            !inUse ? <Loading>Checking Availability...</Loading> :
            [
              'purple','blue','green','yellow','orange','red','pink'
            ].map(color=>
              <Row className={`storage-${color} justify-content-center`} xs={3}>
                {
                  new Array(12).fill(0).map((_,idx)=> {
                    const id = `${color}-${idx+1}`
                    return(
                      <Col 
                        className={`p-1 m-1 ${color} ${color}-${payload.storage.includes(id)?"selected":""} storage-button ${inUse.includes(`${color}-${idx}`)?'unavailable':""}`} 
                        id={id}
                        onClick={handleClick}
                      >
                        {color.toUpperCase()} {idx+1}
                    </Col>
                    )
                  })
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
