const router = require("express").Router();
const authorize = require("../middleware/authorize");
const pool = require("../db");

router.get("/", authorize, async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT * FROM user_password, student WHERE user_password.ID = $1 AND student.ID = user_password.ID;",
      [req.user] 
    ); 
    const courses = await pool.query(
      "SELECT * FROM user_password, takes WHERE user_password.ID = $1 AND takes.ID = user_password.ID ORDER BY year DESC, semester DESC;", 
      [req.user]
    )
    const output_json = {
      "user": user.rows,
      "courses": courses.rows
    }
    res.json(output_json);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/drop", authorize, async (req, res) => {
  try {

    await pool.query(
      "DELETE FROM takes WHERE course_id = $1 AND year = $2 AND semester = $3;", 
      [req.body.course_id, req.body.year, req.body.semester]
    );

    console.log(req)

    res.json("deleted")

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/registration", authorize, async (req, res) => {
  try {

    courses = await pool.query(
      "SELECT course.course_id, title, dept_name, credits, sec_id FROM course, section WHERE course.course_id = section.course_id ORDER BY course.course_id;"
    );
    res.json(courses.rows)

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
})

//incomplete

router.post("/registration/register", authorize, async (req, res) => {
  try {

    courses = await pool.query(
      "INSERT INTO takes (ID, course_id, sec_id, semester, year, grade) VALUES ($1, $2, $3, $4, ) RETURNING *;"
    );
    res.json(courses.rows)

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
})

module.exports = router;