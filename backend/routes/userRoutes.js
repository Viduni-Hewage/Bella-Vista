const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  blockUser,
  unblockUser,
  deleteUser,
} = require("../controllers/userController");
const checkJwt = require("../middleware/authMiddleware");
const adminAuth = require("../middleware/adminAuth");

router.get("/", checkJwt, adminAuth, getAllUsers);
router.patch("/:userId/block", checkJwt, adminAuth, blockUser);
router.patch("/:userId/unblock", checkJwt, adminAuth, unblockUser);
router.delete("/:userId", checkJwt, adminAuth, deleteUser);

module.exports = router;
