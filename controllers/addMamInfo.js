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
    console.log("hiiii");
    var msg,data,statusCode;
    if (req.body.user_email){
      var user_email = req.body.user_email
      db.check_if_user_email_exist(user_email).then((res,err)=>{
          if(res.result){
            var mamInfoObj={
              "user_email":user_email,
              "user_name":res.data.user_name,
              "sleep":req.body.sleep,
              "weight":req.body.weight,
              "water":req.body.water,
              "mood":req.body.mood,
              "symptoms":req.body.symptoms
            };

            db.addNewMamInfo(mamInfoObj).then((res,err)=>{
                if(res.result){
                      resp.statusCode= 200
                      resp.send(config.HttpResp("KO",res.data))
                }else{
                    log("ERROR-addNewMamInfo:   "+res.msg)
                    resp.statusCode= 404
                    resp.send(config.HttpResp(res.msg,{}))
                }
            })
          }else{
            res.msg="Email Not registered!"
            log("ERROR-addNewMamInfo: "+res.msg)
            resp.statusCode= 404
            resp.send(config.HttpResp(res.err,{}))
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
