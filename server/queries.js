const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "ogrenci",
  password: "123456",
  port: 5432,
});

const saveStudent = (request, response) => {
  const student = request.body.s;
  let name = student.name;
  let number = student.studentNumber;
  console.log(request.body);
  if (number != "Öğrenci No") {
    try {
      pool.query(
        "INSERT INTO Students (name, student_number) VALUES ($1, $2) ON CONFLICT (student_number) DO NOTHING",
        [name, number],
        (error, results) => {
          if (error) {
            throw error;
          }
          response.status(201).send(`Student added`);
        }
      );
    } catch (err) {
      console.log(student);
      console.log(err);
    }
  }
};

const saveClassToStudent = (request, response) => {
  let student = request.body.s;
  let _class = request.body.c;
  let number = student.studentNumber;
  console.log(request.body);
  if (number != "Öğrenci No") {
    try {
      pool.query(
        "UPDATE students SET sinav_sinifi = $1 WHERE student_number = $2",
        [_class, number],
        (error, results) => {
          if (error) {
            throw error;
          }
          response
            .status(201)
            .send("Class added to student's data succesfully.");
        }
      );
    } catch (err) {}
  }
};

const getClassData = (request, response) => {
  const id = parseInt(request.params.id)

  try {
    pool.query(
      "SELECT * FROM students WHERE sinav_sinifi = $1",
      [id],
      (error, results) => {
        if (error) {
          throw error;
        }
        response
          .status(200)
          .json(results.rows)
      }
    );
  } catch (err) {console.log(err.message)}
}

const getStudentData = (request, response) => {
  const ogrNo = parseInt(request.params.id)

  try {
    pool.query(
      "SELECT * FROM students WHERE student_number = $1",
      [ogrNo],
      (error, results) => {
        if (error) {
          throw error;
        }
        response
          .status(200)
          .json(results.rows)
      }
    );
  } catch (err) {console.log(err.message)}
}

module.exports = {
  saveStudent,
  saveClassToStudent,
  getClassData,
  getStudentData
};
