const express = require("express");
const router = express.Router();
const { logoutUser, loginUser, registerUser } = require("../controllers/user")

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);

module.exports = router;