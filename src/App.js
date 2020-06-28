import React from 'react';
import './App.css';
import Menu from './menu/menu';
import Main from './root/main'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import AddBrewery from './breweries/AddBrewery';
import EditBrewery from './breweries/EditBrewery';
import FindEditBrewery from './breweries/FindEditBrewery';

function App() {
  return (
    <Router>
      <div>
        <Menu />

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/addbrewery" exact>
            <AddBrewery />
          </Route>
          <Route path="/editbrewery/:id" exact>
            <EditBrewery />
          </Route>
          <Route path="/editbrewery" exact>
            <FindEditBrewery />
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
