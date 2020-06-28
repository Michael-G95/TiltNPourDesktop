import React from 'react';
import './App.css';
import Menu from './menu/menu';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Menu />

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/">
            Hi
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
