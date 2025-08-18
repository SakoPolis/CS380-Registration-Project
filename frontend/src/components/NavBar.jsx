// frontend/src/components/NavBar.jsx

import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box, Link as MuiLink } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import supabase from "../config/supabase.js";
import { useUser } from "../contexts/UserContext.jsx";

const navLinks = [
    { label: "Home", to: "/" },
    { label: "Calendar", to: "/calender" },
    { label: "Cart", to: "/cart" },
];

export default function NavBar() {
    const [user, setUser] = useState(null);
    const { setUserData } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        const loadUser = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession();
            handleUserChange(session?.user || null);
        };

        const { data } = supabase.auth.onAuthStateChange((_event, session) =>
            handleUserChange(session?.user || null)
        );
        const subscription = data?.subscription;

        loadUser();
        return () => subscription?.unsubscribe();
    }, []);

    const handleUserChange = (u) => {
        if (u) {
            setUser(u);
            setUserData(u);
            sessionStorage.setItem("user", JSON.stringify(u));
        } else {
            setUser(null);
            setUserData(null);
            sessionStorage.removeItem("user");
        }
    };

    const handleSignOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) console.error("Server sign-out error:", error.message);

        handleUserChange(null);

        // Clear cached Supabase tokens (prevents auto re-login on refresh)
        Object.keys(localStorage)
            .filter((key) => key.startsWith("sb-"))
            .forEach((key) => localStorage.removeItem(key));

        navigate("/signin", { replace: true });
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Box sx={{ flexGrow: 1, display: "flex", gap: 2 }}>
                    {navLinks.map(({ label, to }) => (
                        <MuiLink key={to} component={RouterLink} to={to} color="inherit" underline="none">
                            {label}
                        </MuiLink>
                    ))}
                </Box>

                {user ? (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Typography>
                            Welcome,{" "}
                            {user.user_metadata?.full_name ??
                                user.user_metadata?.display_name ??
                                user.email}
                        </Typography>
                        <Button color="inherit" onClick={handleSignOut}>
                            Sign Out
                        </Button>
                    </Box>
                ) : (
                    <Box sx={{ display: "flex", gap: 2 }}>
                        <Button component={RouterLink} to="/signin" color="inherit">
                            Sign In
                        </Button>
                        <Button component={RouterLink} to="/signup" color="inherit">
                            Sign Up
                        </Button>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
}