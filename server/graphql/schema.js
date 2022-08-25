const {gql} = require('apollo-server');

module.exports = gql`

scalar Date

schema {
  query: Query
  mutation: Mutation
}

type Query {
    user(id:String):User
    schedule(
        interval:ScheduleInterval, 
        start:String, 
        user:String, 
        locations:[EventLocation]
    ):[Schedule],
    toolAvailability(start:String, end:String, search:String):[ToolReservation]
    block(division:String,day:String,week:String):[Block]
    checkForConflicts(times:[Time], locations:[EventLocation]):[Conflict]
    getTraining(id:String):Training
    getTrainingProgress(id:String):String
}

type Mutation {
    createEvents(
        locations:[String!],
        times:[Time],
        summary:String!,
        description:String,
        recurrence:[String],
        tools:[ToolInput],
        attendees:[Attendee]
    ): [String]
}

# SCHEDULING

type Schedule {
    day:Int
    events:[Event]
}

input Attendee {
    email:String!
    id:String
    displayName:String
    organizer:Boolean
    self:Boolean
    resource:Boolean
    optional:Boolean
    responseStatus:String
    comment:String
    additionalGuests:Int
}

type Block {
    name:String!
    start:String!
    end:String!
    division:String!
    day:String!
    week:String
}

input Time {
    start:Date!
    end:Date!
}

type Conflict {
    event:Event
    start:Date
    end:Date
}

enum ScheduleInterval {
    w
    d
    m
}

# TRAININGS 

type Training {
    id:String!
    name:String!
    description:String!
    prerequisites:[Training]!
    demo:Boolean
}

type Question {
    answer:String!
    choices:[String]
    training:Training
}

type Guess {
    user:User!
    question:Question!
    text:String!
    correct:Boolean!
}

# COLLECTIONS

type Tool {
    brand:String!
    name:String!
    quantity:Int!
    photo:String
    manual:String
    training:Training
    keywords:[String]
}

type User {
    id:String!
    email:String!
    name:String
    given_name:String
    family_name:String
    picture:String
    locale:String
    hd:String
    trainings_completed:[Training]
    demos_completed:[Training]
}

# EVENTS

"""
DateTime Object for Events
"""
type DateTime {
    """
    The time, as a combined date-time value (formatted according to RFC3339). A time zone offset is required unless a time zone is explicitly specified in timeZone.
    """
    dateTime:Date!
    """
    The date, in the format "yyyy-mm-dd", if this is an all-day event.
    """
    date:String
    """
    The time zone in which the time is specified. (Formatted as an IANA Time Zone Database name, e.g. "Europe/Zurich".) For recurring events this field is required and specifies the time zone in which the recurrence is expanded. For single events this field is optional and indicates a custom time zone for the event start/end.
    """
    timeZone:String
}

enum GoogleEventStatus {
    confirmed
    tentative
    cancelled
}

enum EventLocation {
    classroom
    powertool
    machineshop
}

"""
Event Object in a specified location's Calendar
"""
type Event {
    """
    Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword.
    """
    calendarId:String!
    """
    Link to Google Calendar Event
    """
    htmlLink:String
    """
    The attendees of the event. See the Events with attendees guide for more information on scheduling events with other calendar users. Service accounts need to use domain-wide delegation of authority to populate the attendee list.
    """
    attendees: [User]!
    """
    Creation time of the event (as a RFC3339 timestamp). Read-only.
    """
    created:String
    """
    Creator of the event
    """
    creator:User
    """
    Description of the event. Can contain HTML. Optional.
    """
    description:String
    """
    The (exclusive) end time of the event. For a recurring event, this is the end time of the first instance.
    """
    end:DateTime!
    """
    Opaque identifier of the event. 
    """
    id:ID!
    """
    Geographic location of the event as free-form text. Optional.
    """
    location:EventLocation
    """
    List of RRULE, EXRULE, RDATE and EXDATE lines for a recurring event, as specified in RFC5545. Note that DTSTART and DTEND lines are not allowed in this field; event start and end times are specified in the start and end fields. This field is omitted for single events or instances of recurring events.
    """
    recurrence:[String]
    """
    For an instance of a recurring event, this is the id of the recurring event to which this instance belongs. Immutable.
    """
    recurringEventId:String
    """
    The (inclusive) start time of the event. For a recurring event, this is the start time of the first instance.
    """
    start:DateTime!
    """
    Status of the event. Optional.
    """
    status:GoogleEventStatus
    """
    Title of the event.
    """
    summary:String!
    """
    """
    recurringEvents:[DateTime]
    """
    List of Tool Reservations
    """
    tools:[ToolReservation]!
}

input ToolInput {
    id:String!
    quantity:Int!
}

type ToolReservation {
    tool:Tool!
    quantity:Int!
}
`