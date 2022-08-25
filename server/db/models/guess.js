const {Schema, model} = require('mongoose');

module.exports = model('Guess', new Schema({
    user:String,
    text:String,
    question:{ type: 'ObjectId', ref: 'Question' },
    submitted:Schema.Types.Date,
    correct:Boolean
}))