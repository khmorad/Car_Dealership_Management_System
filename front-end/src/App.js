import logo from "./logo.svg";
import Navbar from "./components/Navbar";
import Ladysuzan from "./components/Ladysuzan";
import Infowindow from "./components/Infowindow";
import ChatAssistant from "./components/ChatAssistant";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from "./Home";
import Login from "./components/Login";
import Cardash from "./Cardash";

function App() {
  return (
    <div className="App">
      <Navbar />
      <ChatAssistant/>
      <Cardash/>
  
    </div>
  );
}

export default App;
