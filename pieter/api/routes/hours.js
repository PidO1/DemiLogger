const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Hours = require('../models/hours');

router.get('/',(req,res,next)=>{
  Hours.find()
  .select("Title Name Surname NWU_Number Role Telephone_Number Email_Address")
  .exec()
  .then(doc=>{console.log(doc);
        const response ={count : doc.length,
        dosente :doc.map(docs =>{return{
          Student_Number: docs.Student_Number,
          Preferred_Name: docs.Preferred_Name,
          Surname: docs.Surname,
          Email_Address: docs.Email_Address,
          Hours: docs.Hours,
        _id : docs._id,
      request: {type:'GET',
      url:`http://localhost:3000/hours/${docs._id}` } };} ) };
      res.status(200).json(response);
  })
  .catch( (err) =>{console.log(err); res.status(200).json({error:err});});
});

module.exports = router;
