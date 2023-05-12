import React from "react";

const Rightbar = () => {
  return (
    <div className="flex flex-grow flex-col">
      <div id="ad" className="mt-4">
        {/* <img
          src="../../public/assets/kfc.jpg"
          alt=""
          className="max-w-xs rounded-lg"
        /> */}
      </div>
      <div id="info" className="mt-5">
        <span className="font-normal text-[#c3c4c9]">
          @Romoj - Made By Oishik Guha aka. Roboticol
        </span>
      </div>
      <div id="contact" className="mt-5">
        <span className="font-semibold">Contact me:</span>
        <br />
        <br />
        <span>Discord: Roboticol#4533</span>
        <br />
        <span>Twitter: @roboticolyt</span>
        {/* <span className="font-normal text-[#c3c4c9]">
          
        </span> */}
      </div>
    </div>
  );
};

export default Rightbar;
