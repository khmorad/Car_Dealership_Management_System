import React, { useState, useEffect } from 'react';
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
import Login from './Login';
import { v4 as uuidv4 } from 'uuid';

export default function Signup() {
  // Define state variables for username, password, email, and user type
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isEmployee, setIsEmployee] = useState(false);
  const [isCustomer, setIsCustomer] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false); // New state variable for login status
  const [showSignup, setShowSignup] = useState(false); // State variable to toggle signup page
  const [dob, setDob] = useState('');

  const [employees, setEmployees] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [customerName, setCustomerName] = useState(null);
  const [employeeName, setEmployeeName] = useState(null);
  
  useEffect(() => {
    fetch('http://127.0.0.1:5000/employee') 
      .then(response => response.json())
      .then(data => {
        setEmployees(data);
      })
      .catch(error => console.error('Error fetching employees:', error));
  }, []);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/customer') 
      .then(response => response.json())
      .then(data => {
        setCustomers(data);
      })
      .catch(error => console.error('Error fetching customers:', error));
  }, []);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleEmployeeCheckboxChange = () => {
    setIsEmployee(!isEmployee);
  };
  
  const handleSignupLinkClick = (e) => {
    e.preventDefault();
    setShowSignup(true); // Set showSignup state to true to display signup page
  };
  
  const handleCustomerCheckboxChange = () => {
    setIsCustomer(!isCustomer);
  };

  const handleDobChange = (e) => {
    setDob(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const customerId = Math.floor(Math.random() * 1000) + 1;
  
    // Format date of birth
    const formattedDOB = new Date(`${dob} 00:00:00 GMT`).toUTCString();

    
    // Prepare data for registration
    const formData = {
      Customer_ID: customerId,
      Name: username,
      DOB: formattedDOB,
      Address: address,
      PhoneNumber: phoneNumber,
      Email: email,
      Employee_ID: 1,
      Password: password
    };
    console.log(formData)
    // Make a POST request to the backend to register the user
    fetch('http://127.0.0.1:5000/customer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(response => {
      if (response.ok) {
        // Registration successful
        console.log('Registration successful');
        setLoggedIn(true); // Update the state to reflect the user's login status
      } else {
        // Registration failed
        console.error('Registration failed');
        // You can display an error message to the user if needed
      }
    })
    .catch(error => {
      console.error('Error during registration:', error);
      // You can display an error message to the user if needed
    });
  };
  
  
  
  

  // Render login form if not logged in
  if (!loggedIn && !showSignup) {
    return (
      <div className="container">
        <div className="center">
          <h1>Signup</h1>
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
            <div className="txt_field">
              <input type="email" name="email" value={email} onChange={handleEmailChange} required />
              <span></span>
              <label>Email</label>
            </div>
            <div className="txt_field">
              <input type="text" name="address" value={address} onChange={handleAddressChange} required />
              <span></span>
              <label>Address</label>
            </div>
            <div className="txt_field">
              <input type="text" name="phoneNumber" value={phoneNumber} onChange={handlePhoneNumberChange} required />
              <span></span>
              <label>Phone Number</label>
            </div>
            <div className="txt_field">
              <input type="date" name="dob" value={dob} onChange={handleDobChange} required />
              <span></span>
              <label>Date of Birth</label>
            </div>

            <input type="submit" value="Signup" />
            <div className="signup_link">
              Already a Member ? <a href="#" onClick={handleSignupLinkClick}>Signup</a>
            </div>
          </form>
        </div>
      </div>
    );
  } else if (!loggedIn && showSignup) {
    return <Login />;
  } else {
    // Render null if logged in
    return null;
  }
}
