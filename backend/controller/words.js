const User = require("../models/user");
const Word = require("../models/word");
const ScoreUpdate = require("../service/update");

const getRandomWord = async (level, seenWords) => {
  let words = await Word.find({ level }).exec();
  if (seenWords.length > 0) {
    words = words.filter((word) => !seenWords.includes(word.wordId));
  }
  if (words.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
};
const scrambleWords = (word) => {
  let arr = word.split("");
  let n = arr.length;
  for (let pass = 0; pass < n * 2; pass++) {
    let i = Math.floor(Math.random() * n);
    let j = Math.floor(Math.random() * n);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join("");
};

exports.getWords = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (
      user.current &&
      Object.keys(user.current).length > 0 &&
      !user.current.isSolved
    ) {
      return res.status(200).json(user.current);
    }
    let level;
    if (user.questionsSolved.easy <= 10) {
      level = 1;
    } else if (user.questionsSolved.easy <= 20) {
      level = 2;
    } else if (user.questionsSolved.medium <= 7) {
      level = 3;
    } else if (user.questionsSolved.medium <= 20) {
      level = 4;
    } else if (user.questionsSolved.hard <= 10) {
      level = 5;
    } else if (user.questionsSolved.hard <= 25) {
      level = 6;
    } else {
      // random between level 1-6
      level = Math.floor(Math.random() * 6) + 1;
    }
    const gword = await getRandomWord(level, user.seenWords);
    if (!gword) {
      return res
        .status(404)
        .json({ message: "No new words found for this level" });
    }
    user.seenWords.push(gword.wordId);
    const scrambledWord = scrambleWords(gword.word);
    const word = {
      wordId: gword.wordId,
      scrambleWords: scrambledWord,
      isSolved: false,
      isSkipped: false,
      isHint: false,
      difficulty: gword.level,
      try: 0,
    };
    user.current = word;
    user.questions.unshift(word);
    await user.save();
    res.status(200).json(word);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving words", error: error.message });
  }
};

exports.checkWord = async (req, res) => {
  try {
    const { guessWord, time } = req.body;
    const userId = req.params.userId;
    let user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!user.current || !user.current.wordId) {
      return res
        .status(404)
        .json({ message: "No current word found for user" });
    }
    const wordId = user.current.wordId;
    const word = await Word.findOne({ wordId });
    if (!word) {
      return res.status(404).json({ message: "Word not found" });
    }
    if (word.word.toLocaleLowerCase() === guessWord.toLocaleLowerCase()) {
      user = ScoreUpdate.scoreUpdate(user, word, true, time);
      await user.save();
      res.status(200).json({
        status: true,
        message: "Right guess! Well done!",
        word: user.current,
        score: {
          score: user.score,
          points: user.points,
          currentRemainingHints: user.currentRemainingHints,
          questionsSolved: user.questionsSolved,
        },
      });
    } else {
      user = ScoreUpdate.scoreUpdate(user, word, false);
      await user.save();
      res
        .status(200)
        .json({ status: false, message: "Wrong guess. Try again!" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error checking word", error: error.message });
  }
};

exports.getHint = async (req, res) => {
  try {
    const userId = req.params.userId;
    let user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // if (user.currentRemainingHints == 0) {
    //   const data = {
    //     isHint: true,
    //     hint: "No remaining hints available",
    //   };
    //   return res.status(200).json({ data });
    // }
    const wordId = user.current.wordId;
    const word = await Word.findOne({ wordId });
    user = ScoreUpdate.getHintUpdate(user, word);
    console.log(user);
    await user.save();
    const score = {
      score: user.score,
      points: user.points,
      questionsSolved: user.questionsSolved,
      currentRemainingHints: user.currentRemainingHints,
      hint: user.currentRemainingHints,
    };
    res.status(200).json({ word: user.current, score: score });
  } catch (error) {}
};
