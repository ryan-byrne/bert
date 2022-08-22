const {Schema, model} = require('mongoose');

module.exports = model('Issue', new Schema({
    description:{
        required:true,
        type:String
    },
    caused_by:{
        type:[String],
        required:true
    },
    solved_by:{
        type:[String],
        required:true
    },
    keywords:[String]
}))