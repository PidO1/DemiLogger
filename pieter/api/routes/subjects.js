const express = require('express');
const router = express.Router();
const mysql = require('promise-mysql');
const checkAuth = require('../Auth/checkAuth');
 const checkAuthAdmin = require('../Auth/checkAuthAdmin');
 const checkAuthDosent = require('../Auth/checkAuthDosent');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();


var con = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "bib",
  database: 'demilogger'
});
router.get('/',(req,res,next)=>{
  res.status(200).json({message:'Subjects were fetched'});
});

router.post('/',jsonParser,(req,res,next)=>{
  var post = { ModuleNaam: con.escape(req.body.name),
    ModuleCode: req.body.code,
    Credits: req.body.credits };
    
    var sql = 'INSERT INTO Module set ?';
        console.log(post);
      con.getConnection()
      .then(function(connection) {
        connection.query(sql,post,(err,ress)=>{if(err){console.log(err);}});
        res.status(201).json({message: post});
      })
      .catch(function(err) {
        console.log('error');
        res.status(404).json({error:err});
      });
  
});
router.get('/get',jsonParser,(req,res,next)=>{

sql = 'SELECT ModuleCode , ModuleId FROM module';
con.getConnection()
.then(conn=>{

  conn.query(sql,(err,result,fields)=>{
  res.status(200).json(result);
    


  });
})  
.catch(err=>{
  res.send(err);
});

});
module.exports = router;
