const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Dosent = require('../models/dosente');

router.get('/',(req,res,next)=>{
  Dosent.find()
  .select("Title Name Surname NWU_Number Role Telephone_Number Email_Address")
  .exec()
  .then(doc=>{console.log(doc);
        const response ={count : doc.length,
        dosente :doc.map(docs =>{return{ Title: docs.Title,
        Name: docs.Name,
        Surname: docs.Surname,
        NWU_Number: docs.NWU_Number,
        Role: docs.Role,
        Telephone_Number: docs.Telephone_Number,
        Email_Address: docs.Email_Address,
        _id : docs._id,
      request: {type:'GET',
      url:`http://localhost:3000/dosente/${docs._id}` } };} ) };
      res.status(200).json(response);
  })
  .catch( (err) =>{console.log(err); res.status(200).json({error:err});});
});

router.post('/',(req,res,next)=>{
const dosent = new Dosent({ _id:mongoose.Types.ObjectId(),
Name: req.body.Name,
Surname: req.body.Surname,
NWU_Number: req.body.NWU_Number,
Role: req.body.Role,
Telephone_Number: req.body.Telephone_Number,
Email_Address: req.body.Email_Address,
});

dosent.save()
.then(result=>{console.log(result);   res.status(201).json({message:'Dosent created success',
createdDosent:{
  Name: result.Name,
  Surname: result.Surname,
  NWU_Number: result.NWU_Number,
  Role: result.Role,
  Telephone_Number: result.Telephone_Number,
  Email_Address: result.Email_Address,
  _id: result._id,
request :{type: 'GET',
url:`http://localhost:3000/dosente/${result._id}` } } });})
.catch((err)=>{console.log(err);res.status(500).json({error : err});});
});
////////////////////////////////////////////////////////////////////////////////////////
router.get('/:dosentID',(req,res,next)=>
{const id = req.params.dosentID
    Dosent.findById(id)
    .exec()
    .then(doc =>{console.log(doc);
      if(doc)
      {
        res.status(200).json(doc);
      }
    else
    {
        res.status(404).json({message: 'Person not found'});
    }
  })
    .catch(err=>{console.log(err);
    res.status(500).json(err);});
});



router.patch('/:dosentID',(req,res,next)=>{
  const dosentID = req.params.dosentID;
  const updateOps = {};
  for(const ops of req.body){
    updateOps[ops.propName] = ops.value;

  }
  Dosent.updateOne({_id:dosentID},{ $set:updateOps})//UPDATE
  .exec()
  .then(result=>{
    console.log(res);
    res.status(200).json(result);
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json({error:err});
  });
});


router.delete('/:dosentID',(req,res,next)=>
{ const dosentID = req.params.dosentID;
  Dosent.findOneAndDelete({_id:dosentID})
  .exec()
  .then(result=>{
    res.status(200).json(result);
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json({error:err});
  });
});

module.exports = router;
