const http = require('http');
var request=require('request')
 var url = require('url')

var config =require('./config').config
var log =require('./helperFuncs').log
var debug =require('./helperFuncs').debug
var users = require('./dbDrivers//mongo/models/users.js');
var baby = require('./dbDrivers//mongo/models/baby.js');
var posts = require('./dbDrivers//mongo/models/posts.js');
var posts = require('./dbDrivers//mongo/models/mamInfo.js');
var posts = require('./dbDrivers//mongo/models/babyInfo.js');


//----------------------------------------------------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------- APIs----------------------------------------------------------------------------//
//----------------------------------------------------------------------------------------------------------------------------------------------------//
// var port = 8090
const port=process.env.PORT || 3000
var express = require("express")
 , bodyParser = require('body-parser');
var app=express();
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json());
app.use(function (err, req, resp, next) {
    if(err) {
        msg = "Bad json object"
        data ={}
        statusCode = 400
        resp.statusCode= statusCode
        resp.send(config.HttpResp(msg,data))
    }
})


var loginController=require("./controllers/login");
var signupController=require("./controllers/signup");


app.use("/login",loginController);
app.use("/signup",signupController);


////Phase2
var setUpProfileController=require("./controllers/setUpProfile");
var setUpMedicalProfileController=require("./controllers/setUpMedicalProfile");

app.use("/setUpProfile",setUpProfileController);
app.use("/setUpMedicalProfile",setUpMedicalProfileController);


//Phase3
var createInfantMedicalProfileController=require("./controllers/createInfantMedicalProfile");
app.use("/createInfantMedicalProfile",createInfantMedicalProfileController);


// phase4
var updateInfantMedicalProfileController=require("./controllers/updateInfantMedicalProfile")
var updateMedicalProfileController=require("./controllers/updateMedicalProfile")
app.use("/updateMedicalProfile",updateMedicalProfileController);
app.use("/updateInfantMedicalProfile",updateInfantMedicalProfileController);

var getInfantMedicalProfileController=require("./controllers/getInfantMedicalProfile")
app.use("/getInfantMedicalProfile",getInfantMedicalProfileController);


//phase5
var addPostController=require("./controllers/addPost")
var addCommentController=require("./controllers/addComment")
app.use("/addPost",addPostController);

var getPostsController=require("./controllers/getPosts")
app.use("/getPosts",getPostsController);

var addCommentController=require("./controllers/addComment")
app.use("/addComment",addCommentController);

var getCommentsController=require("./controllers/getComments")
app.use("/getComments",getCommentsController);

// phase6
var addMamInfoController=require("./controllers/addMamInfo")
app.use("/addMamInfo",addMamInfoController);
var getMamInfoController=require("./controllers/getMamInfo")
app.use("/getMamInfo",getMamInfoController);


var addBabyInfoController=require("./controllers/addBabyInfo")
app.use("/addBabyInfo",addBabyInfoController);
var getBabyInfoController=require("./controllers/getBabyInfo")
app.use("/getBabyInfo",getBabyInfoController);

var getBabyNamesController=require("./controllers/getBabyNames")
app.use("/getBabyNames",getBabyNamesController);

app.listen(port);
debug("Hello from porttt "+port+" :D" );
// setInterval(Notify,10000);
function Notify(){
  console.log("Notify");

  request.post({
      uri: 'http://fcm.googleapis.com/fcm/send',
      json: true,
      headers : {
        "Content-Type":"application/json",
        "Authorization":"Key=AAAAdc1FuDw:APA91bErbJjFHbr2v3wKNUqNyHfpgnpTjU9Zp_oHS8RP5fTFBP9MHwQ61rWu9WwVAiPAVDPwnho9CSp69PcIUndke7ob7wPTdNLJCR0nKSdrsq4MXBf8960QcybHM9m82BIK8EXYA1qd",
      },
        body: {
        "to":
          "/topics/motherhood"
        ,
        "data": {
          "extra_information": "This is some extra information",
          "type": "Offers",
           "notification_position": "2"
        },
        "notification": {
          "title": "Motherhood",
          "text": "motherhood notification ",
          "click_action": "MainActivity",
           "sound": "true",
           "icon": "ic_kreaz_white_edit"

        }
      }
    }, (err, res, body) => {

      if(err) {
        console.log('ERROR:', error);
        } else {
        console.log(res.body.message_id);
        }
});

}

process.on('unhandledRejection', (reason, p) => {
  log('Unhandled Rejection at: Promise'+ p+ 'reason:'+ reason);
});
