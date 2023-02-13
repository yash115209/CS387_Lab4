import axios from 'axios';
import React from 'react'
import { useState,  useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navb from './Navb';

export default function InstructorInfo() { 
    const navigate = useNavigate();
    const [instructor_info, setInstructorInfo] = useState([]);
    const { id } = useParams();
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
            console.log("Dashboard go");
            navigate("/home");
          }
          console.log(parseReq, "yoyo");
    } catch(err){
      console.error(err.message);
    }};
        async function fetchInstructorInfo() {
            await fetch(`http://localhost:3001/instructor/${id}`)
            .then((res) => {
                const output = res.json()
                // console.log(output);
                return output;
            })
            .then((data) => {
                if(JSON.stringify(data) != JSON.stringify(instructor_info)) {
                    setInstructorInfo(data);
                }
            })
            .catch((err) => {
                console.log(err);
            })
        }
        checkAuth();
        fetchInstructorInfo();
    }, [instructor_info]);


if(instructor_info.length == 0){
    return (
        <div className='container'>
          <h2>Loading</h2>
        </div>
      )
}

  return (
    <div>
      <Navb />
    <div className='container'>
        <br />
        <br />
        <br />
      <h1><center>Instructor {id}  </center></h1>
      <br />
      <br />
      <br />

    <h2> Name: {instructor_info.instructor_info[0].name}</h2>
    <h2> Department: {instructor_info.instructor_info[0].dept_name}</h2>

    <br />
    <br />


    <h2>Current Courses: </h2>
    <br />
<table className="table table-hover">
  <thead className="thead-dark">
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Title</th>
    </tr>
  </thead>
  <tbody>
      {instructor_info.current_courses.map((item) => {
        return (
            <tr>
            <th scope="row">{item.course_id}</th>
            <td>{item.title}</td>
            </tr>
        )
    })}
</tbody>
</table>

<br />
<br />



<h2>Previous Courses: </h2>
<br />

<table className="table table-hover">
  <thead className="thead-dark">
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Name</th>
      <th scope="col">Year</th>
      <th scope="col">Semester</th>
    </tr>
  </thead>
  <tbody>
      {instructor_info.previous_courses.map((item) => {
        return (
            <tr>
            <th scope="row">{item.course_id}</th>
            <td>{item.title}</td>
            <td>{item.year}</td>
            <td>{item.semester}</td>
            </tr>
        )
    })}
</tbody>
</table>

<br />
<br />
<br />
<br />
<br />
<br />
<br />
</div>
    </div>
  )
}

// export default Course;
