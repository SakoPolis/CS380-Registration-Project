/**
 * @file Calender.jsx
 * @module Calendar
 * @date 2025-08-13
 * @description
 *   Interactive class schedule calendar allowing date selection and adding classes to cart.
 *
 * @function generateCalendar
 * @description Generates days for the current month with full weeks.
 * @returns {void}
 *
 * @function handleDayClick
 * @description Sets selected date and resets selected schedule.
 * @param {object} day - Date object and weekday string.
 *
 * @function handleAddToCart
 * @description Adds selected schedule to cart and shows snackbar confirmation.
 */





import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, Button, Paper, Table, TableBody, TableCell, TableRow, Radio, Snackbar, SnackbarContent } from '@mui/material';
import { useCart } from './CartContext';
//import { supabase } from '../lib/supabaseClient';
import {useData} from "./UserContext";

const Calendar = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [calendarDays, setCalendarDays] = useState([]);
    const [selectedSchedule, setSelectedSchedule] = useState(null);
    const [displayCart, setDisplayCart] = useState(false);
    const { cart, addToCart } = useCart();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [message, setMessage] = useState('');

    const { userData } = useData();
    //console.log(userData);

    const schedule = {
        Monday: [
            { group: "Adults", time: "12PM-2PM", cost: 15 },
            { group: "Ages 6-8", time: "2PM-8PM", cost: 15 },
            { group: "Ages 8-12", time: "3:30PM-8PM", cost: 15 },
        ],
        Tuesday: [
            { group: "Adults", time: "12PM-2PM", cost: 15 },
            { group: "Ages 6-8", time: "2PM-8PM", cost: 15 },
            { group: "Ages 8-12", time: "3:30PM-8PM", cost: 15 },
        ],
        Wednesday: [
            { group: "Adults", time: "12PM-2PM", cost: 15 },
            { group: "Ages 6-8", time: "2PM-8PM", cost: 15 },
            { group: "Ages 8-12", time: "3:30PM-8PM", cost: 15 },
        ],
        Thursday: [
            { group: "Adults", time: "12PM-2PM", cost: 15 },
            { group: "Ages 6-8", time: "2PM-8PM", cost: 15 },
            { group: "Ages 8-12", time: "3:30PM-8PM", cost: 15 },
        ],
        Saturday: [
            { group: "Ages 4-6", time: "10AM-2:30PM", cost: 15 },
            { group: "Ages 6-8", time: "11:30AM-2:30PM", cost: 15 },
            { group: "Ages 8-12", time: "1PM-2:30PM", cost: 15 },
            { group: "Adults", time: "2:30PM-4PM", cost: 15 },
        ],
    };


    useEffect(() => {
        generateCalendar();
    }, [currentMonth, currentYear]);

    //useEffect to update supabase with cart data
    //when cart changes update supabase with cart

    const generateCalendar = () => {
        // First day of the current month
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
        const startingDayIndex = firstDayOfMonth.getDay(); // 0 (Sun) to 6 (Sat)

        // Total days in current month
        const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
        const totalDays = lastDayOfMonth.getDate();

        // Compute total cells: fill full weeks
        const totalCells = Math.ceil((startingDayIndex + totalDays) / 7) * 7;

        const days = [];
        for (let i = 0; i < totalCells; i++) {
            const date = new Date(currentYear, currentMonth, i + 1 - startingDayIndex);
            const dayOfWeek = date.toLocaleString('en-US', { weekday: 'long' });
            days.push({ date, dayOfWeek });
        }
        setCalendarDays(days);
    };

    const handleDayClick = (day) => {
        setSelectedDate(day);
        setSelectedSchedule(null);
    };

    const getScheduleForDay = (dayOfWeek) => schedule[dayOfWeek] || null;

    const handleMonthChange = (direction) => {
        if (direction === 'prev') {
            if (currentMonth === 0) {
                setCurrentYear(y => y - 1);
                setCurrentMonth(11);
            } else {
                setCurrentMonth(m => m - 1);
            }
        } else {
            if (currentMonth === 11) {
                setCurrentYear(y => y + 1);
                setCurrentMonth(0);
            } else {
                setCurrentMonth(m => m + 1);
            }
        }
    };

    const handleRadioChange = (e) => {
        const selectedGroup = e.target.value;
        const slot = schedule[selectedDate.dayOfWeek]?.find(s => s.group === selectedGroup);
        setSelectedSchedule(slot);
    };

    const handleAddToCart = () => {
        if (selectedSchedule) {
            addToCart(selectedSchedule, userData?.id || undefined);
            setMessage('Added to Cart.');
            setOpenSnackbar(true);
        }
    };

    const toggleCartDisplay = () => setDisplayCart(d => !d);

    console.log(cart);

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>Class Calendar</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6">Calendar</Typography>
                        <Button onClick={() => handleMonthChange('prev')}>◀</Button>
                        <Typography variant="h6" sx={{ display: 'inline', mx: 2 }}>
                            {new Date(currentYear, currentMonth).toLocaleString('en-US', { month: 'long', year: 'numeric' })}
                        </Typography>
                        <Button onClick={() => handleMonthChange('next')}>▶</Button>

                        <Box sx={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(7, 1fr)',
                            gap: 1,
                            mt: 2
                        }}>
                            {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => (
                                <Typography key={d} align="center" variant="body1">{d}</Typography>
                            ))}
                            {calendarDays.map((day, idx) => (
                                <Button
                                    key={idx}
                                    variant="outlined"
                                    onClick={() => handleDayClick(day)}
                                    sx={{
                                        opacity: day.date.getMonth() !== currentMonth ? 0.4 : 1,
                                        bgcolor: day.date.toDateString() === new Date().toDateString() ? 'lightblue' : 'white'
                                    }}
                                >
                                    {day.date.getDate()}
                                </Button>
                            ))}
                        </Box>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6">
                            Selected Date: {selectedDate ? selectedDate.date.toDateString() : 'None'}
                        </Typography>
                        {selectedDate && getScheduleForDay(selectedDate.dayOfWeek) ? (
                            <Table>
                                <TableBody>
                                    {getScheduleForDay(selectedDate.dayOfWeek).map((slot,i) => (
                                        <TableRow key={i}>
                                            <TableCell>{slot.group}</TableCell>
                                            <TableCell>{slot.time}</TableCell>
                                            <TableCell>${slot.cost}</TableCell>
                                            <TableCell>
                                                <Radio
                                                    checked={selectedSchedule?.group === slot.group}
                                                    onChange={handleRadioChange}
                                                    value={slot.group}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <Typography>No schedule available</Typography>
                        )}
                        <Box sx={{ mt: 2 }}>
                            <Button onClick={handleAddToCart} disabled={!selectedSchedule}>Add to Cart</Button>
                            <Button onClick={toggleCartDisplay} sx={{ ml: 2 }}>
                                {displayCart ? 'Hide Cart' : 'Display Cart'}
                            </Button>
                        </Box>
                        {displayCart && (
                            <Paper sx={{ mt: 2, p: 2 }}>
                                <Typography variant="h6">Cart</Typography>
                                {cart.length ? (
                                    <Table>
                                        <TableBody>
                                            {cart.map((item) => (
                                                <TableRow key={item.id}>
                                                    <TableCell>{item.group}</TableCell>
                                                    <TableCell>{item.time}</TableCell>
                                                    <TableCell>${item.cost}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                ) : (
                                    <Typography>No items in cart.</Typography>
                                )}
                            </Paper>
                        )}
                    </Paper>
                </Grid>
            </Grid>

            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={() => setOpenSnackbar(false)}
            >
                <SnackbarContent
                    sx={{ backgroundColor: '#4caf50', color: '#fff', p: 1, borderRadius: 1 }}
                    message={message}
                />
            </Snackbar>
        </Box>
    );
};

export default Calendar;