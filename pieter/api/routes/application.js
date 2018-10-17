const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const mysql = require('promise-mysql');


 const checkAuth = require('../Auth/checkAuth');
 const checkAuthAdmin = require('../Auth/checkAuthAdmin');
 const checkAuthDosent = require('../Auth/checkAuthDosent');
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

  router.post('/module',checkAuth,jsonParser,(req,res,next)=>{
    
   
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

                    if(err)
                    {
                      res.status(400).json('error');
                    }
                    if(result)
                    {
                        res.status(200).json({message:'application successfull'});
                    }
                    
                     
                
             });
         })
        .catch(function(error) {
         console.log(error);
          res.status(404).json('DANIE HIER!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
        });
    
  });
  router.post('/delete',checkAuthAdmin,jsonParser,(req,res,next)=>{
    console.log(req.body);
    var module1 = req.body.ModuleId;
    var demi1 = req.body.DemiId;
   var sql = 'delete FROM application WHERE ModuleId = ? AND DemiId = ?';
    con.getConnection()
        .then(function(conn){

            conn.query(sql ,[module1 , demi1 ] ,function (err, result, fields) {
               
                if(err){res.status(400);}
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

  router.post('/accept',checkAuthAdmin,checkAuthAdmin,jsonParser,(req,res,next)=>{
    console.log(req.body.DemiId);
    var sql = 'INSERT INTO demimodule set ?';
    var sql2 = 'delete FROM application WHERE ModuleId = ? AND DemiId = ?';
    var module1 = req.body.ModuleId;
    var demi1 = req.body.DemiId;
    var connection;
    var post = {

        DemiId: req.body.DemiId,
        ModuleId : req.body.ModuleId
    };
    con.getConnection()
        .then(function(conn){
                connection = conn;
            conn.query(sql,post,function (err, result, fields) {
              
                
                    conn.query(sql2 ,[module1 , demi1 ] ,function (err, result, fields) {
               
                        if(result)
                        {
                            console.log('Accept se delete');
                            res.status(200).json({message:'acceptance Successfull'});
                        }
                        if(err)
                        {
                            res.status(400);
                        }
                         
                    
                         });
                    
                
              
                 
            
         });


        })
        .catch(err=>{

            res.status(404);
        });
  });

router.post('/get/applicants',jsonParser,(req,res,next)=>{
    var data = [];
var sql = 'SELECT * FROM demi_applicant_details WHERE ModuleCode = ?';
con.getConnection()
.then(conn=>{
conn.query(sql,req.body.module1,(error,result,field)=>{
if(error)
{
    res.status(400);
}
for(x =0;x<result.length;x++)
{
    data.push({data:[result[x].NwuNumber, result[x].PrefferedName, result[x].Surname, result[x].Email , result[x].ModuleCode , result[x].moduleMark]  , label: ['Nwu Number', 'Name', 'Surname', 'Email', 'Module','Mark']});
    console.log(data);

}
res.status(200).json(data);
});

})
.catch(err=>{

if(err){res.status(400);}

});







});


  module.exports = router;