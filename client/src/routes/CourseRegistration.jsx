import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CourseRegistrationForm = () => {
    const [courses, setCourses] = useState([]);
   const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState('1');

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
      async function fetchCourses() {
          await fetch("http://localhost:3001/home/registration",{
            credentials:'include'
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

  const handleRegisterClick = async(course_id, sec_id) => {
    try {

    const body = {course_id, sec_id};
    const response = await fetch('http://localhost:3001/home/registration',{
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify(body)
    })
      window.location.reload();
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

//   const handleOnSearch = async (string, results) => {
//       var temp = {}
//       var final_after_change = []
//       var loop_temp = {}
   
//       const result = await axios.post("http://localhost:3001/search", {course_id: string});
//       if(result.data) {
       
//        result.data.forEach((course) => {
//          if(temp[course.course_id]) {
//            temp[course.course_id].push(course.sec_id)
//          } else {
//            temp[course.course_id] = [course.sec_id]
//          }
//        })
//        list_courses.forEach((course) => {
         
//          if(!loop_temp[course.course_id]) {
//            loop_temp[course.course_id] = 1
//            final_after_change.push({"course_id": course.course_id, "title": course.title, "credits": course.credits, "sec_id": temp[course.course_id]})
           
//           //  items.push({id: course.course_id, name: course.course_id+"-"+course.title})
//          }
//         //  setItemState(items)
//       //  console.log(items)
//      })
//      }
//      setStudent(final_after_change)
  
  
//   }


  return (
    <div className='container'>
      <h1>Course Registration Form</h1>
        <br />
        <br />
        <br />
        <h2>Current Courses: </h2>
        <br />

      <table className="table table-hover">
  <thead className="thead-dark">
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Title</th>
      <th scope="col">Department</th>
      <th scope="col">Credits</th> 
      <th scope="col">Section</th> 
      <th scope="col">Register</th> 
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
            <td>

        <select onChange={e => setSelectedSection(e.target.value)}>
            {course.sections.map(section => (
              <option key={section} value={section}>
                {section}
              </option>
            ))}
        </select>

            </td>

            <td><button onClick={() => handleRegisterClick(course.course_id, selectedSection)}>Register</button></td>
            </tr>
        )
    })}
  </tbody>
    </table>
    </div>
  );
};

export default CourseRegistrationForm;