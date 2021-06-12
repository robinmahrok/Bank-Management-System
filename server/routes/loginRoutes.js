// let express = require("express");
const studentInfo = require('../models/userInfo');
var {mailer} = require('../controllers/mailer');
var {mailer2,mailer3,mailer4} = require('../controllers/mailer');

var utils=require('../controllers/utils');
const { models } = require('mongoose');
// router = express.Router();
var globalEmail=""; 

module.exports = function(router){
  var error="";
  router.get('/', async (req, res) =>{
    req.session.destroy((err) => {
      if(err) {
          return console.log(err);
      }
      else 
      res.render('index',{error});
  });
  
  });
  
  //signup api
  router.post('/signup',   (req,res)=>{
    req.session.email1 = req.body.email;
          var name=req.body.name, email = req.body.email,
          password=req.body.password;
          if (req.body.name == null || typeof req.body.name == undefined || req.body.name == "") {
            res.render('register-err-success',{success:1,message:"Email or Password is missing"});
            } else if (req.body.email == null || typeof req.body.email == undefined || req.body.email.length == 0 ||
              req.body.password == null || typeof req.body.password == undefined || req.body.password.length == 0) {
                res.render('register-err-success',{success:1,message:"Email or Password is missing"});
              }
  
      globalEmail=req.session.email1;
  
  //password check with Minimum six characters, at least one uppercase letter, one lowercase letter, one number and one special character
  function passwordCheck (password1) {
      return (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{6,}$/).test(password1)
    };
  
    function emailCheck (password1) {
      return (/^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).test(password1)
    };
    var hashedpass=""
    
  res.status(200).send({status:true, message:"api running"})
  //   studentInfo.getUserByEmail(email, (err, user) => {
  //     if (err || !user) {
  //       //res.status(200).send({ status: true, message: "User not found" });
     
  // // checking email and password criteria
  // if(!!emailCheck(email))
  // {  
  // if(!!passwordCheck(password))
  // {
  //    utils.generateHash(password, function (err, hash) {
  //     if (!err && hash) {
  //       hashedpass = hash
     
  // function  genOTP (min, max)  {
  //     return Math.floor(min + Math.random() * max);
  //   }
  
  // var otpVal=genOTP(100000, 900000);
  
  // sendOTP( email,otpVal, (err, updatedUser) => {
  //     if (err) {
  //       res.status(400).send({
  //         status: false,
  //         message: err,
  //       });
  //     }
  //   })
  
  //     //sending data in database
  //     studentInfo.create({Name: name, Email : email , Password:hashedpass , OtpVerify:"Pending", Otp:otpVal});
  //     if(studentInfo.create())
  //     res.redirect('/otphtml');
  // }
  // else{
  //     res.status(400).send({ status:false, message:"Hash not created"});
  // }
  // })
  
  // }
  // else { //res.status(400).send({status:false , message:"Password does not met criteria"});
  // res.render('register-err-success',{success:0,message:"Password should contains atleast 6 characters consists of uppercase,lowercase,number and character"});
  // }
  // }
  // else {//res.status(400).send({status:false , message:"Email does not met criteria"});
  // res.render('register-err-success',{success:0,message:"You have entered an invalid email address! Only college mail Id is allowed"});
  // }
  
  // } else {
  //   res.render('register-err-success',{success:0,message:"User already exists"});
  // }
  //   })
  })  
  //signup api end
  
  
  const sendOTP = ( recipient, otpVal, callback) => {
      mailer({
          email: recipient,
         otpVal
        }, result => {
          if (result && result.status == 1000) {
              console.log("Otp Sent!");
           
          } else {
            callback("Unable to send OTP through email", null)
          }
        });   
    }
  
  
  //send and update otp in database api
  router.post('/sendOtp',(req,res) =>{
    if(req.session.email1)
    {
      var email = req.body.email
  globalEmail=req.session.email1;
  
     if (req.body.email == null || typeof req.body.email == undefined || req.body.email.length == 0 ) 
     {
          res.status(400).send({ status: false, message: "Email is missing, Please enter." });
      }
  else{
      studentInfo.getUserByEmail(email, (err, user) => {
          if (err || !user) {
            res.write('<h1>User not found. Login again from link provided below.</h1>');
    res.end('<a href='+'/'+'>Login</a>');
          } else {
  
                function  genOTP (min, max)  {
                  return Math.floor(min + Math.random() * max);
                }
  
              var otpVal=genOTP(100000, 900000);
              sendOTP( email, otpVal, (err) => {
                if (err) {
                  res.status(400).send({
                    status: false,
                    message: err,
                  });
              }
              })
              studentInfo.updateOTP(email, otpVal, (err, updatedUser) => {
                  if (err) {
                    res.status(400).send({
                      status: false,
                      message: err
                    });
                  }
                  else
                  {
                     res.redirect('/otphtml');
                  }
                })
          }
      })
    }
  }
  else{
    res.write('<h1>Your session is expired. Please login again to continue.</h1>');
    res.end('<a href='+'/'+'>Login</a>');
  }
  });
      
  //verify OTP api
   router.post('/otpVerify',(req,res) =>{
    if(req.session.email1)
    {
      var userotp=req.body.otp;
  studentInfo
      .find({ Email: globalEmail, Otp:userotp })
      .then(data => {
        companyDet = data;
        if (companyDet.length == 0) {
        //res.status(400).send({ status: false, message: "Otp mismatch" });
          res.redirect('/otphtml');
        }
      else{
              //update verified in otpVerify
              studentInfo.updateOne({ Email: globalEmail }, { OtpVerify: "Verified" }, function (err, otpVerified) 
               {
              if (err)
               res.status(400).send({ status: false, message: "Unable to update User data" });
              else 
              res.redirect('/'); 
              //res.status(200).send({status: true, message: "Otp Verified successfully"});
                  });
          }    
      })
    }
    else{
      res.write('<h1>Your session is expired. Please login again to continue.</h1>');
      res.end('<a href='+'/'+'>Login</a>');
    }
  })
   
  
  
  // change password api
  router.post('/forgotPassword',(req,res) =>{
    if(req.session.email1)
    {
      var userpass=req.body.password;
  
                  //password check with Minimum six characters, at least one uppercase letter, one lowercase letter, one number and one special character
                  function passwordCheck (password1) {
                       return (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{6,}$/).test(password1)
                      }
  
                  // checking password criteria  
                  if(!!passwordCheck(userpass))
                      { 
                          utils.generateHash(userpass, function (err, hash) {
                              if (!err && hash) {
                                hashedpass = hash
                             
                   // Update password with hash value
                   studentInfo.updateOne({ Email: globalEmail }, { Password: hashedpass }, function (err, passwordUpdate) 
                   {
                      if (err) res.status(400).send({ status: false, message: "Unable to update User data" });
                      else if(passwordUpdate.length != 0) 
                      {
                        res.write('<h1>Your Password is updated Successfully. Please login again to continue.</h1>');
                        res.end('<a href='+'/'+'>Login</a>');
                      }
                    })
                  }
                  else res.status(400).send({ status:false , message:"Password doesn't met requirement"});
          });
      }
    }
      else{
        res.write('<h1>Your session is expired. Please login again to continue.</h1>');
        res.end('<a href='+'/'+'>Login</a>');
      }
  });
    
  // login api starts
  router.post('/login', (req,res) =>{
  
    req.session.email1 = req.body.email;
      var email=req.body.email,
      password=req.body.password;
     if (req.body.email == null || typeof req.body.email == undefined || req.body.email.length == 0 ||
        req.body.password == null || typeof req.body.password == undefined || req.body.password.length == 0) {
          res.status(200).send({status:false, message:"Enter email/password"});
        }
  
    globalEmail=email;
    var hashedpass=""
  
      studentInfo
      .find({ Email: email })
      .then(data => {
        companyDet = data; 
        if (companyDet.length == 0) {
          res.status(200).send({status:false, message:"User Not Found"});
        }
      else {
         var dbpass= companyDet[0].Password;
         var otpver=companyDet[0].OtpVerify;
         utils.validatePassword(password, dbpass, function (err, data) {
          if (!err && data) 
          {
          if(otpver=="Verified")
          {
            
           // res.redirect('/profile');
            res.status(200).send({status: true , message:"we will soon add homepage"})
          }
          else
          {
            res.status(400).send({status: false , message:"Otp not verified."})
          // res.redirect('/otprevalid');
          }
        }
      else
      { 
        res.status(200).send({status:false, message:"Wrong Creds!"});
      }
      })
     }
    })
  });
  //login api ends
  
  router.get('/logout',(req,res)=>{
    req.session.destroy((err) => {
      if(err) {
          return console.log(err);
      }
      res.redirect('/');
  });
  })
  
  router.get('/redirectShop',(req,res)=>{
   
      res.render('indexShopkeeper');
  
  })
  
  router.post('/selectRestraw',(req,res) =>{
    if(req.session.email1)
    { 
      req.session.rest=req.body.rest;
             if(req.session.rest=="Food Court"){ 
               res.redirect('/foodcourt');
            }
            else{
              res.redirect('/barons');
            }
          
    }
    else{
      res.write('<h1>Your session is expired. Please login again to continue.</h1>');
      res.end('<a href='+'/'+'>Login</a>');
    }
  })

    //generate order number api
  
      function f(){
      var text = "";
      var char_list =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
       
      for (var i = 0; i < 10; i++) {
        text += char_list.charAt(Math.floor(Math.random() * char_list.length));
      }
     return text;
            }
           
          
  
  
}
