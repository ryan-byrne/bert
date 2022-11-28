import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function EventBadge({ event }) {

  const startTime = new Date(event.start.dateTime);
  const endTime = new Date(event.end.dateTime);
  const startHour = startTime.getHours() + startTime.getMinutes() / 60 - 8;
  const endHour = endTime.getHours() + endTime.getMinutes() / 60 - 8;

  const areaColors = {
    "classroom": "primary",
    "powertool": "warning",
    "machineshop": "secondary"
  }

  return ( event.locations.map( location =>
      <OverlayTrigger
      trigger={['hover', 'focus']}
      placement="left"
      overlay={<Tooltip>View Details</Tooltip>}>
        <Link
          to={`/schedule/view/${event.id}`}
          className={`event-badge bg-${areaColors[location]} event-badge-${location}`}
          style={{ top: `${startHour * 30}px`, height: `${30 * (endHour - startHour)}px`}}
        >
          <div  className="event-text">
            {event.summary}
          </div>
          
        </Link>
        
    </OverlayTrigger>
  )
  )
}