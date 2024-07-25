import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
const Students_Marks_Entry = () => {

    const [faculty_data, setFacultyData] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState(null);
     const [showtable, setshowtable] = useState(false);

    useEffect(() => {
        const getBranchData = async () => {
            try {
                const res = await axios.get(
                    `${process.env.REACT_APP_BASE_URL}/getassignedsubjectdata`
                );
                // setFacultyData((prevData) => {
                //     console.log("Previous Branch Data:", prevData);
                //     console.log("New Branch Data:", res.data);
                //     return res.data;
                // });
                console.log("Assigned Subjects : ", res.data);
                setFacultyData(res.data);

            } catch (error) {
                console.error("Error fetching branch data:", error.message);
            }
        };

        getBranchData();
    }, []);

    const handleEnterMarks = (subject) => {
        // Handle the logic to store the selected subject in a new state
        setSelectedSubject(subject);
        console.log('Selected Subject:', subject);
        setshowtable(true);
      };

    return (
        <>
            <div>
                <div className="mapping" style={{ margin: '10px' }}>
                    <p className="font-weight-800">Faculty Subject Mapping</p>
                </div>
                {faculty_data.map((data, index) => (

                    <div key={index} className="card" style={{ width: '300px', margin: '15px' }}>

                        <div className="card-body">
                            <h5 className="card-title" value={data.subject_code}>{data.subject_name}</h5>
                            <h6 className="card-subtitle mb-2 text-body-secondary" value={data.branch_id}>Branch : {data.branch_name}</h6>
                            <h6 className="card-subtitle mb-2 text-body-secondary" value={data.div_id}>Div: {data.division}</h6>
                            <h6 className="card-subtitle mb-2 text-body-secondary" value={data.semester}>Semester : {data.semester}</h6>
                            <button
                                className="btn btn-primary"
                                onClick={() => handleEnterMarks(data)}
                            >
                                Enter Marks
                            </button>
                        </div>
                    </div>
                ))}
            </div>

          
            {showtable?(
           <div className="tableContent">
           <form>
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
               </table>
               </form>
               </div>
            ):(
                
<p> Buttton Not clicked..!!</p>
            )}
          
        </>

    )
}

export default Students_Marks_Entry
