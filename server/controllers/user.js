const asyncHandler = require("express-async-handler");

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please fill in all required fields");
      }
    res.send("Register User");
});

module.exports = {
    registerUser,
}