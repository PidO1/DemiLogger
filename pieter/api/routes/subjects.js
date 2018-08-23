const express = require('express');
const router = express.Router();

router.get('/',(req,res,next)=>{
  res.status(200).json({message:'Subjects were fetched'});
});

router.post('/',(req,res,next)=>{
  res.status(201).json({message:'Subject ADDED'});
});
router.get('/:subjectID',(req,res,next)=>{
  res.status(201).json({message:'Subject FOUND by ID',subjectid:req.params.subjectID});
});
router.delete('/:subjectID',(req,res,next)=>{
  res.status(201).json({message:'Subject DELETED',subjectid:req.params.subjectID});
});
module.exports = router;
