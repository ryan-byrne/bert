const {Schema, model} = require('mongoose');

module.exports = model('Tool', new Schema({
    brand:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        min:1,
        required:true
    },
    location:String,
    photo:String,
    manual:String,
    issues:[{ type: 'ObjectId', ref: 'Issue' }],
    keywords:[String],
    training:String
}))