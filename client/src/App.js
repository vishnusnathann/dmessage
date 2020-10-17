import React from 'react';

import './App.css';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import {BrowserRouter as Router,Link,Route,Switch} from 'react-router-dom';
import Dashboard from './Components/Dashboard/Dashboard';
import Message from './Components/Message/Message';
import AuthRouter from './Components/AuthRouter/AuthRouter';

function App() {
  return (
    <Router>
      <div className="App">
      <Switch>
        <AuthRouter exact path="/" component={Dashboard}/>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/login" component={Login}/>
        <Route path="/:m" component={Message} />
      </Switch>
    </div>
    </Router>

  );
}

export default App;
