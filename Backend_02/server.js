// import express from 'express'
// import mysql from 'mysql'
// import cors from 'cors'

// const app = express();
// app.use(express.json());

// app.use(cors());

// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password:"",
//     database:"crud"
// })

// app.post('/login',(req,res)=>{
//     const sql ="Select * from login where email =? AND password = ?";
//     db.query(sql,[req.body.email, req.body.password],(err,data)=>{
//         if(err) return res.json("Error",);
//         if(data.length > 0){
//             return res.json("login Success")
//         } else{
//             return res.json("login Failed")
//         }
// })
// })

// app.listen(3000,()=>{
//     console.log("Running");
// })

// NEW CODE:

// import { Sequelize } from "sequelize";

// import dotenv from "dotenv"
// dotenv.config();

// export const sequelize = new Sequelize(
//   process.env.DATABASE,
//   process.env.USER,
//   "",
//   {
//     host: process.env.HOST,
//     dialect: "mysql",
//   }
// );
const express = require("express");
require("dotenv").config();

const { login, signUp } = require("./controllers/authController");

const authenticateToken = require("./middlewares/authMiddleware");
const corsOptions = require("./middlewares/corsMiddleware");
const {
  subjectMapping,
  getSubjectsData,
  getSemesterData,
  insertSubject,
  updateSubject,
  getbranchdata,
  getfacultydata,
  getacademic_year,
  assigned_subject,
  faculty_assigned_data,
  getFacultySubjectsData,
  editfacultysubject,
  getdivyeardata,
  update_faculty_subject,
  getassignedsubjectdata,
  getClassroomData,
  getTotalStudents,
  getAssignedStudents,
  createNewAssignment,
  clearAssignedStudents,
  getRoomSides,
  finalAssignBench,
} = require("./controllers/adminController");
const port = 4000;

const app = express();

// MiddleWares

const cors = require("cors");
app.use(cors({ origin: "http://localhost:3000" }));

app.use(express.json());

// Login Form
app.post("/login", login);

// Register Form
app.post("/signup", signUp);

app.get("/getAssignedStudents", getAssignedStudents);
app.get("/getRoomSides/:classNumber", getRoomSides);
app.post("/createNewAssignment", createNewAssignment);
app.post("/subject_mapping", subjectMapping);
app.get("/getSubjectsData", getSubjectsData);
app.get("/getFacultySubjectsData", getFacultySubjectsData);
app.get("/getSemesterData", getSemesterData);
app.get("/insertSubjectData", insertSubject);
app.get("/getbranchdata", getbranchdata);
app.get("/getfacultydata/:faculty_branch_id", getfacultydata);
app.get("/getacademic_year", getacademic_year);
app.post("/updateSubject/:subjectId", updateSubject);
app.post("/assigned_subject", assigned_subject);
app.get("/getfaculty_assigned_data", faculty_assigned_data);
app.get("/div_yeardata", getdivyeardata);
app.post(
  "/updatefaculty_subjectmapping/:subjectCode/:division",
  update_faculty_subject
);
app.post("/clearAssignedStudents/:roomNumber", clearAssignedStudents);
app.get("/getClassroomData", getClassroomData);
app.get("/edit_assigned_faculty", editfacultysubject);
app.get("/getassignedsubjectdata", getassignedsubjectdata);
app.get("/getTotalStudents", getTotalStudents);
app.get("/finalAssignBench/:classNumber", finalAssignBench);

app.listen(port, () => {
  console.log("Server Is Running on PORT :", port);
});
