import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "../src/components/Dashboard/Dashboard";
import Login from "./components/Login/Login";

function App() {
  const token = localStorage.getItem("token");
  // useEffect(() => {
  //   if (!token) {
  //     window.location.assign("/login");
  //   }
  // }, []);

  return (
    <div className="wrapper">
      <h1>Welcome</h1>
      {!token && <a href="/">Login</a>}
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
