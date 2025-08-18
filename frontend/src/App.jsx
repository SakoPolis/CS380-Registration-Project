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
import Calendar from "./components/Calendar.jsx";
import Cart from "./components/Cart.jsx";
import Info from "./components/Info.jsx";
import InfoMobile from "./components/InfoMobile.jsx";
import AddressForm from "./components/AddressForm.jsx";
import Day from "./components/Day.jsx";
import ForgotPassword from "./components/ForgotPassword.jsx";
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
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/calendar" element={<Calendar />} />

                            {/* Components that require props */}
                            <Route
                                path="/info"
                                element={<Info totalPrice={"$0.00"} />}
                            />
                            <Route
                                path="/info-mobile"
                                element={<InfoMobile totalPrice={"$0.00"} />}
                            />
                            <Route
                                path="/day"
                                element={<Day day={{ name: "Sample Day", date: "2025-01-01" }} />}
                            />
                            <Route
                                path="/forgot-password"
                                element={
                                    <ForgotPassword
                                        open={true}
                                        handleClose={() => {
                                            console.log("ForgotPassword closed");
                                        }}
                                    />
                                }
                            />
                            <Route path="/address" element={<AddressForm />} />
                            <Route path="/payment" element={<PaymentForm />} />
                            <Route path="/review" element={<Review />} />
                        </Routes>
                    </Router>
                </PayProvider>
            </CartProvider>
        </UserProvider>
    );
}
