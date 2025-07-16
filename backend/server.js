import express from 'express';
import userRoutes from './routes/userRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import cartRoutes from './routes/cartRoutes.js';

import cors from 'cors';

const app = express();

// Enable CORS for frontend
app.use(cors({
    origin: 'http://localhost:5000',
    credentials: true,
}));

//JSON Body Parse
app.use(express.json());

//API Mounts
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/cart', cartRoutes);

//404 Handle
app.use((req, res, next) => {
    res.status(404).json({ error: 'Not Found' });
});

//Error Handling MIddleware
app.use((err, req, res, next) => {
    console.error(err);  // log to console (or your logger)

    // If Supabase error or our services, it might have
    // a status or code, otherwise it'll say 500
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';

    res.status(status).json({ error: message });
});

//Server Start
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});