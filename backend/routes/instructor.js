const router = require("express").Router();
const authorize = require("../middleware/authorize");
const pool = require("../db");


router.get("/", async (req, res) => {
    try {
  
      instructors = await pool.query(
        "SELECT * FROM instructor;"
      );
  
      res.json(instructors.rows)
  
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });


router.get("/:id", async (req, res) => {
    try {
  

      id = req.params.id;

      reg_dates = await pool.query(
        "SELECT year, semester FROM reg_dates WHERE end_time <= CURRENT_TIMESTAMP::timestamp ORDER BY end_time DESC;"
      );

      current_year = reg_dates.rows[0]["year"]
      current_sem = reg_dates.rows[0]["semster"]
  
      // current_year = "2010";
      // current_sem = "Spring";

      instructor_info = await pool.query(
        "SELECT ID, name, dept_name FROM instructor WHERE ID = $1;",
        [id]
      );

      current_courses = await pool.query(
        "SELECT teaches.course_id, course.title FROM teaches, course WHERE teaches.course_id = course.course_id AND teaches.id = $1 AND teaches.year = $2 AND teaches.semester = $3 ORDER BY teaches.course_id;",
        [id, current_year, current_sem]
      )
      
      previous_courses = await pool.query(
        "SELECT teaches.course_id, course.title, year, semester FROM teaches, course WHERE teaches.course_id = course.course_id AND teaches.id = $1 AND ((year, semester) NOT IN (SELECT DISTINCT year, semester FROM teaches WHERE year = $2 AND semester = $3)) ORDER BY year DESC, semester DESC;",
        [id, current_year, current_sem]
      )

      output_json = {
        "instructor_info": instructor_info.rows, 
        "current_courses": current_courses.rows,
        "previous_courses": previous_courses.rows
      }
  
      res.json(output_json)
  
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });

module.exports = router;
