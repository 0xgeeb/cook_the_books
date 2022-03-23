import React from "react"
import "../public/index.css"
import Nav from "./components/Nav.jsx"

export default function App() {
    return (
        <div className="box-border">
            <Nav />
            <div className="flex justify-center">
                <h1 className="text-[80px] mt-24 text-green-400">let us cook the mf books</h1>
            </div>
        </div>
    )
}