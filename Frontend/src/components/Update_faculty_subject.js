import React, { useState, Fragment,useEffect } from "react";
import "./UpdateFacultySubjectMapping.css";
import semesterdata from "./SubjectMapping.json";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";
import Edit_FacultyMapping from "./Edit_facultyMapping";
import ReadOnlyData from "./ReadOnlyData";
import axios from "axios";
function Update_faculty_subject() {

  const [branchid, setBranchid] = useState('');
  const [faculty_data, setFacultyData] = useState({});
  const [semesterOptions, setSemesterOptions] = useState([]);
  const [branch_data, setBranchdata] = useState([]);
  // const [subjectid, setSubjectid] = useState({
  //     semester_id: null,
  //     subject_id: null
  // });

  // const handlesem = (e) => {
  //   const selectedValue = e.target.value;
  //   const shouldDisplay = (selectedValue && true) || false;
  //   setState({
  //     shouldDisplay,
  //     selectedValue,
  //   });
  //   // const getsemesterId = e.target.value;
  //   // const getSubjectdata = semesterdata.find(
  //   //   (semester) => semester.semester_id === getsemesterId
  //   // ).subjects;
  //   // setSubject(getSubjectdata);
  //   // setSemesterid(getsemesterId);
  //   setEditFormData((prevData) => ({
  //     ...prevData,
  //     branch: e.target.value
  //   }));
    
  //   setBranchid(e.target.value);
   
  //   console.log("Selected branch : ",branchid);
  // };

const handlesem = (e) => {
  const selectedValue = e.target.value;

  // Assuming setState is a valid function
  setState({
    shouldDisplay: (selectedValue && true) || false,
    selectedValue,
  });

  setEditFormData((prevData) => ({
    ...prevData,
    branch: selectedValue, // Use selectedValue directly
  }));

  setBranchid(selectedValue); // Update branchid immediately

  console.log("Selected branch : ", selectedValue); // Use selectedValue here
};

useEffect(() => {
  // Now branchid is updated in the state
  console.log("Updated branchid in useEffect:", branchid);
}, [branchid]);

// ... rest of your component


  // const handlestate = (e) => {
  //     const subjectid = e.target.value;
  //     console.log(subjectid);
  //     setSubjectid(subjectid);
  // }

  // let { semester_id, subject_id } = subjectid;

  // const handleSubmit = (e) => {
  //     setInputarr([...inputarr, { semester_id, subject_id }])
  //     console.log('Data:', subjectid);
  //     console.log(inputarr);
  // }

  const [editSubjectId, setEditSubjectId] = useState(null);
  const [editSubjectNameId, setEditSubjectNameId] = useState(null);

  const [editFormData, setEditFormData] = useState({
    faculty_id: "",
    division: "",
    branch:'',
    academic_year: "",
  });

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    // setEditFormData(newFormData);
    // if(!newFormData[fieldName]){
    //   delete newFormData[fieldName];
    // }else{
  };

  useEffect(() => {
    const getBranchData = async () => {
        try {
            const res = await axios.get(
                `${process.env.REACT_APP_BASE_URL}/getbranchdata`
            );
            setBranchdata((prevData) => {
                console.log("Previous Branch Data:", prevData);
                console.log("New Branch Data:", res.data);
                return res.data;
            });
        } catch (error) {
            console.error("Error fetching branch data:", error.message);
        }
    };

    getBranchData();
}, []);


  const handleEditClick = (event, st) => {
    event.preventDefault();
    setEditSubjectId(st.subject_code);
    setEditSubjectNameId(st.subject_name);

    // const FormValue = {
    //     term_work: st.term_work,
    //     oral: st.oral,
    //     prac: st.prac,
    //     theory: st.theory,
    // }
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedSubject = {
      subject_id: editSubjectId,
      subject_name: editSubjectNameId,
      Faculty_Assigned: editFormData.Faculty_Assigned,
      Division: editFormData.Division,
      Branch: editFormData.Branch,
      Academic_year: editFormData.Academic_year,
    };

    // const newdata = [...subject];

    // const index = subject.findIndex((st) => st.subject_id === editSubjectId);

    // newdata[index] = editedSubject;
    // setSubject(newdata);
    // setEditSubjectId(null);
  };

  const handleCancelClick = () => {
    setEditSubjectId(null);
  };

  const [tableState, setState] = useState({
    shouldDisplay: false,
    selectedValue: "",
  });

  const handleSave = () => {
    alert("Data Saved");
  };

