import React from "react";
import "./Header.css"
import logo from './header-logo.png';

import { BsFillPersonFill } from "react-icons/bs"

function Header() {
    return (
        <nav className="navbar">
            <div className="left">
                <img src={logo} alt="Academate Logo" />
                <h2>AcadeMate</h2>
            </div>
            <div className="right">
                <span><BsFillPersonFill className="icon" /> Dashboard</span>
            </div>
        </nav>)
}

export default Header;
