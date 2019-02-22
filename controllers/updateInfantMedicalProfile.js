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
            var babyObj={};
            if(req.body.baby_name) babyObj.baby_name=req.body.baby_name;
            if(req.body.gender) babyObj.gender=req.body.gender;
            if(req.body.birth_day) babyObj.birth_day=req.body.birth_day;
            if(req.body.blood_type) babyObj.blood_type=req.body.blood_type;
            if(req.body.past_medichal_cond) babyObj.past_medichal_cond=req.body.past_medichal_cond;
            if(req.body.current_medichal_cond) babyObj.current_medichal_cond=req.body.current_medichal_cond;
            if(req.body.allergies) babyObj.allergies=req.body.allergies;
            if(req.body.current_medication) babyObj.current_medication=req.body.current_medication;

            db.updateInfantMedicalProfile(user_email,babyObj).then((res,err)=>{
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
