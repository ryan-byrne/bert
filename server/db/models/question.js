const {Schema, model} = require('mongoose');

module.exports = model('Question', new Schema({
    answer:{
        required:true,
        type:String
    },
    question:{
        required:true,
        type:String
    },
    choices:[String]
}))