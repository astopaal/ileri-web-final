const express = require("express");
const cors = require("cors");

const PORT = 8888
const app = express();

var corsOptions = {
  origin: "http://localhost:5173"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "Success" });
  });

app.listen(PORT, () => {
    console.log(`Server ${PORT} portunda çalışıyor...`);
  });