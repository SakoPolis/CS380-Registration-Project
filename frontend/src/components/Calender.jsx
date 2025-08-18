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





/**
 * @file Calender.jsx
 * @description Calendar that reads class slots and creates bookings in Supabase.
 * Works with your DB schema used by bookingService/classSlotService.
 */

import React, { useEffect, useMemo, useState } from "react";
import {
    Box, Grid, Typography, Button, Paper,
    Table, TableBody, TableCell, TableRow, Radio,
    Snackbar, SnackbarContent, Divider
} from "@mui/material";
import supabase from "../config/supabase.js";
import { useData } from "../contexts/UserContext";

const WEEKDAYS = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

export default function Calendar() {
    const { userData } = useData(); // expects userData?.id
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [calendarDays, setCalendarDays] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);

    // Slots keyed by weekday: { Monday: [slot, ...], ... }
    const [slotsByWeekday, setSlotsByWeekday] = useState({});
    const [selectedSlotId, setSelectedSlotId] = useState(null);

    // Bookings
    const [bookings, setBookings] = useState([]);
    const [loadingSlots, setLoadingSlots] = useState(false);
    const [loadingBookings, setLoadingBookings] = useState(false);
    const [snack, setSnack] = useState({ open: false, message: "", color: "#4caf50" });

    // Build calendar grid
    useEffect(() => {
        const first = new Date(currentYear, currentMonth, 1);
        const startDow = first.getDay(); // 0-6
        const last = new Date(currentYear, currentMonth + 1, 0);
        const totalDays = last.getDate();
        const totalCells = Math.ceil((startDow + totalDays) / 7) * 7;

        const days = [];
        for (let i = 0; i < totalCells; i++) {
            const date = new Date(currentYear, currentMonth, i + 1 - startDow);
            const dayOfWeek = WEEKDAYS[date.getDay()];
            days.push({ date, dayOfWeek, inMonth: date.getMonth() === currentMonth });
        }
        setCalendarDays(days);
    }, [currentMonth, currentYear]);

    // Load all class slots: id, day_of_week, group_type, start_time, end_time, price_cents, capacity
    useEffect(() => {
        const loadSlots = async () => {
            setLoadingSlots(true);
            try {
                const { data, error } = await supabase.from("class_slots").select("*");
                if (error) throw error;

                const grouped = {};
                for (const s of data) {
                    const key = s.day_of_week; // e.g., "Monday"
                    (grouped[key] = grouped[key] || []).push(s);
                }
                // Optional: sort each day by start_time
                for (const k of Object.keys(grouped)) {
                    grouped[k].sort((a, b) => a.start_time.localeCompare(b.start_time));
                }
                setSlotsByWeekday(grouped);
            } catch (e) {
                setSnack({ open: true, message: `Failed to load class slots: ${e.message}`, color: "#f44336" });
            } finally {
                setLoadingSlots(false);
            }
        };
        loadSlots();
    }, []);

    // Load my bookings (join class_slots for display), like bookingService.getAll
    useEffect(() => {
        if (!userData?.id) return;
        const loadBookings = async () => {
            setLoadingBookings(true);
            try {
                const { data, error } = await supabase
                    .from("class_bookings")
                    .select(`
            id,
            slot_id,
            class_date,
            booked_at,
            status,
            class_slots (
              id,
              day_of_week,
              group_type,
              start_time,
              end_time,
              price_cents,
              capacity
            )
          `)
                    .eq("user_id", userData.id)
                    .order("class_date", { ascending: true });
                if (error) throw error;

                // Flatten for display to match backend shape
                const normalized = data.map((b) => ({
                    id: b.id,
                    slotId: b.slot_id,
                    classDate: b.class_date,
                    bookedAt: b.booked_at,
                    status: b.status,
                    ...(b.class_slots && {
                        dayOfWeek: b.class_slots.day_of_week,
                        groupType: b.class_slots.group_type,
                        startTime: b.class_slots.start_time,
                        endTime: b.class_slots.end_time,
                        priceCents: b.class_slots.price_cents,
                        capacity: b.class_slots.capacity,
                    }),
                }));
                setBookings(normalized);
            } catch (e) {
                setSnack({ open: true, message: `Failed to load bookings: ${e.message}`, color: "#f44336" });
            } finally {
                setLoadingBookings(false);
            }
        };
        loadBookings();
    }, [userData?.id]);

    const slotsForSelectedDay = useMemo(() => {
        if (!selectedDate) return [];
        return slotsByWeekday[selectedDate.dayOfWeek] || [];
    }, [selectedDate, slotsByWeekday]);

    const handleDayClick = (day) => {
        setSelectedDate(day);
        setSelectedSlotId(null);
    };

    const handleMonthChange = (dir) => {
        if (dir === "prev") {
            if (currentMonth === 0) {
                setCurrentYear((y) => y - 1);
                setCurrentMonth(11);
            } else setCurrentMonth((m) => m - 1);
        } else {
            if (currentMonth === 11) {
                setCurrentYear((y) => y + 1);
                setCurrentMonth(0);
            } else setCurrentMonth((m) => m + 1);
        }
    };

    const bookSelected = async () => {
        if (!userData?.id) {
            setSnack({ open: true, message: "Please sign in to book.", color: "#f44336" });
            return;
        }
        if (!selectedDate || !selectedSlotId) return;

        // Normalize date -> YYYY-MM-DD (no time)
        const d = selectedDate.date;
        const class_date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
            .toISOString()
            .slice(0, 10);

        try {
            // Insert row into class_bookings to match your backend service expectations
            const { data, error } = await supabase
                .from("class_bookings")
                .insert([{ user_id: userData.id, slot_id: selectedSlotId, class_date, status: "booked" }])
                .select()
                .single();
            if (error) throw error;

            // Optimistically refresh bookings
            setBookings((prev) => [
                ...prev,
                {
                    id: data.id,
                    slotId: data.slot_id,
                    classDate: data.class_date,
                    bookedAt: data.booked_at,
                    status: data.status,
                    // Attach slot info for display if we have it:
                    ...(slotsForSelectedDay.find((s) => s.id === selectedSlotId) && {
                        ...(() => {
                            const s = slotsForSelectedDay.find((x) => x.id === selectedSlotId);
                            return {
                                dayOfWeek: s.day_of_week,
                                groupType: s.group_type,
                                startTime: s.start_time,
                                endTime: s.end_time,
                                priceCents: s.price_cents,
                                capacity: s.capacity,
                            };
                        })(),
                    }),
                },
            ]);

            setSnack({ open: true, message: "Class booked!", color: "#4caf50" });
        } catch (e) {
            setSnack({ open: true, message: `Booking failed: ${e.message}`, color: "#f44336" });
        }
    };

    const cancelBooking = async (bookingId) => {
        try {
            const { error } = await supabase.from("class_bookings").delete().eq("id", bookingId);
            if (error) throw error;
            setBookings((prev) => prev.filter((b) => b.id !== bookingId));
            setSnack({ open: true, message: "Booking canceled.", color: "#4caf50" });
        } catch (e) {
            setSnack({ open: true, message: `Cancel failed: ${e.message}`, color: "#f44336" });
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>Class Calendar</Typography>

            <Grid container spacing={2}>
                {/* Calendar */}
                <Grid item xs={12} md={7}>
                    <Paper sx={{ p: 2 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <Button onClick={() => handleMonthChange("prev")}>◀</Button>
                            <Typography variant="h6">
                                {new Date(currentYear, currentMonth).toLocaleString("en-US", { month: "long", year: "numeric" })}
                            </Typography>
                            <Button onClick={() => handleMonthChange("next")}>▶</Button>
                        </Box>

                        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 1, mt: 2 }}>
                            {["Su","Mo","Tu","We","Th","Fr","Sa"].map((d) => (
                                <Typography key={d} align="center" variant="body1" sx={{ fontWeight: 600 }}>{d}</Typography>
                            ))}
                            {calendarDays.map((day, idx) => (
                                <Button
                                    key={idx}
                                    variant={selectedDate?.date.getTime() === day.date.getTime() ? "contained" : "outlined"}
                                    onClick={() => handleDayClick(day)}
                                    disabled={!day.inMonth}
                                    sx={{
                                        opacity: day.inMonth ? 1 : 0.35,
                                        bgcolor:
                                            day.date.toDateString() === new Date().toDateString()
                                                ? "action.selected"
                                                : undefined,
                                    }}
                                >
                                    {day.date.getDate()}
                                </Button>
                            ))}
                        </Box>
                    </Paper>
                </Grid>

                {/* Day's Slots + Book */}
                <Grid item xs={12} md={5}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6">
                            Selected: {selectedDate ? selectedDate.date.toDateString() : "None"}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "text.secondary", mb: 1 }}>
                            {loadingSlots ? "Loading class slots…" : ""}
                        </Typography>

                        {selectedDate && (slotsForSelectedDay?.length ?? 0) > 0 ? (
                            <Table size="small">
                                <TableBody>
                                    {slotsForSelectedDay.map((slot) => (
                                        <TableRow key={slot.id}>
                                            <TableCell sx={{ whiteSpace: "nowrap" }}>{slot.group_type}</TableCell>
                                            <TableCell sx={{ whiteSpace: "nowrap" }}>
                                                {slot.start_time}–{slot.end_time}
                                            </TableCell>
                                            <TableCell>
                                                ${((slot.price_cents || 0) / 100).toFixed(2)}
                                            </TableCell>
                                            <TableCell align="right">
                                                <Radio
                                                    checked={selectedSlotId === slot.id}
                                                    onChange={() => setSelectedSlotId(slot.id)}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <Typography sx={{ mt: 1 }}>
                                {selectedDate ? "No slots for this day." : "Pick a date to see available classes."}
                            </Typography>
                        )}

                        <Box sx={{ mt: 2 }}>
                            <Button variant="contained" onClick={bookSelected} disabled={!selectedDate || !selectedSlotId}>
                                Book class
                            </Button>
                        </Box>
                    </Paper>
                </Grid>

                {/* My Bookings */}
                <Grid item xs={12}>
                    <Paper sx={{ p: 2 }}>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <Typography variant="h6">My Bookings</Typography>
                            <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                {loadingBookings ? "Loading…" : ""}
                            </Typography>
                        </Box>
                        <Divider sx={{ my: 1 }} />
                        {bookings.length ? (
                            <Table size="small">
                                <TableBody>
                                    {bookings.map((b) => (
                                        <TableRow key={b.id}>
                                            <TableCell sx={{ whiteSpace: "nowrap" }}>
                                                {b.classDate}
                                            </TableCell>
                                            <TableCell sx={{ whiteSpace: "nowrap" }}>
                                                {b.groupType ?? "—"}
                                            </TableCell>
                                            <TableCell sx={{ whiteSpace: "nowrap" }}>
                                                {(b.startTime && b.endTime) ? `${b.startTime}–${b.endTime}` : "—"}
                                            </TableCell>
                                            <TableCell>
                                                {typeof b.priceCents === "number" ? `$${(b.priceCents/100).toFixed(2)}` : "—"}
                                            </TableCell>
                                            <TableCell sx={{ whiteSpace: "nowrap" }}>
                                                {b.status ?? "booked"}
                                            </TableCell>
                                            <TableCell align="right">
                                                <Button size="small" onClick={() => cancelBooking(b.id)}>Cancel</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <Typography>No bookings yet.</Typography>
                        )}
                    </Paper>
                </Grid>
            </Grid>

            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={snack.open}
                autoHideDuration={3000}
                onClose={() => setSnack((s) => ({ ...s, open: false }))}
            >
                <SnackbarContent sx={{ backgroundColor: snack.color, color: "#fff" }} message={snack.message} />
            </Snackbar>
        </Box>
    );
}
