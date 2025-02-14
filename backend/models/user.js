const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const historySchema = new Schema({
  sessionId: { type: String, required: true }, // Unique identifier for the session
  startTime: { type: Date, required: true }, // Start time of the session
  endTime: { type: Date, required: true }, // End time of the session
  totalTime: { type: String, required: true }, // Total time spent in the session (in HH:MM:SS format)
  score: { type: Number, required: true }, // Score achieved in the session
});

const userSchema = new Schema(
  {
    userId: { type: String, required: true }, // Unique identifier for the user
    name: { type: String, required: true }, // Name of the user
    currentLevel: {
      type: Number,
      min: 1,
      max: 6,
      default: 1,
    }, // Default level
    score: { type: Number, default: 0, min: 0, max: 100 }, // Default score is 0
    points: { type: Number, default: 0},
    avatar: {type: String, default: "https://avatar.iran.liara.run/public"},
    totalSkipped: { type: Number, default: 0 }, // Default skipped questions count
    totalHintsUsed: { type: Number, default: 0 }, // Total hints used by the user
    currentRemainingHints: { type: Number, default: 3 }, // Total remaining hints (default 5, can be adjusted)
    questionsSolved: {
      // Default for questions solved
      easy: { type: Number, default: 0 },
      medium: { type: Number, default: 0 },
      hard: { type: Number, default: 0 },
    },
    seenWords: [{ type: String }],
    current: { type: Schema.Types.Mixed, default: {} },
    questions: [],
    history: [],
  },
  { timestamps: true }
);

// Export the User model
module.exports = mongoose.model("User", userSchema);
