const express = require("express");
const authenticateJWT = require("../middleware/authenticateJWT");
const {
  blockUser,
  unblockUser,
  deleteUser,
  getUsers,
  getLoggedUser,
} = require("../controllers/userController");

const router = express.Router();

router.get("/user-info", authenticateJWT, getLoggedUser);
router.get("/block/:id", authenticateJWT, blockUser);
router.get("/unblock/:id", authenticateJWT, unblockUser);
router.delete("/:id", authenticateJWT, deleteUser);
router.get("/", authenticateJWT, getUsers);

module.exports = router;
