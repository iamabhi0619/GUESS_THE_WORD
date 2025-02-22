import React, { useContext, useState } from "react";
import userContext from "../context/userContext";
import Timer from "./Timer";
import HistoryIcon from "./HistoryIcon";
import HintButtom from "./HintButtom";
import axios from "axios";
import NextButttom from "./NextButttom";

const GameSection = ({ history }) => {
  const {
    user,
    word,
    token,
    setWord,
    setIsPaused,
    fetchWord,
    message,
    setMessage,
    elapsedTime,
    fetchUser,
  } = useContext(userContext);
  const [hint, setHint] = useState("");
  const [userGuess, setUserGuess] = useState("");

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      secs < 10 ? "0" : ""
    }${secs}`;
  };

  const takeHint = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/gtw/hint`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        setHint(response.data.hint);
      }else{
        setHint(response.data.message);
      }
    } catch (error) {
      setHint(error.response.data.message);
      console.error("Error fetching hint:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/gtw/check`,
        {
          guess: userGuess,
          time: formatTime(elapsedTime),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        setUserGuess("");
        setWord(response.data.word);
        setMessage(response.data.message);
        // setIsPaused(true);
        fetchUser();
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error("Error checking the word:", error.response.data);
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="md:bg-white mx-2 my-2 p-5 w-full rounded-3xl font-normal flex flex-col justify-between items-center grow">
      <div className="flex justify-between w-full items-center">
        <p className="text-center lg:text-5xl mb-2 md:text-3xl text-3xl text-themColor-blue font-normal w-5/6 text-balance">
          Welcome{" "}
          <span className="text-themColor-red">
            {user?.name || "Player"}..!!
          </span>
        </p>
        <div className="flex flex-col gap-1 mg:gap-2 items-center">
          {!word?.isSolved && <Timer time={formatTime(elapsedTime)} />}
          <HistoryIcon onClick={history} />
        </div>
      </div>
      {!hint ? (
        <HintButtom onClick={takeHint} />
      ) : (
        <p className="text-2xl md:text-3xl text-themColor-red text-center">
          {hint}
        </p>
      )}
      <div className="flex flex-col items-center justify-center text-center md:mt-2">
        <p className=" md:text-3xl text-4xl">
          {word?.isSolved ? "Guessed Word" : "Guessing Word"}
        </p>
        <p className="w-fit bg-themColor-red text-white rounded-full md:py-1 tracking-widest mx-4 md:text-6xl text-5xl my-1 px-10">
          {word?.originalWord || word?.scrambledWord || "Loading..."}
        </p>
      </div>
      <div className="flex items-center justify-center">
        {!word?.isSolved && (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col lg:flex-row items-center mt-1 gap-2 md:gap-4"
          >
            <input
              type="text"
              placeholder="Guess the Word..!!"
              name="word"
              value={userGuess}
              autoComplete="off"
              onChange={(e) => setUserGuess(e.target.value)}
              className="md:text-2xl text-2xl pl-2 py-1 border-2 md:border-4 border-themColor-blue rounded-xl"
            />
            <button
              type="submit"
              className="flex text-white justify-center gap-2 items-center shadow-xl lg:text-2xl tracking-wider md:text-2xl text-2xl bg-themColor-blue backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-emerald-500 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-10 mx-3 py-2 md:py-2 overflow-hidden border-2 rounded-full group"
            >
              Check
              <svg
                className="md:w-10 md:h-10 w-8 h-8 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-white group-hover:border-none p-2 rotate-45"
                viewBox="0 0 16 19"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                  className="fill-white group-hover:fill-gray-800"
                ></path>
              </svg>
            </button>
          </form>
        )}
      </div>
      <p className="text-center md:text-5xl text-4xl text-themColor-green tracking-wider mt-4">
        {message}
      </p>
      {word?.isSolved && (
        <div className="flex flex-col justify-center items-center my-5 gap-3">
          <p className="text-themColor-blue md:text-3xl text-2xl text-center">
            {word.meaning}
          </p>
          <button onClick={fetchWord}>
            <NextButttom />
          </button>
        </div>
      )}
    </div>
  );
};

export default GameSection;
