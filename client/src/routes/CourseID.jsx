import React from 'react';
import { useState,  useEffect } from 'react';

import { useParams, useNavigate, Route } from 'react-router-dom';
import Navb from './Navb';

export default function CourseID() { 
    const navigate = useNavigate();

    const [course_info, setCoursesInfo] = useState([]);
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
            navigate("/login");
          } else {
            console.log("good to go");
          }
          console.log(parseReq, "yoyo");
    } catch(err){
      console.error(err.message);
    }}
        async function fetchCourseInfo() {
            await fetch(`http://localhost:3001/course/${id}`,{
              credentials:'include'
            })
            .then((res) => {
                const output = res.json()
                // console.log(output);
                return output;
            })
            .then((data) => {
                if(JSON.stringify(data) != JSON.stringify(course_info)) {
                    setCoursesInfo(data);
                }
            })
            .catch((err) => {
                console.log(err);
            })
        }
        checkAuth();
        fetchCourseInfo();
    }, [course_info]);
  const handleClick = (id) => {
    navigate(`/course/${id}`);
    window.location.reload();
  }
  const handleClickTeach = (id) => {
    navigate(`/instructor/${id}`);
    window.location.reload();
  }

if(course_info.length == 0){
    return (
        <div className='container'>
            <br />
            <br />
            <br />
          <h1><center>Course {id}  </center></h1>
          {JSON.stringify(course_info)}
          <br />
          <br />
          <br />
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
      <h1><center>Course {id}  </center></h1>
      <br />
      <br />
      <br />

      <h2>Title: {course_info.course_info[0].title}</h2>
      <h2>Credits: {course_info.course_info[0].credits}</h2>
    <br />
    <br />

    <h2>Prerequisites: </h2>
    <br />
<table className="table table-hover">
  <thead className="thead-dark">
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Title</th>
    </tr>
  </thead>
  <tbody>
      {course_info.prereq_info.map((item) => {
        return (
            <tr>
            <th scope="row">{item.course_id}</th>
            <td><button onClick={() => handleClick(item.course_id)}>{item.title}</button></td>
            </tr>
        )
    })}
</tbody>
</table>

<br />
<br />



<h2>Instructors: </h2>
<br />

<table className="table table-hover">
  <thead className="thead-dark">
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Name</th>
    </tr>
  </thead>
  <tbody>
      {course_info.instructor_info.map((item) => {
        return (
            <tr>
            <th scope="row">{item.id}</th>
            <td><button onClick={() => handleClickTeach(item.id)}>{item.name}</button></td>
            </tr>
        )
    })}
</tbody>
</table>


      
    </div>
    </div>
  )
}

// export default Course;
