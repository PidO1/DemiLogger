const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const mysql = require('promise-mysql');
const fs = require("fs");
 const bcrypt = require('bcrypt');
 const saltRounds = 10;
 var connection;
 
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

  router.post('/module',jsonParser,(req,res,next)=>{
    
   
      console.log(req.body);
      var sql = 'SELECT * FROM demi Where NwuNumber = ?';
      var sql2 = 'SELECT * FROM module WHERE ModuleCode = ?';
      var sql3 = 'INSERT INTO application set ?';
      var id;
      var subjectId;
      var results;
      var subject;
      var subjectName;
      var demiName;
          
        con.getConnection()
        .then(function(conn) {
        connection = conn;
      
        return connection.query(sql,req.body.nwunumber);
         
        })
        .then(function(rows){
            //console.log(rows);
             
             
             id = rows[0].DemiId;
             demiName = rows[0].PrefferedName;
        return connection.query(sql2 , req.body.module1 );
        
         }).then(function(row){
             
             subjectId = row[0].ModuleId;
             subjectName= row[0].ModuleNaam;
            var post = {
                NwuNumber: req.body.nwunumber,
                DemiId:id,
                ModuleId:subjectId,
                moduleMark: req.body.moduleMark,
                modulename : subjectName,
                demiName:  demiName

            };
           console.log(post);
            connection.query(sql3,post,function (err, result, fields) {
              
                    if(result)
                    {
                        res.status(200).json({message:'application successfull'});
                    }
                    if(err)
                    {
                        console.log(err);
                    }
                     
                
             });
         })
        .catch(function(err) {
         console.log(err);
          res.status(404).json({error:'there was an error please try again and ensure your subject is valid and your info is filled in refer to application table'});
        });
    
  });
  router.post('/delete',jsonParser,(req,res,next)=>{

    sql = 'delete FROM application WHERE ModuleId = ?';
    con.getConnection()
        .then(function(conn){

            connection.query(sql,req.body.id,function (err, result, fields) {
              
                if(result)
                {
                    res.status(200).json({message:'Delete Successfull'});
                }
                
                 
            
         });

        })
        .catch(err=>{

            res.status(404);
        });
  });

  router.post('/accept',jsonParser,(req,res,next)=>{

    var sql = 'INSERT INTO demimodule set ?';
    var post = {

        DemiId: req.body.demiId,
        ModuleId : req.body.moduleId
    };
    con.getConnection()
        .then(function(conn){

            conn.query(sql,post,function (err, result, fields) {
              
                // if(result)
                // {
                //     res.status(200).json({message:'acceptance Successfull'});
                // }
                console.log(result);
                 
            
         });
         conn.query('SELECT * From demi WHERE DemiId = ?',req.body.demiId,function (err, result, fields) {
            
            if(result)
            {
                var mailOptions = {
                    from: 'demilogger@gmail.com',
                    to: result[0].Email,
                    cc: 'pieterswanepoel108@gmail.com',
                    subject: 'ANOUNCEMENT',
                    text: 'Demi acceptance for a subject'
                  };  
                  transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('Email sent: ' + info.response);
                    }
                  })
                
            }
        }
        );

        })
        .catch(err=>{

            res.status(404);
        });
  });




  module.exports = router;