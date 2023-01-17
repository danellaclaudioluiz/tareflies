const express = require("express");
const router = express.Router();
const { resetPassword, changePassword, forgotPassword, updateUser, loginStatus, logout, loginUser, registerUser, getUser } = require("../controllers/user");
const protect = require("../middleware/auth");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);
router.get("/getUser", protect, getUser);
router.get("/loggedin", loginStatus);
router.patch("/updateuser", protect, updateUser);
router.patch("/changepassword", protect, changePassword);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:resetToken", resetPassword);


module.exports = router;