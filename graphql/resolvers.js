const { Types } = require('mongoose');
const { google, oauth2Client } = require('../auth');
const { GraphQLScalarType } = require('graphql');
const user = require('../db/models/user');
const training = require('../db/models/training');
const block = require('../db/models/block');
const question = require('../db/models/question');
const tool = require('../db/models/tool');
const guess = require('../db/models/guess');
const demo = require('../db/models/demo');
const material = require('../db/models/material');

const isProduction = process.env.NODE_ENV === 'production'

const calendars = isProduction ? {
  "classroom": "c_2l72cqq855fvcu8l0f35donqnc@group.calendar.google.com",
  "machineshop": "c_cdm0jncrjj972nf6g6o6r2jhf4@group.calendar.google.com",
  "powertool": "c_cdsr663bruijjo05637v89fh4k@group.calendar.google.com",
} : {
  "classroom": "c_p3oca9691kbuppg3gv684h62rc@group.calendar.google.com",
  "machineshop": "c_quvn2omcc7pttk6tip2n9a2fto@group.calendar.google.com",
  "powertool": "c_uclhkdm8namoq41rlij866jl2g@group.calendar.google.com"
}

const getGoogleEvents = async (location, timeMin, timeMax) => await google.calendar({ version: "v3" }).events.list({
  calendarId: calendars[location],
  timeMin,
  timeMax,
  singleEvents: true
});

