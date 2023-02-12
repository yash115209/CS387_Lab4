import React, { Fragment, useState, useEffect } from "react";
import {BrowserRouter as Router, Routes, Navigate, Outlet, Route} from 'react-router-dom';
import Login from './routes/Login';
import Course from './routes/Course';
import CourseID from './routes/CourseID'
import Instructor from './routes/Instructor';
import RunningCourses from './routes/RunningCourses'
import DeptNameCourse from './routes/DeptNameCourse'
import { CoursesContextProvider } from './context/CoursesContext';
import Sashboard from './routes/Sashboard';

const App = () => {
    return( 
        <div>
        <CoursesContextProvider>
        <Router>
            <Routes>
                <Route exact path="/dashboard" element = {<Sashboard/>}/>
                <Route path='/login' element={<Login />} />
                <Route exact path="/course" element={<Course/>}/>
                <Route exact path="/course/:id" element={<CourseID/>}/>
                <Route exact path="/course/running" element={<RunningCourses/>}/>
                <Route exact path="/course/running/:dept_name" element={<DeptNameCourse/>}/>
                <Route exact path="/instructor" element={<Instructor/>}/>
            </Routes>
        </Router>
        </CoursesContextProvider>
    </div>
    )
}

export default App; 
