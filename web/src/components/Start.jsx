import React, { useEffect, useState } from "react";
import StartButton from "./StartButton";

function Start({ user, word, score }) {
  const [name, setName] = useState("");
  useEffect(() => {
    localStorage.clear();
  }, []);
  const fetchScore = async (user) => {
    if (user && user.userId) {
      try {
        const response = await fetch(`/api/user/${user.userId}/score`);
        const data = await response.json();
        score(data);
      } catch (error) {
        console.error("Failed to fetch score:", error);
      }
    }
  };
  const fetchWord = async (user) => {
    if (user && user.userId) {
      try {
        const response = await fetch(`/api/word/${user.userId}`); 
        const data = await response.json();
        word(data);
        localStorage.setItem("word", JSON.stringify(data));
      } catch (error) {
        console.error("Failed to fetch word:", error);
      }
    }
  };
  const handleClick = async () => {
    if (!name.trim()) return;
    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const dataTosave = {
        userId: data.user.userId,
        name: data.user.name,
      };
      fetchScore(dataTosave);
      fetchWord(dataTosave);
      localStorage.setItem("user", JSON.stringify(dataTosave));
      user(dataTosave);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    } finally {
    }
  };
  return (
    <div className="bg-white bg-opacity-70 flex-grow flex items-center justify-center rounded-3xl my-4 mx-4">
      <div className="mx-2 bg-themColor-blue text-white rounded-3xl flex flex-col items-center py-5 shadow-2xl">
        <input
          type="text"
          name="text"
          value={name}
          autoComplete="off"
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="bg-transparent lg:text-4xl md:text-3xl text-2xl outline-none border-none px-10 py-5 w-full font-normal tracking-wider text-white rounded-lg"
        />
        <div className="mt-4">
          <StartButton onClick={handleClick} />
        </div>
      </div>
    </div>
  );
}

export default Start;
