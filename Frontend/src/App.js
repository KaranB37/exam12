import React from "react";
import Login from "./pages/Login";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
// import Blogs from './Blogs'
import Dashboard from "../src/pages/Dashboard";
import ListPrinting from "../src/components/ListPrinting";
import SubjectMapping from "../src/components/SubjectMapping";
import GenerateLetters from "./components/GenerateLetters";
import LoginPage from "./pages/Authentication/LoginPage";
import SignUpPage from "./pages/Authentication/SignUpPage";
// import Update_faculty_subject from './components/Update_faculty_subject';

// import Home from './Home'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Faculty_Subj_Mapping from "./components/Faculty_Subj_Mapping";
import Update_faculty_subject from "./components/Update_faculty_subject";
import Students_Marks_Entry from "./components/Students_Marks_Entry";
import Seat_allotment from "./components/Seat_allotment";

function App() {
  const [token, setToken] = useState("");

  const handleLogin = (newToken) => {
    setToken(newToken);
    window.localStorage.setItem("token", newToken);
  };

  const handleLogout = () => {
    setToken("");

    window.localStorage.removeItem("token");
  };
  useEffect(() => {
    const storedToken = window.localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);
    }
  }, [setToken]);

  return (
    <BrowserRouter>
      <div>
        <Toaster />
      </div>
      <Routes>
        <Route
          path="/"
          element={<LoginPage handleLogin={handleLogin} token={token} />}
        />
        <Route
          path="/signup"
          element={<SignUpPage handleLogin={handleLogin} token={token} />}
        />
        {/* <Route path='/' element={<Blogs />}></Route> */}

        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="/dashboard" element={<ListPrinting />} />
          <Route path="/dashboard/Listprinting" element={<ListPrinting />} />
          <Route
            path="/dashboard/SubjectMapping"
            element={<SubjectMapping />}
          />
          <Route
            path="/dashboard/GenerateLetters"
            element={<GenerateLetters />}
          />
          <Route
            path="/dashboard/faculty_subject_mapping"
            element={<Faculty_Subj_Mapping />}
          />
          <Route
            path="/dashboard/update_faculty_subject_mapping"
            element={<Update_faculty_subject />}
          />
          <Route
            path="/dashboard/students_marks_entry"
            element={<Students_Marks_Entry />}
          />
          <Route
            path="/dashboard/Seat_allotment"
            element={<Seat_allotment />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
