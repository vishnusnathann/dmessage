import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AuthState from './context/auth/AuthState';

import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

ReactDOM.render(
    <AuthState>
      <App/>
    </AuthState>
,
  document.getElementById('root')
);


