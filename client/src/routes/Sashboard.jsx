import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Navb from "./Navb";

const Sashboard = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(0);
  const [userInfo, setUserInfo] = useState([]);
  console.log("sashboard");
  useEffect(() => {
    // check if user is authenticated, you can replace this with a real authentication logic
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
          console.log("Dashboard go");
        }
        console.log(parseReq, "yoyo");
  } catch(err){
    console.error(err.message);
  }}
  const getInfo = async() => {
    try{
      console.log("here");
      const response = await fetch(
        "http://localhost:3001/auth/fetch-user",
        {
          method: "POST",
          credentials: 'include'
        }
      )
      .then((res) => res.json())
      .then((data) => {
        setUserId(data.user.id)
      });
    } catch(err){
      console.log(err.message);
    }
  }
  //fetch info about student
  checkAuth();
  getInfo();

  async function fetchUserInfo() {
    await fetch("http://localhost:3001/home", {
      credentials: 'include'
    })
    .then((res) => {
        const output = res.json()
        // console.log(output);
        return output;
    })
    .then((data) => {
        if(JSON.stringify(data) != JSON.stringify(userInfo)) {
            setUserInfo(data);
        }
    })
    .catch((err) => {
        console.log(err);
    })
  }

fetchUserInfo();



  console.log("where");
}, 
  [userId, userInfo]);


if(userInfo.length == 0){
    return (
        <div className='container'>
            <br />
            <br />
            <br />
          <br />
          <br />
          <br />
          <h2>Loading</h2>
        </div>
      )
}

  const handleClick = async(course_id, year, semester) => {
    try {
      const response = await axios.delete(`http://localhost:3001/home`, {
        data: {
          course_id: course_id,
          semester: semester,
          year: year
        },
        withCredentials: true
      });
      window.location.reload();
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  
  return (
    <div>
      <Navb />
      <br />
      <br />
      <br />

      <div className="container">
      <h1><center>Welcome to the Sashboard</center></h1>

      <br />
      <br />
      <br />

      <h1> ID: {userInfo.user[0].id}</h1>
      <h1> Name: {userInfo.user[0].name}</h1>
      <h1> Department: {userInfo.user[0].dept_name}</h1>
      <h1> Total Credits: {userInfo.user[0].tot_cred}</h1>

    

    <br />
    <br />

    <h1>Current Courses: </h1>

    <br />

    <table className="table table-hover">
    <thead className="thead-dark">
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Title</th>
      <th scope="col">Department</th>
      <th scope="col">Credits</th> 
      <th scope="col">Drop</th> 
    </tr>
  </thead>
  <tbody>
    {userInfo.current_courses.map((course) => {
        return (
            <tr>
            <th scope="row">{course.course_id}</th>
            <td>{course.title}</td>
            <td>{course.dept_name}</td>
            <td>{course.credits}</td>
            <td><button onClick={() => handleClick(course.course_id, course.year, course.semester)}>Drop</button></td>
            </tr>

        )
    })}
  </tbody>
</table>

    <br />
    <br />


    <h1> Previous Courses: </h1>

    <br />

    {userInfo.courses.map((yearsem) => {
        return (
            <div>
            <h2>Year: {yearsem[0].year}       Semester: {yearsem[0].semester} </h2>

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
                  {yearsem.map((item) => {
                      return (
                          <tr>
                          <th scope="row">{item.course_id}</th>
                          <td>{item.title}</td>
                          <td>{item.dept_name}</td>
                          <td>{item.credits}</td>
                          </tr>
                      )
                  })}
                </tbody>
              </table>
              <br />
              <br />
            </div>

          
        )
    })}

    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
</div>
    </div>
  );
};

export default Sashboard;


