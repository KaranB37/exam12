import React, { useState } from 'react';
import axios from 'axios'
import '../index.css'

function Login() {

  const [email, setEmail] = useState('') 
  const [password, setPassword] = useState('')
  function handleSubmit(event) {
    event.preventDefault(); 
    axios.post('http://localhost:3000/login', { email, password})
    .then(res => console.log(res))
    .catch(err => console.log(err));
  }

  return (
    <div>
        <div className="parent-container">
          <div className="company-logo">
            <img src="https://i.ibb.co/ZTZ1fC2/logo-1.png"  alt="company-logo" />
          </div>
          <div className="login-cred">
            <h4>Login</h4>
            <p className='subtitle'> Welcome to Exam Management System , Please login your account.</p>
            
            <form action="#" onSubmit={handleSubmit}>
              <div className="form-input">
                <label className="label">College Id <span className="required">*</span></label>
                <input type="email" placeholder="id@pvppcoe.ac.in" name="username" required className='form-comtrol'
                onChange={e =>setEmail(e.target.value)}/>

                <label className="label">Password<span className="required">*</span></label>
                <div className="password-container">
                  <input type="password" placeholder="password" name="password" id="password" required className='form-comtrol'
                  onChange={e => setPassword(e.target.value)}/>
                  <i className="fa-solid fa-eye" id="eye" />
                </div>

                <button type="submit" className='btn-success'>LOGIN</button>
              </div>
            </form>
            <footer>
            <p className='subtitle'>www.getflytechnologies.com</p>
            </footer>
          </div>
        </div>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" />
      </div>
    );
}

export default Login;