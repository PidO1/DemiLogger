const mongoose = require('mongoose');

const hoursSchema = mongoose.Schema({_id:mongoose.Schema.Types.ObjectId,
Student_Number: String,
Preferred_Name: String,
Surname: String,
Email_Address: String,
Hours: Number
});
module.exports = mongoose.model('Dosent',hoursSchema);
