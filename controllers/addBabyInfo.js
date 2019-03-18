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
    if (req.body.user_email&&req.body.baby_name){
      var user_email = req.body.user_email
      var baby_name=req.body.baby_name
      var babyInfoObj={
        "user_email":user_email,
        "baby_name":baby_name,
        "sleep":req.body.sleep,
        "weight":req.body.weight,
        "feeding":req.body.feeding,
        "diaper_changes":req.body.diaper_changes,
        "temp":req.body.temp,
        "calm":req.body.calm,
        "plyfull":req.body.plyfull,
        "irritable":req.body.irritable,
        "sad":req.body.sad,
        "highF":req.body.highF,
        "lowF":req.body.lowF,
        "coughing":req.body.coughing
      };
      db.check_if_baby_info_exist(user_email,baby_name).then((res,err)=>{
          if(res.result){
            db.updateBabyInfo(babyInfoObj).then((res,err)=>{
                if(res.result){
                      resp.statusCode= 200
                      resp.send(config.HttpResp("KO",res.data))
                }else{
                    log("ERROR-babyInfoObj:   "+res.msg)
                    resp.statusCode= 404
                    resp.send(config.HttpResp(res.msg,{}))
                }
            })
          }else{
              db.addBabyInfo(babyInfoObj).then((res,err)=>{
                  if(res.result){
                        resp.statusCode= 200
                        resp.send(config.HttpResp("KO",res.data))
                  }else{
                      log("ERROR-babyInfoObj:   "+res.msg)
                      resp.statusCode= 404
                      resp.send(config.HttpResp(res.msg,{}))
                  }
              })
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
