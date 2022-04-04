import React from "react"
import logo from "../.././public/images/logo.png"

export default function Home() {
    return (
        <div className="flex flex-col justify-center">
            <h1 className="text-[80px] flex justify-center mt-24 text-emerald-400">let us cook the mf books</h1>
            <div className="flex justify-center">
                <img className="h-20 w-20" src={logo}/>
            </div>
            <div className="mb-96"></div>
            <div className="mb-96"></div>
            <div className="mb-96"></div>
            <div className="mb-96"></div>
            <div className="mb-96"></div>
        </div>
    )
}