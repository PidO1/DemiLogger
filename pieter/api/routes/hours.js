const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const mysql = require('promise-mysql');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
const checkAuth = require('../Auth/checkAuth');
 const checkAuthAdmin = require('../Auth/checkAuthAdmin');
 const checkAuthDosent = require('../Auth/checkAuthDosent');
 var JWT_private = 'secret';
var jwt = require('jsonwebtoken');
 var moment = require('moment');
 var con = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "bib",
    database: 'demilogger'
  });
 router.post('/start',checkAuth,jsonParser,(req,res,next)=>{
    
    console.log('start');
    var sql = 'INSERT INTO demihours set ?';
    var sql2 ='SELECT DemiId FROM demi WHERE NwuNumber = ?';
    var d = new Date();
    var a = parseInt(req.body.ModuleId);
    var nwunumber =parseInt(req.demi);
    var post; //={startdate:d.toLocaleString(),ModuleId:a ,DemiId:nwunumber};
    var connection;


  console.log(post);
  con.getConnection()
  .then(function(conn){
    connection = conn;
     return conn.query(sql2,nwunumber);
       
      

    }).then(rows=>{
      post ={ jaar:d.getFullYear(),maand:d.getMonth(),dag:d.getDate(),uur:d.getHours(),minuut:d.getMinutes(),ModuleId:a ,DemiId:rows[0].DemiId};
      console.log(post);
      connection.query(sql,post,(err,result,fields)=>{
        if(err)
        {
          console.log(res);
        }
        if(result)
        {
          res.status(200).json({message:'succeed'});
        }


      });


    })
  .catch(err=>{

    if(err)
    {

      res.status(400).json({message:'something went wrong please try again'});
    }
  });
 });
 
 router.post('/end',checkAuth,jsonParser,(req,res,next)=>{
  var now = new Date();
  var jaar =  now.getFullYear();
  var maand =now.getMonth()+1;
  var dag = now.getDate();
  var sql2 ='SELECT DemiId FROM demi WHERE NwuNumber = ?';
  var sql = 'SELECT * FROM demihours WHERE DemiId = ? AND ModuleId = ? AND jaar = ? AND maand = ?';
  var sql3 = 'UPDATE demihours SET hours = ? WHERE DemiHours = ?';
  var a = parseInt(req.body.ModuleId);
  var nwunumber =parseInt(req.demi);
  var connection;
  
  console.log(nwunumber);
  console.log(a);
  console.log(now.getFullYear());  
  console.log(now.getMonth()); 
  
 

  con.getConnection()
  .then(function(conn){
    connection = conn;
     return conn.query(sql2,nwunumber);
       
      

    }).then(rows=>{
      console.log(rows[0]);
     return connection.query(sql,[rows[0].DemiId,a,now.getFullYear(),now.getMonth()]);


    }).then(rows=>{
      console.log(rows);
      var ure = (rows[0].uur) - now.getHours();
     connection.query(sql3,[ure,rows[0].DemiHours],(err,results,fields)=>{

      if(err){res.status(400);}
      if(results)
      {
        res.status(200).json({message:'End hours logged'});
      }
     });
    })
    .catch(err=>{

      res.status(400).json({error:err});
    });

  });
router.get('/tes',(req,res,next)=>{









});

 module.exports = router;