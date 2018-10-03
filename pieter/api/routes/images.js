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

async function download(){}

await download()
router.get('/',(req,res,next)=>{
    request('http://localhost:3000/'+req.body.fname ).pipe(fs.createWriteStream('x.jpg'))
    download('http://localhost:3000/'+req.body.fname ,'C:/Users/piete/Desktop',);
  });


module.exports = router;