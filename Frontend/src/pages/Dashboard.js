import React from "react";
import Header from '../components/Header'
import SideMenu from '../components/SideMenu'
// import SubjectMapping from "../components/SubjectMapping";
import "./Dashboard.css"

function Dashboard() {
    return (
        <div>
            <Header />
            <div style={{ display: "flex"}}>
                <SideMenu />
            </div>
        </div>
    )
}

export default Dashboard;