import React from 'react'
import { useState,  useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function CourseID() { 
    const [course_info, setCoursesInfo] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        async function fetchCourseInfo() {
            await fetch(`http://localhost:3001/course/${id}`)
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
        
        fetchCourseInfo();
    }, [course_info]);


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
            <td>{item.title}</td>
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
            <td>{item.name}</td>
            </tr>
        )
    })}
</tbody>
</table>


      
    </div>
  )
}

// export default Course;
