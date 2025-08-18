import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../config/supabase.js";

// ✅ use deep MUI imports to avoid version/export issues
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";

import { useData } from "../contexts/UserContext.jsx";

export default function SignIn() {
    const navigate = useNavigate();
    const { setUserData } = useData();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);
    const [submitError, setSubmitError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitError("");

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setSubmitError(error.message);
            return;
        }

        if (remember) {
            try {
                localStorage.setItem(
                    "savedCredentials",
                    JSON.stringify({
                        [email]: { password, savedAt: Date.now() },
                    })
                );
            } catch {}
        }

        setUserData(data.user);
        navigate("/");
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
                        Sign in
                    </Typography>

                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                    >
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
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                fullWidth
                            />
                        </FormControl>

                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={remember}
                                    onChange={(e) => setRemember(e.target.checked)}
                                />
                            }
                            label="Remember me"
                        />

                        {submitError && (
                            <Typography color="error">{submitError}</Typography>
                        )}

                        <Button type="submit" variant="contained" fullWidth>
                            Sign in
                        </Button>
                    </Box>
                </Paper>

                <Button variant="text" onClick={() => navigate("/")}>
                    ← Back to Home
                </Button>
            </Stack>
        </React.Fragment>
    );
}
