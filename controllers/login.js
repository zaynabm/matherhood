var express=require("express");
var bodyParser=require("body-parser");
var log =require('../helperFuncs').log
var debug =require('../helperFuncs').debug
var router=express.Router();
var errmsg

var db=require("../dbDrivers/mongo/DBfunctions")
var config =require('../config').config
var errmsg
router.post("/checkUserEmail",function (req,resp) {
    var msg,data,statusCode;
    if (req.body.user_email){
        var user_email = req.body.user_email
        db.check_user_email(user_email).then((res,err)=>{
            if(res.result){
                resp.statusCode= 200
                resp.send(config.HttpResp("KO",res.data))
            }else{
                log("ERROR-check_user_email:   "+res.msg)
                resp.statusCode= 404
                resp.send(config.HttpResp(res.msg,{}))
            }
        })
    }else{
        errmsg="Body missing user_email"
        log("ERROR-check_user_email:   "+errmsg)
        resp.statusCode= 400
        resp.send(config.HttpResp(errmsg,{}))
    }
})
router.post("/checkPassword",function (req,resp) {
    if(req.body.user_email){
        if(req.body.userPassword){
            var user_email = req.body.user_email
            var userPassword = req.body.userPassword
            db.checkUserPassword(user_email,userPassword).then((res,err)=>{
                if(res.result){
                    resp.statusCode= 200
                    resp.send(config.HttpResp("KO",res.data))
                }else{
                    log("ERROR-checkPassword:   "+res.msg)
                    resp.statusCode= 500
                    resp.send(config.HttpResp(res.msg,{}))
                }
            })
        }else {
            errmsg="Body missing userPassword"
            log("ERROR-checkPassword:   "+errmsg)
            resp.statusCode= 400
            resp.send(config.HttpResp(errmsg,{}))
        }
    }else{
        errmsg="Body missing user_email"
        log("ERROR-checkPassword:   "+errmsg)
        resp.statusCode= 400
        resp.send(config.HttpResp(errmsg,{}))
    }
})
module.exports=router;
