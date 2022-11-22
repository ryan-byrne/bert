const {Types} = require('mongoose');
const {google, oauth2Client} = require('../auth');
const { GraphQLScalarType } = require('graphql');
const user = require('../db/models/user');
const training = require('../db/models/training');
const block = require('../db/models/block');
const question = require('../db/models/question');
const tool = require('../db/models/tool');
const guess = require('../db/models/guess');
const demo = require('../db/models/demo');

const isProduction = process.env.NODE_ENV === 'production' 

const calendars = isProduction ? {
  "classroom":"c_2l72cqq855fvcu8l0f35donqnc@group.calendar.google.com",
  "machineshop":"c_cdm0jncrjj972nf6g6o6r2jhf4@group.calendar.google.com",
  "powertool":"c_cdsr663bruijjo05637v89fh4k@group.calendar.google.com",
} : {
  "classroom":"c_p3oca9691kbuppg3gv684h62rc@group.calendar.google.com",
  "machineshop":"c_quvn2omcc7pttk6tip2n9a2fto@group.calendar.google.com",
  "powertool":"c_uclhkdm8namoq41rlij866jl2g@group.calendar.google.com"
}

const getGoogleEvents = async (location, timeMin, timeMax) => await google.calendar({version:"v3"}).events.list({
  calendarId:calendars[location],
  timeMin,
  timeMax,
  singleEvents:true
});

const getWeek = (date) => {
  // TODO Change first day each year
  const firstDay = new Date(date.getFullYear(), 0, 1);
  const milliseconds = date - firstDay; // How many milliseconds have passed
  return Math.ceil(milliseconds / 1000 / 60 / 60 / 24 / 7) % 2 === 1 ? 'B' : 'A'
}

