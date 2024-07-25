import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';

const Edit_FacultyMapping= ({st,editFormData,branchId, handleCancelClick}) => {

    const [branchid, setBranchid] = useState();
  const [faculty_data, setFacultyData] = useState([]);
  const [semesterOptions, setSemesterOptions] = useState('');
  const [div_yearData, setDivYearData] = useState([]);
  const [facultyId, setFacultyId] = useState('');
  const [division, setDivision] = useState('');
  const [academicYear, setAcademicYear] = useState('');
  const [formData, setFormData] = useState({
    faculty_id: '',
    academic_year: '',
  });
//  setBranchid(branchId);
console.log("Branch ID: ",branchId);
console.log("Subject COde",st.subject_code);
  useEffect(() => {
    const getfacultydata = async () => {
        try {
            const res = await axios.get(
                `${process.env.REACT_APP_BASE_URL}/edit_assigned_faculty`,
                {params:{
                    faculty_branch_id: branchId
                }}
            );
            setFacultyData(res.data);
            console.log(res.data);
            console.log("Branch Data: ", branchId);
            console.log("mai aaya bhai: ",faculty_data);
        } catch (error) {
            console.error("Error fetching branch data:", error.message);
        }
    };

    getfacultydata();

    const getdiv_yeardata = async () => {
        try {
            const res = await axios.get(
                `${process.env.REACT_APP_BASE_URL}/div_yeardata`
               
            );
            setDivYearData(res.data);
            console.log("Years : ",res.data);
          
        } catch (error) {
            console.error("Error fetching branch data:", error.message);
        }
    };

    getdiv_yeardata();


    
}, [branchId]);


const handleEditFormChange = (e) => {
  console.log("Event:", e);
  const { name, value } = e.target;
  console.log(`Updating state for ${name}: ${value}`);
  setFormData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};


const handleSaveData = async (event) => {
    const dataToBeSent = {
      faculty_id: formData.faculty_id,
      academic_year: formData.academic_year,
      };
    console.log("Data to be sent:", dataToBeSent);

    event.preventDefault();
  
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/updatefaculty_subjectmapping/${st.subject_code}/${st.div_id}`,  // Correct parameter placement
        formData
      );
  
      if (response.status === 200) {
        console.log('Subject updated successfully');
        handleCancelClick();
      } else {
        console.error('Failed to update subject');
      }
    } catch (error) {
      console.error('Error updating subject:', error);
    }
  };
  

    return (
        <tr>
            <td>{st.subject_name}</td>
            <td>{st.subject_code}</td>
            <td> 
                <select name='faculty_id'  onChange={handleEditFormChange} >
                    <option value="" >--Select Faculty--</option>
                    {faculty_data.map((faculty,i)=>(
                        <option key={i} value={faculty.faculty_id}>{faculty.faculty_name}</option>
                    ))}
                </select> 
            </td>
            {/* <td> 
                <select name='division'  onChange={handleEditFormChange}>
                    <option value="">--Select Div--</option>
                    {div_yearData.map((div,i)=>(
                        <option key={i} value={div.div_id}>{div.division}</option>
                    ))}
                </select> 
            </td> */}
            <td>{st.division}</td>
            
            <td> 
                <select name='academic_year'  onChange={handleEditFormChange}>
                    <option value="">--Select Year--</option>
                    {div_yearData.map((div,i)=>(
                        <option key={i} value={div.year}>{div.year}</option>
                    ))}
                </select> 
            </td>
            {/* <td> <input type='text' required placeholder='25' value={editFormData.oral} onChange={handleEditFormChange} name='oral' /> </td>
            <td> <input type='text' required placeholder='25' value={editFormData.prac} onChange={handleEditFormChange} name='prac' /> </td>
            <td> <input type='text' required placeholder='80' value={editFormData.theory} onChange={handleEditFormChange} name='theory' /> </td> */}
            <td><button type='submit' className='edit'onClick={handleSaveData}>Save</button>
            <button type='button' className='editcancel' onClick={handleCancelClick}>Cancel</button></td>
        </tr>
    )
}

export default Edit_FacultyMapping;