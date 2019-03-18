var mongoose=require("mongoose")
// register model
var Schema=mongoose.Schema
var babyInfo=new Schema({
  user_email:String,
  baby_name:String,
  sleep:Number,
  weight:Number,
  feeding:Number,
  diaper_changes:Number,
  temp:Number,
  calm:Boolean,
  plyfull:Boolean,
  irritable:Boolean,
  sad:Boolean,
  highF:Boolean,
  lowF:Boolean,
  coughing:Boolean

})
// ORM
mongoose.model("babyInfo",babyInfo)
