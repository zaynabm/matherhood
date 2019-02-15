const http = require('http');

var config =require('./config').config
var log =require('./helperFuncs').log
var debug =require('./helperFuncs').debug
var users = require('./dbDrivers//mongo/models/users.js');
var baby = require('./dbDrivers//mongo/models/baby.js');

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


app.listen(port);
debug("Hello from port "+port+" :D" );



process.on('unhandledRejection', (reason, p) => {
  log('Unhandled Rejection at: Promise'+ p+ 'reason:'+ reason);
});




// var mongoose=require("mongoose");
// var config =require('./config').config
// var log =require('./helperFuncs').log
// var debug =require('./helperFuncs').debug
//
//
// var users = require('./dbDrivers//mongo/models/users.js');
// //----------------------------------------------------------------------------------------------------------------------------------------------------//
// //------------------------------------------------------------------- APIs----------------------------------------------------------------------------//
// //----------------------------------------------------------------------------------------------------------------------------------------------------//
// var port = 8090
// var express = require("express")
//  , bodyParser = require('body-parser');
// var app=express();
// app.use(bodyParser.urlencoded({
//   extended: true
// }))
// app.use(bodyParser.json());
// app.use(function (err, req, resp, next) {
//     if(err) {
//         msg = "Bad json object"
//         data ={}
//         statusCode = 400
//         resp.statusCode= statusCode
//         resp.send(config.HttpResp(msg,data))
//     }
// })
//
//
//
// var loginController=require("./controllers/login");
// var signupController=require("./controllers/signup");
// app.use("/login",loginController);
// app.use("/signup",signupController);
//
// //Phase2
// var setUpProfileController=require("./controllers/setUpProfile");
// var setUpMedicalProfileController=require("./controllers/setUpMedicalProfile");
//
// app.use("/setUpProfile",setUpProfileController);
// app.use("/setUpMedicalProfile",setUpMedicalProfileController);
//
//
// app.listen(port);
// debug("Hello from port "+port+" :D" );
//
// process.on('unhandledRejection', (reason, p) => {
//   log('Unhandled Rejection at: Promise'+ p+ 'reason:'+ reason);
// });
