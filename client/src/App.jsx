import React, { Fragment, useState, useEffect } from "react";
import {BrowserRouter as Router, Routes, Navigate, Outlet, Route} from 'react-router-dom';
import Login from './routes/Login';
import Course from './routes/Course';
import CourseID from './routes/CourseID';
import Instructor from './routes/Instructor';
import RunningCourses from './routes/RunningCourses'
import DeptNameCourse from './routes/DeptNameCourse'
import Sashboard from './routes/Sashboard';
import SearchBar from "./routes/searchBar";

const App = () => {
    return(
        <Router>
            <Routes>
                <Route exact path='/' element = {<Login/>}/>
                <Route exact path="/home" element = {<Sashboard/>}/>
                <Route path='/login' element={<Login />} />
                <Route exact path="/course" element={<Course/>}/>
                <Route exact path="/course/:id" element={<CourseID/>}/>
                <Route exact path="/course/running" element={<RunningCourses/>}/>
                <Route exact path="/course/running/:dept_name" element={<DeptNameCourse/>}/>
                <Route exact path="/instructor" element={<Instructor/>}/>
                <Route exact path="/home/registration" element={<SearchBar/>}/>
            </Routes>
        </Router>
    )
}

export default App; 
