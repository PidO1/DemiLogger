const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const mysql = require('promise-mysql');
const fs = require("fs");
 const bcrypt = require('bcrypt');
 const saltRounds = 10;
 const multer = require('multer');
 var jwt = require('jsonwebtoken');
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


//MAIL end**************



// router.post('/login',jsonParser,(req,res,next)=>{
//   var sql = 'SELECT * FROM demi WHERE NwuNumber = ?';
//   var Snr = req.body.nwunumber;
//   var pasword = req.body.password;
//   con.getConnection()
//   .then(function(connection) {
//     var conn = connection;
//     return connection.query(sql,[Snr]);
// }).then(function(rows){

//   bcrypt.compare(pasword,rows[0].pasword,(err,response)=>{
//     if(err)
//     {
//       return res.status(401).json({message:'Authentication failed'});
//     }
//     if(response)
//     {
//         const tokenv = jwt.sign({
//             demi:rows[0].demi,
//             NwuNumber : rows[0].NwuNumber,
//             demId : rows[0].DemiId
//           },
//           JWT_private,
//           {
//             expiresIn: '1h'
//           });
//           return res.status(200).json({message:'Authenticaion successfull',
//           token: tokenv
//         });
//     }
//     res.status(401).json({message:'Authentication failed'});
//   });
//   console.log(rows[0].pasword); 
//   console.log(rows);
// })
//   .catch(err=>{ if(err){res.status(500).json({message:'login Failed'});
//   console.log(err);
// }});
  
// });


// router.post('/register',jsonParser,(req,res,next)=>{ console.log('yebo');//REGISTER
// var mailOptions = {
//   from: 'demilogger@gmail.com',
//   to: req.body.email,
  
//   subject: 'Registering for Demi Work',
//   text: 'You have just registered to be a Demi'
// };

// var post;
// var hashing = bcrypt.hash(req.body.password,saltRounds,(err,hash)=>{
//   if(err)
//     {
//     return res.status(500).json({error:err});
//     }
//   else
//     {
//       console.log('password hash success');
//      var post  = {NwuNumber : req.body.nwunumber ,pasword: hash, Email: req.body.email};
//      var sql = 'INSERT INTO Demi set ?';
//         console.log(post);
//       con.getConnection()
//       .then(function(connection) {
//         connection.query(sql,post,(err,ress)=>{if(ress){res.status(201).json({message: ress} ); transporter.sendMail(mailOptions, function(error, info){
//           if (error) {
//             console.log(error);
//           } else {
//             console.log('Email sent: ' + info.response);
//           }
//         });}
//         else if(err){res.status(422).json({message: err});} });
        
//       })
//       .catch(function(err) {
//         console.log('error');
//       });
//     }
// });
// });

router.post('/applicationform',upload.any(),(req,res,next)=>{ console.log('yebo');//REGISTER
console.log(req.body);
console.log(req.files);

// var mailOptions = {
//   from: 'demilogger@gmail.com',
//   to: req.body.email,
  
//   subject: 'Registering for Demi Work',
//   text: 'You have just applied to be a Demi'
// };
// console.log(req.files);
// var post  = {NwuNumber : req.body.nwunumber,
//   IDdoc:req.files[0].path,
//  RegistrationForm:req.files[1].path,
//   Title: req.body.title,
//   Initials: req.body.initials,
//   Surname: req.body.surname,
//   FullNames: req.body.fullname,
//   PrefferedName: req.body.preferredname,
//   Extension : req.body.extension,
//   InternalBox: req.body.internalbox,
//   Gender: req.body.gender,
//   MaritalStatus:req.body.maritalStatus,
//   MaidenName:req.body.maidenname,
//   CorrespondencePref:req.body.correspondencePref,
//   Race:req.body.race,
//   DoB:req.body.dateofbirth,
//   HOmeLanguage:req.body.homelanguage,
//   Nationaity:req.body.nationality,
//   IDNumber:req.body.idnumber,
//   TaxNumber:req.body.taxnumber,
//   ResidentialAddress:req.body.residentialaddress,
//   PostAddress: req.body.postaladdress,
//   ZipCode:req.body.code,
//   TelNumber:req.body.hometelephonenumber,
//   MobileNumber:req.body.mobilenumber,
//   Email:req.body.email,
//   NWUprevious:req.body.previouslyemployed,
//   selfEmploy:req.body.selfemployed,
//   highestQualification:req.body.highestqualification,
//   passport:req.files[2].path,
//   studyPermit: req.files[3].path,
//   permissionToConductWork:req.files[4].path,
//   PaspportNR: req.body.paspportnumber,
//   passportExpiryDate: req.body.expirydate,
//   workPermitNR: req.body.permitnumber,
//   permitExpiryDate:permitexpirydate,
//   accountType: req.body.accounttype,
//   branchCode: req.body.bankbranch,
//   AccountNR: req.body.accountnumber,
//   BankNAme: req.body.bankname,
//   AccountHolderSurname:req.body.holdersurname,
//   AccountholderInitials:req.body.holderinitials,
//   AccountInfo: req.body.accountinfo,
//   AccountDate:req.body.date,};
//   console.log(post);
//   var sql =  'INSERT INTO demi set ?';
//   con.getConnection()
//       .then(function(connection) {
//         connection.query(sql,post,(err,ress)=>{if(ress){res.status(201).json({message: ress} ); transporter.sendMail(mailOptions, function(error, info){
//           if (error) {
//             console.log(error);
//           } else {
//             console.log('Email sent: ' + info.response);
//           }
//         });}
//         else if(erro){res.status(422).json({message: erro});console.log(err);} });
        
//       })
//       .catch(function(err) {
//         console.log(err);
//       });

//   console.log(req.files);
  res.status(200).json({message:req.files});
  


});



router.get('/:demiID',(req,res,next)=>{
      
});



router.patch('/:demiID',(req,res,next)=>{
  
  });



router.delete('/:dosentID',(req,res,next)=>{ 

});

module.exports = router;
