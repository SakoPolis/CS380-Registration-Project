// frontend/src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext.jsx";
import { CartProvider } from "./contexts/CartContext.jsx";
import { PayProvider } from "./contexts/PayContext.jsx";

import NavBar from "./components/NavBar.jsx";
import Home from "./components/Home.jsx";
import SignIn from "./components/SignIn.jsx";
import SignUp from "./components/SignUp.jsx";
import AddressForm from "./components/AddressForm.jsx";
import Calender from "./components/Calender.jsx";
import Cart from "./components/Cart.jsx";
import Day from "./components/Day.jsx";
import ForgotPassword from "./components/ForgotPassword.jsx";
import Info from "./components/Info.jsx";
import InfoMobile from "./components/InfoMobile.jsx";
import PaymentForm from "./components/PaymentForm.jsx";
import Review from "./components/Review.jsx";

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
                            <Route path="/addressform" element={<AddressForm />} />
                            <Route path="/calender" element={<Calender />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/day" element={<Day />} />
                            <Route path="/forgotpassword" element={<ForgotPassword />} />
                            <Route path="/info" element={<Info />} />
                            <Route path="/infomobile" element={<InfoMobile />} />
                            <Route path="/paymentform" element={<PaymentForm />} />
                            <Route path="/review" element={<Review />} />
                        </Routes>
                    </Router>
                </PayProvider>
            </CartProvider>
        </UserProvider>
    );
}
