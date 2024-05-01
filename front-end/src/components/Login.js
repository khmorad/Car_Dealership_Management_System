import React, { useState , useEffect} from 'react';
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
  const [loggedIn, setLoggedIn] = useState(false); // New state variable for login status
  const [employees, setEmployees] = useState([])
  const [customers, setCustomers] = useState([])
 
  useEffect(() => {
    fetch('http://127.0.0.1:5000/employee') 
      .then(response => response.json())
      .then(data => {
        setEmployees(data);
        console.log('Employees:', data);
      })
      .catch(error => console.error('Error fetching employees:', error));
  }, []);
  useEffect(() => {
    fetch('http://127.0.0.1:5000/customer') 
      .then(response => response.json())
      .then(data => {
        setCustomers(data);
        console.log('Customers:', data);
      })
      .catch(error => console.error('Error fetching customers:', error));
  }, []);
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
  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Assuming usernames are unique across employees and customers
    const userExists = isEmployee
      ? employees.some((employee) => employee.Name === username && employee.Password === password)
      : customers.some((customer) => customer.Name === username && customer.Password === password);
  
    if (userExists) {
      // Login successful
      console.log('Login successful');
      setLoggedIn(true); // Update the state to reflect the user's login status
    } else {
      // Login failed
      console.error('Login failed');
      // You can display an error message to the user if needed
    }
  };

  // Render login form if not logged in
  if (!loggedIn) {
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
  } else {
    // Render null if logged in
    return null;
  }
}
