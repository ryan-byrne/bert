const {Schema, model} = require('mongoose');

module.exports = model('User', new Schema({
    id:{
        type:String,
        index:true,
        required:true
    },
    name:String,
    given_name:String,
    family_name:String,
    email:{
        type:String,
        index:true,
        required:true
    },
    verified_email:Boolean,
    picture:String,
    locale:String,
    hd:String,
    trainings_completed:[{ref:"Training", type:"ObjectId"}],
    demos_completed:[{ref:"Training", type:"ObjectId"}]
}))