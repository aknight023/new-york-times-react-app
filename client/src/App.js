import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./components/Main";


const App = () => (
  <Router>
    <div>
      <Route path="/" component={Main} />
    </div>
  </Router>
);

export default App;
