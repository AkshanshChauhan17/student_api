const mongoose = require("mongoose");

const studentsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    roll_number: Number,
    stream: String,
    semester: Number,
    mobile_number: Number,
    registration_date: Number
});

module.exports = mongoose.model('Students', studentsSchema);;