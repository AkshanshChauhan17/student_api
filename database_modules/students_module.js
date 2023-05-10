const mongoose = require("mongoose");

const studentsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    roll_number: Number,
    stream: String,
    semester: Number,
    mobile_number: Number,
    login_token: String,
    registration_date: Number,
    attendance: Object
});

module.exports = mongoose.model('Students', studentsSchema);;