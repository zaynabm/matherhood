const http = require('http');
//
// const port=process.env.PORT || 3000
//
// const server = http.createServer((req, res) => {
//
// res.statusCode = 200;
//
// res.setHeader('Content-Type', 'text/html');
//
// res.end('<h1>Hello World</h1>');
//
// });
//
// server.listen(port,() => {
//
// console.log(`Server running at port `+port);
//
// });




var config =require('./config').config
var log =require('./helperFuncs').log
var debug =require('./helperFuncs').debug
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



const server = http.createServer((req, res) => {
 console.log('Create Server');
  //res.statusCode = 200;
  //res.setHeader('Content-Type', 'text/html');
  //res.end('<h1>Hellllo World</h1>');
});

server.listen(port,() => {

console.log('Server running at port'+port);

});

process.on('unhandledRejection', (reason, p) => {
  log('Unhandled Rejection at: Promise'+ p+ 'reason:'+ reason);
});
