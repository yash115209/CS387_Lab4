import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navb from './Navb';
import axios from 'axios';

axios.defaults.withCredentials = true

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [courses, setCourses] = useState([]);
  const [gcourses, setGcourses] = useState([]);
  const [selectedSection, setSelectedSection] = useState('1');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:3001/home/registration", {
          credentials: 'include'
        });
        const data = await response.json();
        if (response.status !== 200) {
          navigate("/login");
        } else {
          setGcourses(data);
          setCourses(data);
        }
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchCourses();
  }, []);

  const handleSearch = () => {
    if (gcourses.length) {
      const filteredCourses = gcourses.filter(
        course => course.course_id.includes(searchTerm.toUpperCase())
      );
      setCourses(filteredCourses);
    }
  };

  const handleRegisterClick = async(course_id, sec_id) => {
    try {

    const body = {course_id, sec_id};
    // const response = await fetch('http://localhost:3001/home/registration',{
    //     method: "POST",
    //     headers: {
    //         "Content-type": "application/json"
    //     },
    //     credentials: 'include',
    //     body: JSON.stringify(body)
    // })

    var response = await axios.post('http://localhost:3001/home/registration', {"course_id": course_id, "sec_id": sec_id})
    console.log(response)
    if(response.data.error) {

      alert(response.data.error)
      window.location.reload()
    }
    else {
      alert("Course Registered Successfully")
      window.location.reload()
    }

      // window.location.reload();
      // return response.data;
    } catch (error) {
      console.error(error);
    }
  };


// export default SearchBar;
  return (
    <div>
            <Navb />
    <div className='container'>

        <br />
        <br />
        <br />
        <br />
    <input
        type="text"
        value={searchTerm}
        onChange={event => setSearchTerm(event.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      {courses.map(result => (
        <div key={result.id}>{result.name}</div>
      ))}
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
    </div>
  );
};

export default SearchBar;