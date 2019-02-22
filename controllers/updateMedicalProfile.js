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
            var medical_profile_obj={};
            if(req.body.gender) medical_profile_obj.gender=req.body.gender;
            if(req.body.birth_day) medical_profile_obj.birth_day=req.body.birth_day;
            if(req.body.blood_type) medical_profile_obj.blood_type=req.body.blood_type;
            if(req.body.past_medichal_cond) medical_profile_obj.past_medichal_cond=req.body.past_medichal_cond;
            if(req.body.current_medichal_cond) medical_profile_obj.current_medichal_cond=req.body.current_medichal_cond;
            if(req.body.allergies) medical_profile_obj.allergies=req.body.allergies;
            if(req.body.current_medication) medical_profile_obj.current_medication=req.body.current_medication;
            if(req.body.pregnant) medical_profile_obj.pregnant=req.body.pregnant;
            if(req.body.month) medical_profile_obj.month=req.body.month;
            if(req.body.week) medical_profile_obj.week=req.body.week;

            db.updateMedicalProfileData(user_email,medical_profile_obj).then((res,err)=>{
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
