const words = require("../data.json");
const wordService = require("../service/updation.js");

exports.getWords = (req, res) => {
  let data = req.body;
  let newPaylod = wordService.getNewWord(data);
  res.json({ progress: newPaylod });
};

exports.newUser = (req, res) => {
  let name = req.body.name;
  let progress = {
    name,
    points: 0,
    score: 0,
    hint: 0,
    easy: 0,
    cquestion: {},
    easyQuestions: [],
    medium: 0,
    mediumQuestions: [],
    hard: 0,
    hardQuestions: [],
  };
  progress = wordService.getNewWord(progress);
  res.json({ progress: progress });
};

exports.checkWord = async (req, res) => {
  let data = req.body;
  let updatedProgress = req.body.progress
  try {
    const wordsarr = words[updatedProgress.cquestion.type];
    const correct = wordsarr[updatedProgress.cquestion.w_id].toLowerCase();
    const guess = data.guess.toLowerCase();
    if (correct === guess) {
      try {
        // const response = await fetch(`https://api.api-ninjas.com/v1/dictionary?word=${correct}`, {
        //   headers: { "X-Api-Key": "hcj3Nhv2ukkU8J2SxBIs2w" }
        // });
        
        // if (!response.ok) {
        //   throw new Error(`HTTP error! status: ${response.status}`);
        // }
        // const responseData = await response.json();
        let meaning = 'No definition found';
        // if (responseData && responseData.definition) {
        //   const splitDefinition = responseData.definition.split("1. ");
        //   if (splitDefinition[1]) {
        //     meaning = splitDefinition[1].split(';')[0].trim();
        //   }
        // }
        updatedProgress = { 
          ...updatedProgress,
          cquestion: { ...updatedProgress.cquestion, word: correct },
          meaning: meaning,
          solved: true
        };
        updatedProgress = wordService.updateScore(updatedProgress);
        return res.json(updatedProgress);
      } catch (error) {
        console.error('Error fetching dictionary data:', error);
        updatedProgress = {
          ...updatedProgress,
          error: 'Failed to fetch dictionary data'
        };
        return res.json(updatedProgress);
      }
    } else {
      updatedProgress = {
        ...updatedProgress,
        try: (updatedProgress.try || 0) + 1
      };
      return res.json(updatedProgress);
    }

  } catch (error) {
    console.error('Error checking word:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
