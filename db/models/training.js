const {Schema, model} = require('mongoose');

module.exports = model('Training', new Schema({
    id:{
        type:String,
        index:true,
        required:true
    },
    checklist:[String],
    name:String,
    description:String,
    demo:Boolean,
    questions:[{ref:"Question", type:"ObjectId"}]
}));