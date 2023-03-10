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
      "SELECT course.course_id, course.title, course.dept_name, course.credits, takes.year, takes.semester FROM user_password, takes, course WHERE takes.course_id = course.course_id AND user_password.ID = $1 AND takes.ID = user_password.ID ORDER BY year DESC, semester DESC;", 
      [req.session.user.id]
    )

    reg_dates = await pool.query(
      "SELECT year, semester FROM reg_dates WHERE end_time <= CURRENT_TIMESTAMP::timestamp ORDER BY end_time DESC;"
    );

    current_year = reg_dates.rows[0]["year"]
    current_sem = reg_dates.rows[0]["semster"]

    // current_year = "2010"
    // current_sem = "Spring"

    const current_courses = await pool.query(
      "SELECT course.course_id, course.title, course.dept_name, course.credits, takes.year, takes.semester FROM user_password, takes, course WHERE takes.course_id = course.course_id AND user_password.ID = $1 AND takes.ID = user_password.ID AND takes.year = $2 AND takes.semester = $3 ORDER BY year DESC, semester DESC;", 
      [req.session.user.id, current_year, current_sem]
    )

    const year_sem = await pool.query(
      "SELECT DISTINCT year, semester FROM user_password, takes WHERE user_password.ID = $1 AND takes.ID = user_password.ID ORDER BY year DESC, semester DESC;",
      [req.session.user.id]
    )

    var courses_sorted = [];
    
    for (let i = 0; i < year_sem.rows.length; i++){
      courses_sorted.push([]);
      for (let j = 0; j < courses.rows.length; j++){
        if (courses.rows[j].year == year_sem.rows[i].year && courses.rows[j].semester == year_sem.rows[i].semester){
          courses_sorted[i].push(courses.rows[j]);
        }
      }
    }


    const output_json = {
      "user": user.rows,
      "courses": courses_sorted,
      "current_courses": current_courses.rows
    }
    res.json(output_json);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.delete("/", authorize, async (req, res) => {
  try {
    console.log("going to delete");
    await pool.query(
      "DELETE FROM takes WHERE course_id = $1 AND year = $2 AND semester = $3;", 
      [req.body.course_id, req.body.year, req.body.semester]
    );

    console.log(req.semester, "delete");

    return res.json("deleted");

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

    current_year = reg_dates.rows[0]["year"]
    current_sem = reg_dates.rows[0]["semster"]

    // current_year = "2010"
    // current_sem = "Spring"

    courses = await pool.query(
      "SELECT course.course_id, title, dept_name, credits, count(sec_id) AS sections FROM course, section WHERE course.course_id = section.course_id AND section.year = $1 AND section.semester = $2 AND (course.course_id NOT IN (SELECT course_id FROM takes WHERE id=$3)) GROUP BY course.course_id, title, dept_name, credits ORDER BY course.course_id;",
      [current_year, current_sem, req.session.user.id]
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

    current_year = reg_dates.rows[0]["year"]
    current_sem = reg_dates.rows[0]["semster"]

    // current_year = "2010"
    // current_sem = "Spring"
    console.log(req.session.user.id)
    const pre_req_data = await pool.query('select prereq_id from prereq where course_id = $1 and prereq_id not in (select course_id from takes where id = $2 and (CAST("year" as INTEGER) < $3 or (year = $3 and semester != $4)));',[req.body.course_id,req.session.user.id,current_year,current_sem])
    pre_req_data_final = pre_req_data.rows
    if(pre_req_data_final.length>0){
        return res.send(JSON.stringify({ "error": "Prerequisite not satisfied" }))
    }

    const time_slot_data_course = await pool.query('select time_slot_id from section where course_id = $4 and sec_id = $5 and year = $2 and semester = $3 and time_slot_id not in (select time_slot_id from takes natural join section where id = $1 and year = $2 and semester= $3);', [req.session.user.id,current_year,current_sem, req.body.course_id, req.body.sec_id])
        time_slot_data_final_course = time_slot_data_course.rows
        // console.log(time_slot_data_final_course)
        if(time_slot_data_final_course.length == 0){
            return res.send(JSON.stringify({ "error": "Time slot conflict" }))
        }

    courses = await pool.query(
      "INSERT INTO takes (ID, course_id, sec_id, semester, year, grade) VALUES ($1, $2, $3, $4, $5, NULL) RETURNING *;",
      [req.session.user.id, req.body.course_id, req.body.sec_id, current_sem, current_year]
    );
   

    res.send(JSON.stringify({ "success": "Course registered successfully!" }))
    // res.json(courses.rows)

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
  
      current_year = reg_dates.rows[0]["year"]
      current_sem = reg_dates.rows[0]["semster"]
  
      // current_year = "2010"
      // current_sem = "Spring"

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