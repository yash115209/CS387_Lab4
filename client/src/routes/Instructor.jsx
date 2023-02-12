import axios from 'axios';
import React from 'react'
import { useState,  useEffect } from 'react';

export default function Instructor() { 
    const [instructors, setInstructors] = useState([])
    useEffect(() => {
        async function fetchInstructors() {
            await fetch("http://localhost:3001/instructor")
            .then((res) => {
                const output = res.json()
                // console.log(output);
                return output;
            })
            .then((data) => {
                if(JSON.stringify(data) != JSON.stringify(instructors)) {
                    setInstructors(data);
                }
            })
            .catch((err) => {
                console.log(err);
            })
        }
        
        fetchInstructors();
    }, [instructors]);

  return (
    <div>
    <div className='container'>
        <br />
        <br />
        <br />

      <h1><center>Instructors</center></h1>
      <br />
      <br />
      <br />
      <table className="table table-hover">
  <thead className="thead-dark">
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Name</th>
      <th scope="col">Department</th>
    </tr>
  </thead>
  <tbody>
    {instructors.map((instructor) => {
        return (
            <tr>
            <th scope="row">{instructor.id}</th>
            <td>{instructor.name}</td>
            <td>{instructor.dept_name}</td>
            </tr>
        )
    })}
  </tbody>
</table></div>
    </div>
  )
}

// export default Course;
