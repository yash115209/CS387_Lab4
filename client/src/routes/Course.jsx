import React from 'react'
import { useState,  useEffect } from 'react';

export default function Course() { 
    const [courses, setCourses] = useState([])
    useEffect(() => {
        async function fetchCourses() {
            await fetch("http://localhost:3001/course")
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
        
        fetchCourses();
    }, [courses]);

  return (
    <div>
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
