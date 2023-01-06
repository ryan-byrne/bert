const { gql } = require('apollo-server');

module.exports = gql`

scalar Date

schema {
  query: Query
  mutation: Mutation
}

input UserInput {
  id:String
  email:String
}

enum Division {
  upper
  middle
}

enum ToolKeyword {
  basic
  advanced
  expert
  cutting
  sanding
  fastening
  drilling
  clamping
  welding
  hand
  powered
  cordless
  corded
  stationary
  wood
  plastic
  metal
  fdm
  sla
  lasercutting
}

type Query {

  materials(
    search:String
  ):[Material]

  """
  Query Users. If no arguments are provided, the user querying will be returned.
  """
  users(
    """
    User ID
    """
    id:String, 
    """
    User Email
    """
    email:String, 
    """
    Search text to query names
    """
    search:String
  ):[User]
  
  """
  Query google events
  """
  event(
    """
    Google Event ID
    """
    eventId:ID!
  ):Event

  """
  Query for all events between two dates
  """
  events(
    """
    List of time ranges to find events between
    """
    times:[TimeInput!]!,
    """
    Tool IDs included in the event
    """
    tools:[ToolInput!]
    """
    Material IDs included in the event
    """
    materials:[MaterialInput!]
    """
    Locations in the lab where the events are taking place
    """
    locations:[EventLocation!]
    """
    Storage IDs included in the event
    """
    storage:[String!]
    """
    Users included in the event
    """
    attendees:[Attendee]
  ):[Event]
  
  """
  Query for block times given a divsion, day, and week
  """
  blocks(
    """
    School Division
    """
    division:[Division!],
    """
    Day of the Week
    """
    day:[String!],
    name:[String!],
    """
    
    """
    week:[String!]
  ):[Block]
  
  """
  Query Trainings
  """
  trainings(
    """
    Training IDs to Include
    """
    id:[String],
    """
    Search text
    """
    search:String
  ):[Training]

  """
  Query Tools
  """
  tools(
    """
    Search text
    """
    search:String
    """
    Keywords to include
    """
    keywords:[ToolKeyword!],
    """
    Location of the tool
    """
    locations:[EventLocation!],
    """
    Tool IDs to include
    """ 
    id:[String!]
  ):[Tool]

  """
  Query Questions
  """
  questions(
    """
    Question ID
    """
    id:[String]
  ):[Question]

  """
  Get the Google Classroom Courses for the Authorized User
  """
  courses:[Course]

  """
  Check for conflicts
  """
  conflicts(
    times:[TimeInput!]!,
    locations:[EventLocation],
    tools:[ToolInput]
  ):[Event]

}

input MaterialDimension {
  dimension:String
  value:String
  unit:String
}

input MaterialInput {
  id:String!
  quantity:Int!
}

input EventInput {
  summary:String!
  description:String
  times:[TimeInput!]!
  locations:[EventLocation!]!
  tools:[ToolInput!]
  materials:[MaterialInput!]
  attendees:[Attendee!]
  storage:[String!]
}

type Mutation {

    createEvent(
      event:EventInput!
    ): [Event]

    editEvent(
      eventId:ID!,
      update:EventInput!,
    ):[Event]

    deleteEvent(
      eventId:ID!
    ):Boolean

    submitGuess(text:String, questionId:String):Boolean!

    completeDemo(users:[String!]!, training:String!):[String]

    addMaterial(
      id:String!
      photo:String
      vendor:String
      material:String!
      link:String
      unit_price:Float
      description:String!
      dimensions:[MaterialDimension!]!
    ):Material

}

"""
A Course in Google Classroom. Descriptions taken from https://googleapis.dev/nodejs/googleapis/latest/classroom/interfaces/Schema$Course.html
"""
type Course {
  """
  The Calendar ID for a calendar that all course members can see, to which Classroom adds events for course work and announcements in the course. Read-only.
  """
  calendarId:String
  """
  Optional description. For example, "We'll be learning about the structure of living creatures from a combination of textbooks, guest lectures, and lab work. Expect to be excited!" If set, this field must be a valid UTF-8 string and no longer than 30,000 characters.
  """
  description:String
  """
  Identifier for this course assigned by Classroom. When creating a course, you may optionally set this identifier to an alias string in the request to create a corresponding alias. The id is still assigned by Classroom and cannot be updated after the course is created. Specifying this field in a course update mask results in an error.
  """
  id:String
  """
  Name of the course. For example, "10th Grade Biology". The name is required. It must be between 1 and 750 characters and a valid UTF-8 string.
  """
  name:String
  """
  Section of the course. For example, "Period 2". If set, this field must be a valid UTF-8 string and no longer than 2800 characters.
  """
  section:String
  """
  Optional room location. For example, "301". If set, this field must be a valid UTF-8 string and no longer than 650 characters.
  """
  room:String
  """
  The identifier of the owner of a course. When specified as a parameter of a create course request, this field is required. The identifier can be one of the following: * the numeric identifier for the user * the email address of the user * the string literal "me", indicating the requesting user This must be set in a create request. Admins can also specify this field in a patch course request to transfer ownership. In other contexts, it is read-only.
  """
  ownerId:String
  """
  List of Users in the class
  """
  roster:[User]
}

type Block {
    name:String!
    start:String!
    end:String!
    division:String!
    day:String!
    week:String
}

# TRAININGS 

type Training {
    completed_by:[User]
    demo_completed_by:[User]
    completed(user:String):Boolean
    demo_completed(user:String):Boolean
    authorized_users:[User]
    authorized_supervisors:[User]
    id:String!
    name:String!
    checklist:[String]
    questions:[Question]
    tools:[Tool]
    required_by:[Training]
    description:String!
    prerequisites:[Training]!
    demo:Boolean
}

type Question {
    completed:Boolean
    answer:String!
    text:String
    choices:[String]
    training:Training!
}

type Guess {
    submitted:Date
    user:User!
    question:Question!
    text:String!
    correct:Boolean!
}

"""
Tool Data
"""
type Tool {
    """
    Tool ID
    """
    _id:String
    """
    Whether the tool is Stationary or not.
    """
    stationary:Boolean
    """
    Brand of the tool.
    """
    brand:String!
    """
    Name of the tool.
    """
    name:String!
    """
    Number of tools currently available
    """
    available(timeMin:Date!, timeMax:Date!):Int
    """
    
    """
    reserved:Int
    """
    Total number of tools in the lab.
    """
    quantity:Int
    """
    List of Authorized Users of the tool
    """
    authorized_users:[User]
    """
    URL link to a photo of the tool
    """
    photo:String
    """
    URL link to the Tool's manual
    """
    manual:String
    """
    Training for the tool
    """
    training:Training
    """
    List of Tool Keywords
    """
    keywords:[ToolKeyword]
    """
    Location where the tool is stored
    """
    location:EventLocation
}

"""
User Data pulled from Google when a User first logs into Bert.
"""
type User {
    """
    User's Google ID
    """
    id:String!
    """
    User's Berkeley Carroll Email Address
    """
    email:String!
    """
    User's Name
    """
    name:String
    """
    User's Given Name
    """
    given_name:String
    """
    User's Name
    """
    family_name:String
    """
    User's Google Account Picture URL
    """
    picture:String
    """
    User's Locale
    """
    locale:String
    hd:String
    """
    Whether User is a student or not
    """
    student:Boolean
}


#  ********** EVENTS ***************

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

enum EventStatus {
    confirmed
    tentative
    cancelled
}

"""
Locations 
"""
enum EventLocation {
    classroom
    powertool
    machineshop
}

type ToolReservation {
  tool:Tool
  reserved:Int
}

type MaterialReservation {
  material:Material
  reserved:Int
}

type CalendarDay {
    date:Date
    events:[Event]
}

input TimeInput {
  start:Date!
  end:Date!
  recurrence:[String!]
}

type Time {
  start:Date!
  end:Date!
}

input ToolInput {
    id:String!
    quantity:Int!
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

"""
Materials
"""
type Material {
  photo:String
  available:Int!
  _id:String!
  id:String!
  vendor:String
  material:String!
  link:String
  unit_price:Float
  description:String!
  dimensions:[Dimension!]!
}

type Dimension {
  dimension:String!
  value:Float!
  unit:String!
}

"""
Event Object in a specified location's Calendar
"""
type Event {
    """
    Determine whether the current user is the owner of the event (and can therefore edit or delete)
    """
    owner:Boolean
    """
    Last modification time of the event (as a RFC3339 timestamp). Read-only.
    """
    updated:String
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
    locations:[EventLocation]
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
    status:EventStatus
    """
    Title of the event.
    """
    summary:String
    """
    """
    recurringEvents:[DateTime]
    """
    List of Tool Reservations
    """
    tools:[ToolReservation]
    """
    List of reserved storage
    """
    storage:[String]
    """
    List of materials
    """
    materials:[MaterialReservation]
}


`