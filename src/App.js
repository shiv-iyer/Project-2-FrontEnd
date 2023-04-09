import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// import Main
import Main from "./Main";

// App.js is the grandparent to render Main

function App() {
  return (
    // enclose everything within one React.Fragment
    <React.Fragment>
      <Main/>
    </React.Fragment>
  );
}

export default App;