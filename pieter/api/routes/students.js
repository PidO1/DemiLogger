const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Student = require('../models/students');

router.get('/',(req,res,next)=>{
  Student.find()
  .select("Personal_ID Registration_Form Student_Number Title Initials Surname Full_Names Preferred_Name Extension Internal_Box Gender Maritial_Status Maiden_Name Correspondance_Preference Race Date_Of_Birth Home_Language Nationality ID_Number Income_Tax_Number Residential_Address Postal_Address Zip_Code Home_Telephone_Number Mobile_Number Email_Address Previously_Applied Elsewhere_Applied Self_Employed Highest_Qualification Passport Study_Permit Permission_to_Conduct_Work_Form Passport_Number Passport_Expiry_Date Work_Permit_Number Work_Permit_Expiry_Date Account_Type Bank_Branch_code Account_Number Name_Of_Bank Account_Holder_Surname Account_Holder_Initials Account_Type_Info Account_Date")
  .exec()
  .then(doc=>{console.log(doc);
        const response ={count : doc.length,
        subjects :doc.map(docs =>{return{
          Personal_ID: docs.Personal_ID,//foto
          Registration_Form: docs.Registration_Form,//foto
          Student_Number: docs.Student_Number,
          Title: docs.Title,
          Initials: docs.Initials,
          Surname: docs.Surname,
          Full_Names: docs.Full_Names,
          Preferred_Name: docs.Preferred_Name,
          Extension: docs.Extension,
          Internal_Box: docs.Internal_Box,
          Gender: docs.Gender,
          Maritial_Status: docs.Maritial_Status,
          Maiden_Name: docs.Maiden_Name,
          Correspondance_Preference: docs.Correspondance_Preference,
          Race: docs.Race,
          Date_Of_Birth: docs.Date_Of_Birth,
          Home_Language: docs.Home_Language,
          Nationality: docs.Nationality,
          ID_Number: docs.ID_Number,
          Income_Tax_Number: docs.Income_Tax_Number,
          Residential_Address: docs.Residential_Address,
          Postal_Address: docs.Postal_Address,
          Zip_Code: docs.Zip_Code,
          Home_Telephone_Number: docs.Home_Telephone_Number,
          Mobile_Number: docs.Mobile_Number,
          Email_Address: docs.Email_Address,
          Previously_Applied: docs.Previously_Applied,
          Elsewhere_Applied: docs.Elsewhere_Applied,
          Self_Employed: docs.Self_Employed,
          Highest_Qualification: docs.Highest_Qualification,
          Passport: docs.Passport,//foto
          Study_Permit: docs.Study_Permit,//foto
          Permission_to_Conduct_Work_Form: docs.Permission_to_Conduct_Work_Form,//foto
          Passport_Number: docs.Passport_Number,
          Passport_Expiry_Date: docs.Passport_Expiry_Date,
          Work_Permit_Number: docs.Work_Permit_Number,
          Work_Permit_Expiry_Date: docs.Work_Permit_Expiry_Date,
          //Bank-Details
          Account_Type: docs.Account_Type,
          Bank_Branch_code: docs.Bank_Branch_code,
          Account_Number: docs.Account_Number,
          Name_Of_Bank: docs.Name_Of_Bank,
          Account_Holder_Surname: docs.Account_Holder_Surname,
          Account_Holder_Initials: docs.Account_Holder_Initials,
          Account_Type_Info: docs.Account_Type_Info,
          Account_Date: docs.Account_Date,
        _id : docs._id,
      request: {type:'GET',
      url:`http://localhost:3000/students/${docs._id}` } };} ) };
      res.status(200).json(response);
  })
  .catch( (err) =>{console.log(err); res.status(200).json({error:err});});
});

