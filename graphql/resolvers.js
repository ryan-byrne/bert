const {Types} = require('mongoose');
const {google, oauth2Client} = require('../auth');
const { GraphQLScalarType } = require('graphql');
const event = require('../db/models/event')
const user = require('../db/models/user');
const training = require('../db/models/training');
const block = require('../db/models/block');
const question = require('../db/models/question');
const tool = require('../db/models/tool');
const guess = require('../db/models/guess');

const isProduction = process.env.NODE_ENV === 'production' 

const calendars = isProduction ? {
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
} : {
  "classroom":{
    "calendar":"c_p3oca9691kbuppg3gv684h62rc@group.calendar.google.com",
    "capacity":25
  },
  "machineshop":{
    "calendar":"c_quvn2omcc7pttk6tip2n9a2fto@group.calendar.google.com",
    "capacity":4
  },
  "powertool":{
    "calendar":"c_uclhkdm8namoq41rlij866jl2g@group.calendar.google.com",
    "capacity":4
  }
}

module.exports = {

    Date: new GraphQLScalarType({
      name: 'Date',
      parseValue(value) {
        return new Date(value);
      },
      serialize(value) {
        return value.toISOString();
      },
    }),

    Query:{

        getBlocks: async (_, {division, day, week}) => await block.find({division, day, week}),

        checkForConflicts: async (_,{times, locations}) => await event.aggregate([
          {
            '$unwind': {
              'path': '$recurringEvents', 
              'preserveNullAndEmptyArrays': true
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
              'conflicts': {
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
              'path': '$conflicts'
            }
          }, {
            '$match': {
              'conflicts': {
                '$ne': null
              }
            }
          }, {
            '$project': {
              '_id': 0, 
              'start': '$conflicts.start', 
              'end': '$conflicts.end', 
              'event': '$_id'
            }
          }
        ]),

        getSchedule: async (_, {start, interval, locations}) => {

          const timeMin = new Date(start);
          const timeMax = new Date(start);

          if ( interval === 'm' ) timeMax.setMonth( timeMax.getMonth() + 1 )
          else if ( interval === 'w' ) timeMax.setDate( timeMax.getDate() + 5 )
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

        getTrainings: async (_, {trainings}) => await training.find( trainings ? {id:trainings} : null ),

        getQuestions: async (_,{questions}) => await question.find( questions ? {_id:questions} : null ),

        getTools: async(_,{tools}) => await tool.find( tools ? {_id:tools} : null )
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
        }, {user}) => {

          oauth2Client.setCredentials(user.tokens)

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

        submitGuess: async (_, {questionId, text}, {user}) => {
          const q = await question.findOne({_id:questionId});
          const correct = text.toLowerCase() === q.answer;
          const g = await guess.create({
            submitted:new Date(),
            text,
            correct,
            question:q._id,
            user:user.id
          })
          return correct
        }
    
    },

    Training:{
        
        prerequisites: async ({_doc}) => await training.find({_id:_doc.prerequisites}),
        
        questions: async ({_id}) => await question.find({training:_id}),
        
        completed: async ({_doc}, {user}, ctx) => {

          const resp = await training.aggregate([
            {
              '$match': {
                '_id':_doc._id
              }
            }, {
              '$lookup': {
                'from': 'questions', 
                'localField': '_id', 
                'foreignField': 'training', 
                'as': 'question'
              }
            }, {
              '$unwind': {
                'path': '$question'
              }
            }, {
              '$lookup': {
                'from': 'guesses', 
                'localField': 'question._id', 
                'foreignField': 'question', 
                'as': 'guesses'
              }
            }, {
              '$project': {
                '_id': 1, 
                'guesses': {
                  '$map': {
                    'input': '$guesses', 
                    'as': 'guess', 
                    'in': {
                      '$cond': {
                        'if': {
                          '$and': [
                            {
                              '$eq': [
                                user ? user : ctx.user.id, '$$guess.user'
                              ]
                            }, '$$guess.correct'
                          ]
                        }, 
                        'then': true, 
                        'else': false
                      }
                    }
                  }
                }
              }
            }, {
              '$project': {
                'completed': {
                  '$anyElementTrue': '$guesses'
                }
              }
            }, {
              '$group': {
                '_id': '$_id', 
                'questions': {
                  '$push': '$completed'
                }
              }
            }, {
              '$project': {
                '_id': 0, 
                'completed': {
                  '$allElementsTrue': '$questions'
                }
              }
            }
          ])

          return resp[0] ? resp[0].completed : false
        }
    },

    Question:{

        completed: async (questionDoc, {user}, ctx) => {
          const resp = await question.aggregate([
            {
              '$match': {
                '_id': questionDoc._id
              }
            }, {
              '$lookup': {
                'from': 'guesses', 
                'localField': '_id', 
                'foreignField': 'question', 
                'as': 'guesses'
              }
            }, {
              '$project': {
                '_id': 0, 
                'completed': {
                  '$anyElementTrue': {
                    '$map': {
                      'input': '$guesses', 
                      'as': 'guess', 
                      'in': {
                        '$and': [
                          {
                            '$eq':['$$guess.user', user ? user : ctx.user.id]
                          },'$$guess.correct'
                        ]
                      }
                    }
                  }
                }
              }
            }
          ])
          return resp[0] ? resp[0].completed : false
        }
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
      training: async (t) => await training.findOne({id:t.training}),
      authorizedUsers: async (t) => await tools.aggregate([])
    },
}