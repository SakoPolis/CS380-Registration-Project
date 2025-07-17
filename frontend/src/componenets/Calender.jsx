import React, { useState, useEffect, useContext } from 'react';
import {
    Box, Grid, Typography, Button, Paper,
    Table, TableBody, TableCell, TableRow, Radio
} from '@mui/material';
import { CartContext } from '../contexts/CartContext';

const schedule = {
    Monday: [ /* …slots… */ ],
    /* …other days… */
};

export default function Calendar() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [calendarDays, setCalendarDays] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const { cart, addToCart } = useContext(CartContext);

    // generate days for current month…
    useEffect(() => { /* …generateCalendar()… */ }, []);

    const handleAdd = () => {
        if (!selectedSlot) return;
        // send just the slot info; backend will attach user_id via auth
        addToCart({ date: selectedDate.date, slot: selectedSlot });
    };

    return (
        <Box sx={{ p: 3 }}>
            <Grid container spacing={2}>
                <Grid item md={8}>
                    {/* Calendar UI… */}
                </Grid>
                <Grid item md={4}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6">
                            Selected: {selectedDate?.date.toDateString() || '—'}
                        </Typography>
                        {/* List slots with Radio inputs… */}
                        <Button onClick={handleAdd} disabled={!selectedSlot}>
                            Add to Cart
                        </Button>
                    </Paper>

                    <Paper sx={{ mt: 2, p: 2 }}>
                        <Typography variant="h6">Cart</Typography>
                        {cart.length > 0 ? (
                            <Table>
                                <TableBody>
                                    {cart.map(item => (
                                        <TableRow key={item.id}>
                                            <TableCell>{item.slot.group}</TableCell>
                                            <TableCell>{item.slot.time}</TableCell>
                                            <TableCell>${item.slot.cost}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <Typography>No items in cart</Typography>
                        )}
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}
