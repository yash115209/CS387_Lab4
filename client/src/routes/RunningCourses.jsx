import React from 'react'
import { useState,  useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navb from './Navb';

export default function RunningCourses() { 
    const navigate = useNavigate();
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

    const handleClick = (dept_name) => {
      navigate(`${dept_name}`);
      window.location.reload();
    }

  return (
    <div>
      <Navb />
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
            <td><button onClick={() => handleClick(item)}>{item}</button></td>
            </tr>
        )
    })}
  </tbody>
</table></div>
    </div>
  )
}

// export default Course;
