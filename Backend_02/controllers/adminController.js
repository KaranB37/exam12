require("dotenv").config();
const asyncHand = require("express-async-handler");
const { connection } = require("../config/dbConfig");

const finalAssignBench = asyncHand((req, res) => {
  const { classNumber } = req.params; // Fetch the room number from req.params
  console.log("room number", classNumber);

  const query = `
    SELECT
    a.right_side,
    a.left_side,
      a.room_number,
      a.student_id,
      ROW_NUMBER() OVER (PARTITION BY a.room_number ORDER BY a.student_id) AS bench
    FROM
      assigned_students a
      JOIN classroom c ON a.room_number = c.room_number
    WHERE
      a.room_number = ?
  `;

  connection.query(query, classNumber, (error, results) => {
    if (error) {
      console.error("Error fetching assigned benches:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (results.length === 0) {
        res.status(404).json({ message: "Room number not found" });
      } else {
        res.status(200).json(results);
      }
    }
  });
});

const getRoomSides = asyncHand((req, res) => {
  const { classNumber } = req.params; // Fetch the room number from req.params
  console.log("room number", classNumber);

  const query = `
    SELECT 
      room_number,
      SUM(left_side) as total_left,
      SUM(right_side) as total_right 
    FROM 
      assigned_students 
    WHERE 
      room_number = ?
  `;

  connection.query(query, classNumber, (error, results) => {
    if (error) {
      console.error("Error fetching room sides:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (results.length === 0) {
        res.status(404).json({ message: "Room number not found" });
      } else {
        res.status(200).json(results[0]);
      }
    }
  });
});

const subjectMapping = asyncHand((req, res) => {
  const formData = req.body;
  console.log("Request aayi : ", req.body);
  const mapQuery =
    "Select * from subjects where semester = ? and subject_name = ?";

  connection.query(
    mapQuery,
    [formData.semester, formData.subject_name],
    (err, result) => {
      if (err) {
        console.error("Internal Server Error", err);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        console.log("Result Fetched", result[0]);
        res.status(200).json(result[0]);
      }
    }
  );
});

const insertSubject = asyncHand((req, res) => {
  const formData = req.body;

  const mapQuery = "INSERT INTO subjects SET ?";

  connection.query(mapQuery, formData, (err, result) => {
    if (err) {
      console.error("Internal Server Error", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log("Result Fetched", result[0]);
      res.status(200).json(result[0]);
    }
  });
});

const updateSubject = asyncHand((req, res) => {
  const { term_work, oral, practical, theory } = req.body;
  const subjectId = req.params.subjectId;

  const mapQuery = `
    UPDATE subjects 
    SET term_work = ${term_work}, oral = ${oral}, practical = ${practical}, theory = ${theory} 
    WHERE subject_id = ${subjectId};
  `;

  connection.query(mapQuery, req.body, (err, result) => {
    if (err) {
      console.error("Internal Server Error", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log("Result Fetched", result[0]);
      res.status(200).json(result[0]);
    }
  });
});

const getSemesterData = asyncHand((req, res) => {
  //   const semester = req.query.semester;
  const query = "SELECT * FROM semester";

  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching semester data server:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(200).json(results);
      console.log("semester data : ", results);
    }
  });
});

const getSubjectsData = async (req, res) => {
  const semester = req.query.semester; // Assuming semester is passed as a query parameter
  const branch_id = req.query.branch_id;

  console.log("Selected Semester : ", semester);
  console.log("Selected Branch ID: ", branch_id);

  const query =
    "SELECT * FROM subject_data WHERE semester = ? AND branch_id = ?";

  connection.query(query, [branch_id, semester], (error, results) => {
    if (error) {
      console.error("Error fetching subject data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log("Subject names:", results);
      res.status(200).json(results);
    }
  });
};

const getFacultySubjectsData = asyncHand((req, res) => {
  const semester = req.query.semester; // Assuming semester is passed as a query parameter
  const branch_id = req.query.branch_id;
  console.log("Selected Semester : ", semester);
  const query = "SELECT * FROM subject_Data WHERE semester = ? and branch_id=?";

  connection.query(query, [semester, branch_id], (error, results) => {
    if (error) {
      console.error("Error fetching semester data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log("Subject ke naam:", results);
      res.status(200).json(results);
    }
  });
});

const getbranchdata = asyncHand((req, res) => {
  // console.log("Selected Semester : ",semester);
  const query = "SELECT * FROM Branch";

  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching semester data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log("Branch ke naam:", results);
      res.status(200).json(results);
    }
  });
});

