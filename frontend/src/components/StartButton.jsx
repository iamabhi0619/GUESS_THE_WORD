import React from 'react'

function StartButton({onClick}) {
  return (
    <button onClick={onClick}  className="flex items-center bg-themColor-lightOrange text-themColor-blue font-normal md:text-2xl lg:text-3xl text-2xl gap-3 px-4 py-2 cursor-pointer font-semibold tracking-widest rounded-md hover:bg-themColor-green duration-300 hover:gap-5 hover:translate-x-3 hover:text-white">
  Start
  <svg
    className="md:w-7 md:h-7 w-6 h-6"
    stroke="currentColor"
    strokeWidth="2.5"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
  </svg>
</button>

  )
}

export default StartButton