const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "ogrenci",
  password: "123456",
  port: 5432,
});

const saveStudent = (request, response) => {
  const students = request.body.students;
  console.log(request.body)
  //   students.map((s) => {
  //     let number = String(s.id);
  //     let name = String(s.name);

  //     pool.query(
  //       "INSERT INTO Students (name, student_number) VALUES ($1, $2) ON CONFLICT (student_number) DO NOTHING",
  //       [number, name],
  //       (error, results) => {
  //         if (error) {
  //           throw error;
  //         }
  //         response
  //           .status(201)
  //           .send(`Student added with ID: ${results.rows[0].id}`);
  //       }
  //     );
  //   });
};

module.exports = {
  saveStudent,
};
