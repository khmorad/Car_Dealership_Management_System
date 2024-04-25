import React from 'react';
import Ladysuzan from "./Ladysuzan";
import Infowindow from "./Infowindow";
import ChatAssistant from "./ChatAssistant";

const Home = () => {
  return (
    <div>
      <h1>Welcome to Home Page</h1>
      <Ladysuzan />
      <Infowindow />
      <ChatAssistant />
    </div>
  );
}

export default Home;
