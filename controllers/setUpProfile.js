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
    if (req.body.email){
      var user_email = req.body.email
      db.check_if_user_email_exist(user_email).then((res,err)=>{
          if(res.result){
            var profile_obj={};
            if(req.body.pic) profile_obj.profile_pic=req.body.pic;
            if(req.body.display_name) profile_obj.display_name=req.body.display_name;
            if(req.body.bio) profile_obj.biography=req.body.bio;

            db.addProfileData(user_email,profile_obj).then((res,err)=>{
                if(res.result){
                      resp.statusCode= 200
                      resp.send(config.HttpResp("KO",res.data))
                }else{
                    log("ERROR-addProfileData:   "+res.msg)
                    resp.statusCode= 404
                    resp.send(config.HttpResp(res.msg,{}))
                }
            })
          }else{
            res.msg="Email Not registered!"
            log("ERROR-setUpProfile: "+res.msg)
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
