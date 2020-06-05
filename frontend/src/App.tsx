import React, { FunctionComponent } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import LoginManager from './modules/LoginManager';
import Home from './routes/Home';
import Login from './routes/Login';

const App: FunctionComponent = () => {
  return (
    <LoginManager>
      <Router>
        <Switch>
          <Route exact={true} path="/">
            <Home />
          </Route>
          <Route exact={true} path="/login">
            <Login />
          </Route>
        </Switch>
      </Router>
    </LoginManager>
  );
};

export default App;
