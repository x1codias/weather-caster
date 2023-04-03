const express = require("express");
const mongoose = require("mongoose");
const dotEnv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const hpp = require("hpp");
const mongoSanitizer = require("express-mongo-sanitize");

const ErrorHandler = require("./models/error-handler");
const weatherRoutes = require("./routes/weather-routes");
const userRoutes = require("./routes/user-routes");

dotEnv.config({ path: "./.env" });

mongoose.set("strictQuery", true);

const app = express();

// Parse incoming json requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Enable cors, set security http headers
app.use(cors());

// Data sanitization agains NoSQL query injection
app.use(mongoSanitizer());

// Prevent parameter polution
app.use(hpp());

app.use("/api/users", userRoutes);
app.use("/api/weather", weatherRoutes);

// handle unkown routes
app.use((req, res, next) => {
  return next(new ErrorHandler("Could not find this route", 404));
});

// handle server side errors
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unkown error has occurred!" });
});

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@weathercluster.plc3rsr.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(5000, () => {
      console.log("Listening on port 5000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
