const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const db = require("./models");
const app = express();
const PORT = process.env.PORT || 3000

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/workout";
mongoose.connect(MONGODB_URI, {useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false});

const database = mongoose.connection
database.on('open', () => console.log('Connected to Database'))


//routes
app.get("/api/workouts", function (req, res) {
  db.Workout.find({}).then(function (data) {
    res.json(data);
  })
});

// routing to the workout UI dashboard
app.get("/stats", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/stats.html"))
});  

// routing to the fitness tracker UI where users can interact with the app
app.get("/exercise", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/exercise.html"))
});

app.put("/api/workouts/:id", function (req, res) {
  db.Workout.findByIdAndUpdate(
    req.params.id,
    {
      $push: { exercises: req.body }
    }).then(function (data) {
      res.json(data);
    })
});

app.get("/api/workouts/range", function (req, res) {
  db.Workout.find({}).then(function (data) {
    res.json(data);
  })
});

app.post("/api/workouts", function ({ body }, res) {
  db.Workout.create(body).then(function (data) {
    res.json(data);
  })
});

app.get("/all", function (req, res) {
  db.Workout.find({}), (function (error, data) {
    if (error) {
      res.send(error)
    } else {
      res.json(data);
    }
  })
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`)
});