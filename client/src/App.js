import React, { Fragment, useState, useEffect } from "react";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Redirect
} from 'react-router-dom';

import { toast } from "react-toastify";

//components

import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

toast.configure();

function App() {
  return (
    <Fragment>
      <Router>
        <div className="container">
          <Routes>
            <Route path = "/login" render={props =><Login {...props}/>}/>
            <Route path="/dashboard" element={<Dashboard authed={true} />} />
          </Routes>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
