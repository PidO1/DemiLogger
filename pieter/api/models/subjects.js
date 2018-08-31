const mongoose = require('mongoose');

const subjectSchema = mongoose.Schema({_id: mongoose.Schema.Types.ObjectId,
Module_Code: String,
Core: String,
Credits: Number,
description: String,
});
module.exports = mongoose.model('Subject',subjectSchema);
