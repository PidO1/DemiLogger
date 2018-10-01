const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const mysql = require('promise-mysql');
const fs = require("fs");
 const bcrypt = require('bcrypt');
 const saltRounds = 10;
 
 var jwt = require('jsonwebtoken');
 var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var JWT_private = 'secret';
var con = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "bib",
  database: 'demilogger'
});
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'demilogger@gmail.com',
      pass: 'demiloggeradmin'
    }
  });


router.post('/make',jsonParser,(req,res,next)=>{
    var post;
    var getS;
    var getL;
    getS = 'SELECT * FROM demi';
    getL = 'SELECT * FROM dosent';
   
    var sql = 'INSERT INTO anounce set ?';
   

   
   con.getConnection()
    .then(function(connection){
        if(req.body.to ==='All')
        {
            post = {message : req.body.anouncement,  demi:1  ,  dosent : 1};
            connection.query(sql,post);
            connection.query(getS, function (err, result, fields) {
                if (err) throw err;
                if(result)
                {
                    for(var i = 0; i < result.length; i++)
                    {
                            var mailOptions = {
                                from: 'demilogger@gmail.com',
                                to: result[i].Email,
                                cc: 'killroy980@gmail.com',
                                subject: 'ANOUNCEMENT',
                                text: req.body.anouncement
                              };  
                             setTimeout(function(){ transporter.sendMail(mailOptions, function(error, info){
                                if (error) {
                                  console.log(error);
                                } else {
                                  console.log('Email sent: ' + info.response);
                                }
                              });},5000);  
                              console.log(result[i].NwuNumber+ 'student');
                              
                    }

                }
              });
              connection.query(getL, function (err, result, fields) {
                if (err) throw err;
                if(result)
                {
                    for(var i = 0; i < result.length; i++)
                    {
                            var mailOptions = {
                                from: 'demilogger@gmail.com',
                                to: result[i].Email,
                                cc: 'killroy980@gmail.com',
                                subject: 'ANOUNCEMENT',
                                text: req.body.anouncement
                              };  
                             setTimeout(function(){ transporter.sendMail(mailOptions, function(error, info){
                                if (error) {
                                  console.log(error);
                                } else {
                                  console.log('Email sent: ' + info.response);
                                }
                              });},5000);  
                              console.log(result[i].NwuNumber +'dosente');
                              
                    }

                }
              });res.status(201).json({message:'emails sents and anouncement made'});
        }//end all
        if(req.body.to ==='Students')
        {
            post = {message : req.body.anouncement,  demi:1  ,  dosent : 1}; 
            connection.query(sql,post);
            connection.query(getS, function (err, result, fields) {
                if (err) {console.log(err); throw err;}
                if(result)
                {
                    for(var i = 0; i < result.length; i++)
                    {
                            var mailOptions = {
                                from: 'demilogger@gmail.com',
                                to: result[i].Email,
                                cc: 'killroy980@gmail.com',
                                subject: 'Security  Demi Work',
                                text: 'You have just Logged Into your DemiLogger Account'
                              };  
                              setTimeout(function(){ transporter.sendMail(mailOptions, function(error, info){
                                if (error) {
                                  console.log(error);
                                } else {
                                  console.log('Email sent: ' + info.response);
                                }
                              });},5000) ;
                              console.log(result[i].NwuNumber);
                              
                    }
                    
                }
              });res.status(201).json({message:'emails sents and anouncement made'});
        }//end Students
        if(req.body.to ==='Lecturers')
        {
            post = {message : req.body.anouncement,  demi:1  ,  dosent : 1};
            connection.query(sql,post);
             connection.query(getL, function (err, result, fields) {
                if (err){console.log(err); throw err;}
                if(result)
                {
                  var mailOptions = {
                    from: 'demilogger@gmail.com',
                    to: result[i].Email,
                    cc: 'killroy980@gmail.com',
                    subject: 'ANOUNCEMENT',
                    text: req.body.anouncement
                  };  
                 setTimeout(function(){ transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('Email sent: ' + info.response);
                    }
                  });},5000);  
                  console.log(result[i].NwuNumber +'dosente');
                    
                }
              });

        }//end Lectureers
        

   })
   .catch(function(err) {
    res.status(400).json({message:err});
    console.log(err);
  });
   
});



module.exports = router;