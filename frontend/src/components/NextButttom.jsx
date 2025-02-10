import React from "react";

function NextButttom({ onClick }) {
  return (
    <button onClick={onClick} className="border hover:scale-95 duration-300 relative group cursor-pointer text-sky-50  overflow-hidden h-16 rounded-md bg-sky-200 p-2 px-3 flex justify-center items-center font-extrabold">
      <div className="absolute right-32 -top-4  group-hover:top-1 group-hover:right-2 z-10 w-40 h-40 rounded-full group-hover:scale-150 duration-500 bg-sky-900" />
      <div className="absolute right-2 -top-4  group-hover:top-1 group-hover:right-2 z-10 w-32 h-32 rounded-full group-hover:scale-150  duration-500 bg-sky-800" />
      <div className="absolute -right-12 top-4 group-hover:top-1 group-hover:right-2 z-10 w-24 h-24 rounded-full group-hover:scale-150  duration-500 bg-sky-700" />
      <div className="absolute right-20 -top-4 group-hover:top-1 group-hover:right-2 z-10 w-16 h-16 rounded-full group-hover:scale-150  duration-500 bg-sky-600" />
      <p className="z-10 md:text-3xl text-2xl text-themColor-lightOrange hover:text-themColor-red">Guess The Next Word</p>
    </button>
  );
}

export default NextButttom;
