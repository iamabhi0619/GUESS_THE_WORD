import React from "react";

function HintButtom({ onClick }) {
  return (
    <button onClick={onClick} className="cursor-pointer uppercase text-xl font-normal text-white bg-themColor-blue px-4 py-2 active:translate-x-0.5 active:translate-y-0.5 hover:shadow-[0.5rem_0.5rem_#F05A7E,-0.5rem_-0.5rem_#0B8494] rounded-xl transition">
      Take Hint..!
    </button>
  );
}

export default HintButtom;
