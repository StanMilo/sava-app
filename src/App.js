import React, { useState } from 'react';
import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import FormRegistration from './Pages/RegistrationPage'
import Login from './Pages/LoginPage'
import ConfigList from './Pages/ConfigList'
import './App.css';
import {Storage} from './Services/Storage'
import ManageConfig from './Pages/ManageConfig';


const App = () => {
    // TODO - move to separate class
    const token = Storage().get('access_token');

    return (
      <>
        <div className="App">
          {token && 
            <Router>
              <Switch>
                <Route exact path="/" component={ConfigList}/>
                <Route exact path="/manage-config" component={ManageConfig}/>
                <Route exact path="/manage-config/:name" component={ManageConfig}/>
              </Switch>
            </Router>
          }

          {!token && 
            <Router>
              <Switch>
                <Route exact path="/" component={FormRegistration}/>
                <Route path="/login" component={Login}/>
              </Switch>
            </Router>
          }
        </div>
      </>
    )
  };
  
  export default App;