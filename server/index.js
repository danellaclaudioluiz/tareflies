const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("./routes/user");
const errorHandler = require("./middleware/error");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT

// Middlewares

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


// Routes Middleware
app.use("/api/users", userRoute);

// Routes
app.get("/", (req, res) => {
    res.send("Homepage");
})

mongoose.set('strictQuery', false);
app.use(errorHandler);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}...`);
    })
  )
  .catch((err) => console.log(err));
