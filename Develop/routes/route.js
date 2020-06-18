const express = require('express');
const router = require("express").Router();
const Workout = require("../models/workout");
const path = require("path");


//html paths

//new workout - works
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
    // .sort({ date: -1 })
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});


router.post('/', async (req, res) => {
  const workout = new Workout({
    type: req.body.type,
    name: req.body.name,
    duration: req.body.duration,
    weight: req.body.weight,
    reps: req.body,reps,
    sets: req.body.sets
  })
  try {
    const newWorkout = await workout.save()
    res.status(201).json(newWorkout)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})


  module.exports = router;