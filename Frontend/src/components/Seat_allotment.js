import React from "react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import {
  createNewAssignment,
  getAssignedStudents,
  getBranchData,
  getClassroomData,
  getSemesterData,
  getSubjectsData,
  getTotalStudents,
  clearAssignedStudents,
  getRoomSides,
  getFinalAssignBench,
} from "../Actions/SeatAllotmentActions";

const Seat_allotment = () => {
  const [branch_data, setBranchdata] = useState([]);
  const [subjectOptions, setSubjectOptions] = useState([]);
  const [semesterOptions, setSemesterOptions] = useState([]);
  const [classroomData, setClassroomData] = useState([]);
  const [assignedData, setAssignedData] = useState([]);

  const [block, setBlock] = useState({
    date: new Date(),
    semester: "",
    branch: "",
    division: "",
    class: "",
    assignSide: "",
    capacity: "",
  });
  const [totalStudents, setTotalStudents] = useState(0);
  const [selectedCapacity, setSelectedCapacity] = useState(0);
  const [studentData, setStudentData] = useState();
  const boxIndices = [...Array(parseInt(selectedCapacity))].map((_, index) => {
    return {};
  });

  const [assignBenchData, setAssignBenchData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const classNumber = block.class;
        const data = await getFinalAssignBench(classNumber);
        setAssignBenchData(data);
        console.log("Bench Data", data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [block.class]);

  const blockChange = (name, value) => {
    if (name === "class") {
      const selectedClassroom = classroomData.find(
        (classroom) => classroom.room_number === value
      );

      if (selectedClassroom) {
        setSelectedCapacity(parseInt(selectedClassroom.capacity));
        setBlock({
          ...block,
          [name]: value,
          capacity: parseInt(selectedClassroom.capacity),
        });
      } else {
        setSelectedCapacity(0);
        setBlock({
          ...block,
          [name]: value,
          capacity: 0,
        });
      }
    } else {
      setBlock({
        ...block,
        [name]: value,
      });
    }
    console.log(block);
  };

  const getAllData = async () => {
    const classroomData = await getClassroomData();
    setClassroomData(classroomData);
    const semesterData = await getSemesterData();
    setSemesterOptions(semesterData);
    const branchData = await getBranchData();
    setBranchdata(branchData);
    const subjectsData = await getSubjectsData();
    setSubjectOptions(subjectsData);
    if (!(block.branch == "" || block.semester == "" || block.division == "")) {
      const totalStudents = await getTotalStudents(
        block.branch,
        block.semester,
        block.division
      );
      console.log(totalStudents);
      setStudentData(totalStudents);
      setTotalStudents(totalStudents.length);
    }
  };

  useEffect(() => {
    getAllData();
  }, [block]);

  const clearClass = async (roomNumber) => {
    try {
      await clearAssignedStudents(roomNumber);
      console.log(`Assigned students cleared for room ${roomNumber}`);
      const assignedData = await getAssignedStudents();
      setAssignedData(assignedData);
      toast.success(`Class ${roomNumber} cleared successfully`);
      const updatedAssignBenchData = await getFinalAssignBench(roomNumber);
      setAssignBenchData(updatedAssignBenchData);
    } catch (error) {
      console.error("Error clearing assigned students:", error.message);
    }
  };

  const handleSubmitData = async (event) => {
    event.preventDefault();

    try {
      const pdf = new jsPDF();

      // Add content to the PDF
      const headerText = "VPP College of Engineering (Information Technology)";
      const dateText = `Date: ${new Date().toLocaleDateString()}`;
      const roomText = `Room No: ${block.class}`;
      const examText = `Exam: ${block.exam}`; // Include the selected exam

      pdf.text(headerText, 20, 10);
      pdf.text(dateText, 20, 20);
      pdf.text(roomText, 20, 30);
      pdf.text(examText, 120, 20);
      pdf.text("Assigned Data:", 20, 40);

      let x = 20;
      let y = 50;
      const columnWidth = 80;
      const rowHeight = 15;
      const totalColumnWidth = block.capacity * 2 * 80;

      const leftSideData = assignBenchData.filter(
        (assignment) => assignment.left_side === 1
      );
      const rightSideData = assignBenchData.filter(
        (assignment) => assignment.right_side === 1
      );

      const renderBenchData = (leftData, rightData) => {
        const maxItems = Math.max(leftData.length, rightData.length);

        for (let index = 0; index < maxItems; index++) {
          const leftAssignment = leftData[index];
          const rightAssignment = rightData[index] || {};

          const leftText = leftAssignment
            ? `(${leftAssignment.student_id}) Bench: ${index + 1} (Left)`
            : "";
          const rightText = rightAssignment.student_id
            ? `(${rightAssignment.student_id}) Bench: ${index + 1} (Right)`
            : "";

          if (y + rowHeight > pdf.internal.pageSize.height - 10) {
            pdf.addPage();

            x = 20;
            y = 30;

            pdf.text(headerText, 20, 10);
            pdf.text(dateText, 20, 20);
            pdf.text(roomText, 20, 30);
            pdf.text("Assigned Data (Contd.):", 20, 40);
          }

          if (leftAssignment) {
            pdf.text(leftText, x + 5, y + 5);
            pdf.rect(x, y, columnWidth, rowHeight);
          }

          if (rightAssignment.student_id) {
            pdf.text(rightText, x + columnWidth + 5, y + 5);
            pdf.rect(x + columnWidth, y, columnWidth, rowHeight);
          }

          y += rowHeight;

          if ((index + 1) % block.capacity === 0) {
            x += 2 * columnWidth;
            y = 30;
          }
        }
      };

      renderBenchData(leftSideData, rightSideData);

      pdf.save("seat_allotment.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error.message);
    }
  };

  const handleAssign = async () => {
    const nonDuplicateStudents = [];
    const assignedNames = [];
    let duplicateCounter = 0;
    if (block.branch === "") {
      toast.error("Branch is missing.");
    } else if (block.semester === "") {
      toast.error("Semester is missing.");
    } else if (block.division === "") {
      toast.error("Division is missing.");
    } else if (block.class === "") {
      toast.error("Classroom is missing.");
    } else if (block.assignSide === "") {
      toast.error("Select Side .");
    } else {
      console.log(block.class);
      const roomSides = await getRoomSides(block.class);
      console.log(roomSides);
      for (const student of studentData) {
        const roomSidesBeforeAssignment = await getRoomSides(block.class);

        const roomSides = await getRoomSides(block.class);

        const totalCapacity = block.capacity * 2;

        const isClassFull =
          roomSides.total_left + roomSides.total_right === totalCapacity;

        const isClassFullBefore =
          roomSidesBeforeAssignment.total_left +
            roomSidesBeforeAssignment.total_right ===
          totalCapacity;

        if (isClassFullBefore) {
          toast.error("The classroom is full.");
          return;
        }

        if (
          block.assignSide === "left" &&
          roomSidesBeforeAssignment.total_left === block.capacity
        ) {
          toast.error("Left side is full.");
          return;
        }

        if (
          block.assignSide === "right" &&
          roomSidesBeforeAssignment.total_right === block.capacity
        ) {
          toast.error("Right side is full.");
          return;
        }

        const isAssigned = assignedData.some(
          (assignedStudent) => assignedStudent.student_id === student.student_id
        );
        if (!isAssigned) {
          nonDuplicateStudents.push(student);
          assignedNames.push(student.student_name);
          const assignmentData = {
            branch_id: block.branch,
            division: block.division,
            semester: block.semester,
            student_id: student.student_id,
            student_name: student.student_name,
            room_number: block.class,
            left_side: block.assignSide === "left" ? 1 : 0,
            right_side: block.assignSide === "right" ? 1 : 0,
          };

          try {
            await createNewAssignment(assignmentData);
            console.log("New assignment created successfully!");

            setAssignedData((prevAssignedData) => [
              ...prevAssignedData,
              assignmentData,
            ]);
            const updatedAssignBenchData = await getFinalAssignBench(
              block.class
            );
            setAssignBenchData(updatedAssignBenchData);
          } catch (error) {
            console.error("Error creating new assignment:", error.message);
          }

          const roomSidesAfterAssignment = await getRoomSides(block.class);
          const isClassFullAfter =
            roomSidesAfterAssignment.total_left +
              roomSidesAfterAssignment.total_right ===
            totalCapacity;

          if (isClassFullAfter) {
            if (assignedNames.length > 0) {
              toast.success(`Students assigned: ${assignedNames.join(", ")}`);
            }
            toast.error("The classroom is full.");
            return;
          }
          if (
            block.assignSide === "left" &&
            roomSidesAfterAssignment.total_left === block.capacity
          ) {
            if (assignedNames.length > 0) {
              toast.success(`Students assigned: ${assignedNames.join(", ")}`);
            }
            toast.error("Left side is full.");
            return;
          }
          if (
            block.assignSide === "right" &&
            roomSidesAfterAssignment.total_right === block.capacity
          ) {
            if (assignedNames.length > 0) {
              toast.success(`Students assigned: ${assignedNames.join(", ")}`);
            }
            toast.error("Right side is full.");
            return;
          }
        } else {
          duplicateCounter++;
        }
      }
      if (duplicateCounter > 0) {
        const duplicateNames = [];
        for (const student of studentData) {
          const isDuplicate = assignedData.some(
            (assignedStudent) =>
              assignedStudent.student_id === student.student_id &&
              !duplicateNames.includes(student.student_name)
          );
          if (isDuplicate) {
            duplicateNames.push(student.student_name);
          }
        }
        toast.error(`Duplicates Found: ${duplicateNames.join(", ")}`);
      }
      console.log("AssignedData", assignedData);
      console.log("Number of Non-Duplicates:", nonDuplicateStudents.length);
      console.log("Number of Duplicates:", duplicateCounter);
      console.log(assignBenchData);
      if (assignedNames.length > 0) {
        toast.success(`Students assigned: ${assignedNames.join(", ")}`);
      }
    }
  };

  return (
    <div className="mainContent">
      <div className="mapping">
        <p className="font-weight-800">Student-Seat Mapping</p>
        <div className="col-div">
          <div className="s1">
            <span className="fontSizeSmall">Select Date</span>
            <input
              type="date"
              name="date"
              className="select"
              style={{ padding: "18px" }}
              onChange={(e) => blockChange(e.target.name, e.target.value)}
            />
          </div>
          <div className="s1">
            <span className="fontSizeSmall">Select Classroom</span>
            <select
              className="select"
              name="class"
              id="branch"
              onChange={(e) => blockChange(e.target.name, e.target.value)}
            >
              <option value="">Select Classroom</option>
              {classroomData.map((classroom, i) => (
                <option key={i} value={classroom.room_number}>
                  {classroom.room_number} (Capacity: {classroom.capacity})
                </option>
              ))}
            </select>
          </div>

          <div className="s1">
            <span className="fontSizeSmall">Select Semester</span>
            <select
              name="semester"
              className="form-control"
              onChange={(e) => blockChange(e.target.name, e.target.value)}
            >
              <option value="">--Select Semester--</option>
              {semesterOptions.map((semester) => (
                <option key={semester.ID} value={semester.semester}>
                  {semester.semester}
                </option>
              ))}
            </select>
          </div>

          <div className="s1">
            <span className="fontSizeSmall">Select Branch</span>
            <select
              className="select"
              name="branch"
              id="branch"
              onChange={(e) => blockChange(e.target.name, e.target.value)}
            >
              <option value="">Select Branch</option>
              {branch_data.map((branch) => (
                <option key={branch.branch_id} value={branch.branch_id}>
                  {branch.branch_name}
                </option>
              ))}
            </select>
          </div>
          <div className="s1">
            <span className="fontSizeSmall">Select Exam</span>
            <select
              className="select"
              name="exam"
              id="ac-yr"
              onChange={(e) => blockChange(e.target.name, e.target.value)}
            >
              <option value={""}>Select Exam</option>
              <option value={"PT1"}>PT1</option>
              <option value={"PT2"}>PT2</option>
              <option value={"Final"}>Final</option>
            </select>
          </div>

          <div className="s1">
            <span className="fontSizeSmall">Select Subject</span>
            <select
              name="subjects"
              className="form-control"
              onChange={(e) => blockChange(e.target.name, e.target.value)}
            >
              <option value="">--Select Subject--</option>
              {subjectOptions.map((getsubject, index) => (
                <option value={getsubject.subject_code} key={index}>
                  {getsubject.subject_name}
                </option>
              ))}
            </select>
          </div>

          <div className="s1">
            <span className="fontSizeSmall">Division</span>
            <select
              name="division"
              className="form-control"
              onChange={(e) => blockChange(e.target.name, e.target.value)}
            >
              <option value="">--Select Div--</option>
              <option value={1}>A</option>
              <option value={2}>B</option>
            </select>
          </div>
          <div className="s1">
            <span className="fontSizeSmall">Total Students</span>
            <input
              className="select"
              type="text"
              value={totalStudents}
              readOnly
            />
          </div>

          <div className="s1">
            <span>Assign to Side:</span>
            <select
              name="assignSide"
              onChange={(e) => blockChange(e.target.name, e.target.value)}
            >
              <option value="">Select Side</option>
              <option value={"left"}>Left</option>
              <option value={"right"}>Right</option>
            </select>
          </div>

          <div className="s1">
            <button type="button" className="btn" onClick={handleAssign}>
              Assign All Students
            </button>
          </div>

          <div className="s1">
            <button type="submit" className="btn" onClick={handleSubmitData}>
              Generate
            </button>
          </div>
          <div className="s1">
            <button
              type="button"
              className="btn"
              onClick={() => clearClass(block.class)}
            >
              Clear Class
            </button>
          </div>
        </div>
      </div>
      <div className="grid-container">
        {Array.from({ length: block.capacity }, (_, index) => {
          const leftStudents = assignBenchData
            ? assignBenchData.filter((student) => student.left_side === 1)
            : [];

          const rightStudents = assignBenchData
            ? assignBenchData.filter((student) => student.right_side === 1)
            : [];

          const leftStudent = leftStudents[index] || {};
          const rightStudent = rightStudents[index] || {};

          return (
            <div key={index} className="box">
              <div className="left-side">
                {leftStudent.student_id && (
                  <div className="student-info" key={leftStudent.student_id}>
                    <p>
                      {leftStudent.student_name} {leftStudent.student_id}
                    </p>
                    <span>Left</span>
                  </div>
                )}
              </div>
              <div className="line"></div>
              <div className="right-side">
                {rightStudent.student_id && (
                  <div className="student-info" key={rightStudent.student_id}>
                    <p>
                      {rightStudent.student_name} {rightStudent.student_id}
                    </p>
                    <span>Right</span>
                  </div>
                )}
              </div>
              <div className="box-number">Bench: {index + 1}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Seat_allotment;
