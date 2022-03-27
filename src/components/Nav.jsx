import React from "react"
import logo from "../.././public/images/logo.png"

export default function Nav() {
    return (
        <nav className="sticky top-0 bg-gradient-to-b from-slate-200 via-slate-200 h-25">
            <div className="flex justify-between items-center mx-auto">
                <a className="flex center-items hover:bg-gradient-to-r from-emerald-400 pr-10" href="/">
                    <img className="h-20" src={logo}/>
                    <span className="self-center text-2xl pl-2 font-bold">Cook the Books</span>
                </a>
                <ul className="flex space-x-8 w-3/4 justify-end pr-7 border-r-2 border-gray-400">
                    <li>
                        <a className="hover:text-gray-400" href="/">Home</a>
                    </li>
                    <li>
                        <a className="hover:text-gray-400" href="">About</a>
                    </li>
                    <li>
                        <a className="hover:text-gray-400" href="">Contact</a>
                    </li>
                </ul>
                <div className="flex justify-end ml-5">
                    <a href="/odds"><button className="mr-4 py-2 px-4 bg-emerald-400 text-white hover:text-black rounded-lg">Enter App</button></a>
                </div>
            </div>
        </nav>
    )
}