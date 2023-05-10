const express = require("express");
const router = express.Router();
const studentsModule = require("../../database_modules/students_module");
const { default: mongoose } = require("mongoose");

router.get("/all", (req, res, next) => {
    studentsModule.find()
        .exec()
        .then(data => {
            res.status(200).json({
                message: "All Student Data",
                data: data
            })
        })
        .catch(err => console.log(err));
});

router.get("/:roll_number", (req, res, next) => {
    const roll_number_finder = req.params.roll_number;
    studentsModule.find({ roll_number: roll_number_finder })
        .exec()
        .then(data => {
            res.status(200).json({
                message: "Student Data of Roll Number: " + roll_number_finder,
                data: data
            })
        })
        .catch(err => console.log(err));
});

router.get("/login/:id", (req, res, next) => {
    const id = req.params.id;
    studentsModule.find({ _id: id })
        .exec()
        .then(data => {
            res.status(200).json({
                message: "Student Data of ID: " + id,
                data: data
            })
        })
        .catch(err => console.log(err));
});

router.post("/signup", (req, res, next) => {
    studentsModule.find({ roll_number: req.body.roll_number })
        .exec()
        .then(data => {
            console.log(data)
            if (data != "") {
                res.status(500).json({
                    message: "Roll Number Already Registered!!!",
                    already_exist_data: data
                });
            } else {
                const studentData = new studentsModule({
                    _id: new mongoose.Types.ObjectId(),
                    name: req.body.name,
                    roll_number: req.body.roll_number,
                    stream: req.body.stream,
                    semester: req.body.semester,
                    mobile_number: req.body.mobile_number,
                    registration_date: Date.now()
                });

                studentData.save()
                    .then(res => console.log(res))
                    .catch(err => console.log(err));

                res.status(200).json({
                    message: "Data is Successfully Posted",
                    student_data_to_post: studentData
                });
            }
        })
});

router.post("/login", (req, res, next) => {
    studentsModule.find({
            name: req.body.name,
            roll_number: req.body.roll_number
        })
        .exec()
        .then(data => {
            if (data != "") {
                res.status(200).json({
                    message: "LOGIN SUCCESSFULLY",
                    token: data[0]._id
                })
            } else {
                res.status(200).json({
                    message: "LOGIN FAILED",
                    token: null
                })
            }
        })
        .catch(err => {
            console.log(err);
        })
})

router.delete("/:id", (req, res, next) => {
    const id = req.params.id;
    studentsModule.findOneAndRemove({ _id: id })
        .exec()
        .then(data => {
            res.status(200).json({
                message: "Student Data Successfully Deleted Of Id: " + id,
                data: data
            })
        })
        .catch(err => console.log(err));
});

router.patch("/cse/6/:subject/:roll_number/:date/:attend", (req, res, next) => {
    const roll_number = req.params.roll_number;
    const date = req.params.date;
    const attend = req.params.attend;
    const subject = req.params.subject;
    studentsModule.updateOne({ roll_number: roll_number }, {
            $push: {
                attendance: {
                    date: date,
                    subject: subject,
                    attend: attend
                }
            }
        })
        .exec()
        .then(data => {
            res.status(200).json({
                message: "Attendance is POSTED Successfully",
                data: data
            })
        })
        .catch(err => console.log(err));
});

module.exports = router;