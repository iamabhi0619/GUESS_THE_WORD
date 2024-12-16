import React from "react";

function Timer({ time }) {
  return (
    <div className="text-center">
      <p className=" border-2 md:border-2 border-themColor-red px-3 w-full rounded-xl md:py-1 transition-all text-xl md:text-2xl tracking-widest">{time}</p>
    </div>
  );
}

export default Timer;
