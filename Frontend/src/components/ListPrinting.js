import React, { useState } from 'react';

import semesterdata from './SubjectMapping.json'; 

const ListPrinting = () => {

  const [semesterid, setSemesterid] = useState('');

  const [subjectid, setSubjectid] = useState({
    semester_id: null,
    subject_id: null
  });
  
  const [subject, setSubject] = useState(semesterdata);
  
  
  const handlestate = (e) => {
    const subjectid = e.target.value;
    console.log(subjectid);
    setSubjectid(subjectid);
  
  }
  const [tableState, setState] = useState({
    shouldDisplay: false,
    selectedValue: ""
  });

  const handlesem = (e) => {
    const selectedValue = e.target.value;
    const shouldDisplay = (selectedValue && true) || false;
    setState({
      shouldDisplay,
      selectedValue
    })
    const getsemesterId = e.target.value;
    const getSubjectdata = semesterdata.find(semester => semester.semester_id === getsemesterId).subjects;
    setSubject(getSubjectdata);
    setSemesterid(getsemesterId);
    console.log(getsemesterId);
}

  return (
    <div className="mainContent">
      <div className="mapping">
        <p className="font-weight-800">List Printing</p>
        <div className="col-div">

        <div className="s1">
                        <span className="fontSizeSmall">Select Semester</span>

                        <select name='semester' className='form-control' onChange={(e) => handlesem(e)}>
                            <option value="">--Select Semester--</option>
                            {
                                semesterdata.map((getsemester, index) => (
                                    <option value={getsemester.semester_id} key={index}>{getsemester.semester_name}</option>
                                ))

                            }
                        </select>

                    </div>

          <div className="s1">
          <span className="fontSizeSmall">Select Branch</span>
          <select name='subjects' className='form-control' onChange={(e) => handlestate(e)}>
                            <option value="">--Select Subject--</option>
                            {
                                subject.map((getsubject, index) => (
                                    <option value={getsubject.subject_id} key={index}>{getsubject.subject_name}</option>
                                ))
                            }


                        </select>

          </div>
          <div className="s1">
          {/* <span className="fontSizeSmall">Select Report</span>
            <select className="select" name="report" id="report">
              <option value="Transcript">Transcript</option>
              <option value="Transcript">CGPI to % Letter</option>
              <option value="Transcript">Medium of Instruction</option>
              <option value="Transcript">Backlog Summary</option>
            </select> */}
          </div>
          <div className="s1"><button className="btn">Generate</button></div>
        </div>
      </div>
    </div>
  )
};
  
export default ListPrinting;