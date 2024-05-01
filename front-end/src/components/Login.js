import React, { useState } from 'react';
import '../stylings/Login.css';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon
} from 'mdb-react-ui-kit';

export default function Login() {
  // Define state variables for username, password, and user type
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isEmployee, setIsEmployee] = useState(false);
  const [isCustomer, setIsCustomer] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmployeeCheckboxChange = () => {
    setIsEmployee(!isEmployee);
  };

  const handleCustomerCheckboxChange = () => {
    setIsCustomer(!isCustomer);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you can perform any further actions, such as validation or sending the data to a server
    console.log('Submitted:', { username, password, isEmployee, isCustomer });
  };

  return (
    <div className="container">
      <div className="center">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="txt_field">
            <input type="text" name="text" value={username} onChange={handleUsernameChange} required />
            <span></span>
            <label>Username</label>
          </div>
          <div className="txt_field">
            <input type="password" name="password" value={password} onChange={handlePasswordChange} required />
            <span></span>
            <label>Password</label>
          </div>
          <div className="pass">Forget Password?</div>
          <div className="checkboxes">
            <p> <input type="checkbox" className="employee check-box" checked={isEmployee} onChange={handleEmployeeCheckboxChange} />Employee</p>
            <p> <input type="checkbox" className="customer check-box" checked={isCustomer} onChange={handleCustomerCheckboxChange} />Customer</p>
          </div>
          
          <input type="submit" value="Login" />
          <div className="signup_link">
            Not a Member ? <a href="signup.php">Signup</a>
          </div>
        </form>
      </div>
    </div>
  );
}
