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
      post ={ jaar:d.getFullYear(),maand:(d.getMonth()+1),dag:d.getDate(),uur:d.getHours(),minuut:d.getMinutes(),ModuleId:a ,DemiId:rows[0].DemiId};
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
  var sql = 'SELECT * FROM demihours WHERE DemiId = ? AND ModuleId = ? AND jaar = ? AND maand = ? AND dag = ? ';
  var sql3 = 'UPDATE demihours SET hours = ? , Endminuut = ? , Endhours = ? WHERE DemiHours = ?';
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
     return connection.query(sql,[rows[0].DemiId,a,now.getFullYear(),(now.getMonth()+1),now.getDate()]);


    }).then(rows=>{
      console.log(rows);
      var ure = (now.getHours())- (rows[0].uur);
      console.log((now.getHours()+5));
      console.log(rows[0].uur);
      console.log(ure);
     connection.query(sql3,[ure,now.getMinutes(),now.getHours(),rows[0].DemiHours],(err,results,fields)=>{

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
router.post('/get',(req,res,next)=>{
  var connection;
var sql2 ='SELECT DemiId FROM demi WHERE NwuNumber = ?';
var sql3 = 'SELECT ModuleId FROM module WHERE ModuleCode = ?' ; 
var sql = 'SELECT * FROM demihours WHERE DemiId = ? and  ModuleId = ?';
var post =[];


con.getConnection()
.then(conn=>{
connection = conn;
 return conn.query(sql2,req.body.nwunumber5);



}).then(rows=>{
post.push(rows[0].DemiId);
console.log(post);
return connection.query(sql3,req.body.module1);

}).then(rows=>{
post.push(rows[0].ModuleId);
console.log(post);
connection.query(sql,post,(err,result,field)=>{

  if(err)
  {
    throw err;
  }
  if(res)
  {
    res.status(200).json(result);
  }
});

})
.catch(err=>{

  res.status(400).json({message:'error'});
});






});
router.post('/getdetails',jsonParser,(req,res,next)=>{
var sql = 'SELECT Title, Surname, FullNames, Initials, IDNumber, passport FROM demi WHERE NwuNumber = ?';
con.getConnection()
.then(conn=>{

conn.query(sql,req.body.nwunumber5,(err,result,fields)=>{
  if(err)
  {
    res.status(400);
  }
  if(result)
  {
    res.status(200).json(result);
  }
});

})
.catch(err=>{


  res.status(400).json({message:'error please try again'});
});





});
 module.exports = router;