import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Course from './routes/Course';
import CourseID from './routes/CourseID'
import Instructor from './routes/Instructor';
import RunningCourses from './routes/RunningCourses'
import DeptNameCourse from './routes/DeptNameCourse'
import { CoursesContextProvider } from './context/CoursesContext';

const App = () => {
    return <div>
        <CoursesContextProvider>
        <Router>
            <Routes>
                <Route exact path="/course" element={<Course/>}/>
                <Route exact path="/course/:id" element={<CourseID/>}/>
                <Route exact path="/course/running" element={<RunningCourses/>}/>
                <Route exact path="/course/running/:dept_name" element={<DeptNameCourse/>}/>
                <Route exact path="/instructor" element={<Instructor/>}/>
            </Routes>
        </Router>
        </CoursesContextProvider>
    </div>
}

export default App; 