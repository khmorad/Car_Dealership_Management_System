import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Ladysuzan from "./components/Ladysuzan";
import Infowindow from "./components/Infowindow";
import ChatAssistant from "./components/ChatAssistant";

function App() {
  return (
    <div className="App">
      <Navbar />
      <ChatAssistant/>
      <Ladysuzan />
      <Infowindow />
    </div>
  );
}

export default App;
