const express = require('express');
const router = express.Router();
const axios = require('axios');
var request = require('request');
var progress = require('request-progress');
const mysql = require('promise-mysql');
const fs = require("fs");
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


router.get('/getID/:id',(req,res,next)=>{
  console.log(req.params.id);
  var sql = 'SELECT * FROM demi WHERE NwuNumber = ?';
  
  con.getConnection()
  .then(function(connection){
      connection.query(sql,req.params.id,(err,result,fields)=>{ 
        
        if(err){res.status(400).json({message:'error'});}
        if(result)
        {
          var get = './uploads/';
          var name =result[0].IDdocName;
          console.log(get);
          console.log(name);
          var options = {
            root: get,
            dotfiles: 'deny',
            headers: {
                'x-timestamp': Date.now(),
                'x-sent': true
            }
          };
          res.sendFile(name, options, function (err) {
            if (err) {
              next(err);
            } else {
              console.log('Sent:', name);
            }
          });
          // res.download(get);,result[0].IDdocName, err=>{

          //   if(err)
          //   {res.status(400);}
          //   else
          //   {
      
          //     console.log(res.headersSent);
          //   }
          //});

        }
        
    
    
    
    });
  })
  .catch(err=>{if(err){res.status(400).json({message:'error with fecthing'});}});
   
    
  });


module.exports = router;