import React, { useState, useEffect, useRef } from "react"
import logo from ".././images/logo.png"
import smoke2 from ".././images/resized_colored_smoke3.png"
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
                <div className=" top-40 left-40 absolute">
                    <h1 className="text-[55px] drop-shadow-lg">Consider the books, cooked</h1>
                    <h4 className="ml-2">Cook the Books will find arbitrage opportunities across various sportsbooks</h4>
                    <a href="/odds"><button className="ml-2 mr-4 py-2 px-4 mt-3 whitespace-nowrap bg-cyan-400 text-white hover:text-black rounded-lg">Enter App</button></a>
                </div>
            </div>
            {/* <div className="flex flex-col place-self-center w-5/6 bg-slate-200 border-emerald-400 rounded border-4 py-24" >
                <h1 className="lg:text-[80px] flex justify-center mt-24 text-emerald-400">lets find some mf arb opps</h1>
                <div className="flex justify-center">
                    <img className="h-20 w-20" src={logo}/>
                </div>
            </div>
            <div className="h-72">hello</div>
            {recents.map((x) => {
                return <div key={x.home.id}>
                    <h2 className="text-[80px]">{x.home.name}</h2>
                </div>
            })} */}
        </div>
    )
}