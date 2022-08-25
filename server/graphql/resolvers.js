const {Types} = require('mongoose');
const {google, oauth2Client} = require('../auth');
const { GraphQLScalarType } = require('graphql');
const event = require('../db/models/event')
const user = require('../db/models/user');
const training = require('../db/models/training');
const block = require('../db/models/block');
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
          if (id) return await user.findOne({id})
          else {
            const resp = await google.oauth2({version:'v2'}).userinfo.get()
            return await user.findOne({email:resp.data.email})
          }
        },

        block: async (_, {division, day, week}) => await block.find({division, day, week}),

        toolAvailability: async (_,{start, end, search}) => await tool.aggregate([
            {
              '$addFields': {
                'fullName': {
                  '$concat': [
                    '$brand', ' ', '$name'
                  ]
                }
              }
            }, {
              '$match': {
                'fullName': {
                  '$regex': search, 
                  '$options': 'i'
                }
              }
            }, {
              '$lookup': {
                'from': 'events', 
                'localField': '_id', 
                'foreignField': 'tools.tool', 
                'as': 'event'
              }
            }, {
              '$unwind': {
                'path': '$event', 
                'preserveNullAndEmptyArrays': true
              }
            }, {
              '$unwind': {
                'path': '$event.recurringEvents', 
                'preserveNullAndEmptyArrays': true
              }
            }, {
              '$unwind': {
                'path': '$event.tools', 
                'preserveNullAndEmptyArrays': true
              }
            }, {
              '$project': {
                'fullName': 1, 
                'quantity': 1, 
                'using': {
                  '$cond': {
                    'if': '$event', 
                    'then': '$event.tools.quantity', 
                    'else': 0
                  }
                }, 
                'start': {
                  '$cond': {
                    'if': '$event.recurringEvents', 
                    'then': '$event.recurringEvents.start.dateTime', 
                    'else': '$event.start.dateTime'
                  }
                }, 
                'end': {
                  '$cond': {
                    'if': '$event.recurringEvents', 
                    'then': '$event.recurringEvents.end.dateTime', 
                    'else': '$event.end.dateTime'
                  }
                }
              }
            }, {
              '$group': {
                '_id': '$_id', 
                'fullName': {
                  '$first': '$fullName'
                }, 
                'total': {
                  '$first': '$quantity'
                },
                'inUse':{
                    '$push':{
                      '$cond':{
                        'if':{
                          '$or':[
                              {'$and':[
                                {'$lt':[new Date(start), '$start']},
                                {'$gt':[new Date(end), '$start']}
                              ]},
                              {'$and':[
                                {'$gt':[new Date(start), '$start']},
                                {'$lt':[new Date(end), '$end']}
                              ]},
                              {'$and':[
                                {'$lt':[new Date(start), '$end']},
                                {'$gt':[new Date(end), '$end']}
                              ]},
                              {'$and':[
                                {'$lt':[new Date(start), '$start']},
                                {'$gt':[new Date(end), '$end']}
                              ]}
                          ]
                        },
                        'then':"$using",
                        'else':0
                      }
                    }
                  }
                }
              }
              ,{
                '$project': {
                '_id': 0, 
                'tool': '$_id', 
                'quantity': {
                  '$subtract': [
                    '$total', {
                      '$sum': '$inUse'
                    }
                  ]
                }
              }
            }
        ]),

        checkForConflicts: async (_,{times, locations}) => await event.aggregate([
              {
                '$unwind': {
                  'path': '$recurringEvents'
                }
              }, {
                '$match': {
                  'location': {
                    '$in': locations
                  }, 
                  'status': 'confirmed'
                }
              }, {
                '$addFields': {
                  'start': {
                    '$cond': {
                      'if': '$recurringEvents', 
                      'then': '$recurringEvents.start.dateTime', 
                      'else': '$start.dateTime'
                    }
                  }, 
                  'end': {
                    '$cond': {
                      'if': '$recurringEvents', 
                      'then': '$recurringEvents.end.dateTime', 
                      'else': '$end.dateTime'
                    }
                  }
                }
              }, {
                '$addFields': {
                  'conflict': {
                    '$map': {
                      'input': times, 
                      'as': 'time', 
                      'in': {
                        '$cond': {
                          'if': {
                            '$or': [
                              {
                                '$and': [
                                  {
                                    '$lt': [
                                      '$$time.start', '$start'
                                    ]
                                  }, {
                                    '$gt': [
                                      '$$time.end', '$start'
                                    ]
                                  }
                                ]
                              }, {
                                '$and': [
                                  {
                                    '$gt': [
                                      '$$time.start', '$start'
                                    ]
                                  }, {
                                    '$lt': [
                                      '$$time.end', '$end'
                                    ]
                                  }
                                ]
                              }, {
                                '$and': [
                                  {
                                    '$lt': [
                                      '$$time.start', '$end'
                                    ]
                                  }, {
                                    '$gt': [
                                      '$$time.end', '$end'
                                    ]
                                  }
                                ]
                              }, {
                                '$and': [
                                  {
                                    '$lt': [
                                      '$$time.start', '$start'
                                    ]
                                  }, {
                                    '$gt': [
                                      '$$time.end', '$end'
                                    ]
                                  }
                                ]
                              }
                            ]
                          }, 
                          'then': '$$time', 
                          'else': null
                        }
                      }
                    }
                  }
                }
              }, {
                '$unwind': {
                  'path': '$conflict'
                }
              }, {
                '$match': {
                  'conflict': {
                    '$ne': null
                  }
                }
              },{
                '$project': {
                  '_id': 0, 
                  'start': '$conflict.start', 
                  'end': '$conflict.end', 
                  'event': '$_id'
                }
              }
        ]),

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
        },

        getTraining: async (_, {id}) => await training.findOne({id}),

        getTrainingProgress: async (_, {id}, ctx) => {
          return JSON.stringify(ctx.session)
        }

    },

    Mutation:{

        createEvents: async (_, {
          locations,
          times,
          summary,
          description,
          recurrence,
          tools,
          attendees
        }, context) => {

          oauth2Client.setCredentials(context.tokens)

          const createGoogleEvent = async (location, time) => 
            await google.calendar({version:"v3"}).events.insert({
              calendarId:calendars[location].calendar,
              requestBody:{
                start:{
                  dateTime:new Date(time.start),
                  timeZone:"America/New_York"
                },
                end: {
                  dateTime:new Date(time.end),
                  timeZone:"America/New_York"
                },
                summary,
                description,
                recurrence,
                attendees,
                location
              }
            })
          
          const getGoogleRecurring = async (location, eventId) => await google.calendar({version:"v3"}).events.instances({
            calendarId:calendars[location].calendar,
            eventId
          })

          const createMongoEvent = async (googleEvent, googleRecurring) => await event.create({
            ...googleEvent,
            recurringEvents: googleRecurring.data.items.map(e=>({
              start:e.start,
              end:e.end
            })),
            tools:tools.map( t => ({
              quantity:t.quantity,
              tool:new Types.ObjectId(t.id)
            }))
          })

          let eventIds = []

          for ( let location of locations ){
            for ( let time of times ){
              const googleResp = await createGoogleEvent(location, time);
              const recurring = await getGoogleRecurring(location, googleResp.data.id)
              const mongoResp = await createMongoEvent(googleResp.data, recurring);
              eventIds.push( mongoResp.id )
            }
          }

          return eventIds

        },
    
    },

    Training:{
        prerequisites: async (t) => await training.find({_id:t._doc.prerequisites})
    },

    User:{
        trainings_completed: async (u) => await training.find({_id:u.trainings_completed}),
        demos_completed: async (u) => await training.find({_id:u.demos_completed}),
    },

    Conflict:{
      event: async (c) => await event.findOne({_id:c.event})
    },

    Event:{
        tools: async (e) => await tool.find({_id:e.tools.map(t=>t.tool)}),
        creator: async (e) => await user.findOne({email:e.creator.email}),
        attendees: async (e) => await user.find({email:e.attendees.map(a=>a.email)})
    },

    Tool:{
      training: async (t) => {
        return await training.findOne({id:t.training})
      }
    },

    ToolReservation:{
        tool: async (r) => await tool.findOne({_id:r.tool})
    }
}