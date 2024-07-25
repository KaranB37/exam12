import React, { useState, useEffect, Fragment } from 'react';
import './SubjectMapping'
import semesterdata from './SubjectMapping.json';
import ReadOnlyRow from './ReadOnlyRow';
import EditableRow from './EditableRow';

import axios from 'axios';

function SubjectMapping() {
    // const [inputarr, setInputarr] = useState([])

    const [semesterid, setSemesterid] = useState('');
    const [subject, setSubject] = useState('');
    const [semesterOptions, setSemesterOptions] = useState([]);
    const [subjectOptions, setSubjectOptions] = useState([]);

    // const [subjectid, setSubjectid] = useState({
    //     semester_id: null,
    //     subject_id: null
    // });
    const [formData, setFormData] = useState({
        semester: "",
        subject_name: "",
    });

    // const handlesem = (e) => {
    //     const selectedValue = e.target.value;
    //     const shouldDisplay = (selectedValue && true) || false;
    //     setState({
    //         shouldDisplay,
    //         selectedValue
    //     })
    //     const getsemesterId = e.target.value;
    //     const getSubjectdata = semesterdata.find(semester => semester.semester_id === getsemesterId).subjects;
    //     setSubject(getSubjectdata);
    //     setSemesterid(getsemesterId);
    //     console.log(getsemesterId);
    // }

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
        subject_id:"",
        term_work: "",
        oral: "",
        practical: "",
        theory: "",
    })

    
    const handleEditFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...editFormData };
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);
        // if(!newFormData[fieldName]){
        //   delete newFormData[fieldName];
        // }else{
    }

    const handleSave = async () => {
        // try {
        //   // Assuming editSubjectId holds the ID of the subject being edited
        //   const response = await axios.post(
        //     `${process.env.REACT_APP_BASE_URL}/updateSubject/${editSubjectId}`,
        //     editFormData
        //   );
    
        //   if (response.status === 200) {
        //     console.log('Subject updated successfully');
        //     // Additional logic if needed
        //   } else {
        //     console.error('Failed to update subject');
        //   }
        // } catch (error) {
        //   console.error('Error updating subject:', error);
        // }
      };

    const handleEditClick = (event, st) => {
        event.preventDefault();
        setEditSubjectId((prevSubjectId) => {
            console.log("Previous Subject ID:", prevSubjectId);
            return st.subject_id;
        });
        setEditSubjectNameId(st.subject_name);
    };

    useEffect(() => {
        console.log("Updated Subject ID:", editSubjectId);
    }, [editSubjectId]);

    // const handleEditFormSubmit = (event) => {
    //     event.preventDefault();

    //     const editedSubject = {
    //         subject_id: editSubjectId,
    //         subject_name: editSubjectNameId,
    //         term_work: editFormData.term_work,
    //         oral: editFormData.oral,
    //         prac: editFormData.prac,
    //         theory: editFormData.theory,
    //     }

    //     const newdata = [...subject];

    //     const index = subject.findIndex((st) => st.subject_id === editSubjectId);

    //     newdata[index] = editedSubject;
    //     setSubject(newdata);
    //     setEditSubjectId(null);
    // };

    const handleCancelClick = () => {
        setEditSubjectId(null);
    };

    const [tableState, setState] = useState({
        shouldDisplay: false,
        selectedValue: ""
    });

 


    useEffect(() => {
        console.log(process.env.REACT_APP_BASE_URL)
        const getSemesterData = async () => {
            try {
                const res = await axios.get(
                    `${process.env.REACT_APP_BASE_URL}/getSemesterData`

                );
                setSemesterOptions(res.data);
                setState({ shouldDisplay: true });
                console.log("Semester Data : ", res.data); // Assuming the response is an array of semesters
            } catch (error) {
                console.error("Error fetching semester data:", error.message);
            }
        };
        getSemesterData();

    }, []);

    const UpdatedData=()=>{
        useEffect(() => {
            try {
                const res = axios.get(
                    `${process.env.REACT_APP_BASE_URL}/getSubjectData`
    
                );
                setSubjectOptions(res.data);
                setState({ shouldDisplay: true });
                console.log("Semester Data : ", res.data); // Assuming the response is an array of semesters
            } catch (error) {
                console.error("Error fetching semester data:", error.message);
            }
        
        }, [handleEditClick])
        UpdatedData();
        

    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
        console.log("Selected semester : ", e.target.value);
        // setFormData({semester:e.target.value});
        console.log(formData);
        // getSubjectsData();
    };

    useEffect(() => {
        const getSubjectData = async () => {
            try {
                const res = await axios.get(
                    `${process.env.REACT_APP_BASE_URL}/getSubjectData`,
                    {
                        params: {
                            semester: formData.semester,
                        }
                    }
                );
                setSubjectOptions(res.data);
                console.log("Subjects:", res.data);
            } catch (error) {
                console.error("Error fetching subject data:", error.message);
            }
        };
        getSubjectData();
    }, [formData.semester])

    return (
        <div className="mainContent">
            <div className="mapping">
                <p className="font-weight-800">Subject Mapping</p>
                <div className="col-div1">
                    <div className="s1">
                        <span className="fontSizeSmall">Select Semester</span>

                        <select name='semester' className='form-control' onChange={handleInputChange}>
                            <option value="">--Select Semester--</option>
                            {/* {
                                
                                semesterOptions.map((index)=>{
                                    <option key={index} value={index.semester}>{index.semester}</option>
                                })

                            } */}
                            {semesterOptions.map((semester) => (
                                <option key={semester.ID} value={semester.semester}>
                                    {semester.semester}
                                </option>
                            ))}
                        </select>

                    </div>

                    <div className="s1">
                        <span className="fontSizeSmall">Select Subject</span>
                        <select name='subjects' className='form-control' onChange={(e) => { setSubject(e.target.value) }}>
                            <option value="">--Select Subject--</option>
                            {
                                subjectOptions.map((getsubject, index) => (
                                    <option value={getsubject.subject_id} key={index}>{getsubject.subject_name}</option>
                                ))
                            }


                        </select>
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
                    <form>
                        <table>
                            <thead>
                                <tr>
                                    <th>Subject Name</th>
                                    <th>Subject Code</th>
                                    <th>Term Work</th>
                                    <th>Oral</th>
                                    <th>Practical</th>
                                    <th>Theory</th>
                                    <th>Action</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* {
                                subjectOptions.map((index)=>{
                                    <Fragment></Fragment>
                                editSubjectId!=null?( <EditableRow editFormData={editFormData} index={index} handleCancelClick={handleCancelClick} handleEditFormChange={handleEditFormChange}/> ):(
                                subjectOptions.length>0 ? (
                                    subjectOptions
                                    .filter((sub)=>{
                                        if(subject.trim()=='') {
                                            return true;
                                        }
                                        else {
                                            return sub.subject_name.toString().includes(subject.trim());
                                        }
                                    })
                                    .map((item,i)=>{
                                        const{
                                        subject_name,
                                        subject_code,
                                        term_work,
                                        oral,
                                        practical,
                                        theory,
                                        subject_id
                                        }=item;

                                       return (
                                        <tr key={i}>
                                            <td>{subject_name}</td>
                                            <td>{subject_code}</td>
                                            <td>{term_work}</td>

                                            <td>{oral}</td>
                                            <td>{practical}</td>
                                            <td>{theory}</td> 
                                           
                                            <td><button className='btn btn-primary' onClick={(event)=>handleEditClick(event,item)}>Edit</button></td>
                                        </tr>
                                       )
                                    })
                                   ) :(
                                    <tr>
                                    <td colSpan="8">No data available</td>
                                  </tr>
                                   )
                                ) 
                            }) } */}
                                {subjectOptions.map((st) => (
                                    <Fragment key={st.subject_id}>
                                        {editSubjectId === st.subject_id ? (
                                            <EditableRow
                                                editFormData={editFormData}
                                                handleEditFormChange={handleEditFormChange}
                                                handleCancelClick={handleCancelClick}
                                                st={st}
                                               
                                            />
                                        ) : (
                                            <ReadOnlyRow
                                                key={st.subject_id}
                                                subject={st}
                                                selectedSubject={subject}  // Pass the selected subject
                                                handleEditClick={handleEditClick}
                                            />


                                        )}
                                    </Fragment>
                                ))}



                            </tbody>
                        </table>
                    </form>
                </div>
            )}
            <button className="save btn" onClick={handleSave}>Save</button>
        </div>

    )
};


export default SubjectMapping;