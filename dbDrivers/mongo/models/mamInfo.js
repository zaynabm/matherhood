var mongoose=require("mongoose")
// register model
var Schema=mongoose.Schema
var mamInfo=new Schema({
  user_email:{
  	type:String,
  	required: true,
  	lowercase: true,
  	index:{unique: true}
  },
  user_name:String,
  sleep:Number,
  weight:Number,
  water:Number,
  mood:String,
  symptoms:String
})
// ORM
mongoose.model("mamInfo",mamInfo)
