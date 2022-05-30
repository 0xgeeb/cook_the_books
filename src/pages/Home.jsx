import { React, useState, useEffect } from "react"
import logo from ".././images/colored_logo.png"
import home_image from ".././images/home_image.png";
import HomeCard from "../components/HomeCard.jsx";
import Pass from ".././images/ctb_pass.png";
import OGPass from ".././images/ctb_og_pass.png";
import axios from "axios";

export default function Home() {

    const [recents, setRecents] = useState([]);

    useEffect(() => {
        async function fetchRecents() {
            const response = await axios.get('/minecraftspeedrun/recent');
            const data = response.data;
            setRecents(data);
        }
      fetchRecents();
    }, []);

    return (
        <div className="flex flex-col bg-[#F7F7F7]">
            <div className="h-[2100px] lg:h-[2200px]" style={{backgroundImage: `url(${home_image})`}} id="background-div">
                <div className="w-5/6 mx-auto mt-[60px] lg:mt-[150px]">
                    <h1 className="text-[40px] lg:text-[55px] drop-shadow-lg">Consider the books, cooked</h1>
                    <h4 className="mt-3 lg:mt-0 ml-2 w-1/2 wrap">Cook the Books finds arbitrage opportunities across various sportsbooks</h4>
                    <a href="/odds"><button className="ml-1 mr-4 py-1 px-3 mt-6 lg:mt-4 whitespace-nowrap bg-white hover:text-white hover:bg-black rounded-lg" id="home-button">
                        <div className="flex flex-row">
                            <span className="mt-1">Start Cooking</span>
                            <img className="ml-2" src={logo} height="30" width="30" />
                        </div>
                        </button>
                    </a>
                </div>
                <div className="mt-[350px] lg:mt-[620px]">
                    <div className="w-5/6 mx-auto flex justify-center  mb-5 ">
                        <h1 className="text-2xl lg:text-3xl font-bold pb-1 border-b-2 border-gray-200" id="arb-title">Recent Arbitrage Opportunities found by CTB</h1>
                    </div>
                    <div className="w-5/6 h-[450px] mx-auto flex overflow-x-auto overflow-y-hidden" id="hide-scrollbar">
                        {recents.map((x) => {
                            return HomeCard(x);
                        })}
                    </div>
                </div>                        
                <div className="w-5/6 mx-auto mt-48 lg:mt-24 flex flex-col">
                    <div className="w-5/6 mx-auto flex justify-center  mb-5 ">
                        <h1 className="text-2xl lg:text-3xl font-bold pb-1 border-b-2 border-gray-200" id="arb-title">Mint one of the NFTs to gain access to CTB</h1>
                    </div>
                    <div className="flex flex-row justify-center">
                        <img className="h-[380px] lg:h-[490px] mr-24 lg:mr-48" id="card-div-shadow" src={OGPass} />
                        <img className="h-[380px] lg:h-[490px]" id="card-div-shadow" src={Pass} />
                    </div>
                </div>
            </div>
        </div>
    )
}