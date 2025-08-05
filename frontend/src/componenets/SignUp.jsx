// src/SignUp.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './lib/supabaseClient';
import {
    Box,
    Button,
    Checkbox,
    CssBaseline,
    Divider,
    FormControl,
    FormControlLabel,
    FormLabel,
    TextField,
    Typography,
    Stack,
    Card as MuiCard,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AppTheme from './shared-theme/AppTheme';
import ColorModeSelect from './shared-theme/ColorModeSelect';
import { GoogleIcon, FacebookIcon, SitemarkIcon } from './components/CustomIcons';

const SignUpCard = styled(MuiCard)(({ theme }) => ({
    maxWidth: 450,
    margin: 'auto',
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
}));

export default function SignUp() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [errors, setErrors] = useState({ name: '', email: '', password: '', submit: '' });

    const handleChange = ({ target: { name, value } }) => {
        setForm(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const validate = () => {
        const errs = {};
        if (!form.name.trim()) errs.name = 'Name required';
        if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Valid email required';
        if (form.password.length < 6) errs.password = 'At least 6 characters';
        setErrors(prev => ({ ...prev, ...errs }));
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = async e => {
        console.log('handleSubmit called', { form });

        e.preventDefault();
        if (!validate()) return;

        const { data, error } = await supabase.auth.signUp({
            email: form.email, password: form.password, options: {
                // write your “name” field into metadata.full_name
                data: { full_name: form.name },
                emailRedirectTo: `${window.location.origin}/signin`
            }
        });
        console.log("⮞ supabase.auth.signUp →", data, error);

        if (error) {
            setErrors(prev => ({ ...prev, submit: error.message }));
        } else {
            // show a success banner
            setForm({ name: "", email: "", password: "" });
            setErrors({ name: "", email: "", password: "", submit: "" });
            navigate('/');
        }
    };

    return (
        <AppTheme>
            <CssBaseline enableColorScheme />
            <ColorModeSelect sx={{ position: 'fixed', top: 64, right: 16 }} />
            <Stack sx={{ minHeight: '100vh', p: 2 }} justifyContent="center">
                <SignUpCard variant="outlined">
                    <SitemarkIcon />
                    <Typography variant="h4" component="h1">Sign up</Typography>

                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <FormControl>
                            <FormLabel>Name</FormLabel>
                            <TextField
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                error={!!errors.name}
                                helperText={errors.name}
                                required
                                fullWidth
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Email</FormLabel>
                            <TextField
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                error={!!errors.email}
                                helperText={errors.email}
                                required
                                fullWidth
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Password</FormLabel>
                            <TextField
                                name="password"
                                type="password"
                                value={form.password}
                                onChange={handleChange}
                                error={!!errors.password}
                                helperText={errors.password}
                                required
                                fullWidth
                            />
                        </FormControl>

                        <FormControlLabel control={<Checkbox />} label="I want to receive updates via email." />
                        {errors.submit && <Typography color="error">{errors.submit}</Typography>}
                        <Button type="submit" variant="contained" fullWidth>Sign up</Button>
                    </Box>

                    <Divider>
                        <Typography color="text.secondary">or</Typography>
                    </Divider>
                    <Stack spacing={2}>
                        <Button variant="outlined" startIcon={<GoogleIcon />}>Sign up with Google</Button>
                        <Button variant="outlined" startIcon={<FacebookIcon />}>Sign up with Facebook</Button>
                    </Stack>

                    <Typography align="center">
                        Already have an account?{' '}
                        <Typography component="span" color="primary" sx={{ cursor: 'pointer' }} onClick={() => navigate('/signin')}>
                            Sign in
                        </Typography>
                    </Typography>
                </SignUpCard>
            </Stack>
        </AppTheme>
    );
}