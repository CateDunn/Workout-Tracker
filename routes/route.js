const express = require('express');
const router = require("express").Router();
const Workout = require("../models/workout");
const path = require("path");


//html paths

//new workout
router.get('/exercise', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/exercise.html'));
});

// stats
router.get('/stats', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/stats.html'));
});


//get all workouts
router.get("/api/workouts", (req, res) => {
  Workout.find({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

//add new workout
router.post("/api/workouts", function ({ body }, res) {
  db.Workout.create(body).then(function (data) {
    res.json(data);
  })
});


  module.exports = router;