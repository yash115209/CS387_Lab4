import React, { useState, createContext } from "react";

export const CoursesContext = createContext();

export const CoursesContextProvider = (props) => {
  const [courses, setCourses] = useState([]);
  return (
    <CoursesContext.Provider
      value={{
        courses,
        setCourses,
      }}
    >
      {props.children}
    </CoursesContext.Provider>
  );
};