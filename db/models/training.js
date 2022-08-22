const {Schema, model} = require('mongoose');

module.exports = model('Training', new Schema({
    id:{
        type:String,
        index:true,
        required:true
    },
    name:String,
    description:String,
    demo:Boolean,
    questions:[{ref:"Question", type:"ObjectId"}]
}));