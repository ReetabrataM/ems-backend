const mongoose = require("mongoose");

const merchandiseSchema =
new mongoose.Schema(
{
 name:{
  type:String,
  required:true
 },


 price:{
  type:Number,
  required:true
 },

 image:{
  type:String,
  default:""
 },

 stock:{
  type:Number,
  default:0
 },

 category:{
  type:String,
  default:"General"
 }
},
{
 timestamps:true
}
);

module.exports =
mongoose.model(
"Merchandise",
merchandiseSchema
);