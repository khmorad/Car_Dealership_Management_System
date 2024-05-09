import React, { useState } from "react";
import Navbar from "./components/Navbar";
import ChatAssistant from "./components/ChatAssistant";
import Cardash from "./Cardash";
import Home from "./Home";

function App() {

  const [showLogin, setShowLogin] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);
  const [user, setUser] = useState(null);
  const [isEmployee, setIsEmployee] = useState(false)
  //{status && isEmployee ? <Cardash /> : <Home />}
  // Function to update login status and user type


  return (
    <div className="App">
      <Navbar
        showLogin={showLogin}
        setShowLogin={setShowLogin}
        loginStatus={loginStatus}
        setLoginStatus={setLoginStatus}
        user={user}
        setUser={setUser}
        isEmployee={isEmployee}
        setIsEmployee={setIsEmployee}
      />
      <ChatAssistant />
      {loginStatus && isEmployee ? <Cardash /> : <Home showLogin={showLogin}loginStatus={loginStatus} user={user} isEmployee={isEmployee}/>}

    </div>
  );
}

export default App;
