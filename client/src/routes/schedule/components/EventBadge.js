import { OverlayTrigger, Tooltip } from "react-bootstrap";

export default ({event}) => {

    const startTime = new Date(event.start.dateTime);
    const endTime = new Date(event.end.dateTime);
    const startHour = startTime.getHours() + startTime.getMinutes()/60 - 8;
    const endHour = endTime.getHours() + endTime.getMinutes()/60 - 8;
    return(
        <OverlayTrigger
            trigger={['hover','focus']}
            overlay={<Tooltip>View in Google Calendar</Tooltip>}>
            <a
                className={`event-badge event-badge-${event.location}`}
                style={{top:`${startHour*30}px`, height:`${30*(endHour-startHour)}px`}}
                href={event.htmlLink}
                rel="noreferrer"
                target="_blank"
            >
                {event.summary}
            </a>
        </OverlayTrigger>
    )
}