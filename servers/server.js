const express = require("express");
const mysql = require("mysql");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "flight_search",
});

db.connect((err) => {
  if (err) {
    console.error("Database Connection Failed:", err);
  } else {
    console.log("Connected to MySQL Database");
  }
});

// ✅ Registration Route
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  // Check if email already exists
  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (results.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // ✅ Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Insert User into Database
    db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword],
      (err, result) => {
        if (err) {
          return res.status(500).json({ message: "Database error", error: err });
        }
        res.status(201).json({ message: "User registered successfully" });
      }
    );
  });
});

// ✅ Start Server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
