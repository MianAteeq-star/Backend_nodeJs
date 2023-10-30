const express = require('express')
const router = express.Router();
const Students = require("../Model/Student_model")
const mongoose = require("mongoose");


// Read Student


router.get("/readStudent", async (req, res) => {
    const Std = await Students.find()
    res.json(Std);
    console.log(Std);
});


// Creat Student

router.post("/createStudent", async (req, res) => {

    try {
        const stdData = new Students({
            _id: new mongoose.Types.ObjectId(),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
            courses: req.body.courses,
            address: req.body.address,

        })
        const newStudentData = await stdData.save();
        res.json(newStudentData)
        console.log(newStudentData);
    } catch (error) {
        res.status(500).json({ message: error.message })

    }


})


// Delete Student


router.delete("/delStudent/:id", async (req, res) => {
    try {
        const stdId = req.params.id;
        const delStudent = await Students.findByIdAndRemove(stdId);
        if (!delStudent) {
            return res.status(404).json({ message: "Student not found" })
        }
        return res.status(200).json({ message: "Student delete successfully" })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})


// Update Student


router.put("/updateStudent/:id",async(req,res)=>{
    try {
        const updId= req.params.id;
        const updData = new Students({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
            courses: req.body.courses,
            address: req.body.address,

        })
        
const data= await Students.findByIdAndUpdate(updId,updData,{new:true});
    if(!data){
        return res.status(404).json({message:"Student Not Found"})
    } 
    return res.status(200).json({message:"Student updated successfully", data:data})
    }
    
    catch (error) {
        return res.status(500).json({message: error.message})
    }
})





module.exports = router