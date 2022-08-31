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
                const endDate = new Date(end);
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

        getCalendar: async (_, {timeMin, timeMax, locations, attendees}, {user}) => {


          oauth2Client.setCredentials({...user.tokens});

          const calendar = []
          const allEvents = []
          for(let location of locations) {

            const resp = await google.calendar({version:"v3"}).events.list({
              calendarId:calendars[location],
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

        getTrainings: async (_, {trainings}) => await training.find( trainings ? {id:trainings} : null ),

        getQuestions: async (_,{questions}) => await question.find( questions ? {_id:questions} : null ),

        getTools: async(_,{id, keywords}) => await tool.find(id && keywords ? {_id:id, keywords} :
            id ? {_id:id} :
            keywords ? {keywords:{"$all":keywords}} : null
        ),

        getBlockTimes: async (_, {blocks, start, end}) => {

          const days = ['Monday','Tuesday','Wednesday','Thursday','Friday']
          let dates = []
          const startDate = new Date(start);
          const endDate = new Date(end);
          const finishDate = new Date(start);
          finishDate.setDate( finishDate.getDate() + 14 )
          while ( startDate < endDate && startDate < finishDate ) {
            const day = days[startDate.getDay() - 1]
            const week = getWeek(startDate);
            if (day) {
              const resp = await block.findOne({
                name:{"$in":blocks}, day, week
              })
              if (resp) {
                var [hr, min] = resp.start.split(":");
                startDate.setHours(hr, min, 0, 0)
                var [hr, min] = resp.end.split(":");
                const startTime = startDate.toISOString();
                startDate.setHours(hr, min, 0, 0);
                const endTime = startDate.toISOString();
                dates.push({
                  start:startTime,
                  end:endTime,
                })
              }
            }
            startDate.setDate( startDate.getDate() + 1 )
            
          }
          return dates
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
          let toolData = {}
          tools.map(tool=>{toolData[tool.id] = tool.quantity});
          for ( let location of locations ){
            for (let time of times){
              const resp = await google.calendar({version:"v3"}).events.insert({
                calendarId:calendars[location],
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
                  attendees
                }
              });
              events.push(resp.data)
            }
          }
          return events.flat()

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
        },

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
        trainings_completed: async (u) => await training.find({_id:u.trainings_completed}),
        demos_completed: async (u) => await training.find({_id:u.demos_completed}),
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