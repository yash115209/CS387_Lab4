import React from 'react'
import { useState,  useEffect } from 'react';

export default function RunningCourses() { 
    const [courses, setCourses] = useState([])
    useEffect(() => {
        async function fetchCourses() {
            await fetch("http://localhost:3001/course/running")
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

    if(courses.length == 0){
        return (
            <div className='container'>
              <h2>Loading</h2>
            </div>
          )
    }

  return (
    <div>
    <div className='container'>
        <br />
        <br />
        <br />

      <h1><center>Running Courses</center></h1>
      <br />
      <br />
      <br />
    <table className="table table-hover">
  <thead className="thead-dark">
    <tr>
      <th scope="col">Department</th>
    </tr>
  </thead>
  <tbody>
    {courses.dept_names.map((item) => {
        return (
            <tr>
            <th scope="row">{item}</th>
            </tr>
        )
    })}
  </tbody>
</table></div>
    </div>
  )
}

// export default Course;
