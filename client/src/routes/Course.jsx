import axios from 'axios';
import React from 'react'
import { useState,  useEffect } from 'react';

const Course = () => { 

    useEffect(async() => {
        await fetch("https://localhost:6000/course")
        .then((res) => {
            console.log(res.json());
        })
        .catch((err) => {
            console.log(err);
        })
    });

  return (
    <div>
      Course
    </div>
  )
}

export default Course;
