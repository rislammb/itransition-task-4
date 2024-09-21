const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
require("dotenv").config();

// Register user
exports.register = (req, res) => {
  const { name, email, password } = req.body;

  // Hash password before saving
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).send("Error in hashing password");

    const query = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;

    db.query(query, [name, email, hashedPassword], (err) => {
      if (err) return res.status(400).json({ error: err.message });
      res.status(200).send("User registered successfully");
    });
  });
};

// Login user
exports.login = (req, res) => {
  const { email, password } = req.body;

  // Check if the user exists in the database
  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (results.length === 0) {
      return res.status(400).json({ error: "User not found" });
    }

    const user = results[0];

    if (user.status === "blocked") {
      return res.status(403).json({ error: "Your account is blocked." });
    }

    // Compare the provided password with the hashed password in the database
    bcrypt.compare(password, user.password, (_err, isMatch) => {
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Create a JWT token
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRATION, // Token expires in 1 hour
        }
      );

      const updateLoginTimeQuery =
        "UPDATE users SET last_login = NOW() WHERE id = ?";
      db.query(updateLoginTimeQuery, [user.id], (err) => {
        if (err) {
          return res.status(500).json({ error: "Error updating login time" });
        }
      });

      // Send the token to the client
      res.json({ token, id: user.id, name: user.name, email: user.email });
    });
  });
};
