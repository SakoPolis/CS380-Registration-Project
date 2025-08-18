// frontend/src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext.jsx";

import NavBar from "./components/NavBar.jsx";
import Home from "./components/Home.jsx";
import SignIn from "./components/SignIn.jsx";

export default function App() {
    return (
        <UserProvider>
            <Router>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/" element={<NavBar />} />
                    <Route path="/signin" element={<SignIn />} />
                </Routes>
            </Router>
        </UserProvider>
    );
}
