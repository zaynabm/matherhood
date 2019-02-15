var mongoose=require("mongoose");
var db=require('./connect')
var config=require('../../config')
var hf=require('../../helperFuncs')
var log =require('../../helperFuncs').log
var debug =require('../../helperFuncs').debug


////**********************************************************************************************************
if(!db.connected) db.connect
//... Phase2 ......................................................................................


exports.check_if_user_email_exist=function(user_email){
    return new Promise(function(resolve, reject) {
        if(db)
            mongoose.model("users").findOne({"user_email":user_email},function(err,resp){
                if (!err ) {
                    if(resp !=null ){
                        debug("DONE-check_user_email      : user_email:"+resp.user_email);
                        resolve({result:true,data:resp})
                    }else{
                        debug("DONE-check_user_email      : " + user_email + " NOT found!!");
                        resolve({result:false,msg:"Email NOT found!"})
                    }
                }else {
                    throw err;
                    debug("ERROR-check_user_email  : "+err);
                    resolve({result:false,msg:err})
                }
            });
            else{
                debug("ERROR-check_user_email  : "+db.mongoErr);
                resolve({result:false,msg: db.mongoErr})
            }
    });
}

exports.addUserAccount=function(user_name,user_email,user_password){
  return new Promise(function(resolve, reject) {
      if(db){
          var usersModel= mongoose.model("users")
          var newUser= new usersModel();

          newUser.user_name= user_name ;
          newUser.user_email= user_email ;
          newUser.user_password= user_password ;

          newUser.save(function(err){
              if(!err) resolve({result:true})
              else{
                  errMsg="ERROR-addUserAccount-can not save to DB, check connection :"
                  debug(errMsg+err)
                  resolve({result:false,msg:errMsg})
              }
          });
      }else{
          errMsg="ERROR-addUserAccount-can not connect to DB :"
          debug(errMsg+err)
          debug(errMsg+db.mongoErr)
          resolve({result:false,msg:db.mongoErr})
      }
  });

}

//... Phase2 ......................................................................................
exports.addProfileData=function(user_email,profile_obj){
      return new Promise(function(resolve, reject) {
          if(db)
              mongoose.model("users").update({"user_email":user_email},profile_obj,function(err,resp){
                  if (!err) resolve({result:true})
                  else{
                      debug("ERROR-updateUser   :"+err)
                      resolve({result:false,msg:err})
                  }
              });
          else{
            errMsg="ERROR-addProfileData-can not connect to DB :"
            debug(errMsg+err)
            debug(errMsg+db.mongoErr)
            resolve({result:false,msg:db.mongoErr})

          }
      });
}

exports.addMedicalProfileData=function(user_email,medical_profile_obj){
      return new Promise(function(resolve, reject) {
          if(db)
              mongoose.model("users").update({"user_email":user_email},medical_profile_obj,function(err,resp){
                  if (!err) resolve({result:true})
                  else{
                      debug("ERROR-updateUser   :"+err)
                      resolve({result:false,msg:err})
                  }
              });
          else{
            errMsg="ERROR-addProfileData-can not connect to DB :"
            debug(errMsg+err)
            debug(errMsg+db.mongoErr)
            resolve({result:false,msg:db.mongoErr})

          }
      });
}

//... Phase3 ......................................................................................

exports.addNewInfantMedicalProfile=function(user_email,babyObj){
  return new Promise(function(resolve, reject) {
      if(db){
          var babyModel= mongoose.model("baby")
          var newBaby= new babyModel();

          newBaby.user_email= user_email ;
          newBaby.baby_name=babyObj.baby_name
          newBaby.gender=babyObj.gender
          newBaby.birth_day=babyObj.birth_day
          newBaby.blood_type=babyObj.blood_type

          if(babyObj.past_medichal_cond) newBaby.past_medichal_cond=babyObj.past_medichal_cond;
          if(babyObj.current_medichal_cond) newBaby.current_medichal_cond=babyObj.current_medichal_cond;
          if(babyObj.allergies) newBaby.allergies=babyObj.allergies;
          if(babyObj.current_medication) newBaby.current_medication=babyObj.current_medication;

          newBaby.save(function(err, result){
              if(!err) resolve({result:true, data:result})
              else{
                  errMsg="ERROR-addNewInfantMedicalProfile-can not save to DB, check connection :"
                  debug(errMsg+err)
                  resolve({result:false,msg:err})
              }
          });
      }else{
          errMsg="ERROR-addNewInfantMedicalProfile-can not connect to DB :"
          debug(errMsg+err)
          debug(errMsg+db.mongoErr)
          resolve({result:false,msg:db.mongoErr})
      }
  });

}







