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
    var post_id=req.body.post_id
    db.getComments(post_id).then((res,err)=>{
        if(res.result){
              resp.statusCode= 200
              resp.send(config.HttpResp("KO",res.data[0].comments))
        }else{
            log("ERROR-getPosts:   "+res.msg)
            resp.statusCode= 404
            resp.send(config.HttpResp(res.msg,{}))
        }
    })
})

module.exports=router;
