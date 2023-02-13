import React from 'react';
import { useState,  useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navb from './Navb';

export default function DeptNameCourse() { 
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const {dept_name} = useParams();
    useEffect(() => {
        async function fetchCourses() {
            await fetch(`http://localhost:3001/course/running/${dept_name}`)
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
    const handleClick = (id) => {
      navigate(`/course/${id}`);
      window.location.reload();
    }
  return (
    <div>
      <Navb />
    <div className='container'>
        <br />
        <br />
        <br />

      <h1><center>Courses of {dept_name}</center></h1>
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
            <td><button onClick={() => handleClick(course.course_id)}>{course.title}</button></td>
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
