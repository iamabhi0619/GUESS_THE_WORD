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
  const [isLogOut, setIsLogOut] = useState(false);

  const handalWordUpdate = (word) => {
    setWord(word);
    localStorage.setItem("word", JSON.stringify(word));
  };
  const handalScoreUpdate = (score) => {
    setScore(score);
    localStorage.setItem("score", JSON.stringify(score));
  };
  const handalUserUpdate = (user) => {
    setUser(user);
  };

  const handalHistoryUpdate = () => {
    setHistory(!history);
  };

  const handalLogOut = () => {
    localStorage.clear();
    setUser(null);
    setWord(0);
    setScore(0);
  };
  return (
    <div
      className="min-h-screen bg-cover flex flex-col py-2"
      style={{ backgroundImage: "url(/background.gif)" }}
    >
      <div className="bg-themColor-lightOrange text-center mx-4 rounded-3xl relative">
        <h1 className="border-1 lg:text-6xl md:text-5xl text-4xl my-1 font-heading text-themColor-blue">
          Guess The Word
        </h1>
        <div className="absolute bottom-0 md:bottom-1 right-0 md:right-8 group">
          {user && <img src={user.avatar} alt="User avatar" className="h-12 md:h-14 cursor-pointer" onClick={()=>{setIsLogOut(!isLogOut)}}/>}
          {user && isLogOut && (
            <button
              className={`bg-themColor-blue border-2 shadow-xl border-themColor-red px-3 py-1 text-white font-normal text-2xl absolute w-32 right-11 md:right-14 cursor-pointer -bottom-7 md:-bottom-4 z-50 hidden rounded-lg ${isLogOut &&"block"} group-hover:block`}
              onClick={handalLogOut}
            >
              Log Out..!!
            </button>
          )}
        </div>
      </div>
      <div className="flex-grow flex flex-col w-full h-full items-center justify-center my-auto">
        {!user ? (
          <Start
            user={handalUserUpdate}
            word={handalWordUpdate}
            score={handalScoreUpdate}
          />
        ) : (
          <div className="flex grow w-full flex-col md:flex-row bg-white md:bg-transparent mx-4 md:mx-0 my-2 md:my-0 rounded-3xl">
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
