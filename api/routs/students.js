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

router.post("/", (req, res, next) => {
    studentsModule.find({ roll_number: req.body.roll_number })
        .exec()
        .then(data => {
            console.log(data)
            if (data != "") {
                res.status(500).json({
                    message: "Roll Number Already Existed!!!",
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

module.exports = router;