import React from "react";

const Loader = () => {
  return (
    <div className="absolute h-full z-50 w-full flex items-center justify-center bg-themColor-blue bg-opacity-70">
      <div className="w-64 h-64 m-8 relative flex items-center justify-center">
        <div className="absolute inset-0 rounded-xl bg-themColor-blue/25 blur-xl animate-pulse" />
        <div className="w-full h-full relative flex items-center justify-center">
          <div className="absolute w-72 h-72 rounded-full bg-gradient-to-r from-themColor-red via-themColor-blue to-themColor-green animate-spin blur-sm duration-500" />
          <div className="absolute inset-0 bg-themColor-lightOrange/50 rounded-full flex items-center justify-center overflow-hidden">
            {/* <div className="flex gap-1 items-center">
              <div className="w-1.5 h-12 bg-themColor-lightOrange rounded-full animate-[bounce_1s_ease-in-out_infinite]" />
              <div className="w-1.5 h-12 bg-themColor-red rounded-full animate-[bounce_1s_ease-in-out_infinite_0.1s]" />
              <div className="w-1.5 h-12 bg-themColor-blue rounded-full animate-[bounce_1s_ease-in-out_infinite_0.2s]" />
              <div className="w-1.5 h-12 bg-themColor-green rounded-full animate-[bounce_1s_ease-in-out_infinite_0.3s]" />
            </div> */}
            <div className="inset-0 bg-gradient-to-t from-transparent via-blue-500/10 to-transparent p-7">
              <img src="/logo.svg" alt="Logo" />
            </div>
          </div>
        </div>
        {/* <div className="absolute -top-1 -left-1 w-2 h-2 bg-themColor-blue rounded-full animate-ping" />
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-themColor-red rounded-full animate-ping delay-100" />
        <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-themColor-green rounded-full animate-ping delay-200" />
        <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-themColor-yellow rounded-full animate-ping delay-300" /> */}
      </div>
    </div>
  );
};

export default Loader;
