const express = require("express");
const router = express.Router();
const { changePassword, forgotPassword, updateUser, loginStatus, logoutUser, loginUser, registerUser, getUser } = require("../controllers/user");
const protect = require("../middleware/auth");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/getUser", protect, getUser);
router.get("/loggedin", loginStatus);
router.patch("/updateuser", protect, updateUser);
router.patch("/changepassword", protect, changePassword);
router.post("/forgotpassword", forgotPassword);


module.exports = router;