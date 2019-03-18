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
  calm:Boolean,
  anxious:Boolean,
  irritable:Boolean,
  sad:Boolean,
  highF:Boolean,
  lowF:Boolean,
  coughing:Boolean
})
// ORM
mongoose.model("mamInfo",mamInfo)
