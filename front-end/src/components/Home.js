import "./App.css";
import Navbar from "./Navbar";
import Ladysuzan from "./Ladysuzan";
import Infowindow from "./components/Infowindow";
import ChatAssistant from "./ChatAssistant";

function Home() {
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
