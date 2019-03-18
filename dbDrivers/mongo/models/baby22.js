var mongoose=require("mongoose")
// register model
var Schema=mongoose.Schema
var baby=new Schema({
  user_email:{
  	type:String,
  	required: true,
  	lowercase: true,
  	index:{unique: true}
  },
  baby_name:{
  	type:String,
  	required: true,
  },
  gender:{
  	type:String,
  	required: true,
  },
  birth_day:{
  	type:String,
  	required: true,
  },
  blood_type:{
  	type:String,
  	required: true,
  },
  past_medichal_cond:String,
  current_medichal_cond:String,
  allergies:String,
  current_medication:String,
})
// ORM
mongoose.model("baby",baby)
