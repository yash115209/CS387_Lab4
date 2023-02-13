const router = require("express").Router();
const authorize = require("../middleware/authorize");
const pool = require("../db");

router.get("/", authorize, async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT * FROM user_password, student WHERE user_password.ID = $1 AND student.ID = user_password.ID;",
      [req.session.user.id] 
    ); 
    const courses = await pool.query(
      "SELECT * FROM user_password, takes WHERE user_password.ID = $1 AND takes.ID = user_password.ID ORDER BY year DESC, semester DESC;", 
      [req.session.user.id]
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

router.delete("/", authorize, async (req, res) => {
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

    reg_dates = await pool.query(
      "SELECT year, semester FROM reg_dates WHERE end_time <= CURRENT_TIMESTAMP::timestamp ORDER BY end_time DESC;"
    );

    // current_year = reg_dates.rows[0]["year"]
    // current_sem = reg_dates.rows[0]["semster"]

    current_year = "2010"
    current_sem = "Spring"

    courses = await pool.query(
      "SELECT course.course_id, title, dept_name, credits, count(sec_id) AS sections FROM course, section WHERE course.course_id = section.course_id AND section.year = $1 AND section.semester = $2 GROUP BY course.course_id, title, dept_name, credits ORDER BY course.course_id;",
      [current_year, current_sem]
    );

      for (let i=0; i<courses.rows.length; i++){
        temp_sections = [];
        for (let j=1; j<=courses.rows[i].sections; j++){
          temp_sections.push(j);
        }
        courses.rows[i].sections = temp_sections;
      }


    return res.json(courses.rows)

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
})

router.post("/registration", authorize, async (req, res) => {
  try {

    reg_dates = await pool.query(
      "SELECT year, semester FROM reg_dates WHERE end_time <= CURRENT_TIMESTAMP::timestamp ORDER BY end_time DESC;"
    );

    // current_year = reg_dates.rows[0]["year"]
    // current_sem = reg_dates.rows[0]["semster"]

    current_year = "2010"
    current_sem = "Spring"
    console.log(req.session.user.id)

    courses = await pool.query(
      "INSERT INTO takes (ID, course_id, sec_id, semester, year, grade) VALUES ($1, $2, $3, $4, $5, NULL) RETURNING *;",
      [req.session.user.id, req.body.course_id, req.body.sec_id, current_sem, current_year]
    );
    res.json(courses.rows)

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post('/search', authorize, async(req,res) => {
    
  try {
      // user_id = req.session.user.id
      // string_match = req.body.course_id
      reg_dates = await pool.query(
        "SELECT year, semester FROM reg_dates WHERE end_time <= CURRENT_TIMESTAMP::timestamp ORDER BY end_time DESC;"
      );
  
      // current_year = reg_dates.rows[0]["year"]
      // current_sem = reg_dates.rows[0]["semster"]
  
      current_year = "2010"
      current_sem = "Spring"

      const data = await pool.query(
          'SELECT course_id,title, sec_id, credits FROM section natural join course WHERE course_id NOT IN (SELECT course_id FROM takes WHERE id=$1 AND year=$2 AND semester=$3) AND semester=$3 AND year=$2 AND (course_id ILIKE \'%\' || $4 || \'%\' OR title ILIKE \'%\' || $4 || \'%\');', [req.session.user.id, current_year,current_sem, req.body.course_id]
      )   

  res.json(data.rows)
  } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
  }


})


module.exports = router;