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
    if (req.body.email && req.body.password){
        var user_email = req.body.email
        var user_password= req.body.password

        db.check_if_user_email_exist(user_email).then((res,err)=>{
            if(res.result){
              console.log(user_password,res.data.user_password);
                if(user_password==res.data.user_password){
                  resp.statusCode= 200
                  resp.send(config.HttpResp("KO",res.data))
                }else{
                  res.msg="password not match"
                  resp.statusCode= 404
                  resp.send(config.HttpResp(res.msg,{}))
                }

            }else{
                log("ERROR-check_user_email:   "+res.msg)
                resp.statusCode= 404
                resp.send(config.HttpResp(res.msg,{}))
            }
        })
    }else{
        resp.msg="missing data!"
        log("ERROR-check_user_email:   "+resp.msg)
        resp.statusCode= 404
        resp.send(config.HttpResp(resp.msg,{}))
    }
})

module.exports=router;
