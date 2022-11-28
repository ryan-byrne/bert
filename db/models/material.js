const { Schema, model } = require('mongoose');

/*
    {
      id:"15483",
      vendor:"Lowes",
      material:"MDF",
      link:"https://www.lowes.com/pd/47-75-in-x-7-98-ft-Smooth-Brown-Wall-Panel/3014304",
      unit_price:"$14.98",
      description:"Smooth Brown Wall Panel",
      dimensions:[
        ['height', '96', 'in'],
        ['width', '48', 'in'],
        ['thickness', '0.112', 'in']
      ]
    }
*/

const Dimension = new Schema({
  dimension: String,
  value: Number,
  unit: String
})

module.exports = model('Material', new Schema({
  available:{
    type:Number,
    required:true
  },
  photo:String,
  id: {
    type:String,
    required:true,
    unique:true
  },
  vendor: String,
  material: {
    type:String,
    required:true
  },
  link: String,
  unit_price: Number,
  description: {
    type:String,
    required:true
  },
  dimensions: {
    required:true,
    type:[Dimension]
  }
}))