module.exports = {

    Date: new GraphQLScalarType({
      name: 'Date',
      parseValue(value) {
        return new Date(value);
      },
      serialize(value) {
        return new Date(value).toISOString()
      }
    }),

    Query:{

        getUser: async (_,{email, id}, ctx) => await user.findOne(
          email ? {email} :
          id ? {id} : 
          {email:ctx.user.email}
        ), 

        getBlocks: async (_, {division, day, week}) => await block.find({division, day, week}),

        getConflicts: async (_,{times, locations, tools}, {user}) => {

          oauth2Client.setCredentials({...user.tokens})

          // RRULE:FREQ=WEEKLY;UNTIL=20221031;INTERVAL=1
          let conflicts = [];
          for (const time of times) {
            for ( const location of locations ) {
              const {recurrence, start, end} = time;
              if ( recurrence ){
                const [freq, until, interval] = recurrence[0].split(':')[1].split(';').map(i=>i.split('=')[1])
                const untilDate = new Date(until.substring(0, 4),until.substring(4, 6), until.substring(6, 8) );
                const startDate = new Date(start);
                startDate.setHours( startDate.getHours(), startDate.getMinutes() + 1, 0, 0 )
                const endDate = new Date(end);
                endDate.setHours( endDate.getHours(), endDate.getMinutes() - 1, 0, 0 )
                while ( startDate < untilDate ){
                  const resp = await getGoogleEvents(location, startDate, endDate);
                  conflicts.push( resp.data.items )
                  startDate.setDate( startDate.getDate() + interval * 7 )
                  endDate.setDate( endDate.getDate() + interval * 7 )
                }
              } else {
                const resp = await getGoogleEvents(location, start, end);
                conflicts.push(resp.data.items)
              }
            }

            return conflicts.flat().filter(c=>c.id);
          }
        },

        getCalendar: async (_, {timeMin, timeMax, locations, tools}, {user}) => {


          oauth2Client.setCredentials({...user.tokens});

          const calendar = []
          const allEvents = []
          for(let location of locations) {

            const resp = await google.calendar({version:"v3"}).events.list({
              calendarId:calendars[location],
              sharedExtendedProperty:tools?tools.map(t=>`${t}=true`):[],
              timeMin,
              timeMax,
              singleEvents:true
            });

            allEvents.push( resp.data.items.map(item=>({...item, location})) )
          }

          const start = new Date(timeMin);
          const end = new Date(timeMax);
          while ( start < end ) {
            if ( [0,6].includes(start.getDay()) ){}
            else {
              const events = allEvents.flat().filter( 
                event => new Date(event.start.dateTime).getDate() === start.getDate()
              )
              const date = new Date(start);
              calendar.push({date, events})
            }
            start.setDate( start.getDate() + 1 )
          }

          return calendar
          
        },

        getTraining: async (_,{id}) => await training.findOne({id}),

        getTrainings: async (_, {trainings}) => await training.find( trainings ? {id:trainings} : null ).sort({name:1}),

        getQuestions: async (_,{questions}) => await question.find( questions ? {_id:questions} : null ),

        getTool:async (_,{id}) => await tool.findOne({_id:id}),

        getTools: async(_,{keywords, location}) => {
          let query = {}
          if ( location ) { query['location'] = location }
          if ( keywords.length > 0 ) { query['keywords'] = {$all:keywords} }
          return await tool.find(query)
        },

        getBlockTimes: async (_, {blocks, start, end}) => {

          const days = ['Monday','Tuesday','Wednesday','Thursday','Friday']
          let dates = [];
          var tzOffset = start.getTimezoneOffset();
          var hrOff = parseInt(tzOffset/60, 10) - 4;
          const max = new Date(start);
          max.setDate( max.getDate() + 14 )
          while ( start < end && start < max ) {
            const day = days[start.getDay() - 1]
            const week = getWeek(start);
            if (day) {
              const resp = await block.findOne({
                name:{"$in":blocks}, day, week
              })
              if (resp) {
                var [hr, min] = resp.start.split(":");
                start.setHours(parseInt(hr) - hrOff, min, 0, 0);
                const startTime = start.toISOString();
                var [hr, min] = resp.end.split(":");
                start.setHours(parseInt(hr) - hrOff, min, 0, 0);
                const endTime = start.toISOString();
                dates.push({
                  start:startTime,
                  end:endTime,
                })
              }
            }
            start.setDate( start.getDate() + 1 )
            
          }
          return dates
        },

        toolSearch: async (_, {text}, ctx) => await tool.aggregate([
          {
            '$addFields': {
              'longName': {
                '$concat': [
                  '$brand', ' ', '$name'
                ]
              }
            }
          }, {
            '$match': {
              'longName': {
                '$regex': new RegExp(text, 'i')
              }
            }
          }
        ]),

        trainingSearch: async (_, {text}, ctx) => await training.aggregate([
            {
              '$addFields': {
                'fields': {
                  '$concat': [
                    '$name', ' ', '$id'
                  ]
                }
              }
            }, {
              '$match': {
                'fields': {
                  '$regex': new RegExp(text, 'i')
                }
              }
            }
        ]),

        userSearch: async (_, {text}, ctx) => await user.aggregate([
            {
              '$addFields': {
                'fields': {
                  '$concat': [
                    '$name', ' ', '$email'
                  ]
                }
              }
            }, {
              '$match': {
                'fields': {
                  '$regex': new RegExp(text, 'i')
                }
              }
            }, {
              '$sort':{
                'family_name':1
              }
            }
        ]),
        
        getCourses: async (_,{},{user}) => {
          oauth2Client.setCredentials({...user.tokens});
          const resp = await google.classroom({version:"v1"}).courses.list({courseStates:"ACTIVE"})
          return resp.data.courses
        },

        getClassRoster: async (_,{courseId},{user}) => {
          oauth2Client.setCredentials({...user.tokens});
          const resp = await google.classroom({version:"v1"}).courses.students.list({courseId});
          return resp.data.students.map(s=>({id:s.profile.id, name:s.profile.name.fullName, email:s.profile.emailAddress}))
        }
    },

    Mutation:{

        createEvent: async (_, {
          summary,
          description,
          locations,
          times,
          tools,
          attendees
        }, {user}) => {
          
          oauth2Client.setCredentials(user.tokens);

          const events = []
          var toolData = {};

          /*
          sharedExtendedProperties:{
            60e6469458e61d0b3d60fe34:true,
            60e6469458e61d0b3d60fe34_qty:4
          }
          */

          for ( const tool of tools ){
            toolData[tool.id] = true
            toolData[`${tool.id}_qty`] = tool.quantity
          }
          for (let time of times){
            const resp = await google.calendar({version:"v3"}).events.insert({
              calendarId:user.email,
              requestBody:{
                start:{
                  dateTime:time.start,
                  timeZone:"America/New_York"
                },
                end:{
                  dateTime:time.end,
                  timeZone:"America/New_York"
                },
                organizer:true,
                extendedProperties:{
                  shared:toolData
                },
                status:"tentative",
                summary,
                description,
                recurrence:time.recurrence,
                attendees:[...attendees, ...locations.map(l=>({resource:true, email:calendars[l]}))]
              }
            });
            events.push(resp.data)
          }
          return events.flat()

        },

        submitGuess: async (_, {questionId, text}, {user}) => {
          const q = await question.findOne({_id:questionId});
          const correct = text.toLowerCase() === q.answer.toLowerCase();
          const g = await guess.create({
            submitted:new Date(),
            text,
            correct,
            question:q._id,
            user:user.id
          })
          return correct
        },
    
        completeDemo: async (_,{user, training}) =>{
          const d = await demo.create({user, training});
          return d._id
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
        },

        demo_completed: async ({id}, {user}, ctx) => await demo.findOne({training:id, user:user}) ? true : false,

        tools: async (doc) => await tool.find({training:doc.id}),

        required_by: async({_id}) => {

          const resp = await training.aggregate([
            {
                '$unwind': {
                    'path': '$prerequisites'
                }
            }, {
                '$group': {
                    '_id': '$prerequisites', 
                    'required_by': {
                        '$push': '$$ROOT'
                    }
                }
            }, {
                '$match': {
                    '_id': _id
                }
            }
        ]);

        return resp[0] ? resp[0].required_by : []
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
      student: (_, __, {user}) => {
        const userName = user.email.split("@")[0];
        const year = userName.substring(userName.length - 4, userName.length)
        return year == parseInt(year)
      },

    },

    ToolReservation:{
      tool: async (toolRes) => await tool.findOne({_id:toolRes.tool})
    },

    Tool:{
      training: async (toolDoc) => await training.findOne({id:toolDoc.training}),
      authorized_users: async (toolDoc) => await tool.aggregate([
        {
          '$match': {
            '_id': toolDoc._id
          }
        }, {
          '$lookup': {
            'from': 'trainings', 
            'localField': 'training', 
            'foreignField': 'id', 
            'as': 'training'
          }
        }, {
          '$unwind': {
            'path': '$training'
          }
        }, {
          '$lookup': {
            'from': 'demos', 
            'localField': 'training.id', 
            'foreignField': 'training', 
            'as': 'demos'
          }
        }, {
          '$project': {
            'user': '$demos.user'
          }
        }, {
          '$lookup': {
            'from': 'users', 
            'localField': 'user', 
            'foreignField': 'id', 
            'as': 'user'
          }
        }, {
          '$unwind': {
            'path': '$user'
          }
        }, {
          '$project': {
            'id': '$user.id', 
            'name': '$user.name', 
            'email': '$user.email'
          }
        }, {
          "$sort":{
            "name":1
          }
        }
      ]),
      available: async (toolDoc, {timeMin, timeMax}, {user}) => {
        let available = toolDoc.quantity;
        oauth2Client.setCredentials({...user.tokens});
        for (let calendarId of Object.values(calendars)){
          const resp = await google.calendar({version:"v3"}).events.list({
            calendarId,
            timeMin,
            timeMax,
            sharedExtendedProperty:[`${toolDoc._id}=true`],
            singleEvents:true
          });
          for (let event of resp.data.items){
            available = available - event.extendedProperties.shared[`${toolDoc._id}_qty`]
          }
        }
        return available
      }
    },
}
