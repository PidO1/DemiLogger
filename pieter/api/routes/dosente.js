const express = require('express');
const router = express.Router();
<<<<<<< HEAD
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
const mysql = require('promise-mysql');
const fs = require("fs");
 const bcrypt = require('bcrypt');
 const saltRounds = 10;



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
     var post  = {NwuNumber : req.body.nwunumber ,pasword: hash, Title:req.body.title,Naam:req.body.name,
      Van:req.body.surname, Rolle:req.body.rolle, TelNumber:req.body.telnr, Email: req.body.email };
     var sql = 'INSERT INTO Dosent set ?';
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





router.get('/:dosentID',(req,res,next)=>{
      
});



router.patch('/:dosentID',(req,res,next)=>{
  
  });



router.delete('/:dosentID',(req,res,next)=>{ 

=======

router.get('/',(req,res,next)=>{res.status(200)
  .json({message:'hanteer dosente GET requests'})}
);

router.post('/',(req,res,next)=>{
const lecturer ={
  name: req.body.name,
  surname : req.body.surname,
  NWUnumber: req.body.NWUnumber
};

  res.status(201).json({message:'hanteer dosente POST requests',newLecturer:lecturer})

});
router.get('/:dosentID',(req,res,next)=>
{const id = req.params.dosentID
  if(id==='special')
  {
      res.status(200).json({message:'you discovered the ID',id:id})
  }
  else {
    res.status(200).json({message:'you sent the non special ID',id:id})
  }
}
);

router.patch('/:dosentID',(req,res,next)=>
{res.status(200).json({message:'updated lecturer'});
});

router.delete('/:dosentID',(req,res,next)=>
{res.status(200).json({message:'DELETED lecturer'});
>>>>>>> Develop
});

module.exports = router;
