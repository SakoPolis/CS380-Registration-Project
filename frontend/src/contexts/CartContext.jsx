/**
 * @file CartContext.jsx
 * @module CartContext
 * @date 2025-08-13
 * @description
 *   Provides global cart state management using React Context API.
 *
 * @function addToCart
 * @description Adds an item to cart via API and updates local state.
 *
 * @function removeFromCart
 * @description Removes an item by ID from cart via API.
 */





import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // load cart for this user on mount
    useEffect(() => {
        async function fetchCart() {
            const res = await axios.get('http://localhost:8080/api/cart');
            setCart(res.data);
        }
        fetchCart();
    }, []);

    // add an item to cart
    const addToCart = async (item) => {
        const res = await axios.post('http://localhost:8080/api/cart', item);
        setCart(res.data);
    };

    // remove an item from cart
    const removeFromCart = async (itemId) => {
        const res = await axios.delete(`http://localhost:8080/api/cart/${itemId}`);
        setCart(res.data);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};