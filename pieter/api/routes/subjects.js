const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Subject = require('../models/subjects');

router.get('/',(req,res,next)=>{
  Subject.find()
  .select("Module_Code Core Credits Description")
  .exec()
  .then(doc=>{console.log(doc);
        const response ={count : doc.length,
        subjects :doc.map(docs =>{return{
        Module_Code: docs.Module_Code,
        Core: docs.Core,
        Credits: docs.Credits,
        Description: docs.Description,
        _id : docs._id,
      request: {type:'GET',
      url:`http://localhost:3000/subjects/${docs._id}` } };} ) };
      res.status(200).json(response);
  })
  .catch( (err) =>{console.log(err); res.status(200).json({error:err});});
});

router.post('/',(req,res,next)=>{
const subjects = new Subject({ _id:mongoose.Types.ObjectId(),
  Module_Code: req.body.Module_Code,
  Core: req.body.Core,
  Credits: req.body.Credits,
  Description: req.body.Description,
});

subjects.save()
.then(result=>{console.log(result);   res.status(201).json({message:'Subject created success',
createdSubject:{
Module_Code: result.Module_Code,
Core: result.Core,
Credits: result.Credits,
Description: result.Description,
_id: result._id,
request :{type: 'GET',
url:`http://localhost:3000/subjects/${result._id}` } } });})
.catch((err)=>{console.log(err);res.status(500).json({error : err});});
});

router.get('/:subjectID',(req,res,next)=>
{const id = req.params.subjectID
    Subject.findById(id)
    .exec()
    .then(doc =>{console.log(doc);
      if(doc)
      {
        res.status(200).json(doc);
      }
    else
    {
        res.status(404).json({message: 'Subject not found'});
    }
  })
    .catch(err=>{console.log(err);
    res.status(500).json({message:'could not find the desired subject',error: err.message});});
});

router.patch('/:subjectID',(req,res,next)=>{
  const subjectID = req.params.subjectID;
  const updateOps = {};
  for(const ops of req.body){
    updateOps[ops.propName] = ops.value;
  }
  Subject.updateOne({_id:subjectID},{ $set:updateOps})//UPDATE
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

router.delete('/:subjectID',(req,res,next)=>
{ const subjectID = req.params.subjectID;
  Subject.findOneAndDelete({_id:subjectID})
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
