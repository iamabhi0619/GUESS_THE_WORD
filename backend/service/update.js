exports.scoreUpdate = (user, word, status, time) => {
  let level = word.level;
  let points;
  if (status && !user.current.isSolved) {
    user.currentLevel = level;
    if (level === 1 || level === 2) {
      points = 10;
      user.points += 10;
      user.questionsSolved.easy += 1;
    } else if (level === 3 || level === 4) {
      points = 20;
      user.points += 20;
      user.questionsSolved.medium += 1;
    } else if (level === 5 || level === 6) {
      points = 30;
      user.points += 30;
      user.questionsSolved.hard += 1;
    }
    const questionIndex = user.questions.findIndex(
      (q) => q.wordId === word.wordId
    );
    if (questionIndex > -1) {
      user.questions[questionIndex] = {
        ...user.questions[questionIndex],
        point : points,
        isSolved: true,
        time: time,
        isHint: user.current.isHint,
        meaning: word.meaning,
        originalWord: word.word,
        tpoints: user.points,
      };
      user.current = user.questions[questionIndex];
    }
  } else {
    const questionIndex = user.questions.findIndex(
      (q) => q.wordId === word.wordId
    );
    if (questionIndex > -1) {
      user.questions[questionIndex] = {
        ...user.questions[questionIndex],
        try: user.current.isSolved
          ? user.questions[questionIndex].try
          : user.questions[questionIndex].try + 1,
        tpoints: user.points,
      };
      user.current = user.questions[questionIndex];
    }
  }
  return user;
};

exports.getHintUpdate = (user, word) => {
  if (user.currentRemainingHints <= 0) {
    user.current.isHint = true;
    user.current.hint = "Sorry, there is no extra hints!";
  } else {
    user.currentRemainingHints -= 1;
    user.totalHintsUsed += 1;
    user.points -= 5;
    user.current = {
      ...user.current,
      isHint: true,
      hint: word.hint,
    };
  }
  return user;
};