const getacademic_year = asyncHand((req, res) => {
  // console.log("Selected Semester : ",semester);
  const query = "SELECT * FROM academic_year";

  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching semester data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log("Acadmic Year:", results);
      res.status(200).json(results);
    }
  });
});
const assigned_subject = asyncHand((req, res) => {
  const formData = req.body;
  console.log(formData);
  const mapQuery = "INSERT INTO faculty_subject_assigned SET ?";

  connection.query(mapQuery, formData, (err, result) => {
    if (err) {
      console.error("Internal Server Error", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log("Result Fetched", result[0]);
      res.status(200).json(result[0]);
    }
  });
});

// Express route to handle getTotalStudents request
const getTotalStudents = asyncHand((req, res) => {
  const { branch_id, semester, division } = req.query;

  const query =
    "SELECT * FROM student WHERE branch_id = ? AND semester = ? AND division = ?";
  connection.query(query, [branch_id, semester, division], (error, results) => {
    if (error) {
      console.error("Error fetching total students:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(200).json(results); // Send back the count as JSON response
    }
  });
});

const getfacultydata = asyncHand((req, res) => {
  const formData = req.query.faculty_branch_id; // Use req.query for query parameters
  console.log("Request aayi : ", req.query);

  const mapQuery = "SELECT * FROM faculty WHERE faculty_branch_id = ?";

  connection.query(mapQuery, [formData], (error, results) => {
    if (error) {
      console.error("Error fetching faculty data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log("Faculty ke naam :", results);
      res.status(200).json(results);
    }
  });
});

const faculty_assigned_data = asyncHand((req, res) => {
  const formData = req.query.branch_id; // Use req.query for query parameters
  console.log("Branch ID : ", formData);

  const mapQuery =
    "Select * from faculty_subject_assigned as f JOIN branch as t2 ON f.branch=t2.branch_id JOIN division as t3 ON f.division = t3.div_id  JOIN subject_data as t4 ON f.sub_code=t4.subject_code JOIN faculty as t5 ON f.faculty_id=t5.faculty_id JOIN academic_year as t6 ON f.academic_year=t6.year Where f.branch=?;";

  connection.query(mapQuery, [formData], (error, results) => {
    if (error) {
      console.error("Error fetching faculty data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log("Assigned_Data :", results);
      res.status(200).json(results);
    }
  });
});

const editfacultysubject = asyncHand((req, res) => {
  const formData = req.query.faculty_branch_id; // Use req.query for query parameters
  console.log("Branch Aayi : ", formData);
  console.log("Query ", req.query);

  const mapQuery = "SELECT * FROM faculty WHERE faculty_branch_id = ?";
  connection.query(mapQuery, [formData], (error, results) => {
    if (error) {
      console.error("Error fetching faculty data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log("Assigned_Data :", results);
      res.status(200).json(results);
    }
  });
});

const getdivyeardata = asyncHand((req, res) => {
  const mapQuery =
    "select * from faculty_subject_assigned as t1 JOIN academic_year as t2 ON t1.academic_year=t2.year;";
  connection.query(mapQuery, (error, results) => {
    if (error) {
      console.error("Error fetching div_year data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log("DivYear_Data :", results);
      res.status(200).json(results);
    }
  });
});

const update_faculty_subject = asyncHand((req, res) => {
  const { faculty_id, academic_year } = req.body;
  const subjectId = req.params.subjectCode;
  const division = req.params.division;
  console.log("Subject Code:", subjectId); // Log subject code
  console.log("Params:", req.params);
  const mapQuery = `
    UPDATE faculty_subject_assigned SET faculty_id = ?, academic_year = ? WHERE sub_code = ? and division=?;
  `;

  connection.query(
    mapQuery,
    [faculty_id, academic_year, subjectId, division],
    (err, result) => {
      if (err) {
        console.error("Internal Server Error", err);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        console.log("Updation huva", result);
        res.status(200).json(result);
      }
    }
  );
});
const clearAssignedStudents = (req, res) => {
  const roomNumber = req.params.roomNumber; // Extract the room number from the request parameters
  const query = `DELETE FROM assigned_students WHERE room_number = ?`;

  connection.query(query, [roomNumber], (error, results) => {
    if (error) {
      console.error("Error clearing assigned students:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log(`Cleared assigned students for room ${roomNumber}`);
      res.status(200).json();
    }
  });
};

const getassignedsubjectdata = asyncHand((req, res) => {
  const mapQuery =
    " select * from faculty_subject_assigned as s1 JOIN subject_Data as s2 ON s1.sub_code=s2.subject_code JOIN Branch as s3  ON s1.branch=s3.branch_id JOIN division as s4 ON s1.division=s4.div_id where s1.faculty_id=200;";
  connection.query(mapQuery, (error, results) => {
    if (error) {
      console.error("Error fetching div_year data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log("DivYear_Data :", results);
      res.status(200).json(results);
    }
  });
});

const getClassroomData = asyncHand((req, res) => {
  const query = "SELECT * FROM classroom";

  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching classroom data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log("Classroom data:", results);
      res.status(200).json(results);
    }
  });
});

const createNewAssignment = asyncHand((req, res) => {
  // Assuming you receive the necessary data in the request body
  const {
    branch_id,
    division,
    semester,
    student_id,
    student_name,
    room_number,
    left_side,
    right_side,
  } = req.body;

  const query = `INSERT INTO assigned_students (branch_id, division, semester, student_id, student_name, room_number, left_side, right_side)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [
    branch_id,
    division,
    semester,
    student_id,
    student_name,
    room_number,
    left_side,
    right_side,
  ];

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error("Error creating new assignment:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log("New assignment created:", results);
      res.status(201).json({ message: "New assignment created successfully" });
    }
  });
});

const getAssignedStudents = asyncHand((req, res) => {
  const query = "SELECT * FROM assigned_students";

  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching assigned students:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log("Assigned students data:", results);
      res.status(200).json(results);
    }
  });
});

module.exports = {
  subjectMapping,
  getSemesterData,
  getSubjectsData,
  updateSubject,
  insertSubject,
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
};
