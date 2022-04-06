import React from "react"
import logo from "../.././public/images/logo.png"

export default function Home() {
    return (
        <div className="flex justify-center my-24 h-screen">
            <div className="flex flex-col justify-center w-5/6 bg-slate-200 border-emerald-400 rounded border-4" >
                <h1 className="text-[80px] flex justify-center mt-24 text-emerald-400">lets find some mf arb opps</h1>
                <div className="flex justify-center">
                    <img className="h-20 w-20" src={logo}/>
                </div>
            </div>
        </div>
    )
}