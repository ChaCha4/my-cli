import React from 'react';
import ReactDOM from 'react-dom/client';
import {HashRouter as Router, Route, Routes} from 'react-router-dom'
import './index.css';
import reportWebVitals from './reportWebVitals';
import Message from "./views/Message";
import UserInfoCard from "./views/Message/UserInfoCard";
import EditingUser from './views/Message/EditingUser'
import RecordForm from './views/Message/RecordForm';
import Report from './views/Message/Report';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Router>
          <Routes>
              <Route path="/" element={<Message />} />
              <Route path="/record" element={<RecordForm />} />
              <Route path="/report" element={<Report />} />
              <Route path="/userInfo" element={<UserInfoCard isMobile />} />
              <Route path="/userInfo_editing" element={<EditingUser />} />
          </Routes>
      </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
