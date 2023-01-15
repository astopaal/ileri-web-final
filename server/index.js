const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dbHelper = require("./queries");

const PORT = 8888;
const app = express();

var corsOptions = {
  origin: "http://localhost:5173",
};

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Success" });
});

app.get("/class-data/:id", dbHelper.getClassData);

app.get("/get-student-data/:id", dbHelper.getStudentData);

app.post("/class-data", dbHelper.getClassData);

app.post("/save-students", dbHelper.saveStudent);

app.post("/update-class", dbHelper.saveClassToStudent);

app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor...`);
});
