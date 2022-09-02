import {Card, Col, Placeholder} from 'react-bootstrap'
import EventBadge from './EventBadge'

export default function DayCard({day}){

    return (
        <Card as={Col} bg="dark" className={`day-container m-3`}>
        <Card.Header>
            {
                day ?
                <Card.Title className="text-center">{new Date(day.date).toDateString().substring(0,10)}</Card.Title>:
                <Placeholder as={Card.Title} animation="glow">
                    <Placeholder xs={6}/>
                </Placeholder>
            }
        </Card.Header>
        <Card.Body>
            <div className="time-tick-container">
                {new Array(10).fill().map( (_,hr) => 
                    <div key={hr} className="time-tick" style={{top:`${hr*30}px`}}>
                        {hr<5?hr+8:hr-4} {hr>3?'PM':'AM'}
                    </div>
                )}
            </div>
            <div className="events-container">
                {!day?null:day.events.map( (e,idx) => <EventBadge key={idx} event={e}/>)}
            </div>
        </Card.Body>
    </Card>
    )
}