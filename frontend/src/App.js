import React, { useState } from "react";
import GameSection from "./components/GameSection";
import Score from "./components/Score";
import Footer from "./components/Footer";
import Start from "./components/Start";
import History from "./components/History";

function App() {
  const [score, setScore] = useState(() => {
    const score = localStorage.getItem("score");
    return score ? JSON.parse(score) : 0;
  });
  const [word, setWord] = useState(() => {
    const word = localStorage.getItem("word");
    return word ? JSON.parse(word) : 0;
  });
  const [user, setUser] = useState(() => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  });

  const [history, setHistory] = useState(false);

  const handalWordUpdate = (word) => {
    setWord(word);
    localStorage.setItem("word", JSON.stringify(word));
  };
  const handalScoreUpdate = (score) => {
    setScore(score);
    localStorage.setItem("score", JSON.stringify(score));
  };
  const handalUserUpdate = (user) => {
    console.log(user);
    setUser(user);
  };

  const handalHistoryUpdate = () => {
    setHistory(!history);
  };

  return (
    <div
      className="min-h-screen bg-cover flex flex-col py-2"
      style={{ backgroundImage: "url(/background.gif)" }}
    >
      <div className="bg-themColor-lightOrange text-center mx-4 rounded-3xl">
        <h1 className="border-1 lg:text-6xl md:text-5xl text-4xl my-1 font-heading text-themColor-blue">
          Guess The Word
        </h1>
      </div>
      <div className="flex-grow flex flex-col">
        {!user ? (
          <Start
            user={handalUserUpdate}
            word={handalWordUpdate}
            score={handalScoreUpdate}
          />
        ) : (
          <div className="flex grow flex-col md:flex-row bg-white md:bg-transparent mx-4 md:mx-0 my-2 md:my-0 rounded-3xl">
            <Score score={score} />
            {history ? (
              <History user={user} history={handalHistoryUpdate} />
            ) : (
              <GameSection
                user={user}
                word={word}
                setWord={handalWordUpdate}
                setScore={handalScoreUpdate}
                history={handalHistoryUpdate}
              />
            )}
          </div>
        )}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
