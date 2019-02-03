var express=require("express");
var bodyParser=require("body-parser");
var log =require('../helperFuncs').log
var debug =require('../helperFuncs').debug
var router=express.Router();
var errmsg

var db=require("../dbDrivers/mongo/DBfunctions")
var config =require('../config').config
var errmsg
router.post("/",function (req,resp) {
    var msg,data,statusCode;
    if (req.body.email && req.body.password && req.body.name ){
        var user_name = req.body.name
        var user_email = req.body.email
        var user_password = req.body.password
        console.log("            Sign Up                user data: ");
        console.log(user_name,user_email,user_password);


        db.check_if_user_email_exist(user_email).then((res,err)=>{
            if(!res.result){
                resp.statusCode= 200
                db.addUserAccount(user_name,user_email,user_password);
                resp.send(config.HttpResp("KO",(res.msg,{name:user_name,email:user_email,password:user_password})))
            }else{
                res.msg="Email already registered!"
                log("ERROR-signup: "+res.msg)
                resp.statusCode= 404
                resp.send(config.HttpResp(res.msg,{}))
            }
        })

    }else{
        errmsg="missing data!"
        log("ERROR-check_signup:   "+errmsg)
        resp.statusCode= 400
        resp.send(config.HttpResp(errmsg,{}))
    }
})
// router.post("/checkPassword",function (req,resp) {
//     if(req.body.user_email){
//         if(req.body.userPassword){
//             var user_email = req.body.user_email
//             var userPassword = req.body.userPassword
//             db.checkUserPassword(user_email,userPassword).then((res,err)=>{
//                 if(res.result){
//                     resp.statusCode= 200
//                     resp.send(config.HttpResp("KO",res.data))
//                 }else{
//                     log("ERROR-checkPassword:   "+res.msg)
//                     resp.statusCode= 500
//                     resp.send(config.HttpResp(res.msg,{}))
//                 }
//             })
//         }else {
//             errmsg="Body missing userPassword"
//             log("ERROR-checkPassword:   "+errmsg)
//             resp.statusCode= 400
//             resp.send(config.HttpResp(errmsg,{}))
//         }
//     }else{
//         errmsg="Body missing user_email"
//         log("ERROR-checkPassword:   "+errmsg)
//         resp.statusCode= 400
//         resp.send(config.HttpResp(errmsg,{}))
//     }
// })
module.exports=router;
