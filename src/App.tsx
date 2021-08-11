import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import firebase from './components/Firebase';

// importing screens
import Login from './screens/Login';
import Home from './screens/Home';

function App({userAuthState}: any) {
  console.log("Logged in status:", userAuthState);
  if (userAuthState) {
    return (
      <Router>
        <Switch>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    );
  }

  return (
    <Router>
      <Switch>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
