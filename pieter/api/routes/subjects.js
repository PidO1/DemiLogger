const express = require('express');
const router = express.Router();

router.get('/',(req,res,next)=>{
  res.status(200).json({message:'Subjects were fetched'});
});

router.post('/',(req,res,next)=>{
  const subject = { name: req.body.name,
  code: req.body.code,
semester: req.body.semester }
  res.status(201).json({message:'Subject ADDED', newSubject : subject});
});
router.get('/:subjectID',(req,res,next)=>{
  res.status(201).json({message:'Subject FOUND by ID',subjectid:req.params.subjectID});
});
router.delete('/:subjectID',(req,res,next)=>{
  res.status(201).json({message:'Subject DELETED',subjectid:req.params.subjectID});
});
module.exports = router;
