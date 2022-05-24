import { React, useEffect, useState } from "react";
import { ethers } from "ethers";
import { OnboardingButton } from "../components/Onboarding.jsx";
import smoke2 from ".././images/flip_smoke.png";
import logo from ".././images/colored_logo.png";

export default function Mint() {

  return (
    <div className="min-h-screen mb-10" style={{backgroundImage: `url(${smoke2})`}} id="background-div">
      <div className="p-7 w-1/4 bg-[#F7F7F7] flex flex-col justify-center mt-48 mb-48 mx-auto rounded" id="card-div-shadow">
        <h1 className="mx-auto text-2xl font-bold text-cyan-400 mb-8">Mint your CTB Pass</h1>
        <OnboardingButton/>
      </div>
    </div>
  )
}