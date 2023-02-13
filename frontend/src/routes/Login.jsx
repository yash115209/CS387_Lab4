import React, { Fragment, useState, useEffect } from "react";
import { Link, Redirect, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";


const Login = () => {

    const navigate = useNavigate();
  console.log("sashboard");
  useEffect(() => {
    console.log("inlogin");
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
        if(parseStatus == 200){
          console.log("Dashboard go");
          navigate("/home");
        }
        console.log(parseReq, "yoyo");
  } catch(err){
    console.error(err.message);
  }}
  checkAuth();
}, 
  []);

    const [inputs, setInputs] = useState({
        id: "",
        password: ""
    });

        const { id, password } = inputs;
      
        const onChange = e =>
          setInputs({ ...inputs, [e.target.name]: e.target.value });
      
        const onSubmitForm = async (e) => {
            console.log("submitted formd");
          e.preventDefault();
          try {
            const body = { id, password };
            const response = await fetch(
              "http://localhost:3001/auth/login",
              {
                method: "POST",
                headers: {
                  "Content-type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify(body)
              }
            );

            console.log(response);
      
            const parseRes = await response.json();
            console.log(parseRes);
            try{
            if (parseRes.user.id) {
              toast.success("Logged in Successfully");
              console.log("YO WE LOG IN");
              navigate("/home");
            } else {
              console.log("NO");
              toast.error(parseRes);
            }} catch(err){
                navigate("/login");
                window.location.reload();
            }
          } catch (err) {
            console.error(err.message);
          }
        };
        //if already logged in, 
    return (
        <Fragment>
          <div className="container">
          <h1 className="mt-5 text-center">Logins</h1>
          <form onSubmit={onSubmitForm}>
            <input
              type="text"
              name="id"
              value={id}
              onChange={e => onChange(e)}
              className="form-control my-3"
            />
            <input
              type="password"
              name="password"
              value={password}
              onChange={e => onChange(e)}
              className="form-control my-3"
            />
            <button class="btn btn-success btn-block">Submit</button>
          </form>
          </div>
        </Fragment>
    );
};

export default Login;