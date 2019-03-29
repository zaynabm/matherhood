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
    var user_email=req.body.user_email
    var baby_name=req.body.baby_name
    db.getInfo(user_email,baby_name).then((res,err)=>{
        if(res.result){
              objId=res.data._id.toString()
              console.log("objId....",objId);
              date= new Date(parseInt(objId.substring(0, 8), 16) * 1000);
              resp.statusCode= 200
              resp.send({msg:"OK",data:res.data,date:date})
        }else{
            log("ERROR-getBabyInfo:   "+res.msg)
            resp.statusCode= 404
            resp.send(config.HttpResp(res.msg,{}))
        }
    })
})

module.exports=router;
