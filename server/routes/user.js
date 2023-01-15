const express = require("express");
const router = express.Router();
const { loginStatus, logoutUser, loginUser, registerUser, getUser } = require("../controllers/user");
const protect = require("../middleware/auth");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/getUser", protect, getUser);
router.get("/loggedin", loginStatus);


module.exports = router;