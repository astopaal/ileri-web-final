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
// students.map((s) => {
//   let number = String(s.id);
//   let name = String(s.name);

//   try {
//     pool.query(
//       "INSERT INTO Students (name, student_number) VALUES ($1, $2) ON CONFLICT (student_number) DO NOTHING",
//       [name, number],
//       (error, results) => {
//         if (error) {
//           throw error;
//         }
//         response
//           .status(201)
//           .send(`Student added with ID: ${results.rows[0].id}`);
//       }
//     );
//   } catch (err) {
//     console.log(err);
//   }
// });

module.exports = {
  saveStudent,
};
