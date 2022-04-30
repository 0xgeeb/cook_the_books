import React from "react"
import logo from ".././images/logo.png"

export default function Home() {
    return (
        <div className="flex flex-col justify-center mt-24">
            <div className="flex flex-col place-self-center w-5/6 bg-slate-200 border-emerald-400 rounded border-4 py-24" >
                <h1 className="lg:text-[80px] flex justify-center mt-24 text-emerald-400">lets find some mf arb opps</h1>
                <div className="flex justify-center">
                    <img className="h-20 w-20" src={logo}/>
                </div>
            </div>
            <div className="h-72">hello</div>
            <div className="h-72">hello</div>
            <div className="h-72">hello</div>
        </div>
    )
}