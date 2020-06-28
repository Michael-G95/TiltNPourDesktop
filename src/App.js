import React from 'react';
import './App.css';
import Menu from './menu/menu';
import Main from './root/main'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import EditBreweries from './breweries/editBreweries';

function App() {
  return (
    <Router>
      <div>
        <Menu />

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/breweries" exact>
            <EditBreweries />
          </Route>
          <Route path="/">
            <Main />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
