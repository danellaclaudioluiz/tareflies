const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.listen(process.env.PORT || 5000, () => console.log(`Server connected at port ${process.env.PORT}`));