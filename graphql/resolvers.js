const {Types} = require('mongoose');
const {google} = require('../auth');
const { GraphQLScalarType } = require('graphql');
const event = require('../db/models/event')
const user = require('../db/models/user');
const training = require('../db/models/training');
const question = require('../db/models/question');
const tool = require('../db/models/tool');

const calendars = {
  "classroom":{
    "calendar":"c_2l72cqq855fvcu8l0f35donqnc@group.calendar.google.com",
    "capacity":25
  },
  "machineshop":{
    "calendar":"c_cdm0jncrjj972nf6g6o6r2jhf4@group.calendar.google.com",
    "capacity":4
  },
  "powertool":{
    "calendar":"c_cdsr663bruijjo05637v89fh4k@group.calendar.google.com",
    "capacity":4
  }
}

module.exports = {

    Date:new GraphQLScalarType({
      name: 'Date',
      parseValue(value) {
        return new Date(value);
      },
      serialize(value) {
        return value.toISOString();
      },
    }),

    Query:{
        // Get specific user
        user: async (_, {id}) => {
          if (id){
            return await user.findOne({id})
          } else {
            const resp = await google.oauth2({version:'v2'}).userinfo.get()
            return await user.findOne({email:resp.data.email})
          }
        },
        schedule: async (_, args) => {

          const {start, interval, locations} = args;

          const timeMin = new Date(start);
          const timeMax = new Date(start);

          if ( interval === 'm' ) timeMax.setMonth( timeMax.getMonth() + 1 )
          else if ( interval === 'w' ) timeMax.setDate( timeMax.getDate() + 4 )
          else timeMax.setDate( timeMax.getDate() + 1 );
          
          const aggregation = [
            {
              '$unwind': {
                'path': '$recurringEvents', 
                'preserveNullAndEmptyArrays': true
              }
            }, {
              '$addFields': {
                'start': {
                  '$cond': {
                    'if': '$recurringEvents', 
                    'then': '$recurringEvents.start', 
                    'else': '$start'
                  }
                }, 
                'end': {
                  '$cond': {
                    'if': '$recurringEvents', 
                    'then': '$recurringEvents.end', 
                    'else': '$end'
                  }
                }
              }
            }, {
              '$match': {
                'location':{
                  '$in':locations
                },
                'start.dateTime': {
                  '$gt': timeMin
                }, 
                'end.dateTime': {
                  '$lt': timeMax
                }
              }
            }, {
              '$group': {
                '_id': {
                  '$dayOfMonth': '$start.dateTime'
                }, 
                'events': {
                  '$push': '$$ROOT'
                }
              }
            }, {
              '$project': {
                'day': '$_id', 
                '_id': 0, 
                'events': '$events'
              }
            }, {
              '$sort': {
                'day': 1, 
                'events.start.dateTime': 1
              }
            }
          ]
          return await event.aggregate(aggregation)
        }
    },

    Mutation:{

        async createEvent(_, args){
          let eventIds = [];
          for ( const location of args.locations ) {
            const googleResp = await google.calendar({version:"v3"}).events.insert({
              calendarId:calendars[location].calendar,
              requestBody:{
                start:{
                  dateTime:new Date(args.start),
                  timeZone:"America/New_York"
                },
                end: {
                  dateTime:new Date(args.end),
                  timeZone:"America/New_York"
                },
                location,
                summary:args.summary,
                description:args.description,
                recurrence:args.recurrence,
                attendees:args.attendees
              }
            });
            // Grab recurring events
            const googleRecurring = await google.calendar({version:"v3"}).events.instances({
              calendarId:calendars[location].calendar,
              eventId:googleResp.data.id
            })
            const mongoResp = await event.create({
              ...googleResp.data,
              recurringEvents: googleRecurring.data.items.map(e=>({
                start:e.start,
                end:e.end
              })),
              tools:args.tools.map( t => ({
                quantity:t.quantity,
                tool:new Types.ObjectId(t.id)
              }))
            })
            eventIds.push(mongoResp.id)
          }
          return eventIds
          
        }
    
    },

    Training:{
        prerequisites: async (t) => await training.find({_id:t._doc.prerequisites})
    },

    User:{
        trainings_completed: async (u) => await training.find({_id:u.trainings_completed}),
        demos_completed: async (u) => await training.find({_id:u.demos_completed}),
    },

    Event:{
        tools: async (e) => await tool.find({_id:e.tools.map(t=>t.tool)}),
        creator: async (e) => await user.findOne({email:e.creator.email}),
        attendees: async (e) => await user.find({email:e.attendees.map(a=>a.email)})
    },

    ToolReservation:{
        tool: async (r) => await tool.findOne({_id:r._id})
    }
}