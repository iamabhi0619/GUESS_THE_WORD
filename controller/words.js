const words = require("../data.json");

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

exports.getWords = (req, res) => {
  let data = req.body;
  console.log();
  let level = "easy";
  if (data.easy <= 20) {
    level = "easy";
    // data.easy++;
  } else if (data.medium <= 10) {
    level = "medium";
    // data.medium++;
  } else {
    level = "hard";
    // data.hard++;
  }
  console.log("Selected level:", level);
  const wordsarr = words[level];
  const getUniqueRandomIndex = (length, usedIndexes) => {
    let rand;
    do {
      rand = Math.floor(Math.random() * length);
    } while (usedIndexes.includes(rand));
    return rand;
  };
  const randomIndex = getUniqueRandomIndex(
    wordsarr.length,
    level === "easy"
      ? data.easyQuestions
      : level === "medium"
      ? data.mediumQuestions
      : data.hardQuestions
  );

  console.log("Selected index:", randomIndex);
  console.log("Selected word:", wordsarr[randomIndex]);
  const word = scrambleWords(wordsarr[randomIndex]).toLowerCase();
  console.log("Scrambled word:", word);
  let worddata = { word: word, type: level, w_id: randomIndex };
  let newPaylod = { ...data, cquestion: worddata };
  res.json({ newPaylod: newPaylod, word: worddata });
};

exports.newUser = (req, res) => {
  let name = req.body.name;
  console.log(name);
  let progress = {
    name,
    points: 0,
    score: 0,
    hint: 0,
    easy: 0,
    clevel: "easy",
    cquestion: {
      word: "apple",
      type: "easy",
      w_id: 0,
    },
    easyQuestions: [],
    medium: 0,
    mediumQuestions: [],
    hard: 0,
    hardQuestions: [],
  };
  res.json({ progress: progress });
};

exports.checkWord = (req, res) => {
  let data = req.body;
  console.log(data);
  
  // Get the words array for the current difficulty level
  const wordsarr = words[data.progress.cquestion.type];
  
  // Get the correct word and the user's guess
  const correct = wordsarr[data.progress.cquestion.w_id].toLowerCase();
  const guess = data.guess.toLowerCase();
  
  // Create a copy of progress to update it
  let updatedProgress = { ...data.progress };
  
  // Check if the guess is correct
  if (correct === guess) {
    updatedProgress.points = updatedProgress.points + 10; // Update points in updatedProgress
    res.json({ correct: true, progress: updatedProgress }); // Use updatedProgress in the response
  } else {
    res.json({ correct: false, progress: updatedProgress }); // Respond with updatedProgress even if wrong
  }
};


