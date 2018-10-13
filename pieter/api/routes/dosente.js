const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
const mysql = require('promise-mysql');
const bcrypt = require('bcryptjs');
 const saltRounds = 10;


 const checkAuth = require('../Auth/checkAuth');
 const checkAuthAdmin = require('../Auth/checkAuthAdmin');
 const checkAuthDosent = require('../Auth/checkAuthDosent');


var con = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "bib",
  database: 'demilogger'
});

// con.connect((err) => {
//   if (err) throw err;
//   console.log('Connected!');
// });


router.get('/',(req,res,next)=>{
  
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
     var post  = {NwuNumber : req.body.nwunumber ,pasword: hash, Title:req.body.title,Naam:req.body.preferredname,
      Van:req.body.surname, Rolle:req.body.role, TelNumber:req.body.telephonenumber, Email: req.body.email };
      var postU  = {NwuNumber : req.body.nwunumber ,pasword: hash, Email: req.body.email,  demi:0,admins:0,dosent:1 };

     var sql = 'INSERT INTO Dosent set ?';
     var sql2 = 'INSERT INTO Users set ?';

        console.log(post);
      con.getConnection()
      .then(function(connection) {
        connection.query(sql,post,(err,ress)=>{if(err){console.log(err);} if(ress){console.log(ress);} });
        connection.query(sql2,postU,(err,ress)=>{if(err){console.log(err); } if(ress){console.log(ress);} }); 
        res.status(201).json({message: 'Lecturer  creation was successful', URL:'/dosente/register' });
      })
      .catch(function(err) {
        console.log('error');
        res.status(401).json({message: 'there was an error creating lecturer please try again'});
      });
    }
});
});





router.post('/get/dosent/demi',(req,res,next)=>{
  var data = [];
 
  var connection;    
  console.log(req.body);
  con.getConnection()
      .then(conn=>{
        var sql ='SELECT ModuleId FROM module WHERE ModuleCode = ?';
        connection = conn;
        return conn.query(sql,req.body.module1);


      }).then(rows=>{
        //console.log(rows[0].ModuleId);
        var sql2 = 'SELECT * From demi_module_details WHERE ModuleId = ?';
       connection.query(sql2,rows[0].ModuleId,(err,result,fields)=>{

        for(x=0;x<result.length;x++)
        {
        data.push({ data:[result[x].NwuNumber,result[x].PrefferedName, result[x].Surname, result[x].Email ]  , label: ['Nwu-Number','Name','Surname','Email'] });
          console.log(data);

        }
        res.status(202).json(data);

       });

      })
      .catch();



});



router.patch('/:dosentID',(req,res,next)=>{
  
  });



router.delete('/:dosentID',(req,res,next)=>{ 

});

module.exports = router;
