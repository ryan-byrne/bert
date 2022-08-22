const {Schema, model} = require('mongoose');

const DateTime = new Schema({
    dateTime:Schema.Types.Date,
    timeZone:String
},{_id:false})

const Attendee = new Schema({
    email:String,
    id:String,
    organizer:Boolean,
    resource:Boolean,
    responseStatus:String,
    comment:String
},{_id:false})

module.exports = model('Event', new Schema({
    id:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    attendees:[Attendee],
    kind:String,
    etag:String,
    status:String,
    htmlLink:String,
    created:Schema.Types.Date,
    updated:Schema.Types.Date,
    summary:{
        type:String,
        required:true
    },
    creator: new Schema({
        email:String 
    },{_id:false}),
    organizer:new Schema({
        email:String,
        displayName:String,
        self:Boolean
    },{_id:false}),
    start: DateTime,
    end: DateTime,
    iCalUID:String,
    reminders:new Schema({
        useDefault:Boolean
    },{_id:false}),
    eventType:String,
    tools:[new Schema({
        tool:{ref:"Tool", type:'ObjectId'},
        quantity:Number
    },{_id:false})],
    location:{
        type:String,
        required:true
    },
    recurringEvents:[new Schema({
        start:DateTime,
        end:DateTime
    },{_id:false})],
    recurrence:[String]
}))