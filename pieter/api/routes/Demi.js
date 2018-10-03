const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const mysql = require('promise-mysql');
const fs = require("fs");
 const bcrypt = require('bcrypt');
 const saltRounds = 10;
 const multer = require('multer');
 var jwt = require('jsonwebtoken');
 const checkAuth = require('../Auth/checkAuth');
 const checkAuthAdmin = require('../Auth/checkAuthAdmin');
 const checkAuthDosent = require('../Auth/checkAuthDosent');
 var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var JWT_private = 'secret';
 const storage = multer.diskStorage({
  destination: function(req,file,cb){cb(null,'./uploads');} , 
  filename : function(req,file,cb){ cb(null, file.originalname);}});
 
 const fileFilter = (req,file,cb)=>{
   if(file.mimetype ==='image/jpeg'|| file.mimetype==='image/png')//file.mimetype ==='image/jpeg'||
   {cb(null,true);}
   else{cb(null,false);}};
 
 const upload = multer({
   storage:storage, 
   limits:{fileSize:1024*1024*10},
   fileFilter : fileFilter});


var con = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "bib",
  database: 'demilogger'
});
//****************************************MAIL */
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'demilogger@gmail.com',
    pass: 'demiloggeradmin'
  }
});




router.post('/applicationform/sa',upload.any(),(req,res,next)=>{ console.log('yebo');//REGISTER
console.log(req.body);
console.log(req.files);

var mailOptions = {
  from: 'demilogger@gmail.com',
  to: req.body.email, 
  subject: 'Registering for Demi Work',
  text: 'You have just applied to be a Demi'
};

var post  = {NwuNumber : req.body.nwunumber,
  IDdoc:req.files[0].path,
 RegistrationForm:req.files[1].path,
  Title: req.body.title,
  Initials: req.body.initials,
  Surname: req.body.surname,
  FullNames: req.body.fullname,
  PrefferedName: req.body.preferredname,
  Extension : req.body.extension,
  InternalBox: req.body.internalbox,
  Gender: req.body.gender,
  MaritalStatus:req.body.maritalStatus,
  MaidenName:req.body.maidenname,
  CorrespondencePref:req.body.correspondencePreference,
  Race:req.body.race,
  DoB:req.body.dateofbirth,
  HOmeLanguage:req.body.homelanguage,
  Nationaity:'SA',
  IDNumber:req.body.idnumber,
  TaxNumber:req.body.taxnumber,
  ResidentialAddress:req.body.residentialaddress,
  PostAddress: req.body.postaladdress,
  ZipCode:req.body.code,
  TelNumber:req.body.hometelephonenumber,
  MobileNumber:req.body.mobilenumber,
  Email:req.body.email,
  NWUprevious:req.body.previouslyemployed,
  EmployPrevious: req.body.otheremployer,
  selfEmploy:req.body.selfemployed,
  highestQualification:req.body.highestqualification,
  passport:'N/A',
  studyPermit: 'N/A',
  permissionToConductWork:'N/A',
  PaspportNR: 'N/A',
  passportExpiryDate: 'N/A',
  workPermitNR:'N/A',
  permitExpiryDate:'N/A',
  accountType: req.body.accounttype,
  branchCode: req.body.bankbranch,
  AccountNR: req.body.accountnumber,
  BankNAme: req.body.bankname,
  AccountHolderSurname:req.body.holdersurname,
  AccountholderInitials:req.body.holderinitials,
  AccountTypeInfo: req.body.accountinfo,
  AccountDate:req.body.date,
  module1 : req.body.module1 ,
  modulemark1 : req.body.moduleMark1,
  module2 : req.body.module2 ,
  modulemark2 : req.body.moduleMark2,
  module3 : req.body.module3 ,
  modulemark3 : req.body.moduleMark3

};
  console.log(post);
  var sql =  'INSERT INTO demi set ?';
  con.getConnection()
      .then(function(connection) {
        connection.query(sql,post,(err,ress)=>{if(ress){res.status(201).json({message: ress} ); transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });}
        else if(err){res.status(422).json({message: err});console.log(err);} });
        
      })
      .catch(function(errs) {
        res.status(500).json({message: errs});
        console.log(errs);
      });

  
  
  

});
router.post('/applicationform/foreign',upload.any(),(req,res,next)=>{ console.log('yebo');//REGISTER

console.log(req.files);

var mailOptions = {
  from: 'demilogger@gmail.com',
  to: req.body.email, 
  subject: 'Application for Demi Work',
  text: 'You have just applied to be a Demi'
};

var post  = {NwuNumber : req.body.nwunumber,
  IDdoc:req.files[0].path,
  IDdocName: req.files[0].originalname,
 RegistrationForm:req.files[1].path,
 RegistrationFormName: req.files[1].originalname,
  Title: req.body.title,
  Initials: req.body.initials,
  Surname: req.body.surname,
  FullNames: req.body.fullname,
  PrefferedName: req.body.preferredname,
  Extension : req.body.extension,
  InternalBox: req.body.internalbox,
  Gender: req.body.gender,
  MaritalStatus:req.body.maritalStatus,
  MaidenName:req.body.maidenname,
  CorrespondencePref:req.body.correspondencePreference,
  Race:req.body.race,
  DoB:req.body.dateofbirth,
  HOmeLanguage:req.body.homelanguage,
  Nationaity:req.body.nationality,
  IDNumber:req.body.idnumber,
  TaxNumber:req.body.taxnumber,
  ResidentialAddress:req.body.residentialaddress,
  PostAddress: req.body.postaladdress,
  ZipCode:req.body.code,
  TelNumber:req.body.hometelephonenumber,
  MobileNumber:req.body.mobilenumber,
  Email:req.body.email,
  NWUprevious:req.body.previouslyemployed,
  EmployPrevious: req.body.otheremployer,
  selfEmploy:req.body.selfemployed,
  highestQualification:req.body.highestqualification,
  passport:req.files[2].path,
  passportName: req.files[2].originalname,
  studyPermit: req.files[3].path,
  studyPermitName : req.files[3].originalname,
  permissionToConductWork:req.files[4].path,
  permissionToConductWorkName : req.files[4].originalname,
  PaspportNR: req.body.passportnumber,
  passportExpiryDate: req.body.expirydate,
  workPermitNR: req.body.permitnumber,
  permitExpiryDate:req.body.permitexpiry,
  accountType: req.body.accounttype,
  branchCode: req.body.bankbranch,
  AccountNR: req.body.accountnumber,
  BankNAme: req.body.bankname,
  AccountHolderSurname:req.body.holdersurname,
  AccountholderInitials:req.body.holderinitials,
  AccountTypeInfo: req.body.accountinfo,
  AccountDate:req.body.date,
  module1 : req.body.module1 ,
  modulemark1 : req.body.moduleMark1,
  module2 : req.body.module2 ,
  modulemark2 : req.body.moduleMark2,
  module3 : req.body.module3 ,
  modulemark3 : req.body.moduleMark3

};
  console.log(post);
  var sql =  'INSERT INTO demi set ?';
  con.getConnection()
      .then(function(connection) {
        connection.query(sql,post,(err,ress)=>{if(ress){res.status(201).json({message:'Foreign student added success'} ); transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });}
        else if(err){res.status(422).json({message: err});console.log(err);} });
        
      })
      .catch(function(err) {
        console.log(err);
      });

  
  
  

});
router.get('/all',checkAuthAdmin,(req,res,next)=>{
  if(req.adminYN===1){
  var sql =  'Select NwuNumber, DemiId, demiName, modulename, ModuleId, moduleMark From application';
      con.getConnection()
      .then(function(connection){connection.query(sql,function(error,results,fields){ if(results){return res.status(200).json(results);}});})
      .catch(err=>{if(err){res.status(400).json({message:'something went wrong please try'});}});}
      else{res.status(400)};
      
    
});



router.post('/demiGet',jsonParser,(req,res,next)=>{
  
  console.log(req.body);
  
  var sql =  'Select * From demi WHERE NwuNumber = ?';
  con.getConnection()
  .then(function(connection){connection.query(sql,req.body.nwuNumber,function(error,results,fields){ 
    if(results){return res.status(200).json(results[0]);}
  
  });})
  .catch(err=>{if(err){res.status(400).json({message:'something went wrong please try'});}});
 
    
    
      
});



router.patch('/:demiID',(req,res,next)=>{
  
  });



router.delete('/:dosentID',(req,res,next)=>{ 

});

module.exports = router;
