import React, { useState, useEffect, useRef } from "react"
import colored_logo from ".././images/colored_logo.png"
import smoke2 from ".././images/resized_colored_smoke3.png"
import flipped_smoke2 from ".././images/flipped_resized_colored_smoke3.png"
import home_image from ".././images/home_image.png";
import Card from "../components/Card.jsx";
import axios from "axios";

export default function Home() {

    const [recents, setRecents] = useState([]);
    const componentIsMounted = useRef(true);

    useEffect(() => {
        // each useEffect can return a cleanup function
        return () => {
        componentIsMounted.current = false;
        };
    }, []); // no extra deps => the cleanup function run this on component unmount

    useEffect(() => {
      async function fetchRecents() {
        try {
            const response = await axios.get('/minecraftspeedrun/recent');
            const data = response.data;
            console.log(data);
            if (componentIsMounted.current) {
                setRecents(data);

            }
        } catch (err) {
            console.error(err);
        }
      }
      fetchRecents();
    }, []);

    return (
        <div className="flex flex-col bg-[#F7F7F7]">
            <div className="h-[2200px]" style={{backgroundImage: `url(${home_image})`}} id="background-div">
                <div className="w-5/6 mx-auto mt-[150px]">
                    <h1 className="text-[55px] drop-shadow-lg">Consider the books, cooked</h1>
                    <h4 className="ml-2">Cook the Books finds arbitrage opportunities across various sportsbooks</h4>
                    <a href="/odds"><button className="ml-1 mr-4 py-1 px-3 mt-3 whitespace-nowrap bg-white hover:text-white hover:bg-black rounded-lg" id="home-button">
                        <div className="flex flex-row">
                            <span className="mt-1">Start Cooking</span>
                            <img className="ml-2" src={colored_logo} height="30" width="30" />
                        </div>
                        </button>
                    </a>
                </div>
                <div className="mt-[600px]">
                    <h1 className="w-5/6 mx-auto flex justify-start text-3xl font-bold mb-5" id="arb-title">Recent Arbitrage Opportunities found by CtB</h1>
                    <div className="w-5/6 h-[450px] mx-auto flex overflow-x-auto overflow-y-hidden" id="hide-scrollbar">
                        {recents.map((x) => {
                            return Card(x);
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}