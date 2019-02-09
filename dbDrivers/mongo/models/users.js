var mongoose=require("mongoose")
// register model
var Schema=mongoose.Schema
var users=new Schema({
  user_email:{
  	type:String,
  	required: true,
  	lowercase: true,
  	index:{unique: true}
  },
  user_password:{
  	type:String,
  	required: true,
  },
  user_name:{
  	type:String,
  	required: true,
  },
  profile_pic:{
    data: Buffer,
    contentType: String
  },
  display_name:String,
  biography:String,
  gender:String,
  birth_day:String,
  blood_type:String,
  past_medichal_cond:String,
  allergies:String,
  current_medication:String,
  pregnant:Boolean,
  month:Number,
  week:Number

})
// ORM
mongoose.model("users",users)
