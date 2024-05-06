import React, { useState } from "react";
import Navbar from "./components/Navbar";
import ChatAssistant from "./components/ChatAssistant";
import Cardash from "./Cardash";
import Home from "./Home";

function App() {
  const [status, setStatus] = useState(false);
  const [isEmployee, setIsEmployee] = useState(false);

  // Function to update login status and user type
  const handleLoginStatusChange = (status, employee) => {
    setStatus(status);
    setIsEmployee(employee);
  };

  return (
    <div className="App">
      <Navbar
        status={status}
        setStatus={setStatus}
        isEmployee={isEmployee}
        setIsEmployee={setIsEmployee}
      />
      <ChatAssistant />
      {status && isEmployee ? <Cardash /> : <Home />}
    </div>
  );
}

export default App;