/*
    getBlockTimes: async (_, { blocks, start, end }) => {

      const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
      let dates = [];
      var tzOffset = start.getTimezoneOffset();
      var hrOff = parseInt(tzOffset / 60, 10) - 4;
      const max = new Date(start);
      max.setDate(max.getDate() + 14)
      while (start < end && start < max) {
        const day = days[start.getDay() - 1]
        const week = getWeek(start);
        if (day) {
          const resp = await block.findOne({
            name: { "$in": blocks }, day, week
          })
          if (resp) {
            var [hr, min] = resp.start.split(":");
            start.setHours(parseInt(hr) - hrOff, min, 0, 0);
            const startTime = start.toISOString();
            var [hr, min] = resp.end.split(":");
            start.setHours(parseInt(hr) - hrOff, min, 0, 0);
            const endTime = start.toISOString();
            dates.push({
              start: startTime,
              end: endTime,
            })
          }
        }
        start.setDate(start.getDate() + 1)

      }
      return dates
    },
    */

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

  Query: {

    users: async (_, {id, email, search}, ctx) => user.find(
      id ? ({id}) :
      email ? ({email}) :
      search ? ({name:{
        $regex:search,
        $options:`i`
      }}) : 
      ({id:ctx.user.id})
    ),

    events: async (_, {
      timeMin,
      timeMax,
      tools,
      locations,
      materials,
      storage
    }, { user }) => {

      const eventTools = tools || [];
      const eventMaterials = materials || [];
      const eventStorage = storage || [];
      const eventLocations = locations || Object.keys(calendars);

      let events = [];
      for (const location of eventLocations) {
        const resp = await google.calendar({ version: "v3" }).events.list({
          calendarId: calendars[location],
          sharedExtendedProperty: [...eventTools, ...eventMaterials, ...eventStorage].map(id => `${id}=true`),
          timeMin,
          timeMax,
          singleEvents: true
        });
        events.push(resp.data.items);
      }
      return events.flat().filter(e => e);
    },

    blocks: async (_, { division, day, week }) => await block.find({ division, day, week }),

    trainings: async (_, { search, id }) => training.find(
      search ? ({name:{$regex:search,$options:'i'}}) :
      id ? ({id}) : ({})
    ),

    tools: async (_, {search, keywords, locations, id}) => await tool.aggregate([
      {
        $addFields:{
          fullName: {
            $concat:[
              "$brand", " ", "$name"
            ]
          }
        }
      },
      {
        $match:{
          fullName:{
            $regex:search || '',
            $options:'i'
          },
          keywords: keywords ? {$all:keywords} : {$exists:[]},
          location: locations ? {$in:locations} : {$exists:[]},
          _id: id ? {$in:id.map(i=>Types.ObjectId(i))} : {$exists:[]}
        }
      }
    ]),

    getConflicts: async (_, { times, locations }, { user }) => {

      oauth2Client.setCredentials({ ...user.tokens });

      // RRULE:FREQ=WEEKLY;UNTIL=20221031;INTERVAL=1
      let conflicts = [];
      for (const time of times) {
        for (const location of locations) {
          const { recurrence, start, end } = time;
          if (recurrence) {
            const [freq, until, interval] = recurrence[0].split(':')[1].split(';').map(i => i.split('=')[1])
            const untilDate = new Date(until.substring(0, 4), until.substring(4, 6), until.substring(6, 8));
            const startDate = new Date(start);
            startDate.setHours(startDate.getHours(), startDate.getMinutes() + 1, 0, 0)
            const endDate = new Date(end);
            endDate.setHours(endDate.getHours(), endDate.getMinutes() - 1, 0, 0)
            while (startDate < untilDate) {
              const resp = await getGoogleEvents(location, startDate, endDate);
              conflicts.push(resp.data.items)
              startDate.setDate(startDate.getDate() + interval * 7)
              endDate.setDate(endDate.getDate() + interval * 7)
            }
          } else {
            const resp = await getGoogleEvents(location, start, end);
            conflicts.push(resp.data.items)
          }
        }

        return conflicts.flat().filter(c => c.id);
      }
    },

    questions: async (_, { id }) => await question.find(id ? { _id: id } : {}),

    courses: async (_, __, { user }) => {
      oauth2Client.setCredentials({ ...user.tokens });
      const resp = await google.classroom({ version: "v1" }).courses.list({ courseStates: "ACTIVE" })
      return resp.data.courses
    }
  },

  Mutation: {

    createEvent: async (_, {
      summary,
      description,
      locations,
      times,
      tools,
      attendees,
      materials,
      storage
    }, { user }) => {

      oauth2Client.setCredentials(user.tokens);

      const events = []
      var sharedData = {};

      if (tools) {
        for (const tool of tools) {
          sharedData[tool.id] = true
          sharedData[`${tool.id}_qty`] = tool.quantity
        }
      }

      if (materials) {
        for (const material of materials) {
          sharedData[material.id] = true
          sharedData[`${material.id}_qty`] = material.quantity
        }
      }

      if (storage) {
        for (const store of storage) {
          sharedData[store] = true
        }
      }

      const eventAttendees = attendees ? attendees : []

      for (let time of times) {
        const resp = await google.calendar({ version: "v3" }).events.insert({
          calendarId: user.email,
          requestBody: {
            start: {
              dateTime: time.start,
              timeZone: "America/New_York"
            },
            end: {
              dateTime: time.end,
              timeZone: "America/New_York"
            },
            organizer: true,
            extendedProperties: {
              shared: sharedData
            },
            status: "tentative",
            summary,
            description,
            recurrence: time.recurrence,
            attendees: [...eventAttendees, ...locations.map(l => ({ resource: true, email: calendars[l] }))]
          }
        });
        events.push(resp.data)
      }
      return events.flat()

    },

    submitGuess: async (_, { questionId, text }, { user }) => {
      const q = await question.findOne({ _id: questionId });
      const correct = text.toLowerCase() === q.answer.toLowerCase();
      const g = await guess.create({
        submitted: new Date(),
        text,
        correct,
        question: q._id,
        user: user.id
      })
      return correct
    },

    completeDemo: async (_, { users, training }, ctx) => {
      const resp = await demo.findOne({ user, training });
      if (resp) {
        return null
      } else {
        const d = await demo.create(users.map(user => ({
          user,
          training,
          completed: new Date(),
          trained_by: ctx.user.id
        })));
        return d._id
      }
    },

    addMaterial: async (_, payload) => await material.create({ ...payload, available: 0 })
  },

  Training: {

    prerequisites: async ({ _doc }) => await training.find({ _id: _doc.prerequisites }),

    questions: async ({ _id }) => await question.find({ training: _id }),

    completed_by: async (doc) => await training.aggregate([
      {
          '$match': {
              'id': doc.id
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
          '$replaceRoot': {
              'newRoot': '$question'
          }
      }, {
          '$lookup': {
              'from': 'guesses', 
              'localField': '_id', 
              'foreignField': 'question', 
              'as': 'guesses'
          }
      }, {
          '$unwind': {
              'path': '$guesses'
          }
      }, {
          '$group': {
              '_id': {
                  'question': '$guesses.question', 
                  'user': '$guesses.user'
              }, 
              'guesses': {
                  '$push': '$guesses.correct'
              }
          }
      }, {
          '$project': {
              'correct': {
                  '$anyElementTrue': '$guesses'
              }
          }
      }, {
          '$group': {
              '_id': '$_id.user', 
              'questions': {
                  '$push': '$correct'
              }
          }
      }, {
          '$project': {
              'completed': {
                  '$cond': {
                      'if': {
                          '$and': '$questions'
                      }, 
                      'then': true, 
                      'else': false
                  }
              }
          }
      }, {
          '$match': {
              'completed': true
          }
      }, {
          '$lookup': {
              'from': 'users', 
              'localField': '_id', 
              'foreignField': 'id', 
              'as': 'user'
          }
      }, {
          '$unwind': {
              'path': '$user'
          }
      }, {
          '$replaceRoot': {
              'newRoot': '$user'
          }
      }
    ]),

    demo_completed_by: async (doc) => await training.aggregate([
      {
        '$match': {
          'id': doc.id
        }
      }, {
        '$lookup': {
          'from': 'demos',
          'localField': 'id',
          'foreignField': 'training',
          'as': 'demos'
        }
      }, {
        '$lookup': {
          'from': 'users',
          'localField': 'demos.user',
          'foreignField': 'id',
          'as': 'users'
        }
      }, {
        '$project': {
          'users': 1
        }
      }, {
        '$unwind': {
          'path': '$users'
        }
      }, {
        '$replaceRoot': {
          'newRoot': '$users'
        }
      }
    ]),

    completed: async (doc, vars, ctx) => {
      const resp = await training.aggregate([
        {
            '$match': {
                'id': doc.id
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
            '$replaceRoot': {
                'newRoot': '$question'
            }
        }, {
            '$lookup': {
                'from': 'guesses', 
                'localField': '_id', 
                'foreignField': 'question', 
                'as': 'guesses'
            }
        }, {
            '$unwind': {
                'path': '$guesses'
            }
        }, {
            '$group': {
                '_id': {
                    'question': '$guesses.question', 
                    'user': '$guesses.user'
                }, 
                'guesses': {
                    '$push': '$guesses.correct'
                }
            }
        }, {
            '$project': {
                'correct': {
                    '$anyElementTrue': '$guesses'
                }
            }
        }, {
            '$group': {
                '_id': '$_id.user', 
                'questions': {
                    '$push': '$correct'
                }
            }
        }, {
            '$project': {
                'completed': {
                    '$cond': {
                        'if': {
                            '$and': '$questions'
                        }, 
                        'then': true, 
                        'else': false
                    }
                }
            }
        }, {
            '$match': {
                'completed': true
            }
        }
      ]);
      return resp.map(u=>u._id).includes(vars.user ? vars.user : ctx.user.id)
    },

    demo_completed: async (doc, vars, ctx) => {
      const resp = await training.aggregate([
        {
            '$match': {
                'id': doc.id
            }
        }, {
            '$lookup': {
                'from': 'demos', 
                'localField': 'id', 
                'foreignField': 'training', 
                'as': 'demos'
            }
        }, {
            '$unwind': {
                'path': '$demos'
            }
        }, {
            '$project': {
                'id': '$demos.user'
            }
        }
      ]);
      return resp.map(u=>u.id).includes(vars.user ? vars.user : ctx.user.id)
    },

    tools: async (doc) => await tool.find({ training: doc.id }),

    required_by: async ({ _id }) => {

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

  Question: {

    completed: async (questionDoc, { user }, ctx) => {
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
                        '$eq': ['$$guess.user', user ? user : ctx.user.id]
                      }, '$$guess.correct'
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

  User: {

    student: (_, __, { user }) => {
      const userName = user.email.split("@")[0];
      const year = userName.substring(userName.length - 4, userName.length)
      return year == parseInt(year)
    },

  },

  Tool: {
    
    training: async (toolDoc) => await training.findOne({ id: toolDoc.training }),
    
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
        "$sort": {
          "name": 1
        }
      }
    ]),

    available: async (toolDoc, { timeMin, timeMax }, { user }) => {
      let available = toolDoc.quantity;
      oauth2Client.setCredentials({ ...user.tokens });
      for (let calendarId of Object.values(calendars)) {
        const resp = await google.calendar({ version: "v3" }).events.list({
          calendarId,
          timeMin,
          timeMax,
          sharedExtendedProperty: [`${toolDoc._id}=true`],
          singleEvents: true
        });
        for (let event of resp.data.items) {
          available = available - event.extendedProperties.shared[`${toolDoc._id}_qty`]
        }
      }
      return available
    }
  },

  Event: {

    locations: (eventDoc) => !eventDoc.attendees ? [] :
      Object.keys(calendars).filter(
        location => eventDoc.attendees.map(a => a.email).includes(calendars[location])
    ),

    storage: (eventDoc) => {
      if (eventDoc.extendedProperties) {
        const props = eventDoc.extendedProperties.shared;
        const options = ['purple', 'blue', 'green', 'yellow', 'orange', 'red', 'pink'].map(color =>
          new Array(12).fill(0).map((_, idx) => `${color}-${idx}`)
        ).flat();
        return Object.keys(props).filter(k => options.includes(k))
      } else return null
    },

    tools: async (eventDoc) => {
      if (eventDoc.extendedProperties) {
        const props = eventDoc.extendedProperties.shared;
        const sortedProps = Object.entries(props)
          .filter(([k, v]) => v === 'true')
          .map(([id, _]) => ({ id, quantity: props[`${id}_qty`] }));
        let tools = [];
        for (const prop of sortedProps) {
          try {
            let resp = await tool.findOne({ _id: prop.id });
            resp.reserved = prop.quantity;
            tools.push(resp)
          } catch {
            continue
          }
        }
        return tools
      } else return null

    },

    materials: async (eventDoc) => {
      if (eventDoc.extendedProperties) {
        const props = eventDoc.extendedProperties.shared;
        const sortedProps = Object.entries(props)
          .filter(([k, v]) => v === 'true')
          .map(([id, _]) => ({ id, quantity: props[`${id}_qty`] }));
        let materials = [];
        for (const prop of sortedProps) {
          try {
            let resp = await material.findOne({ id: prop.id });
            resp.reserved = prop.quantity;
            materials.push(resp)
          } catch {
            continue
          }
        }
        return materials
      } else return null
    }
  },

  Course: {
    roster: async (course, vars, ctx) => {
      oauth2Client.setCredentials({ ...ctx.user.tokens });
      const resp = await google.classroom({ version: "v1" }).courses.students.list({ courseId });
      return resp.data.students.map(s => ({ id: s.profile.id, name: s.profile.name.fullName, email: s.profile.emailAddress }))
    }
  }
}
