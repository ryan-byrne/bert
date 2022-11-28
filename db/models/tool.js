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
    location:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:true
    },
    stationary:Boolean,
    manual:String,
    issues:[{ type: 'ObjectId', ref: 'Issue' }],
    keywords:[String],
    training:{
        type:String,
        required:true
    }
}))