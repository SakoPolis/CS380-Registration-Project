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





// frontend/src/contexts/CartContext.jsx
/**
 * CartContext: safe defaults + hook
 */
import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import axios from "axios";

const defaultValue = {
    cart: [],
    addToCart: () => {},
    removeFromCart: () => {},
    clearCart: () => {},
};

export const CartContext = createContext(defaultValue);

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const baseURL =
        import.meta?.env?.VITE_API_BASE_URL || "http://localhost:8080";

    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                const res = await axios.get(`${baseURL}/api/cart`);
                if (!cancelled && Array.isArray(res.data)) setCart(res.data);
            } catch (e) {
                console.error("Failed to load cart:", e);
                // keep empty cart; don't crash UI
            }
        })();
        return () => {
            cancelled = true;
        };
    }, [baseURL]);

    const addToCart = async (item) => {
        try {
            const res = await axios.post(`${baseURL}/api/cart`, item);
            if (Array.isArray(res.data)) setCart(res.data);
        } catch (e) {
            console.error("addToCart failed:", e);
        }
    };

    const removeFromCart = async (itemId) => {
        try {
            const res = await axios.delete(`${baseURL}/api/cart/${itemId}`);
            if (Array.isArray(res.data)) setCart(res.data);
        } catch (e) {
            console.error("removeFromCart failed:", e);
        }
    };

    const clearCart = async () => {
        try {
            // if you have an API route for clear, call it here; otherwise just clear locally
            setCart([]);
        } catch (e) {
            console.error("clearCart failed:", e);
        }
    };

    const value = useMemo(
        () => ({ cart, addToCart, removeFromCart, clearCart }),
        [cart]
    );

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
