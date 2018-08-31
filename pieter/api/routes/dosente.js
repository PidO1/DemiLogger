const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Dosent = require('../models/dosente');


router.get('/',(req,res,next)=>{
  Dosent.find()
  .select("name surname NWUnumber _id")
  .exec()
  .then(doc=>{console.log(doc);
        const response ={count : doc.length, 
        dosente :doc.map(docs =>{return{ name: docs.name,
        surname: docs.surname,
         NWUnumber: docs.NWUnumber,
        _id : docs._id ,
      request: {type:'GET',
      url:`http://localhost:3000/dosente/${docs._id}` } };} ) };
      res.status(200).json(response);
  })
  .catch( (err) =>{console.log(err); res.status(200).json({error:err});});

});


router.post('/',(req,res,next)=>{

const dosent = new Dosent({ _id:mongoose.Types.ObjectId(),
name:req.body.name,
surname : req.body.surname,
NWUnumber: req.body.NWUnumber
});
dosent.save()
.then(result=>{console.log(result);   res.status(201).json({message:'Dosent created success',
createdDosent:{ name : result.name,
  surname : result.surname,
_id: result._id,
NWUnumber: result.NWUnumber,
request :{type: 'GET',
url:`http://localhost:3000/dosente/${result._id}` } } });})
.catch((err)=>{console.log(err);res.status(500).json({error : err});});



});
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
    res.status(200).json({error:err});
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
