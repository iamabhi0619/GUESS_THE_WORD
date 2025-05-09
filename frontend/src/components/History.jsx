import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import userContext from "../context/userContext";

const History = ({ user, history }) => {
  const [guesses, setGuesses] = useState([]);
  const { token } = useContext(userContext);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/gtw/history`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setGuesses(response.data.history);
      } catch (error) {
        console.error("Failed to fetch game history:", error);
      }
    };
    fetchHistory();
  }, [token]);

  return (
    <div className="md:bg-white mx-2 my-2 p-5 w-full rounded-3xl font-normal flex flex-col items-center">
      <div className="flex justify-between w-full mb-3 px-4">
        <h2 className="text-xl md:text-3xl">Game History</h2>
        <button
          aria-label="Close history"
          onClick={history}
          className="text-red-500 hover:underline text-xl md:text-2xl"
        >
          Close
        </button>
      </div>
      <div className="overflow-y-auto w-full flex flex-col h-[40vh] md:h-[60vh]">
        {guesses.length === 0 ? (
          <p className="text-center text-xl text-gray-500">
            No history available.
          </p>
        ) : (
          guesses.map((guess, index) => (
            <div
              key={index}
              className={`flex justify-between items-center border-2 ${
                guess.isSolved
                  ? "border-themColor-green"
                  : "border-themColor-red"
              } w-full px-4 py-1 rounded-xl mb-2 text-lg md:text-xl`}
            >
              <div>
                <p>Word: {guess.scrambledWord}</p>
                <p>Guessed: {guess.correctWord}</p>
              </div>
              <div className="flex flex-col md:flex-row items-center justify-between md:w-[40vh]">
                <div>
                  {/* <p
                    className={`${
                      guess.point > 0
                        ? "text-themColor-green"
                        : "text-themColor-red"
                    }`}
                  >
                    {guess.point ? `+ ${guess.point}` : "No Points"}
                  </p> */}
                </div>
                <div className="flex flex-col text-end">
                  <p>Time taken: {guess.time}</p>
                  <p>Hint Used: {guess.isHint ? "YES" : "NO"}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default History;
