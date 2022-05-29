import React from "react";
import lost_image from ".././images/lost_image.jpg";

export default function Lost() {
  return (
    <div className="flex flex-col bg-[#F7F7F7]">
      <div className="h-[1900px] lg:h-[1071px]" style={{backgroundImage: `url(${lost_image})`}} id="background-div">
        <div className="flex flex-row">
          <div className="mr-96"></div>
          <div className="flex justify-center mt-48 mx-auto ">
            <h1 className="text-[50px] lg:text-[70px] border-b-2 border-gray-200">are you lost fren</h1>
          </div>
        </div>
      </div>
    </div>
  )
}