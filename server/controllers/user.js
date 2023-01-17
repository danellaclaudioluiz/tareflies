const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Token = require("../models/token");
const crypto = require('crypto');
const sendMail = require("../utils/sendMail");

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, { expiresIn: "1d" });
}

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please fill in all required fields");
    }

    if (password.length < 6) {
        res.status(400);
        throw new Error("Password must be up to 6 characters");
    }

    const userExists = await User.findOne({email});
    if (userExists) {
        res.status(400);
        throw new Error("Email has already been registered.");
    }

    const user = await User.create({
        name, email, password
    });

    const token = generateToken(user._id);

    res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400),
        sameSite: "none",
        secure: true,
    })

    if (user) {
        const { _id, name, email, photo, phone, bio } = user;
        res.status(201).json({
            _id, name, email, photo, phone, bio, token
        })
    } else {
    res.status(400)
    throw new Error("Invalid user data")
    }
});

const loginUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error("Please add email and password.");
    }

    const user = await User.findOne({email});

    if (!user) {
        res.status(400);
        throw new Error("User not found, please signup.");
    }

    const passwordIsCorrect = await bcrypt.compare(password, user.password);

    if (user && passwordIsCorrect) {
        const { _id, name, email, photo, phone, bio } = user;

        const token = generateToken(user._id);

        res.cookie("token", token, {
            path: "/",
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 86400),
            sameSite: "none",
            secure: true,
        })

        res.status(200).json({
            _id, name, email, photo, phone, bio, token
        })
    } else {
        res.status(400);
        throw new Error("Invalid email or password.");
    }
});

const logoutUser = asyncHandler(async(req, res) => {
    res.cookie("token", "", {
        path: "/",
        httpOnly: true,
        expires: new Date(0),
        sameSite: "none",
        secure: true,
    });
    return res.status(200).json({ message: "Successfully Logged Out" })
})

const getUser = asyncHandler(async(req,res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        const { _id, name, email, photo, phone, bio } = user;
        res.status(200).json({
            _id, name, email, photo, phone, bio,
        })
    } else {
        res.status(400)
        throw new Error("User not found")
    }
});

const loginStatus = asyncHandler(async(req, res) => {
    const token = req.cookies.token;
    
    if (!token){
        return res.json(false);
    }

    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (verifiedToken) {
        return res.json(true)
    }
     
    return res.json(false);
});

const updateUser = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id);
    
    if (user) {
        const { name, email, photo, phone, bio } = user;

        user.email = email;
        user.name = req.body.name || name;
        user.phone = req.body.phone || phone;
        user.bio = req.body.bio || bio;
        user.photo = req.body.photo || photo;

        const updatedUser = await user.save();
        res.status(200).json({
            _id: updatedUser._id, 
            name: updatedUser.name, 
            email: updatedUser.email, 
            photo: updatedUser.photo, 
            phone: updatedUser.phone,  
            bio: updatedUser.bio
        })
    } else {
        res.status(404)
        throw new Error("User not found")
    }
})

const resetPassword = asyncHandler(async (req, res) => {
    const { resetToken } = req.params;
    const { password } = req.body;
    // console.log(password);
    // return console.log(resetToken);
  
    // Compare token in URL params to hashed token
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
  
    // Find token in db
    const userToken = await Token.findOne({
      token: resetPasswordToken,
      expiresAt: { $gt: Date.now() },
    });
    // console.log(userToken);
  
    if (!userToken) {
      res.status(404);
      throw new Error("Invalid or Expired token");
    }
  
    // Find User
    const user = await User.findOne({ _id: userToken.userId });
    user.password = password;
    await user.save();
    res.status(201).json({
      message: "Password Reset Successful, Please Login",
    });
  });

const changePassword = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id); 

    if (!user) {
        res.status(400);
        throw new Error("User not found, please signup")
    }

    const { oldPassword, password } = req.body;
    if (!oldPassword || !password) {
        res.status(404);
        throw new Error("Please, add old and new password.")
    }

    const passwordIsCorrect = await bcrypt.compare(oldPassword, user.password);

    if(user && passwordIsCorrect) {
        user.password = password;
        await user.save();
        res.status(200).send("Password changed sucessfully.")
    } else {
        res.status(400);
        throw new Error("Old password is incorrect.")
    }
});

const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if(!user) {
        res.status(404);
        throw new Error("User does not exist")
    }

    let resetToken = crypto.randomBytes(32).toString("hex") + user._id;
    const hashedResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    
    await new Token({
        userId: user._id,
        token: hashedResetToken,
        createdAt: Date.now(),
        expiresAt: Date.now() + 30 * (60 * 1000) // thirty minutes
    }).save();

    const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;

    const message = `
        <h2>Hello ${user.name}</h2>
        <p>Please use the url below to reset your password</p>
        <p>This reset link is valid only 30 minutes.<p>
        <a href=${resetUrl} clicktracking="off">${resetUrl}</a>

        <p>Regards...</p>
        <p>${process.env.NAME_APP} Team</p>
    `;

    const subject = `Password Reset Request - ${process.env.NAME_APP}`;
    const sendTo = user.email;
    const sendFrom = process.env.EMAIL_USER;

    try {
        sendMail(subject, message, sendTo, sendFrom)
        .then(() => res.status(200).json({success: true, message: "Reset email sent."}))
        
    } catch (error) {
        res.status(500);
        throw new Error("Email not sent, please try again.")
    }
});

module.exports = {
    loginUser,
    logoutUser,
    registerUser,
    getUser,
    loginStatus,
    updateUser,
    forgotPassword,
    changePassword,
    resetPassword
}