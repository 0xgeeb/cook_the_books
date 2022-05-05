import React, { useState, useEffect, useRef } from "react"
import colored_logo from ".././images/colored_logo.png"
import smoke2 from ".././images/resized_colored_smoke3.png"
import flipped_smoke2 from ".././images/flipped_resized_colored_smoke3.png"
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
            <div className="h-[1000px] relative" style={{backgroundImage: `url(${smoke2})`}} id="background-div">
                <div className="top-40 left-40 absolute">
                    <h1 className="text-[55px] drop-shadow-lg">Consider the books, cooked</h1>
                    <h4 className="ml-2">Cook the Books finds arbitrage opportunities across various sportsbooks</h4>
                    <div className="flex flex-row" >
                        <a href="/odds"><button className="ml-1 mr-4 py-1 px-3 mt-3 whitespace-nowrap bg-white hover:text-white hover:bg-black rounded-lg" id="home-button">
                            <div className="flex flex-row">
                                <span className="mt-1">Start Cooking</span>
                                <img className="ml-2" src={colored_logo} height="30" width="30" />
                            </div>
                            </button></a>
                    </div>
                </div>
            </div>
            <div className="h-[1000px]" style={{backgroundImage: `url(${flipped_smoke2})`}} id="background-div">
                {recents.map((x) => {
                    return <div className="mb-40" key={x.home.id}>
                        <h2 className="text-[80px]">{x.home.name}</h2>
                        <h2 className="text-[80px]">{x.away.name}</h2>
                    </div>
                })}
            </div>
        </div>
    )
}