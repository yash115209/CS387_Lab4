const router = require("express").Router();
const authorize = require("../middleware/authorize");
const pool = require("../db");


router.get("/", authorize, async (req, res) => {
    try {
  
      courses = await pool.query(
        "SELECT * FROM course;"
      );
  
      res.json(courses.rows)
  
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });


router.get("/running", authorize, async (req, res) => {
    try {

      reg_dates = await pool.query(
        "SELECT year, semester FROM reg_dates WHERE end_time <= CURRENT_TIMESTAMP::timestamp ORDER BY end_time DESC;"
      );

      current_year = reg_dates.rows[0]["year"]
      current_sem = reg_dates.rows[0]["semster"]
  
      // current_year = "2010";
      // current_sem = "Spring";

      dept_names = await pool.query(
        "SELECT DISTINCT dept_name FROM course, section WHERE course.course_id = section.course_id AND section.year = $1 AND section.semester = $2;",
        [current_year, current_sem]
      );

      output_json = {
        dept_names: []
      }

      for(let i=0; i<dept_names.rows.length; i++){
        output_json.dept_names.push(dept_names.rows[i]["dept_name"]);
      }

  
      res.json(output_json);
  
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });


  router.get("/running/:dept_name", authorize, async (req, res) => {
    try {

      dept_name = req.params.dept_name;


      console.log("success");
      reg_dates = await pool.query(
        "SELECT year, semester FROM reg_dates WHERE end_time <= CURRENT_TIMESTAMP::timestamp ORDER BY end_time DESC;"
      );
  
      current_year = reg_dates.rows[0]["year"]
      current_sem = reg_dates.rows[0]["semster"]
  
      // current_year = "2010"
      // current_sem = "Spring"
  
      courses = await pool.query(
        "SELECT course.course_id, title, credits, sec_id, dept_name FROM course, section WHERE course.course_id = section.course_id AND section.year = $1 AND section.semester = $2 AND course.dept_name = $3;",
        [current_year, current_sem, dept_name]
      );
      res.json(courses.rows)
  
  
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });


router.get("/:id", authorize, async (req, res) => {
    try {

      course_id = req.params.id;

      course_info = await pool.query(
        "SELECT course.course_id, course.title, course.credits FROM course WHERE course.course_id = $1", 
        [course_id]
      );

      prereq_info = await pool.query(
        "SELECT course.course_id, course.title, course.credits FROM course, prereq WHERE prereq.course_id = $1 AND course.course_id = prereq.prereq_id", 
        [course_id]
      );

      reg_dates = await pool.query(
        "SELECT year, semester FROM reg_dates WHERE end_time <= CURRENT_TIMESTAMP::timestamp ORDER BY end_time DESC;"
      );
  
      current_year = reg_dates.rows[0]["year"]
      current_sem = reg_dates.rows[0]["semster"]
  
      // current_year = "2010"
      // current_sem = "Spring"

      instructor_info = await pool.query(
        "SELECT instructor.ID, instructor.name FROM teaches, instructor WHERE teaches.ID = instructor.ID AND teaches.course_id = $1 AND teaches.year = $2 AND teaches.semester = $3;",
        [course_id, current_year, current_sem]
      );

      output_json = {
        "course_info": course_info.rows,
        "prereq_info": prereq_info.rows,
        "instructor_info": instructor_info.rows
      }
  
      res.json(output_json)
  
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });

module.exports = router;