const mongoose = require('mongoose');

const studentsSchema = mongoose.Schema({_id:mongoose.Schema.Types.ObjectId,
Personal_ID: String,//foto
Registration_Form: String,//foto
Student_Number: Number,
Title: String,
Initials: String,
Surname: String,
Full_Names: String,
Preferred_Name: String,
Extension: Number,
Internal_Box: Number,
Gender: String,
Maritial_Status: String,
Maiden_Name: String,
Correspondance_Preference: String,
Race: String,
Date_Of_Birth: String,
Home_Language: String,
Nationality: String,
ID_Number: String,
Income_Tax_Number: String,
Residential_Address: String,
Postal_Address: String,
Zip_Code: String,
Home_Telephone_Number: String,
Mobile_Number: String,
Email_Address: String,
Previously_Applied: String,
Elsewhere_Applied: String,
Self_Employed: String,
Highest_Qualification: String,
Passport: String,//foto
Study_Permit: String,//foto
Permission_to_Conduct_Work_Form: String,//foto
Passport_Number: String,
Passport_Expiry_Date: String,
Work_Permit_Number: String,
Work_Permit_Expiry_Date: String,
//Bank-Details
Account_Type: String,
Bank_Branch_code: String,
Account_Number: String,
Name_Of_Bank: String,
Account_Holder_Surname: String,
Account_Holder_Initials: String,
Account_Type_Info: String,
Account_Date: String
});


module.exports = mongoose.model('Student',studentsSchema);