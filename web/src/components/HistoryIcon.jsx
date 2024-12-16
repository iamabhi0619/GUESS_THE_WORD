import React from "react";
import { FaHistory } from "react-icons/fa";
function HistoryIcon({ onClick }) {
  return (
    <button onClick={onClick} className="group flex items-center justify-start md:w-11 md:h-11 p-2 bg-themColor-yellow rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-32 hover:rounded-lg active:translate-x-1 active:translate-y-1 text-white text-lg md:text-xl">
      <div className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3">
        <FaHistory />
      </div>
      <div className="absolute right-5 transform translate-x-full opacity-0 text-white text-lg font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
        History
      </div>
    </button>
  );
}

export default HistoryIcon;
