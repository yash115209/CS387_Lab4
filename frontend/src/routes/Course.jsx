import React from 'react'
import { useState,  useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navb from './Navb';

export default function Course() { 
  const navigate = useNavigate();
    const [courses, setCourses] = useState([])
    useEffect(() => {
      const checkAuth = async () => {
        // for demo purposes, setting isAuth to false
        try {
          const response = await fetch(
            "http://localhost:3001/auth/verify",
            {
              credentials: 'include'
            }
          );
          const parseReq = response.json();
          const parseStatus = response.status;
          if(parseStatus !== 200){
            navigate("/login");
          } else {
            console.log("Dashboard go");
          }
          console.log(parseReq, "yoyo");
    } catch(err){
      console.error(err.message);
    }}
        async function fetchCourses() {
            await fetch("http://localhost:3001/course", {
              credentials: 'include'
            })
            .then((res) => {
                const output = res.json()
                // console.log(output);
                return output;
            })
            .then((data) => {
                if(JSON.stringify(data) != JSON.stringify(courses)) {
                    setCourses(data);
                }
            })
            .catch((err) => {
                console.log(err);
            })
        }
        checkAuth();
        fetchCourses();
    }, [courses]);

  return (
    <div>
      <Navb />
    <div className='container'>
        <br />
        <br />
        <br />

      <h1><center>Courses</center></h1>
      <br />
      <br />
      <br />
      <table className="table table-hover">
  <thead className="thead-dark">
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Title</th>
      <th scope="col">Department</th>
      <th scope="col">Credits</th> 
    </tr>
  </thead>
  <tbody>
    {courses.map((course) => {
        return (
            <tr>
            <th scope="row">{course.course_id}</th>
            <td>{course.title}</td>
            <td>{course.dept_name}</td>
            <td>{course.credits}</td>
            </tr>
        )
    })}
  </tbody>
</table></div>
    </div>
  )
}

// export default Course;
