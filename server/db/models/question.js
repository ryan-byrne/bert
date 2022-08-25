const {Schema, model} = require('mongoose');

module.exports = model('Question', new Schema({
    answer:{
        required:true,
        type:String
    },
    text:String,
    training:{ref:'Training', type:'ObjectId', required:true},
    choices:[String]
}))