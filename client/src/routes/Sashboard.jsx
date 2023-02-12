import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Sashboard = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(0);
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
  console.log("where");
}, 
  [userId]);
  
  
  return (
    <div>
      <h1>Welcome to the Sashboard</h1>
      <p>You are authenticated and can see this page.{userId}</p>
    </div>
  );
};

export default Sashboard;


