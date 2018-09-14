const express = require('express');
const router = express.Router();
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




router.post('/login',jsonParser,(req,res,next)=>{
  var sql = 'SELECT * FROM demi WHERE NwuNumber = ?';
  var Snr = req.body.nwunumber;
  var pasword = req.body.password;
  con.getConnection()
  .then(function(connection) {
    var conn = connection;
    return connection.query(sql,[Snr]);
}).then(function(rows){

  bcrypt.compare(pasword,rows[0].pasword,(err,response)=>{
    if(err)
    {
      return res.status(401).json({message:'Authentication failed'});
    }
    if(response)
    {
        const tokenv = jwt.sign({
            demi:rows[0].demi,
            NwuNumber : rows[0].NwuNumber,
            demId : rows[0].DemiId
          },
          JWT_private,
          {
            expiresIn: '1h'
          });
          return res.status(200).json({message:'Authenticaion successfull',
          token: tokenv
        });
    }
    res.status(401).json({message:'Authentication failed'});
  });
  console.log(rows[0].pasword); 
})
  .catch(err=>{res.status(500).json({message:err}); });
  
});


router.post('/register',jsonParser,(req,res,next)=>{ console.log('yebo');//REGISTER
var post;
var hashing = bcrypt.hash(req.body.password,saltRounds,(err,hash)=>{
  if(err)
    {
    return res.status(500).json({error:err});
    }
  else
    {
      console.log('password hash success');
     var post  = {NwuNumber : req.body.nwunumber ,pasword: hash};
     var sql = 'INSERT INTO Demi set ?';
        console.log(post);
      con.getConnection()
      .then(function(connection) {
        connection.query(sql,post,(err,ress)=>{if(ress){res.status(201).json({message: ress});}else if(err){res.status(422).json({message: err});} });
        
      })
      .catch(function(err) {
        console.log('error');
      });
    }
});
});

router.post('/apply',jsonParser,(req,res,next)=>{ console.log('yebo');//REGISTER
var post;
var hashing = bcrypt.hash(req.body.password,saltRounds,(err,hash)=>{
  if(err)
    {
    return res.status(500).json({error:err});
    }
  else
    {
      console.log('password hash success');
     var post  = {NwuNumber : req.body.nwunumber ,pasword: hash};
     var sql = 'INSERT INTO Demi set ?';
        console.log(post);
      con.getConnection()
      .then(function(connection) {
        connection.query(sql,post,(err,ress)=>{if(err){console.log(err);}});
        res.status(201).json({message: post});
      })
      .catch(function(err) {
        console.log('error');
      });
    }
});
});



router.get('/:demiID',(req,res,next)=>{
      
});



router.patch('/:demiID',(req,res,next)=>{
  
  });



router.delete('/:dosentID',(req,res,next)=>{ 

});
console.log('test');
module.exports = router;
