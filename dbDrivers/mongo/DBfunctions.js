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
                    console.log("NO error");
                    if(resp !=null ){
                        debug("DONE-check_user_email      : user_email:"+resp.user_email);
                        resolve({result:true,data:resp})
                    }else{
                        debug("DONE-check_user_email      : " + user_email + " NOT found!!");
                        resolve({result:false,msg:"Email NOT found!"})
                    }
                }else {
                  console.log("error");

                    throw err;
                    debug("ERROR-check_user_email  : "+err);
                    resolve({result:false,msg:err})
                }
            });
            else{
              console.log("conot conect ");

                debug("ERROR-check_user_email  : "+db.mongoErr);
                resolve({result:false,msg: db.mongoErr})
            }
    });
}

exports.check_if_baby_info_exist=function(user_email,baby_name){
    return new Promise(function(resolve, reject) {
        if(db)
            mongoose.model("babyInfo").findOne({"user_email":user_email,"baby_name":baby_name},function(err,resp){
                if (!err ) {
                    console.log("NO error");
                    if(resp !=null ){
                        debug("DONE-check_if_baby_info_exist      : user_email:"+resp.user_email);
                        resolve({result:true,data:resp})
                    }else{
                        debug("DONE-check_if_baby_info_exist      : " + user_email + " NOT found!!");
                        resolve({result:false,msg:"Email NOT found!"})
                    }
                }else {
                  console.log("error");

                    throw err;
                    debug("ERROR-check_if_baby_info_exist  : "+err);
                    resolve({result:false,msg:err})
                }
            });
            else{
              console.log("conot conect ");

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

exports.updateInfantMedicalProfile=function(user_email,babyObj){
      return new Promise(function(resolve, reject) {
          if(db)
              mongoose.model("baby").update({"user_email":user_email},babyObj,function(err,resp){
                  if (!err){

                    mongoose.model("baby").findOne({"user_email":user_email},function(err,resp){
                        if (!err ) {
                            if(resp !=null ){
                                debug("DONE-updateInfantMedicalProfile      : user_email:"+resp.user_email);
                                resolve({result:true,data:resp})
                            }else{
                                debug("DONE-updateInfantMedicalProfile      : " + user_email + " NOT found!!");
                                resolve({result:false,msg:"Email NOT found!"})
                            }
                        }else {
                            throw err;
                            debug("ERROR-check_user_email  : "+err);
                            resolve({result:false,msg:err})
                        }
                    });
                  }
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

exports.updateMedicalProfileData=function(user_email,medical_profile_obj){
      return new Promise(function(resolve, reject) {
          if(db)
              mongoose.model("users").update({"user_email":user_email},medical_profile_obj,function(err,resp){
                  if (!err){
                    mongoose.model("users").findOne({"user_email":user_email},function(err,resp){
                        if (!err ) {
                            if(resp !=null ){
                                debug("DONE-updateMedicalProfileData      : user_email:"+resp.user_email);
                                resolve({result:true,data:resp})
                            }else{
                                debug("DONE-updateMedicalProfileData      : " + user_email + " NOT found!!");
                                resolve({result:false,msg:"Email NOT found!"})
                            }
                        }else {
                            throw err;
                            debug("ERROR-updateMedicalProfileData  : "+err);
                            resolve({result:false,msg:err})
                        }
                    });
                  }
                  else{
                      debug("ERROR-updateMedicalProfileData   :"+err)
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


//... Phase5 ......................................................................................
exports.addNewPost=function(postObj){
  return new Promise(function(resolve, reject) {
      if(db){
          var postsModel= mongoose.model("posts")
          var newPost= new postsModel();

          newPost.user_name= postObj.user_name ;
          newPost.user_email= postObj.user_email ;
          newPost.title= postObj.title ;
          newPost.category= postObj.category ;
          newPost.text= postObj.text ;

          newPost.save(function(err){
              if(!err) resolve({result:true})
              else{
                  errMsg="ERROR-addNewPost-can not save to DB, check connection :"
                  debug(errMsg+err)
                  resolve({result:false,msg:errMsg})
              }
          });
      }else{
          errMsg="ERROR-addNewPost-can not connect to DB :"
          debug(errMsg+err)
          debug(errMsg+db.mongoErr)
          resolve({result:false,msg:db.mongoErr})
      }
  });

}
exports.getPosts=function(category){
      return new Promise(function(resolve, reject) {
        mongoose.model("posts").find({"category":category},function(err,resp){
            if (!err ) {
                if(resp !=null ){
                    debug("DONE-getPosts      : user_email:"+resp.user_email);
                    resolve({result:true,data:resp})
                }else{
                    debug("DONE-getPosts      : " + user_email + " NOT found!!");
                    resolve({result:false,msg:"Email NOT found!"})
                }
            }else {
                throw err;
                debug("ERROR-getPosts  : "+err);
                resolve({result:false,msg:err})
            }
        });

      });
}

exports.addNewComment=function(post_id,commentObj){
      return new Promise(function(resolve, reject) {
          if(db)
              mongoose.model("posts").update({"_id":post_id},{$push:{'comments':commentObj}},function(err,resp){
                  if (!err) resolve({result:true})
                  else{
                      debug("ERROR-addNewComment   :"+err)
                      resolve({result:false,msg:err})
                  }
              });
          else{
            errMsg="ERROR-addNewComment-can not connect to DB :"
            debug(errMsg+err)
            debug(errMsg+db.mongoErr)
            resolve({result:false,msg:db.mongoErr})

          }
      });
}

exports.getComments=function(post_id){
      return new Promise(function(resolve, reject) {
        mongoose.model("posts").find({"_id":post_id},{comments:1,_id:0},function(err,resp){
            if (!err ) {
                if(resp !=null ){
                    debug("DONE-getComments      : user_email:"+resp.user_email);
                    resolve({result:true,data:resp})
                }else{
                    debug("DONE-getComments      : " + user_email + " NOT found!!");
                    resolve({result:false,msg:"Email NOT found!"})
                }
            }else {
                throw err;
                debug("ERROR-getComments  : "+err);
                resolve({result:false,msg:err})
            }
        });

      });
}

//... Phase6 ......................................................................................
exports.addNewMamInfo=function(mamInfoObj){
  return new Promise(function(resolve, reject) {

      if(db){
          var mamInfoModel= mongoose.model("mamInfo")
          var newMamInfo= new mamInfoModel();
          newMamInfo.user_name= mamInfoObj.user_name ;
          newMamInfo.user_email= mamInfoObj.user_email ;
          newMamInfo.sleep= mamInfoObj.sleep ;
          newMamInfo.weight= mamInfoObj.weight ;
          newMamInfo.water= mamInfoObj.water ;
          newMamInfo.calm=mamInfoObj.calm
          newMamInfo.anxious=mamInfoObj.anxious
          newMamInfo.irritable=mamInfoObj.irritable
          newMamInfo.sad=mamInfoObj.sad
          newMamInfo.highF=mamInfoObj.highF
          newMamInfo.lowF=mamInfoObj.lowF
          newMamInfo.coughing=mamInfoObj.coughing

          newMamInfo.save(function(err){
              if(!err) resolve({result:true})
              else{
                  mongoose.model("mamInfo").update({"user_email":mamInfoObj.user_email},mamInfoObj,function(err,resp){
                      if (!err){
                        console.log("Doooone");
                        resolve({result:true})
                      }
                      else{
                          debug("ERROR-updateMamInfo   :"+err)
                          resolve({result:false,msg:err})
                      }
                  });
              }
          });
      }else{
          errMsg="ERROR-addNewMamInfo-can not connect to DB :"
          debug(errMsg+err)
          debug(errMsg+db.mongoErr)
          resolve({result:false,msg:db.mongoErr})
      }
  });

}
exports.getMamInfo=function(user_email){
      return new Promise(function(resolve, reject) {
        mongoose.model("mamInfo").find({"user_email":user_email},function(err,resp){
            if (!err ) {
                if(resp !=null ){
                    debug("DONE-getMamInfo      : user_email:"+resp.user_email);
                    resolve({result:true,data:resp})
                }else{
                    debug("DONE-getMamInfo      : " + user_email + " NOT found!!");
                    resolve({result:false,msg:"Email NOT found!"})
                }
            }else {
                throw err;
                debug("ERROR-getMamInfo  : "+err);
                resolve({result:false,msg:err})
            }
        });

      });
}

exports.addBabyInfo=function(babyInfoObj){
  return new Promise(function(resolve, reject) {
      if(db){
          var babyInfoModel= mongoose.model("babyInfo")
          var newBabyInfo= new babyInfoModel();
          newBabyInfo.baby_name= babyInfoObj.baby_name ;
          newBabyInfo.user_email= babyInfoObj.user_email ;
          newBabyInfo.sleep= babyInfoObj.sleep ;
          newBabyInfo.weight= babyInfoObj.weight ;
          newBabyInfo.feeding= babyInfoObj.feeding ;
          newBabyInfo.diaper_changes= babyInfoObj.diaper_changes ;
          newBabyInfo.temp= babyInfoObj.temp ;
          newBabyInfo.calm=babyInfoObj.calm
          newBabyInfo.plyfull=babyInfoObj.plyfull
          newBabyInfo.irritable=babyInfoObj.irritable
          newBabyInfo.sad=babyInfoObj.sad
          newBabyInfo.highF=babyInfoObj.highF
          newBabyInfo.lowF=babyInfoObj.lowF
          newBabyInfo.coughing=babyInfoObj.coughing

          newBabyInfo.save(function(err){
              if(!err) resolve({result:true})
              else{
                debug("ERROR-updateBabyInfo   :"+"canot save babyInfo")
                resolve({result:false,msg:"canot save babyInfo"})
                  // mongoose.model("babyInfo").update({"user_email":babyInfoObj.user_email,"baby_name":babyInfoObj.baby_name},babyInfoObj,function(err,resp){
                  //     if (!err){
                  //       console.log("Doooone");
                  //       resolve({result:true})
                  //     }
                  //     else{
                  //         debug("ERROR-updateBabyInfo   :"+err)
                  //         resolve({result:false,msg:err})
                  //     }
                  // });
              }
          });
      }else{
          errMsg="ERROR-addBabyInfo-can not connect to DB :"
          debug(errMsg+err)
          debug(errMsg+db.mongoErr)
          resolve({result:false,msg:db.mongoErr})
      }
  });

}
exports.updateBabyInfo=function(babyInfoObj){
  return new Promise(function(resolve, reject) {
      if(db){
        mongoose.model("babyInfo").update({"user_email":babyInfoObj.user_email,"baby_name":babyInfoObj.baby_name},babyInfoObj,function(err,resp){
            if (!err){
              console.log("Doooone");
              resolve({result:true})
            }
            else{
                debug("ERROR-updateBabyInfo   :"+err)
                resolve({result:false,msg:err})
            }
        });
      }else{
          errMsg="ERROR-updateBabyInfo-can not connect to DB :"
          debug(errMsg+err)
          debug(errMsg+db.mongoErr)
          resolve({result:false,msg:db.mongoErr})
      }
  });

}
exports.getInfo=function(user_email,baby_name){
      return new Promise(function(resolve, reject) {
        mongoose.model("babyInfo").find({"user_email":user_email,"baby_name":baby_name},function(err,resp){
            if (!err ) {
                if(resp !=null ){
                    debug("DONE-getbabyInfo      : user_email:"+resp.user_email);
                    resolve({result:true,data:resp})
                }else{
                    debug("DONE-getbabyInfo      : " + user_email + " NOT found!!");
                    resolve({result:false,msg:"Email NOT found!"})
                }
            }else {
                throw err;
                debug("ERROR-getbabyInfo  : "+err);
                resolve({result:false,msg:err})
            }
        });

      });
}


exports.getBabyNames=function(user_email){
      return new Promise(function(resolve, reject) {
        mongoose.model("baby").find({},function(err,resp){
            if (!err ) {
              data=[]
              i=0
              resp.forEach(function(obj){
                if(obj.user_email==user_email){
                    data.push({
                      "name":obj.baby_name,
                      "gender":obj.gender
                    })
                }
                i++
                if(i==resp.length) {
                  console.log(data);
                  resolve({result:true,data:data})
                }
              })
            }else {
                throw err;
                debug("ERROR-getbabyInfo  : "+err);
                resolve({result:false,msg:err})
            }
        });

      });
}
