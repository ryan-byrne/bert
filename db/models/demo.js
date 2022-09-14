const {Schema, model} = require('mongoose');

module.exports = model('Demo', new Schema({
    user:String,
    training:String
}))