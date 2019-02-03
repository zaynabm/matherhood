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
})
// ORM
mongoose.model("users",users)
