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
var mime = require('mime-types');


var con = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "bib",
  database: 'demilogger'
});


router.get('/getID/:id',(req,res,next)=>{  //*********************  ID */
  
  var sql = 'SELECT * FROM demi WHERE NwuNumber = ?';
  
  con.getConnection()
  .then(function(connection){
      connection.query(sql,req.params.id,(err,result,fields)=>{ 
        
        if(err){res.status(400).json({message:'error'});}
        if(result.length<1)
        {

          res.status(404).json({message:'not found'});


        }
        console.log(result.length);
        if(result.length>0)
        {
          var get = './uploads/'+ result[0].IDdocName;
          var name =result[0].IDdocName;
         
          
          
          res.download(get,name, err=>{

            if(err)
            {res.status(400);}
            else
            {
              
              console.log(res.headersSent);
            }
          });
        //   console.log(mime.contentType(get));
        //   fs.readFile(get , function (err, content) {
               
        //      if(content) {
             
        //         //specify the content type in the response will be an image
        //         res.type(mime.contentType(get));
        //         res.writeHead(200,{'Content-type':mime.lookup(get),'Content-Disposition': 'attachment; filename=' + name });
               
        //         res.end(content);
        //     }
        // });
        
        
        // var s = fs.createReadStream(get);
        // s.on('open', function () {
        //   res.set('Content-Type', mime.lookup(get));
        //   s.pipe(res);});
         }
         
    });
  })
  .catch(err=>{if(err){res.status(400).json({message:'error with fecthing'});}});
   
    
  });
  router.get('/getPassport/:id',(req,res,next)=>{  //*****Paspoort */
  
    var sql = 'SELECT * FROM demi WHERE NwuNumber = ?';
    
    con.getConnection()
    .then(function(connection){
        connection.query(sql,req.params.id,(err,result,fields)=>{ 
          
          if(err){res.status(400).json({message:'error'});}
          if(result.length<1)
          {
  
            res.status(404).json({message:'not found'});
  
  
          }
          if(result.length>0)
          {
            var get = './uploads/'+ result[0].passportName;
            var name =result[0].passportName;
           
            
            
            res.download(get,name, err=>{
  
              if(err)
              {res.status(400);}
              else
              {
                
                console.log(res.headersSent);
              }
            });
          //   console.log(mime.contentType(get));
          //   fs.readFile(get , function (err, content) {
                 
          //      if(content) {
               
          //         //specify the content type in the response will be an image
          //         res.type(mime.contentType(get));
          //         res.writeHead(200,{'Content-type':mime.lookup(get),'Content-Disposition': 'attachment; filename=' + name });
                 
          //         res.end(content);
          //     }
          // });
          
          
          // var s = fs.createReadStream(get);
          // s.on('open', function () {
          //   res.set('Content-Type', mime.lookup(get));
          //   s.pipe(res);});
           }
           
      });
    })
    .catch(err=>{if(err){res.status(400).json({message:'error with fecthing'});}});
     
      
    });

    router.get('/getReg/:id',(req,res,next)=>{         //registration
  
      var sql = 'SELECT * FROM demi WHERE NwuNumber = ?';
      
      con.getConnection()
      .then(function(connection){
          connection.query(sql,req.params.id,(err,result,fields)=>{ 
            
            if(err){res.status(400).json({message:'error'});}
            if(result.length<1)
            {
    
              res.status(404).json({message:'not found'});
    
    
            }
            if(result.length>0)
            {
              var get = './uploads/'+ result[0].RegistrationFormName;
              var name =result[0].RegistrationFormName;
             
              
              
              res.download(get,name, err=>{
    
                if(err)
                {res.status(400);}
                else
                {
                  
                  console.log(res.headersSent);
                }
              });
            //   console.log(mime.contentType(get));
            //   fs.readFile(get , function (err, content) {
                   
            //      if(content) {
                 
            //         //specify the content type in the response will be an image
            //         res.type(mime.contentType(get));
            //         res.writeHead(200,{'Content-type':mime.lookup(get),'Content-Disposition': 'attachment; filename=' + name });
                   
            //         res.end(content);
            //     }
            // });
            
            
            // var s = fs.createReadStream(get);
            // s.on('open', function () {
            //   res.set('Content-Type', mime.lookup(get));
            //   s.pipe(res);});
             }
             
        });
      })
      .catch(err=>{if(err){res.status(400).json({message:'error with fecthing'});}});
       
        
      });

      router.get('/getPermit/:id',(req,res,next)=>{   //***************permit */
  
        var sql = 'SELECT * FROM demi WHERE NwuNumber = ?';
        
        con.getConnection()
        .then(function(connection){
            connection.query(sql,req.params.id,(err,result,fields)=>{ 
              
              if(err){res.status(400).json({message:'error'});}
              if(result.length<1)
              {
      
                res.status(404).json({message:'not found'});
      
      
              }
              if(result.length>0)
              {
                var get = './uploads/'+ result[0].studyPermitName;
                var name =result[0].studyPermitName;
               
                
                
                res.download(get,name, err=>{
      
                  if(err)
                  {res.status(400);}
                  else
                  {
                    
                    console.log(res.headersSent);
                  }
                });
              //   console.log(mime.contentType(get));
              //   fs.readFile(get , function (err, content) {
                     
              //      if(content) {
                   
              //         //specify the content type in the response will be an image
              //         res.type(mime.contentType(get));
              //         res.writeHead(200,{'Content-type':mime.lookup(get),'Content-Disposition': 'attachment; filename=' + name });
                     
              //         res.end(content);
              //     }
              // });
              
              
              // var s = fs.createReadStream(get);
              // s.on('open', function () {
              //   res.set('Content-Type', mime.lookup(get));
              //   s.pipe(res);});
               }
               
          });
        })
        .catch(err=>{if(err){res.status(400).json({message:'error with fecthing'});}});
         
          
        });

router.get('/getCWork/:id',(req,res,next)=>{   //**************conduct work */
  
    var sql = 'SELECT * FROM demi WHERE NwuNumber = ?';
          
          con.getConnection()
          .then(function(connection){
              connection.query(sql,req.params.id,(err,result,fields)=>{ 
                
                if(err){res.status(400).json({message:'error'});}
                if(result.length<1)
                {
        
                  res.status(404).json({message:'not found'});
        
        
                }
                if(result.length>0)
                {
                  var get = './uploads/'+ result[0].permissionToConductWorkName;
                  var name =result[0].permissionToConductWorkName;
                 
                  
                  
                  res.download(get,name, err=>{
        
                    if(err)
                    {res.status(400);}
                    else
                    {
                      
                      console.log(res.headersSent);
                    }
                  });
                //   console.log(mime.contentType(get));
                //   fs.readFile(get , function (err, content) {
                       
                //      if(content) {
                     
                //         //specify the content type in the response will be an image
                //         res.type(mime.contentType(get));
                //         res.writeHead(200,{'Content-type':mime.lookup(get),'Content-Disposition': 'attachment; filename=' + name });
                       
                //         res.end(content);
                //     }
                // });
                
                
                // var s = fs.createReadStream(get);
                // s.on('open', function () {
                //   res.set('Content-Type', mime.lookup(get));
                //   s.pipe(res);});
                 }
                 
            });
          })
  .catch(err=>{if(err){res.status(400).json({message:'error with fecthing'});}});
           
            
   });

module.exports = router;