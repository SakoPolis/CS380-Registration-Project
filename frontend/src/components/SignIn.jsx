/**
 * @file SignIn.jsx
 * @module SignIn
 * @date 2025-08-13
 * @description
 *   User authentication form with Supabase and saved credentials support.
 *
 * @function validate
 * @description Validates email and password format.
 * @returns {boolean}
 *
 * @function handleSubmit
 * @description Authenticates user, optionally remembering credentials.
 * @returns {Promise<void>}
 */





// SignIn.js


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase, {makeSupabaseClient} from "../config/supabase.js";

import {
    Box,
    Button,
    Checkbox,
    CssBaseline,
    FormControl,
    FormControlLabel,
    FormLabel,
    TextField,
    Typography,
    Stack,
    Card as MuiCard,
    Divider,
    Autocomplete,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AppTheme from "../shared-theme/AppTheme.jsx";
import ColorModeSelect from '../shared-theme/ColorModeSelect';
import ForgotPassword from '../components/ForgotPassword';
import { GoogleIcon, FacebookIcon, SitemarkIcon } from './components/CustomIcons';
import { useData } from './components/UserContext';

const SignInCard = styled(MuiCard)(({ theme }) => ({
    maxWidth: 450,
    margin: 'auto',
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
}));

export default function SignIn() {
    const navigate = useNavigate();
    const { setUserData } = useData();

    // controlled fields
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errors, setErrors] = useState({ email: '', password: '', submit: '' });
    const [resetOpen, setResetOpen] = useState(false);
    const [remember, setRemember] = useState(false);

    // saved credentials map: { [email]: { password, savedAt } }
    const [savedCredentials, setSavedCredentials] = useState({});

    // on mount: load & expire old entries
    useEffect(() => {
        try {
            const raw = localStorage.getItem('savedCredentials') || '{}';
            const parsed = JSON.parse(raw);
            const TTL = 30 * 24 * 60 * 60 * 1000; // 30 days
            const now = Date.now();

            // remove expired
            Object.keys(parsed).forEach(key => {
                if (now - parsed[key].savedAt > TTL) {
                    delete parsed[key];
                }
            });

            setSavedCredentials(parsed);
            localStorage.setItem('savedCredentials', JSON.stringify(parsed));
        } catch {
            setSavedCredentials({});
        }
    }, []);

    // auto-fill password when selecting an email
    useEffect(() => {
        if (email && savedCredentials[email]) {
            setPassword(savedCredentials[email].password);
        }
    }, [email, savedCredentials]);

    const handleRememberToggle = () => setRemember(r => !r);

    const validate = (email, password) => {
        const errs = {};
        if (!/\S+@\S+\.\S+/.test(email)) errs.email = 'Valid email required';
        if (password.length < 6) errs.password = 'At least 6 characters';
        setErrors(prev => ({ ...prev, ...errs }));
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = async e => {
        e.preventDefault();
        if (!validate(email, password)) return;

        const { data, error } = await supabase.auth.signInWithPassword(
            { email, password },
            { options: { persistSession: remember } }
        );

        if (error) {
            setErrors(prev => ({ ...prev, submit: error.message }));
        } else {
            if (remember) {
                const updated = {
                    ...savedCredentials,
                    [email]: { password, savedAt: Date.now() },
                };
                localStorage.setItem('savedCredentials', JSON.stringify(updated));
                setSavedCredentials(updated);
            }

            setUserData(data.user);
            navigate('/');
        }
    };

    return (
        <AppTheme>
            <CssBaseline enableColorScheme />
            <ColorModeSelect sx={{ position: 'fixed', top: 64, right: 16 }} />
            <Stack sx={{ minHeight: '100vh', p: 2 }} justifyContent="center">
                <SignInCard variant="outlined">
                    <SitemarkIcon />
                    <Typography variant="h4" component="h1">
                        Sign in
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="on" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <FormControl>
                            <FormLabel>Email</FormLabel>
                            <Autocomplete
                                freeSolo
                                options={Object.keys(savedCredentials)}
                                value={email}
                                onInputChange={(e, val) => setEmail(val)}
                                renderInput={params => (
                                    <TextField
                                        {...params}
                                        name="email"
                                        type="email"
                                        label="Email"
                                        autoComplete="username"
                                        error={!!errors.email}
                                        helperText={errors.email}
                                        required
                                        fullWidth
                                    />
                                )}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Password</FormLabel>
                            <TextField
                                name="password"
                                type="password"
                                label="Password"
                                autoComplete="current-password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                error={!!errors.password}
                                helperText={errors.password}
                                required
                                fullWidth
                            />
                        </FormControl>

                        <FormControlLabel
                            control={<Checkbox checked={remember} onChange={handleRememberToggle} />}
                            label="Remember me"
                        />

                        <ForgotPassword open={resetOpen} onClose={() => setResetOpen(false)} />

                        {errors.submit && <Typography color="error">{errors.submit}</Typography>}

                        <Button type="submit" variant="contained" fullWidth>
                            Sign in
                        </Button>
                    </Box>

                    <Divider>or</Divider>
                    <Stack spacing={2}>
                        <Button variant="outlined" startIcon={<GoogleIcon />}>Sign in with Google</Button>
                        <Button variant="outlined" startIcon={<FacebookIcon />}>Sign in with Facebook</Button>
                    </Stack>

                    <Typography align="center">
                        Don’t have an account?{' '}
                        <Typography component="span" color="primary" sx={{ cursor: 'pointer' }} onClick={() => navigate('/signup')}>
                            Sign up
                        </Typography>
                    </Typography>
                </SignInCard>
            </Stack>
        </AppTheme>
    );
}