// frontend/src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// contexts
import { CartProvider } from "./contexts/CartContext.jsx";
import { PayProvider } from "./contexts/PayContext.jsx";
import { UserProvider } from "./contexts/UserContext.jsx";

// components (after fixing "components" -> "components")
import NavBar from "./components/NavBar.jsx";
import Home from "./components/Home.jsx";
import SignIn from "./components/SignIn.jsx";
import SignUp from "./components/SignUp.jsx";
import Cart from "./components/Cart.jsx";
import Checkout from "./Checkout.jsx";
import ForgotPassword from "./components/ForgotPassword.jsx";
import Info from "./components/Info.jsx";
import InfoMobile from "./components/InfoMobile.jsx";

export default function App() {
    return (
        <UserProvider>
            <CartProvider>
                <PayProvider>
                    <Router>
                        <NavBar />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/signin" element={<SignIn />} />
                            <Route path="/signup" element={<SignUp />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/checkout" element={<Checkout />} />
                            <Route path="/forgot-password" element={<ForgotPassword />} />
                            <Route path="/info" element={<Info />} />
                            <Route path="/info-mobile" element={<InfoMobile />} />
                            {/* add more as needed */}
                        </Routes>
                    </Router>
                </PayProvider>
            </CartProvider>
        </UserProvider>
    );
}
