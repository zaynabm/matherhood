var mongoose=require("mongoose")
// register model
var Schema=mongoose.Schema
var babyInfo=new Schema({
  user_email:{
    type:String,
    required: true,
    lowercase: true,
    index:{unique: true}
  },
  baby_name:String,
  sleep:Number,
  weight:Number,
  feeding:Number,
  diaper_changes:Number,
  temp:String,
  mood:String,
  symptoms:String
})
// ORM
mongoose.model("babyInfo",babyInfo)
