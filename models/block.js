const {Schema, model} = require('mongoose');

module.exports = model('Block', new Schema({
    day:String,
    week:String,
    division:String,
    name:String,
    start:String,
    end:String
}))