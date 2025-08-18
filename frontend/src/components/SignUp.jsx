/**
 * @file SignUp.jsx
 * @module SignUp
 * @date 2025-08-13
 * @author Talin
 * @description
 *   React component for user registration using Supabase authentication.
 *   Collects user name, email, and password, validates input, and submits to backend.
 *
 * @component
 * @example
 * return <SignUp />;
 *
 * @function handleChange
 * @description Updates form state when input fields change.
 * @param {object} event - Change event from input.
 * @returns {void}
 *
 * @function validate
 * @description Validates name, email, and password fields.
 * @returns {boolean} True if all fields are valid, otherwise false.
 *
 * @function handleSubmit
 * @description Submits signup form data to Supabase, navigates to home on success.
 * @param {object} e - Form submit event.
 * @returns {Promise<void>}
 */



// src/SignUp.jsx

// frontend/src/components/SignUp.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../config/supabase.js";

// ✅ Deep MUI imports (match SignIn style)
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";

export default function SignUp() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitError, setSubmitError] = useState("");
    const [submitSuccess, setSubmitSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitError("");
        setSubmitSuccess("");

        if (!name.trim()) {
            setSubmitError("Please enter your name.");
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setSubmitError("Please enter a valid email.");
            return;
        }
        if (password.length < 6) {
            setSubmitError("Password must be at least 6 characters.");
            return;
        }

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { full_name: name },
                // After email confirmation, send them to Sign In
                emailRedirectTo: `${window.location.origin}/signin`,
            },
        });

        if (error) {
            setSubmitError(error.message);
            return;
        }

        // Keep it simple: prompt user to sign in now
        setSubmitSuccess("Account created! Please check your email, then sign in.");
        setTimeout(() => navigate("/signin"), 800);
    };

    return (
        <React.Fragment>
            <CssBaseline enableColorScheme />
            <Stack
                sx={{ minHeight: "100vh" }}
                alignItems="center"
                justifyContent="center"
                spacing={2}
            >
                <Paper elevation={2} sx={{ p: 4, width: "100%", maxWidth: 420 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Sign up
                    </Typography>

                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                    >
                        <FormControl fullWidth>
                            <FormLabel>Name</FormLabel>
                            <TextField
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                fullWidth
                            />
                        </FormControl>

                        <FormControl fullWidth>
                            <FormLabel>Email</FormLabel>
                            <TextField
                                name="email"
                                type="email"
                                autoComplete="username"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                fullWidth
                            />
                        </FormControl>

                        <FormControl fullWidth>
                            <FormLabel>Password</FormLabel>
                            <TextField
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                fullWidth
                            />
                        </FormControl>

                        {submitError && <Typography color="error">{submitError}</Typography>}
                        {submitSuccess && <Typography color="primary">{submitSuccess}</Typography>}

                        <Button type="submit" variant="contained" fullWidth>
                            Create account
                        </Button>
                    </Box>
                </Paper>

                <Button variant="text" onClick={() => navigate("/signin")}>
                    Already have an account? Sign in →
                </Button>
            </Stack>
        </React.Fragment>
    );
}