//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// //... check bike's RFID ......................................................................................
// // exports.checkBikeRFID=function(bikeRFID){
// //     return new Promise(function(resolve, reject) {
// //         if(db.connected)
// //             db.mongoose.model("bikes").findOne({"bikeRFID":bikeRFID},function(err,resp){
// //                 if (!err ) {
// //                     if(resp !=null ){
// //                         debug("DONE-checkBikeRFID      : bikeRFID:"+resp.bikeRFID);
// //                         resolve({result:true})
// //                     }else{
// //                         errmsg=bikeRFID + " NOT found!!"
// //                         debug("DONE-checkBikeRFID      : " + errmsg);
// //                         resolve({result:false,msg:errmsg})
// //                     }
// //                 }else {
// //                     throw err;
// //                     debug("ERROR-checkBikeRFID      : "+err);
// //                     resolve({result:false,msg:err})
// //                 }
// //             });
// //         else{
// //             debug("ERROR-checkBikeRFID      : "+db.mongoErr);
// //             resolve({result:false,msg:db.mongoErr})
// //         }
// //     });
// // }
// //... check user Password ....................................................................................
// exports.checkUserPassword=function(user_email,userPassword){
//     return new Promise(function(resolve, reject) {
//         if(db.connected)
//             db.mongoose.model("users").findOne({"user_email":user_email},{"_id":false,"userName":true,"user_email":true,"userPassword":true},function(err,resp){
//                 if (!err ) {
//                     if(resp!=null){
//                         if(resp.userPassword == userPassword ){
//                             debug("DONE-checkUserPassword      : valid userPassword");
//                             resolve({result:true,data:resp})
//                         }else{
//                             var msg = "Incorrect Password!!"
//                             debug("DONE-checkUserPassword      : "+msg);
//                             resolve({result:false,msg:msg})
//                         }
//                     }else resolve({result:false,msg:"user_email NOT found!"})
//                 }else {
//                     throw err;
//                     debug("ERROR-checkUserPassword      : "+err);
//                     resolve({result:false,msg:err})
//                 }
//             });
//         else{
//             debug("ERROR-checkUserPassword      : "+db.mongoErr);
//             resolve({result:false,msg:db.mongoErr})
//         }
//     });
// }
// //... check vaid user ........................................................................................
// exports.checkValidUser=function(user_email){
//     return new Promise(function(resolve, reject) {
//         if(db.connected)
//             db.mongoose.model("users").findOne({"user_email":user_email},function(err,resp){
//                 if (!err){
//                     var msg;
//                     if(resp!=null ){
//                         if(resp.isActive=="true"){
//                             if(resp.userStatus == "OFF"){
//                                 resolve({result:true})
//                             }else{
//                                 var msg = " user already have a bike !!"
//                                 debug("ERROR-checkValidUser     : "+user_email, msg);
//                                 resolve({result:false,msg:msg})
//                             }
//                         }else{
//                             var msg = " DEACTIVE user !!"
//                             debug("ERROR-checkValidUser     : "+user_email, msg);
//                             resolve({result:false,msg:msg})
//                         }
//                     }else{
//                         msg = " INVALID user_email !!"
//                         debug("DONE-checkValidUser      : " + user_email +msg);
//                         resolve({result:false,msg:msg})
//                     }
//                 }else {
//                     throw err;
//                     debug("ERROR-checkValidUser      : "+err);
//                     resolve({result:false,msg:err})
//                 }
//             });
//         else{
//             debug("ERROR-checkValidUser      : "+db.mongoErr);
//             resolve({result:false,msg:db.mongoErr})
//         }
//     });
// }
// //... check valid bike  ......................................................................................
// // exports.checkValidBike=function(bikeRFID){
// //     return new Promise(function(resolve, reject) {
// //         if(db.connected)
// //             db.mongoose.model("bikes").findOne({"bikeRFID":bikeRFID},function(err,resp){
// //                 if (!err){
// //                     var msg;
// //                     if(resp!=null ){
// //                         if(resp.bikeStatus !="ON"){
// //                             resolve({result:true})
// //                         }else{
// //                             var msg = "Bike is ON  !!"
// //                             debug("ERROR-checkValidBike     : "+bikeRFID, msg);
// //                             resolve({result:false,msg:msg})
// //                         }
// //                     }else{
// //                         msg = " INVALID bikeRFID!!"
// //                         debug("DONE-checkValidBike      : " + bikeRFID+msg);
// //                         resolve({result:false,msg:msg})
// //                     }
// //                 }else {
// //                     throw err;
// //                     debug("ERROR-checkValidBike      : "+err);
// //                     resolve({result:false,msg:err})
// //                 }
// //             });
// //         else{
// //             debug("ERROR-checkValidBike      : "+db.mongoErr);
// //             resolve({result:false,msg:db.mongoErr})
// //         }
// //     });
// // }
// //... RENT ...................................................................................................
// exports.rent=function(user_email,bikeRFID){
//     return new Promise(function(resolve, reject) {
//         if(db.connected){
//             // var userObj={
//             //     isSync:"false",
//             //     lastUpdate:hf.getCurrentTime(),
//             //     userStatus:"ON"
//             // }
//             // var bikeObj={
//             //     isSync:"false",
//             //     lastUpdate:hf.getCurrentTime(),
//             //     bikeStatus:"ON",
//             //     currentUser : user_email,
//             //     lastRentTime:hf.getCurrentTime()
//             // }
//             var actionObj={
//                 action:"RENT",
//                 isSync:"false",
//                 stationID:stationID,
//                 user_email:user_email,
//                 // duration: "-",
//                 bikeRFID:bikeRFID,
//                 time:hf.getCurrentTime()
//             }
//             // var stationObj= {
//             //     $inc:{"freeDocks":-1},
//             //     "isSync":"false"
//             // }
//             var funcList = []
//             // funcList.push(updateUser(user_email,userObj))
//             // funcList.push(updateBike(bikeRFID,bikeObj))
//             funcList.push(updateAction(actionObj))
//             // funcList.push(updateStation(stationObj))
//
//             Promise.all(funcList).then(values => {
//                 var updateDone =true
//                 var errMsg;
//                 values.forEach((value)=>{
//                     if(value.result!=true ){
//                         updateDone=false
//                         errMsg=value
//                     }
//                 })
//                 if(updateDone) resolve({result:true,data:{rentAction:"done"}})
//                 else{
//                     debug("ERROR-rent      : "+errMsg)
//                 } resolve({result:false,msg:errMsg})
//             })
//         }else{
//             debug("ERROR-rent      : "+db.mongoErr);
//             resolve({result:false,msg:db.mongoErr})
//         }
//     });
// }
// //... BACK ...................................................................................................
// exports.back=function(bikeRFID){
//     return new Promise(function(resolve, reject) {
//         if(db.connected){
//             // getCurrentuser_email(bikeRFID).then((user_email,err)=>{
//             //     var user_email = user_email
//             //     if(!err){
//                     // getDuration(bikeRFID).then((res,err)=>{
//                     //     if(!err){
//                             // if(res.result){
//                                 // var duration = res.duration
//                                 // var userObj={
//                                 //     isSync:"false",
//                                 //     lastUpdate:hf.getCurrentTime(),
//                                 //     userStatus:"OFF"
//                                 // }
//                                 // var bikeObj={
//                                 //     isSync:"false",
//                                 //     lastUpdate:hf.getCurrentTime(),
//                                 //     bikeStatus:"OFF",
//                                 //     currentUser : "none"
//                                 // }
//                                 var actionObj={
//                                     action:"BACK",
//                                     isSync:"false",
//                                     stationID:stationID,
//                                     // user_email:user_email,
//                                     bikeRFID:bikeRFID,
//                                     time:hf.getCurrentTime(),
//                                     // duration: duration
//                                 }
//                                 // var stationObj= {
//                                 //     $inc:{"freeDocks":1},
//                                 //     "isSync":"false"
//                                 // }
//                                 var funcList = []
//                                 // funcList.push(updateUser(user_email,userObj))
//                                 // funcList.push(updateBike(bikeRFID,bikeObj))
//                                 funcList.push(updateAction(actionObj))
//                                 // funcList.push(updateStation(stationObj))
//
//                                 Promise.all(funcList).then(values => {
//                                     var updateDone =true
//                                     var errMsg;
//                                     values.forEach((value)=>{
//                                         if(value.result!=true ){
//                                             updateDone=false
//                                             errMsg=value
//                                         }
//                                     })
//                                     if(updateDone) resolve({result:true,data:{backAction:"done"}})
//                                     else {
//                                         debug("ERROR-back      : "+errMsg);
//                                         resolve({result:false,msg:errMsg})
//                                     }
//                                 })
//                             // } else resolve ({result:false,msg:"can NOT get duration !!"})
//                     //     }else resolve ({result:false,msg:err})
//                     // })
//                 // } else{
//                 //     debug("ERROR-back      : "+err);
//                 //     resolve ({result:false,msg:err})
//                 // }
//             // })
//         }else{
//             debug("ERROR-back      : "+db.mongoErr);
//             resolve({result:false,msg:db.mongoErr})
//         }
//     });
// }
// //...test.......................................................................................
// exports.test=function(){
//     debug("Hello From Mongo DB :D !!");
// }
// ////**********************************************************  helper functions  ************************************************
// // function updateUser(user_email,obj){
// //     return new Promise(function(resolve, reject) {
// //         if(db.connected)
// //             db.mongoose.model("users").update({"user_email":user_email},obj,{ upsert: true },function(err,resp){
// //                 if (!err) resolve({result:true})
// //                 else{
// //                     debug("ERROR-updateUser   :"+err)
// //                     resolve({result:false,msg:err})
// //                 }
// //             });
// //         else{
// //             debug("ERROR-updateUser   :"+err)
// //             resolve({result:false,msg:db.mongoErr})
// //         }
// //
// //     });
// // }
// // function updateBike(bikeRFID,obj){
// //     return new Promise(function(resolve, reject) {
// //         if(db.connected)
// //             db.mongoose.model("bikes").update({"bikeRFID":bikeRFID},obj,{ upsert: true },function(err,resp){
// //                 if (!err ) resolve({result:true})
// //                 else{
// //                     debug("ERROR-updateBike   :"+err)
// //                     resolve({result:false,msg:err})
// //                 }
// //             });
// //         else{
// //             debug("ERROR-updateBike   :"+db.mongoErr)
// //             resolve({result:false,msg:db.mongoErr})
// //         }
// //     });
// // }
// function updateAction(obj){
//     return new Promise(function(resolve, reject) {
//         if(db.connected){
//             var actionModel= db.mongoose.model("actions")
//             var newAction= new actionModel();
//
//             newAction.user_email= obj.user_email ;
//             newAction.bikeRFID= obj.bikeRFID ;
//             newAction.stationID= obj.stationID;
//             newAction.action= obj.action;
//             newAction.time= obj.time;
//             newAction.isSync=obj.isSync;
//             newAction.duration=obj.duration;;
//
//             newAction.save(function(err){
//                 if(!err) resolve({result:true})
//                 else{
//                     debug("ERROR-updateAction  :"+err)
//                     resolve({result:false,msg:err})
//                 }
//             });
//         }else{
//             debug("ERROR-updateAction  :"+db.mongoErr)
//             resolve({result:false,msg:db.mongoErr})
//         }
//     });
// }
// // function updateStation(obj){
// //     return new Promise(function(resolve, reject) {
// //         if(db.connected)
// //             db.mongoose.model("stations").update({"stationID":stationID},obj,{ upsert: true },function(err,resp){
// //                 if (!err) resolve({result:true})
// //                 else {
// //                     debug("ERROR-updateStation  :"+err)
// //                     resolve({result:false,msg:err})
// //                 }
// //             });
// //         else{
// //             debug("ERROR-updateStation  :"+db.mongoErr)
// //             resolve({result:false,msg:db.mongoErr})
// //         }
// //
// //     });
// // }
// // function getCurrentuser_email(bikeRFID){
// //     return new Promise(function(resolve, reject) {
// //         if(db.connected)
// //             db.mongoose.model("bikes").findOne({"bikeRFID":bikeRFID},function(err,resp){
// //                 if (!err ) resolve(resp.currentUser)
// //                 else {
// //                     debug("ERROR-getCurrentuser_email  :"+err)
// //                     resolve({result:false,msg:err})
// //                 }
// //             });
// //             else{
// //                 debug("ERROR-getCurrentuser_email  :"+db.mongoErr)
// //                 resolve({result:false,msg:db.mongoErr})
// //             }
// //     });
// // }
// // function getDuration(bikeRFID){
// //     return new Promise(function(resolve, reject) {
// //         if(db.connected)
// //             db.mongoose.model("bikes").findOne({"bikeRFID":bikeRFID},function(err,resp){
// //                 if (!err){
// //                     if(resp!=null ){
// //                         var lastRentTime=resp.lastRentTime
// //                         var duration = hf.timeDiffInMin(lastRentTime,hf.getCurrentTime())
// //                         resolve({result:true,duration:duration})
// //                     }else{
// //                         msg = " INVALID bikeRFID!!"
// //                         debug("ERROR-getCurrentuser_email  :"+msg)
// //                         resolve({result:false,msg:msg})
// //                     }
// //                 }else {
// //                     debug("ERROR-getCurrentuser_email  :"+err)
// //                     resolve({result:false,msg:err})
// //                 }
// //             });
// //         else{
// //             debug("ERROR-getCurrentuser_email  :"+db.mongoErr)
// //             resolve({result:false,msg:db.mongoErr})
// //         }
// //     });
// // }
