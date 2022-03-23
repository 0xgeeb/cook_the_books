import React from "react"

export default function Nav() {
    return (
        <nav className="bg-slate-200">
            <div className="flex container flex-wrap justify-between items-center mx-auto">
                <h4>cook_the_books</h4>
                <p>home</p>
                <p>about</p>
                <p>contact</p>
                <button className="py-2 px-4 bg-emerald-400 text-white rounded-lg">hello</button>
            </div>
        </nav>
    )
}