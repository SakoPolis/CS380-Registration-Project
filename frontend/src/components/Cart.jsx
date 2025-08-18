/**
 * @file Cart.jsx
 * @module Cart
 * @date 2025-08-13
 * @author Talin
 * @description
 *   Displays shopping cart items, allows removal, clearing, and navigation to checkout.
 *
 * @component
 * @example
 * return <Cart />;
 *
 * @function removeFromCart
 * @description Removes an item by ID from the cart.
 * @param {string|number} itemId - Unique item identifier.
 * @returns {void}
 *
 * @function clearCart
 * @description Empties the cart of all items.
 * @returns {void}
 */





// src/components/Cart.jsx
import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableRow, Button } from '@mui/material';
import { useCart } from '../CartContext';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
    const { cart, removeFromCart, clearCart } = useCart();
    const navigate = useNavigate();

    console.log(cart);

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>Your Cart</Typography>

            {cart.length > 0 ? (
                <Table>
                    <TableBody>
                        {cart.map(item => (
                            <TableRow key={item.id}>
                                <TableCell>{item.group}</TableCell>
                                <TableCell>{item.time}</TableCell>
                                <TableCell>${item.cost}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        Remove
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <Typography>No items in cart.</Typography>
            )}

            <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button variant="contained" onClick={clearCart} sx={{ width: 200 }}>
                    Clear Cart
                </Button>
                <Button variant="contained" onClick={() => navigate('/checkout')} sx={{ width: 200 }}>
                    Checkout
                </Button>
            </Box>
        </Box>
    );
}