import React, { useState, useEffect } from "react";
import userContext from "./userContext";
import axios from "axios";

const UserProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("user"));
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [word, setWord] = useState(null);
  const [message, setMessage] = useState("");
  const [timer, setTimer] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedTime = localStorage.getItem("time");
    if (storedTime) {
      setElapsedTime(parseInt(storedTime, 10));
    }
  }, []);

  useEffect(() => {
    if (timer) clearInterval(timer);
    if (word && !word.isSolved && !isPaused) {
      const newTimer = setInterval(() => {
        setElapsedTime((prevTime) => {
          const updatedTime = prevTime + 1;
          localStorage.setItem("time", updatedTime);
          return updatedTime;
        });
      }, 1000);
      setTimer(newTimer);
      return () => clearInterval(newTimer);
    }
  }, [word, isPaused]);
  const fetchUser = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/gtw`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(response.data.user);
    } catch (error) {
      console.error("Failed to fetch user:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchWord = async () => {
    if (!token) return;
    try {
      setLoading(true);
      setMessage("");
      setWord(null);
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/gtw/word`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.data.success) {
        setError(response.data.message);
      } else {
        setError("");
        setWord(response.data.word);
        const lwordId = localStorage.getItem("wordId");
        if (lwordId !== response.data.word.wordId || response.data.word.isSolved) {
          setElapsedTime(0);
          localStorage.setItem("time", 0);
          localStorage.setItem("wordId", response.data.word.wordId);
        } else {
          localStorage.setItem("wordId", response.data.word.wordId);
        }
      }
    } catch (error) {
      console.error("Failed to fetch word:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUser();
      fetchWord();
      localStorage.setItem("user", token);
    } else {
      localStorage.clear();
      setUser(null);
      setWord(null);
    }
  }, [token]);

  return (
    <userContext.Provider
      value={{
        setToken,
        user,
        token,
        fetchUser,
        message,
        setMessage,
        elapsedTime,
        loading,
        setWord,
        fetchWord,
        word,
        error,
        isPaused,
        setIsPaused,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export default UserProvider;
