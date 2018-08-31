const mongoose = require('mongoose');

const dosenteSchema = mongoose.Schema({_id:mongoose.Schema.Types.ObjectId,
Title:String,
Name:String,
Surname:String,
NWU_Number:{ type: Number , required : true},
Role:String,
Telephone_Number:String,
Email_Address:String,
Building:String,
Room:String,
Campus:String,
Qualification:String,
Specialization:String
});
module.exports = mongoose.model('Dosent',dosenteSchema);
