const db = require("../config/db");

exports.getUsers = (_req, res) => {
  const query = "SELECT * FROM users";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query:", err.message);
      return res.status(500).send("Server error");
    }
    res.json(results);
  });
};

// Block a user
exports.blockUser = (req, res) => {
  const userId = req.params.id;

  const query = `UPDATE users SET status = 'blocked' WHERE id = ?`;

  db.query(query, [userId], (err, result) => {
    if (err) return res.status(500).send("Error blocking user");
    res.status(200).send("User blocked successfully");
  });
};

// Unblock a user
exports.unblockUser = (req, res) => {
  const userId = req.params.id;

  const query = `UPDATE users SET status = 'active' WHERE id = ?`;

  db.query(query, [userId], (err, result) => {
    if (err) return res.status(500).send("Error unblocking user");
    res.status(200).send("User unblocked successfully");
  });
};

// Delete a user
exports.deleteUser = (req, res) => {
  const userId = req.params.id;

  const query = `DELETE FROM users WHERE id = ?`;

  db.query(query, [userId], (err, result) => {
    if (err) return res.status(500).send("Error deleting user");
    res.status(200).send("User deleted successfully");
  });
};
