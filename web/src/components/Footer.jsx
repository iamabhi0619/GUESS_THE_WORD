import React from "react";

function Footer() {
  return (
    <footer className="mx-auto py-2 bg-themColor-lightOrange text-themColor-blue w-full max-w-container px-6 min-h-full">
      <div className="flex flex-col md:flex-row items-centers justify-between">
        <div className="flex items-center gap-4">
          <img src="/logo.png" alt="" className="w-12" />
          <p className="text-3xl font-bold text-themColor-blue font-handWritten">Abhishek Kumar</p>
        </div>
        <div className="flex items-center text-xs">
          <p className="">
            © 2024
            <a href="https://iam-abhi.site/" target="__blank">
              {" "}
              Learn with Abhishek Kumar
            </a>
            . All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
