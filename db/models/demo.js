const {Schema, model} = require('mongoose');

module.exports = model('Demo', new Schema({
    user:{
        type:String,
        required:true
    },
    training:{
        type:String,
        required:true
    },
    completed:{
        type:Schema.Types.Date,
        required:true
    },
    trained_by:{
        type:String,
        required:true
    }
}))