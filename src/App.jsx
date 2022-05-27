import React from "react"
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import "./index.css"
import Nav from "./components/Nav.jsx"
import Footer from "./components/Footer.jsx"
import Home from "./pages/Home.jsx"
import Odds from "./pages/Odds.jsx"
import Mint from "./pages/Mint.jsx"
import About from "./pages/About.jsx"
import Test from "./pages/Test.jsx";
import Lost from "./pages/Lost.jsx";

export default function App() {
    return (
        <Router>
            <div className="flex flex-col relative min-w-screen min-h-screen m-0 p-0 overflow-x-hidden bg-[#F7F7F7]">
                <Nav />
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/odds" element={<Odds />} />
                    <Route path="/mint" element={<Mint />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/test" element={<Test />} />
                    <Route path="/lost" element={<Lost />} />
                    <Route path="*" element={<Navigate to="/lost" />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    )
}