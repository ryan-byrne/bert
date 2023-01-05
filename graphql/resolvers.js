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

const convertToExtendedProperties = (tools, materials, storage) => {

  var sharedData = {}

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

  return sharedData

}

// TODO: Figure out Quantity Query
const getExtendedProperties = (tools, materials, storage) => {
  if ( tools || materials || storage ){
    const eventTools = tools ? tools.map(t=>t.id) : [];
    const eventMaterials = materials ? materials.map(m=>m.id) : [];
    const eventStorage = storage || [];
    return [...eventTools, ...eventMaterials, ...eventStorage].map(i=>`${i}=true`)
  } else return null
}

const getGoogleEvent = async (timeMin, timeMax, location, attendees, sharedExtendedProperty) => {

  const resp = await google.calendar('v3').events.list({
    calendarId:calendars[location],
    timeMax,
    timeMin,
    attendees,
    sharedExtendedProperty,
    singleEvents:true
  });

  return resp.data.items.flat().filter(e=>e);
}

const getGoogleSingleEvents = async (start, end, location, attendees, sharedExtendedProperties) => {
  let events = [];
  // Find events for each attendees and sharedExtendedProperty
  if (attendees && sharedExtendedProperties) {
    for (const prop of sharedExtendedProperties){
      for (const att of attendees){
        events.push(await getGoogleEvent(start, end, location, att, prop))
      }
    }
  } else if (attendees && !sharedExtendedProperties) {
    for (const att of attendees){
      events.push(await getGoogleEvent(start, end, location, att, undefined))
    }
  } else if (!attendees && sharedExtendedProperties) {
    for (const prop of sharedExtendedProperties){
      events.push(await getGoogleEvent(start, end, location, undefined, prop))
    }
  } else {
    events.push(await getGoogleEvent(start, end, location, undefined, undefined))
  }
  return events.flat().filter(e=>e)
}

const getGoogleRecurringEvents = async (start, end, location, recurrence, attendees, sharedExtendedProperties) => {

  const [freq, until, interval] = recurrence[0].split(':')[1].split(';').map(i => i.split('=')[1]);

  let events = [];

  const startDate = new Date(start);
  startDate.setHours(startDate.getHours(), startDate.getMinutes() + 1, 0, 0);

  const endDate = new Date(end);
  endDate.setHours(endDate.getHours(), endDate.getMinutes() - 1, 0, 0);

  const untilDate = new Date(until.substring(0, 4), until.substring(4, 6), until.substring(6, 8));

  while (startDate < untilDate){
    events.push( await getGoogleSingleEvents(startDate, endDate, location, attendees, sharedExtendedProperties) )
    startDate.setDate(startDate.getDate() + interval * (freq === 'WEEKLY' ? 7 : 1));
    endDate.setDate(endDate.getDate() + interval * (freq === 'WEEKLY' ? 7 : 1));
  }

  return events.flat().filter(e=>e)
}

const getGoogleEvents = async (time, location, attendees, sharedExtendedProperties ) => {

  const {start, end, recurrence} = time;

  let events = []

  if (recurrence) events.push( await getGoogleRecurringEvents(start, end, location, recurrence, attendees, sharedExtendedProperties) )
  else events.push( await getGoogleSingleEvents(start, end, location, attendees, sharedExtendedProperties) )

  return events.flat().filter(e=>e)

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

    event: async (_, {eventId}) => {

      for (const calendarId of Object.values(calendars)){
        const resp = await google.calendar('v3').events.get({
          eventId,
          calendarId
        });
        if (resp) return resp.data
        else continue
      }

      
    },

    events: async (_, {
      times,
      attendees,
      tools,
      locations,
      materials,
      storage
    }) => {
      const eventLocations = locations || Object.keys(calendars);
      const sharedExtendedProperties = getExtendedProperties(tools, materials, storage);
      let events = [];
      for (const location of eventLocations) {
        for (const time of times){
          events.push( await getGoogleEvents(time, location, attendees, sharedExtendedProperties) );
        }
      }
      return events.flat().filter(e => e);
    },

    materials: async (_, {search}) => await material.find({
      description:{
        $regex:search,
        $options:'i'
      }
    }),

    blocks: async (_, { division, day, week, name }) => await block.find({ 
      division:division?{$in:division}:{$regex:/.*/}, 
      day:day?{$in:day}:{$regex:/.*/},
      week:division.includes('middle') ? null : week ?{$in:week}: {$regex:/.*/},
      name:name?{$in:name}:{$regex:/.*/}
    }).sort({week:1, day:1, start:1}),

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

    questions: async (_, { id }) => await question.find(id ? { _id: id } : {}),

    courses: async (_, __) => {
      const resp = await google.classroom({ version: "v1" }).courses.list({ courseStates: "ACTIVE" })
      return resp.data.courses
    }
  },

  Mutation: {

    createEvent: async (_, {event}) => {

      const {
        summary,
        description,
        locations,
        times,
        tools,
        attendees,
        materials,
        storage } = event;

      const events = [];

      const shared = convertToExtendedProperties(tools, materials, storage);
      const eventAttendees = attendees ? [...attendees, ...locations.map(l=>({resource:true, email:calendars[l]}))] : []

      for (const time of times) {
        const resp = await google.calendar({ version: "v3" }).events.insert({
          calendarId: "primary",
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
            extendedProperties: { shared },
            status: "tentative",
            summary,
            description,
            recurrence: time.recurrence,
            attendees: eventAttendees
          }
        });

        events.push(resp.data)
      }

      return events.flat()

    },

    editEvent: async (_, {update, eventId}) => {

      // TODO: Ability to change recurring events

      const {
        summary,
        description,
        locations,
        times,
        tools,
        attendees,
        materials,
        storage
      } = update;

      let events = []

      for (const time of times){
        const resp = await google.calendar({ version: "v3" }).events.patch({
          calendarId:'primary',
          eventId,
          requestBody:{
            summary,
            description,
            attendees:[...attendees, ...locations.map(l=>({resource:true, email:calendars[l]}))],
            extendedProperties:{
              shared: convertToExtendedProperties(tools, materials, storage)
            }
          }
        })
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

    available: async (toolDoc, { timeMin, timeMax }) => {
      let available = toolDoc.quantity;
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

    owner: (eventDoc, _, ctx) => eventDoc.creator.email === ctx.user.email, 

    attendees: (eventDoc) => eventDoc.attendees.filter(a=>!Object.values(calendars).includes(a.email)),

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
      } else return []
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
            tools.push({tool:resp, reserved:prop.quantity})
          } catch {
            continue
          }
        }
        return tools
      } else return []

    },

    materials: async (eventDoc) => {
      if (eventDoc.extendedProperties) {
        const props = eventDoc.extendedProperties.shared;
        const sortedProps = Object.entries(props)
          .filter(([k, v]) => v === 'true')
          .map(([id, _]) => ({ id, quantity: props[`${id}_qty`] }));
        let materials = [];
        for (const prop of sortedProps) {
          let resp = await material.findOne({ id: prop.id });
          if (!resp) continue
          else materials.push({material:resp, quantity:prop.quantity})
        }
        return materials
      } else return []
    },

    creator: async(eventDoc) => await user.findOne({email:eventDoc.creator.email})
  },

  Course: {
    roster: async (course, vars, ctx) => {
      const resp = await google.classroom({ version: "v1" }).courses.students.list({ courseId:course.id });
      return resp.data.students.map(s => ({ id: s.profile.id, name: s.profile.name.fullName, email: s.profile.emailAddress }))
    }
  }
}
