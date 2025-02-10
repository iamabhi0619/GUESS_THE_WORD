const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const wordSchema = new Schema({
  wordId: { type: String, required: true, unique: true },
  word: { type: String, required: true, unique: true },
  hint: { type: String, required: true },
  meaning: { type: String, required: true },
  level: { type: Number, required: true },
});

const Word = mongoose.model("Word", wordSchema);

module.exports = Word;
