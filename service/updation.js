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
const getUniqueRandomIndex = (length, usedIndexes = []) => {
  let rand;
  do {
    rand = Math.floor(Math.random() * length);
  } while (usedIndexes.includes(rand));
  return rand;
};
calculateScore = (e_correct, m_correct, h_correct) => {
  const easyMarks = 5;
  const mediumMarks = 10;
  const hardMarks = 15;
  const maxEasy = 20;
  const maxMedium = 10;
  const maxHard = 5;
  const totalMaxMarks = (maxEasy * easyMarks) + (maxMedium * mediumMarks) + (maxHard * hardMarks);
  const userScore = (e_correct * easyMarks) + (m_correct * mediumMarks) + (h_correct * hardMarks);

  const scoreOutOf100 = ((userScore / totalMaxMarks) * 100).toFixed(2);

  return scoreOutOf100;
}

exports.updateScore = (data) =>{
  const level = data.cquestion.type;
  if(level == 'easy'){
    data.easy = data.easy+1;
    data.easyQuestions.push(data.cquestion.w_id);
    data.points = data.points+5
  }
  else if (level == 'medium'){
    data.medium = data.medium+1;
    data.mediumQuestions.push(data.cquestion.w_id);
    data.points = data.points+10
  } else {
    data.hard = data.hard+1;
    data.hardQuestions.push(data.cquestion.w_id);
    data.points = data.points+5
  }
  data.score = calculateScore(data.easy,data.medium,data.hard);
  return data;
}

exports.getNewWord = (data) => {
  let level;
  if (data.easy <= 19) {
    level = "easy";
  } else if (data.medium <= 9) {
    level = "medium";
  } else {
    level = "hard";
  }
  console.log("Selected level:", level);
  const wordsarr = words[level];
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
  let newPaylod = {
    ...data,
    cquestion: worddata,
    try: 0,
    meaning: "",
    solved: false,
    clevel: level,
  };
  return newPaylod;
};