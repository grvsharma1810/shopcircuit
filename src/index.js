import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { DataProvider } from './providers/DataProvider';
// import mockServer from './API/mock.server'
import { ToastProvider } from './pages/shared-components/Toast/ToastProvider';
import { AuthProvider } from './providers/AuthProvider'

// mockServer();

ReactDOM.render(
  <DataProvider>
    <ToastProvider>
      <Router>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Router>
    </ToastProvider>
  </DataProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
