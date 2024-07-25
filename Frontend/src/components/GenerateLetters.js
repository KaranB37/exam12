import React, {useState} from "react";
import axios from "axios";
import "./SubjectMapping.css"

const GenerateLetters = () => {

  const [formDetails, setFormDetails] = useState({
    name:"",
    collegeID:"",
    division:"A",
    branch:"CS",
    academicYear:"2018-2022",
    report:"Transcript"
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {data: {result, message}} = await axios.post("http://localhost:5000/pdf/download", formDetails)
    if (result){
      alert(`${formDetails.report} being downloaded please check docs folder...`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mainContent">
      <div className="mapping">
        <p className="font-weight-800">Generate Letters</p>
        <div className="col-div">

          <div className="s1">
            <span className="fontSizeSmall">Enter Full Name</span>
            <input type="text" name="name" className="text-feild" 
            onChange={(e) => setFormDetails({...formDetails, name:e.currentTarget.value})}
            />
          </div>

          <div className="s1">
            <span className="fontSizeSmall">Enter College ID</span>
            <input type="text" name="clgid" className="text-feild" 
            onChange={(e) => setFormDetails({...formDetails, collegeID:e.currentTarget.value})}
            />
          </div>

          <div className="s1">
            <span className="fontSizeSmall">Select Division</span>
            <select className="select" name="form-control" id="branch" 
            onChangeCapture={(e) => setFormDetails({...formDetails, division:e.currentTarget.value})}
            >
              <option value="A">A</option>
              <option value="B">B</option>
            </select>
          </div>

          <div className="s1">
            <span className="fontSizeSmall">Select Branch</span>
            <select className="select" name="form-control" id="branch"
            onChangeCapture={(e) => setFormDetails({...formDetails, branch:e.currentTarget.value})}
            >
              <option value="CS">CS</option>
              <option value="AI&DS">AI&DS</option>
              <option value="IT">IT</option>
              <option value="EXTC">EXTC</option>
            </select>
          </div>

          <div className="s1">
            <span className="fontSizeSmall">Academic Year</span>
            <select className="select" name="ac-yr" id="ac-yr" 
            onChangeCapture={(e) => setFormDetails({...formDetails, academicYear:e.currentTarget.value})}
            >
              <option value="2018-2022">2018-2022</option>
              <option value="2019-2023">2019-2023</option>
              <option value="2020-2024">2020-2024</option>
              <option value="2021-2025">2021-2025</option>
            </select>
          </div>

          <div className="s1">
            <span className="fontSizeSmall">Select Report</span>
            <select className="select" name="report" id="report" 
            onChangeCapture={(e) => setFormDetails({...formDetails, report:e.currentTarget.value})}
            >
              <option value="Transcript">Transcript</option>
              <option value="Transcript">CGPI to % Letter</option>
              <option value="Transcript">Medium of Instruction</option>
              <option value="Transcript">Backlog Summary</option>
            </select>
          </div>
          {/* <div className="s1"></div>
          <div className="s1"></div> */}
          <div className="s1"><button type="submit" className="btn">Generate</button></div>
        </div>
      </div>
    </form>
  )
};
export default GenerateLetters;