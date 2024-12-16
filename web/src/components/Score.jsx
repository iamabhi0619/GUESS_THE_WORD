import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { FaHeart, FaHeartBroken } from "react-icons/fa";

function Score({ score }) {
  // const acc = score?.score || 0;
  const points = score?.points || 0;
  const hints = score?.currentRemainingHints || 0;
  const easy = score?.questionsSolved?.easy || 0;
  const medium = score?.questionsSolved?.medium || 0;
  const hard = score?.questionsSolved?.hard || 0;

  return (
    <>
      <div className="hidden md:flex flex-col gap-1 bg-white ml-2 my-2 p-5 lg:w-6/12 md:w-6/12 rounded-3xl justify-between">
        <p className="text-center lg:text-4xl text-3xl font-heading text-themColor-blue tracking-widest">
          Current Score
        </p>
        <div className="flex items-center justify-between text-2xl xl:text-3xl font-normal text-themColor-blue">
          <p className="w-3/4">Hints</p>
          <p className="flex w-1/4 justify-between text-red-600">
            {hints === 3 ? (
              <>
                <FaHeart />
                <FaHeart />
                <FaHeart />
              </>
            ) : hints === 2 ? (
              <>
                <FaHeart />
                <FaHeart />
                <FaHeartBroken />
              </>
            ) : hints === 1 ? (
              <>
                <FaHeart />
                <FaHeartBroken />
                <FaHeartBroken />
              </>
            ) : (
              <>
                <FaHeartBroken />
                <FaHeartBroken />
                <FaHeartBroken />
              </>
            )}
          </p>
        </div>
        <div className="flex justify-center items-center">
          <div className="flex flex-col justify-center items-center rounded-full bg-themColor-blue text-white px-10 py-4">
            <p className="flex flex-col items-center justify-center gap-0.5 font-normal">
              <span className="text-5xl py-0 md:my-3">{points}</span>
              {/* <span className="text-2xl text-themColor-lightOrange">/100</span> */}
            </p>
          </div>
        </div>
        <p className="text-themColor-blue text-2xl xl:text-4xl font-bold font-normal">
          Summary
        </p>
        {/* easy */}
        <div className="flex items-center justify-between text-xl xl:text-3xl px-1 py-1 text-themColor-green font-medium font-normal tracking-widest border-4 border-themColor-green rounded-xl">
          <div className="flex justify-between items-center w-2/5 gap-2">
            <div className="flex justify-center">
              <FaStar />
              <FaRegStar />
              <FaRegStar />
            </div>
            <p>Easy</p>
          </div>
          <p>
            <span>{easy}</span>
          </p>
        </div>
        {/* medium */}
        <div className="flex items-center justify-between text-xl xl:text-3xl px-1 py-1 text-themColor-yellow font-medium font-normal tracking-widest border-4 border-themColor-yellow rounded-xl">
          <div className="flex justify-between items-center w-2/4 gap-2">
            <div className="flex justify-center">
              <FaStar />
              <FaStar />
              <FaRegStar />
            </div>
            <p>Medium</p>
          </div>
          <p>
            <span>{medium}</span>
          </p>
        </div>
        {/* hard */}
        <div className="flex items-center justify-between text-xl xl:text-3xl px-1 py-1 text-themColor-red font-medium font-normal tracking-widest border-4 border-themColor-red rounded-xl">
          <div className="flex justify-between items-center w-2/5 gap-2">
            <div className="flex justify-center">
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
            <p>Hard</p>
          </div>
          <p>
            <span>{hard}</span>
          </p>
        </div>
      </div>
      <div className="md:hidden min-h-full">
        <div className="flex flex-col justify-between items-center mx-3 my-3">
          <div className="flex items-center justify-between text-2xl font-normal text-themColor-blue w-full mx-3">
            <p className="w-3/4">Hints</p>
            <p className="flex w-1/4 justify-between text-red-600">
              {hints === 3 ? (
                <>
                  <FaHeart />
                  <FaHeart />
                  <FaHeart />
                </>
              ) : hints === 2 ? (
                <>
                  <FaHeart />
                  <FaHeart />
                  <FaHeartBroken />
                </>
              ) : hints === 1 ? (
                <>
                  <FaHeart />
                  <FaHeartBroken />
                  <FaHeartBroken />
                </>
              ) : (
                <>
                  <FaHeartBroken />
                  <FaHeartBroken />
                  <FaHeartBroken />
                </>
              )}
            </p>
          </div>
          <div className="flex justify-between w-full">
            <div className="flex flex-col w-1/3 justify-center items-center rounded-full bg-themColor-blue text-white px-6 py-1">
              <p className="flex flex-col items-center justify-center gap-0.5 font-normal">
                <span className="text-3xl">{points}</span>
                {/* <span className="text-xl text-themColor-lightOrange">/100</span> */}
              </p>
            </div>
            <div className="flex flex-col justify-between">
              {/* easy */}
              <div className="flex items-center gap-2 justify-between text-themColor-green font-normal tracking-widest">
                <div className="flex justify-between items-center w-2/5 gap-2">
                  <div className="flex justify-center">
                    <FaStar />
                    <FaRegStar />
                    <FaRegStar />
                  </div>
                  <p>Easy</p>
                </div>
                <p>
                  <span>{easy}</span>
                </p>
              </div>
              {/* medium */}
              <div className="flex items-center gap-2 justify-between text-themColor-yellow font-normal tracking-widest">
                <div className="flex justify-between items-center w-2/4 gap-2">
                  <div className="flex justify-center">
                    <FaStar />
                    <FaStar />
                    <FaRegStar />
                  </div>
                  <p>Medium</p>
                </div>
                <p>
                  <span>{medium}</span>
                </p>
              </div>
              {/* hard */}
              <div className="flex items-center gap-0 justify-between text-themColor-red font-normal tracking-widest">
                <div className="flex justify-between items-center w-2/5 gap-2">
                  <div className="flex justify-center">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>
                  <p>Hard</p>
                </div>
                <p>
                  <span>{hard}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Score;
