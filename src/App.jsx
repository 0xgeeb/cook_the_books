import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import "../public/index.css"
import Nav from "./components/Nav.jsx"
import Footer from "./components/Footer.jsx"
import Home from "./pages/Home.jsx"
import Odds from "./pages/Odds.jsx"
import Test from "./pages/Test.jsx"
import Testing from "./pages/Testing.jsx"

export default function App() {
    return (
        <Router className="box-border">
            <Nav />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/odds" element={<Odds />} />
                <Route exact path="/test" element={<Test />} />
                <Route exact path="/testing" element={<Testing />} />
            </Routes>
            {/* <Footer /> */}
        </Router>
    )
}