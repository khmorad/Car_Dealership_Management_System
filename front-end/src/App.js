import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Ladysuzan from "./components/Ladysuzan";
import Infowindow from "./components/Infowindow";
import Chatbot from "./components/Chatbot";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Ladysuzan />
      <Infowindow />
    </div>
  );
}

export default App;
