//Schema

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  day: {
    type: Date,
    required: true,
    default: Date.now
  },

  type: {
    type: {
    type: String
    },

    name: {
      type: String
    },

    duration: {
      type: Number
    },

    weight: {
      type: Number
    },

    reps: {
      type: Number
    },

    sets: {
      type: Number,
      required: "Enter the amount of sets"
    },

    distance: {
      type: Number
    },

    exercises: []
    
  }
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;