router.post('/',(req,res,next)=>{
const students = new Student({ _id:mongoose.Types.ObjectId(),
  Personal_ID: req.body.Personal_ID,//foto
  Registration_Form: req.body.Registration_Form,//foto
  Student_Number: req.body.Student_Number,
  Title: req.body.Title,
  Initials: req.body.Initials,
  Surname: req.body.Surname,
  Full_Names: req.body.Full_Names,
  Preferred_Name: req.body.Preferred_Name,
  Extension: req.body.Extension,
  Internal_Box: req.body.Internal_Box,
  Gender: req.body.Gender,
  Maritial_Status: req.body.Maritial_Status,
  Maiden_Name: req.body.Maiden_Name,
  Correspondance_Preference: req.body.Correspondance_Preference,
  Race: req.body.Race,
  Date_Of_Birth: req.body.Date_Of_Birth,
  Home_Language: req.body.Home_Language,
  Nationality: req.body.Nationality,
  ID_Number: req.body.ID_Number,
  Income_Tax_Number: req.body.Income_Tax_Number,
  Residential_Address: req.body.Residential_Address,
  Postal_Address: req.body.Postal_Address,
  Zip_Code: req.body.Zip_Code,
  Home_Telephone_Number: req.body.Home_Telephone_Number,
  Mobile_Number: req.body.Mobile_Number,
  Email_Address: req.body.Email_Address,
  Previously_Applied: req.body.Previously_Applied,
  Elsewhere_Applied: req.body.Elsewhere_Applied,
  Self_Employed: req.body.Self_Employed,
  Highest_Qualification: req.body.Highest_Qualification,
  Passport: req.body.Passport,//foto
  Study_Permit: req.body.Study_Permit,//foto
  Permission_to_Conduct_Work_Form: req.body.Permission_to_Conduct_Work_Form,//foto
  Passport_Number: req.body.Passport_Number,
  Passport_Expiry_Date: req.body.Passport_Expiry_Date,
  Work_Permit_Number: req.body.Work_Permit_Number,
  Work_Permit_Expiry_Date: req.body.Work_Permit_Expiry_Date,
  //Bank-Details
  Account_Type: req.body.Account_Type,
  Bank_Branch_code: req.body.Bank_Branch_code,
  Account_Number: req.body.Account_Number,
  Name_Of_Bank: req.body.Name_Of_Bank,
  Account_Holder_Surname: req.body.Account_Holder_Surname,
  Account_Holder_Initials: req.body.Account_Holder_Initials,
  Account_Type_Info: req.body.Account_Type_Info,
  Account_Date: req.body.Account_Date,
});
students.save()
.then(result=>{console.log(result);   res.status(201).json({message:'Student created success',
createdStudent:{
Personal_ID: result.Personal_ID,//foto
Registration_Form: result.Registration_Form,//foto
Student_Number: result.Student_Number,
Title: result.Title,
Initials: result.Initials,
Surname: result.Surname,
Full_Names: result.Full_Names,
Preferred_Name: result.Preferred_Name,
Extension: result.Extension,
Internal_Box: result.Internal_Box,
Gender: result.Gender,
Maritial_Status: result.Maritial_Status,
Maiden_Name: result.Maiden_Name,
Correspondance_Preference: result.Correspondance_Preference,
Race: result.Race,
Date_Of_Birth: result.Date_Of_Birth,
Home_Language: result.Home_Language,
Nationality: result.Nationality,
ID_Number: result.ID_Number,
Income_Tax_Number: result.Income_Tax_Number,
Residential_Address: result.Residential_Address,
Postal_Address: result.Postal_Address,
Zip_Code: result.Zip_Code,
Home_Telephone_Number: result.Home_Telephone_Number,
Mobile_Number: result.Mobile_Number,
Email_Address: result.Email_Address,
Previously_Applied: result.Previously_Applied,
Elsewhere_Applied: result.Elsewhere_Applied,
Self_Employed: result.Self_Employed,
Highest_Qualification: result.Highest_Qualification,
Passport: result.Passport,//foto
Study_Permit: result.Study_Permit,//foto
Permission_to_Conduct_Work_Form: result.Permission_to_Conduct_Work_Form,//foto
Passport_Number: result.Passport_Number,
Passport_Expiry_Date: result.Passport_Expiry_Date,
Work_Permit_Number: result.Work_Permit_Number,
Work_Permit_Expiry_Date: result.Work_Permit_Expiry_Date,
//Bank-Details
Account_Type: result.Account_Type,
Bank_Branch_code: result.Bank_Branch_code,
Account_Number: result.Account_Number,
Name_Of_Bank: result.Name_Of_Bank,
Account_Holder_Surname: result.Account_Holder_Surname,
Account_Holder_Initials: result.Account_Holder_Initials,
Account_Type_Info: result.Account_Type_Info,
Account_Date: result.Account_Date,
_id: result._id,
request :{type: 'GET',
url:`http://localhost:3000/students/${result._id}` } } });})
.catch((err)=>{console.log(err);res.status(500).json({error : err});});
});

router.get('/:studentID',(req,res,next)=>
{const id = req.params.studentID
    Student.findById(id)
    .exec()
    .then(doc =>{console.log(doc);
      if(doc)
      {
        res.status(200).json(doc);
      }
    else
    {
        res.status(404).json({message: 'Student not found'});
    }
  })
    .catch(err=>{console.log(err);
    res.status(500).json({message:'could not find the desired subject',error: err.message});});
});

router.patch('/:studentID',(req,res,next)=>{
  const studentID = req.params.studentID;
  const updateOps = {};
  for(const ops of req.body){
    updateOps[ops.propName] = ops.value;
  }
  Student.updateOne({_id:studentID},{ $set:updateOps})//UPDATE
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

router.delete('/:studentID',(req,res,next)=>
{ const studentID = req.params.studentID;
  Student.findOneAndDelete({_id:studentID})
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
