import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import "./index.css"
import Nav from "./components/Nav.jsx"
import Footer from "./components/Footer.jsx"
import Home from "./pages/Home.jsx"
import Odds from "./pages/Odds.jsx"
import Test from "./pages/Test.jsx"
import background from "./images/background.jpg"

export default function App() {
    return (
        <Router>
            <div className="flex flex-col relative min-w-screen min-h-screen m-0 p-0 overflow-x-hidden" style={{backgroundImage: `url(${background})`}}>
                <Nav />
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/odds" element={<Odds />} />
                    <Route path="/test" element={<Test />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    )
}