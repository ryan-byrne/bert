const {Schema, model} = require('mongoose');

module.exports = model('Guess', new Schema({
    user:{ type: 'ObjectId', ref: 'User' },
    question:{ type: 'ObjectId', ref: 'Question' },
    correct:Boolean
}))