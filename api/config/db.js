const mysql = require("mysql2");
require("dotenv").config(); // Load environment variables

// Create MySQL connection
const db = mysql.createConnection({
  uri: process.env.DB_URI,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL connected...");
  const sql = `CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    last_login DATETIME DEFAULT NULL,
    registration_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    status ENUM('active', 'blocked') DEFAULT 'active'
  )`;
  db.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});

module.exports = db;
