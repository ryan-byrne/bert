const {Schema, model} = require('mongoose');

const Tokens = new Schema({
    access_token: String,
    scope: String,
    token_type: String,
    id_token:String,
    refresh_token:String,
    expiry_date:Number
  })

module.exports = model('User', new Schema({
    tokens:Tokens,
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
    last_login:Schema.Types.Date,
    first_login:Schema.Types.Date,
    auth_token:String
}))