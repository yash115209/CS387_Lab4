import React, { Fragment, useState, useEffect } from "react";
import {BrowserRouter as Router, Routes, Navigate, Outlet, Route} from 'react-router-dom';
import Login from './routes/Login';
import Dashboard from './routes/Dashboard';
import Sashboard from './routes/Sashboard';
import { useSelector } from 'react-redux'

// const PrivateRoutes = () => {
//   const { isAuth } = useSelector((state) => state.auth)

//   return <>{isAuth ? <Outlet /> : <Navigate to='/login/' />}</>
// }

// const RestrictedRoutes = () => {
//   const { isAuth } = useSelector((state) => state.auth)

//   return <>{!isAuth ? <Outlet /> : <Navigate to='/home/' />}</>
// }

const App = () => {
    // const checkAuthenticated = async () => {
    //     try {
    //       const res = await fetch("http://localhost:3001/authentication/verify", {
    //         method: "POST",
    //         headers: { jwt_token: localStorage.token }
    //       });
    
    //       const parseRes = await res.json();
    
    //       parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    //     } catch (err) {
    //       console.error(err.message);
    //     }
    //   };
    
    //   useEffect(() => {
    //     checkAuthenticated();
    //   }, []);
    
    //   const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    //   const setAuth = boolean => {
    //     setIsAuthenticated(boolean);
    //   };
    return(
        <Fragment>
        <div>
        <Router>
            <Routes>
                <Route exact path="/sdashboard" element = {<Dashboard/>}/>
                <Route exact path="/dashboard" element = {<Sashboard/>}/>
                {/* <Route path='/register' element={<Register />} /> */}
                <Route path='/login' element={<Login />} />
            </Routes>  
        </Router>
        </div>
        </Fragment>
    );
}

export default App;