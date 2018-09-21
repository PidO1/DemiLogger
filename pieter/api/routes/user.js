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

router.post('/register',jsonParser,(req,res,next)=>{ console.log('yebo');//REGISTER
var mailOptions = {
  from: 'demilogger@gmail.com',
  to: req.body.email,
  cc: 'killroy980@gmail.com',
  subject: 'Registering for Demi Work',
  text: 'You have just registered to be a Demi'
};

var post;
var hashing = bcrypt.hash(req.body.password,saltRounds,(err,hash)=>{
  if(err)
    {
    return res.status(500).json({error:err});
    }
  else
    {
      console.log('password hash success');
     var post  = {NwuNumber : req.body.nwunumber ,pasword: hash, Email: req.body.email, demi:0,admins:0,dosent:0};
     var sql = 'INSERT INTO users set ?';
        console.log(post);
      con.getConnection()
      .then(function(connection) {
        connection.query(sql,post,(err,ress)=>{if(ress){res.status(201).json({message: "User registered"} ); transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });}
        else if(err){res.status(422).json({message: err});} });
        
      })
      .catch(function(err) {
        console.log('error');
      });
    }
});
});

router.post('/login',jsonParser,(req,res,next)=>{
    var sql = 'SELECT * FROM users WHERE NwuNumber = ?';
    var Snr = req.body.nwunumber;
    var pasword = req.body.password;
    con.getConnection()
    .then(function(connection) {
      var conn = connection;
      return connection.query(sql,[Snr]);
  }).then(function(rows){
    // var mailOptions = {
    //     from: 'demilogger@gmail.com',
    //     to: rows[0].Email,
    //     cc: 'killroy980@gmail.com',
    //     subject: 'Security  Demi Work',
    //     text: 'You have just Logged Into your DemiLogger Account'
    //   };
    bcrypt.compare(pasword,rows[0].pasword,(err,response)=>{
      if(err)
      {
        return res.status(401).json({message:'Authentication failed'});
      }
      if(response)
      {
        // transporter.sendMail(mailOptions, function(error, info){
        //     if (error) {
        //       console.log(error);
        //     } else {
        //       console.log('Email sent: ' + info.response);
        //     }
        //   });

          const tokenv = jwt.sign({
              demi:rows[0].demi,
              NwuNumber : rows[0].NwuNumber
              
            },
            JWT_private,
            {
              expiresIn: '1h'
            });
            return res.send(tokenv);
      }
      res.status(401).json({message:'Authentication failed'});
    });
    console.log(rows[0].pasword); 
    console.log(rows);
  })
    .catch(err=>{ if(err){res.status(500).json({message:'login Failed'});
    console.log(err);
  }});
    
  });
module.exports = router;