import React, { useState } from "react";
// import "./SubjectMapping.css"

// const SubjectMapping = () => {
    function Blogs() {

        const [inputarr,setInputarr] = useState([])

        const [inputdata, SetInputdata] = useState({name: "",subj: ""})


        function changehandle(e) {
          SetInputdata({
            ...inputdata, [e.target.name]: 
            e.target.value})
      }
      let {name,subj}=inputdata;


    function changhandle(){
        setInputarr([...inputarr,{name,subj}])
        console.log(inputarr)
        console.log(inputdata)
        SetInputdata({name:"",subj:""})
    }


        return (
          <div className="App">
            <input type="text"
              autoComplete="off"
              name='name'
              value={inputdata.name}
              onChange={changehandle}
              placeholder="Name"
            /><br /><br />
      
            <input type="text"
              autoComplete="off"
              name='subj'
              value={inputdata.subj}
              onChange={changehandle}
              placeholder="Subj"
            /><br /><br />
      
            <button className="btn" onClick={changhandle}>Submit</button>
      
          </div>
      
        )
      };

      export default Blogs;