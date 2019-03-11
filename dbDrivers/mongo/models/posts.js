var mongoose=require("mongoose")
// register model
var Schema=mongoose.Schema

var comments = new Schema({
    text: String,
    user_name: String,
    user_email: String
});

var posts=new Schema({
  user_email:{
  	type:String,
  	required: true,
  	lowercase: true
  },
  user_name:{
    type:String,
    required: true,
  },
  title:{
    type:String,
    required: true,
  },
  category:{
    type:String,
    required: true,
  },
  text:{
    type:String,
    required: true,
  },
  comments:[comments]
  })
// ORM
mongoose.model("posts",posts)
