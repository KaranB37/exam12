import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const Faculty_Subj_Mapping = () => {
  const [BranchID, setBranchID] = useState({
    faculty_branch_id: "",
  });
  const [div_yearData, setDivYearData] = useState([]);
  const [branch_data, setBranchdata] = useState([]);
  const [faculty_data, setFacultydata] = useState([]);
  const [subjectOptions, setSubjectOptions] = useState([]);
  const [semesterOptions, setSemesterOptions] = useState([]);
  const [acad_year, setAcadYear] = useState([]);
  const [faculty_subject_mapped, setFacultySubjectMapped] = useState({
    branch: "",
    faculty_id: "",
    semester: "",
    sub_code: "",
    division: "",
    academic_year: "",
  });

  const [formData, setFormData] = useState({
    semester: "",
    subject_name: "",
  });

  useEffect(() => {
    const getSemesterData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/getSemesterData`
        );
        setSemesterOptions(res.data);
        console.log("Semester Data : ", res.data);
      } catch (error) {
        console.error("Error fetching semester data:", error.message);
      }
    };
    getSemesterData();

    const getAcademicYear = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/getacademic_year`
        );
        setAcadYear(res.data);
        console.log("Academic Year : ", res.data);
      } catch (error) {
        console.error("Error fetching academic year data:", error.message);
      }
    };
    getAcademicYear();
  }, []);

  useEffect(() => {
    const getBranchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/getbranchdata`
        );
        setBranchdata(res.data);
        console.log("Branch Data: ", branch_data);
      } catch (error) {
        console.error("Error fetching branch data:", error.message);
      }
    };

    getBranchData();
  }, []);

  const handleInputChange = async (e) => {
    const { value } = e.target;
    setBranchID((prevFormData) => ({
      ...prevFormData,
      faculty_branch_id: value,
    }));
    setFacultySubjectMapped((prevFormData) => ({
      ...prevFormData,
      branch: value,
    }));
    console.log("Selected Branch: ", value);

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/getfacultydata/${value}`,
        {
          params: {
            faculty_branch_id: value,
          },
        }
      );
      setFacultydata(res.data);
      console.log("Faculty Data: ", res.data);
    } catch (error) {
      console.error("Error fetching faculty data:", error.message);
    }
  };

  // const handleSemester = (e) => {
  //     const { value } = e.target;
  //     setFormData((prevFormData) => ({ ...prevFormData, semester: value }));
  //     // console.log("sem ka naam : ",e.target.value);
  //     setFacultySubjectMapped((prevFormData) => ({ ...prevFormData, semester: value }));
  //     console.log("Selected semester : ", faculty_subject_mapped.semester);

  //     const getSubjectData = async () => {
  //         try {
  //             const res = await axios.get(
  //                 `${process.env.REACT_APP_BASE_URL}/getSubjectData`,
  //                 {
  //                     params: {
  //                         semester: value
  //                     }
  //                 }
  //             );
  //             setSubjectOptions(res.data);
  //             console.log("Subjects:", res.data);
  //         } catch (error) {
  //             console.error("Error fetching subject data:", error.message);
  //         }
  //     };
  //     getSubjectData();
  // };

  // ...

  const handleSemester = (e) => {
    const { value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, semester: value }));
    setFacultySubjectMapped((prevFormData) => ({
      ...prevFormData,
      semester: value,
    }));

    // Pass BranchID as a parameter to getSubjectData
    const getSubjectData = async (branchId) => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/getFacultySubjectsData`,
          {
            params: {
              semester: value,
              branch_id: branchId, // Pass BranchID as a parameter
            },
          }
        );
        setSubjectOptions(res.data);
        console.log("Subjects:", res.data);
      } catch (error) {
        console.error("Error fetching subject data:", error.message);
      }

      const getdiv_yeardata = async () => {
        try {
          const res = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/div_yeardata`
          );
          setDivYearData(res.data);
          console.log("Years : ", res.data);
        } catch (error) {
          console.error("Error fetching branch data:", error.message);
        }
      };
    };

    // Call getSubjectData and pass BranchID
    getSubjectData(BranchID.faculty_branch_id);
  };

  // ...

  const handleSubmitData = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/assigned_subject`,
        faculty_subject_mapped
      );
      console.log("Assigned Data", faculty_subject_mapped);
    } catch (error) {
      console.error("Error assigning subject data:", error.message);
    }
  };

  // ...

  // const handleSubmitData = (event) => {
  //     event.preventDefault();
  //     try {
  //         const res = axios.post(
  //             `${process.env.REACT_APP_BASE_URL}/assigned_subject`,
  //             faculty_subject_mapped
  //         );
  //         console.log("Assigned Data", faculty_subject_mapped);
  //     } catch (error) {
  //         console.error("Error assigning subject data:", error.message);
  //     }
  // };

  return (
    <>
      <form className="mainContent" onSubmit={handleSubmitData}>
        <div className="mapping">
          <p className="font-weight-800">Faculty Subject Mapping</p>
          <div className="col-div">
            <div className="s1">
              <span className="fontSizeSmall">Select Branch</span>
              <select
                className="select"
                name="form-control"
                id="branch"
                onChange={(e) => handleInputChange(e)}
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
              <span className="fontSizeSmall">Select Faculty</span>
              <select
                className="select"
                name="form-control"
                id="branch"
                onChange={(e) =>
                  setFacultySubjectMapped((prevData) => ({
                    ...prevData,
                    faculty_id: e.target.value,
                  }))
                }
              >
                <option value={""}>Select Faculty</option>
                {faculty_data.map((faculty_data, i) => (
                  <option key={i} value={faculty_data.faculty_id}>
                    {faculty_data.faculty_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="s1">
              <span className="fontSizeSmall">Select Semester</span>
              <select
                name="semester"
                className="form-control"
                onChange={handleSemester}
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
              <span className="fontSizeSmall">Select Subject</span>
              <select
                name="subjects"
                className="form-control"
                onChange={(e) =>
                  setFacultySubjectMapped((prevData) => ({
                    ...prevData,
                    sub_code: e.target.value,
                  }))
                }
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
                name="subjects"
                className="form-control"
                onChange={(e) =>
                  setFacultySubjectMapped((prevData) => ({
                    ...prevData,
                    division: e.target.value,
                  }))
                }
              >
                <option value="">--Select Div--</option>
                <option value={1}>A</option>
                <option value={2}>B</option>
              </select>
            </div>

            <div className="s1">
              <span className="fontSizeSmall">Academic Year</span>
              <select
                className="select"
                name="ac-yr"
                id="ac-yr"
                onChange={(e) =>
                  setFacultySubjectMapped((prevData) => ({
                    ...prevData,
                    academic_year: e.target.value,
                  }))
                }
              >
                <option value={""}>select Year</option>
                {acad_year.map((acad_year, index) => (
                  <option key={index} value={acad_year.year}>
                    {acad_year.year}
                  </option>
                ))}
              </select>
            </div>

            <div className="s1">
              <button type="submit" className="btn">
                Assign
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Faculty_Subj_Mapping;