//   useEffect(() => {
//     const getSubjectData = async () => {
//         try {
//             const res = await axios.get(
//                 `${process.env.REACT_APP_BASE_URL}/getfaculty_assigned_data`,
//                 {
//                     params: {
//                        branch_id:branchid
//                     }
//                 }
//             );
//             // setSubjectOptions(res.data);
//             console.log("Subjects:", res.data);
//         } catch (error) {
//             console.error("Error fetching subject data:", error.message);
//         }
//     };
//     getSubjectData();
// }, [branchid.branch_id])
useEffect(() => {
    const getSubjectData = async () => {
        try {
            const res = await axios.get(
                `${process.env.REACT_APP_BASE_URL}/getfaculty_assigned_data`,
                {
                    params: {
                       branch_id: branchid
                    }
                }
            );
            console.log("Subjects:", res.data);
            // Set the fetched data to the state
            setFacultyData(res.data);
            console.log("Faculty ka data : ",faculty_data);
        } catch (error) {
            console.error("Error fetching subject data:", error.message);
        }
    };
    getSubjectData();
}, [branchid]); // Remove branchid.branch_id from the dependency array


  return (
    <div className="mainContent">

      <div className="mapping">
        <p className="font-weight-800">Update Faculty Subject Mapping</p>
        <div className="col-div1">
          <div className="s1">
            <span className="fontSizeSmall">Select Branch</span>

            <select
              name="semester"
              className="form-control"
              onChange={(e) => handlesem(e)}
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
            {/* <span className="fontSizeSmall">Select Subject</span>
                        <select name='subjects' className='form-control' onChange={(e) => handlestate(e)}>
                            <option value="">--Select Subject--</option>
                            {
                                subject.map((getsubject, index) => (
                                    <option value={getsubject.subject_id} key={index}>{getsubject.subject_name}</option>
                                ))
                            }


                        </select> */}
          </div>

          {/* <button
                        className='btn btn-primary btn-sm mt-2'
                        onClick={handleSubmit}>
                        Submit
                    </button> */}
        </div>
      </div>

      {tableState.shouldDisplay && (
        <div className="tableContent">
          {/* <button className="edit">Edit</button> */}
          <form onSubmit={handleEditFormSubmit}>
            <table>
              <thead>
                <tr>
                  <th>Subject Name</th>
                  <th>Subject Code</th>
                  <th>Faculty Assigned</th>
                  <th>Division</th>
                  <th>Academic Year</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
              {Array.isArray(faculty_data) && faculty_data.map((st) => (
    <Fragment key={st.subject_code}>
        {editSubjectId === st.subject_code? (
            <Edit_FacultyMapping editFormData={editFormData} branchId={branchid} handleCancelClick={handleCancelClick} st={st} />
        ) : (
            <ReadOnlyData subject={st} selectedSubject={branchid} handleEditClick={handleEditClick}/>
        )}
    </Fragment>
))}
              
                {/* <tr>
                  <td>EM 1</td>
                  <td>EM001</td>
                  <td>SMITA NAMBOODRI</td>
                  <td>A</td>
                  <td>Computer Engg</td>
                  <td>A.Y.2023-24</td>
                  <td><button className="btn btn-primary">Edit</button></td>
                </tr> */}
              </tbody>
            </table>
          </form>
        </div>
      )}
      {/* <button className="save btn" onClick={handleSave}>Save</button> */}
    </div>
  );
}

export default Update_faculty_subject;