import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Ladysuzan from "./components/Ladysuzan";
import Infowindow from "./components/Infowindow";

function Home({showLogin,loginStatus,user, isEmployee}) {
  return (
    <div className="App">
      <Ladysuzan />
      <Infowindow showLogin={showLogin}loginStatus={loginStatus} user={user} isEmployee={isEmployee} />
    </div>
  );
}

export default Home;
