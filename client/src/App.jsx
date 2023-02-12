import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Course from './routes/Course';
import Instructor from './routes/Instructor';
import { CoursesContextProvider } from './context/CoursesContext';

const App = () => {
    return <div>
        <CoursesContextProvider>
        <Router>
            <Routes>
                <Route exact path="/course" element={<Course/>}/>
                <Route exact path="/instructor" element={<Instructor/>}/>
            </Routes>
        </Router>
        </CoursesContextProvider>
    </div>
}

export default App; 