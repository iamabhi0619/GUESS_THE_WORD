const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    currentLevel: {
      type: Number,
      min: 1,
      max: 6,
      default: 1,
    },
    score: { type: Number, default: 0, min: 0, max: 100 },
    points: { type: Number, default: 0},
    avatar: {type: String, default: "https://avatar.iran.liara.run/public"},
    totalSkipped: { type: Number, default: 0 },
    totalHintsUsed: { type: Number, default: 0 },
    currentRemainingHints: { type: Number, default: 3 },
    questionsSolved: {
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

module.exports = mongoose.model("User", userSchema);