import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Booking from "./pages/Booking";

const App = () => {
    return (
        <Router>
            <div className="app">
                <h1>Movie Theater</h1>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/booking/:id" element={<Booking />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;