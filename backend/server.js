// backend/server.js
import express from 'express';
import cartRoutes from './routes/cartRoutes.js';
import userRoutes from './routes/userRoutes.js';
import classSlotRoutes from './routes/classSlotRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import cors from 'cors';

const app = express();

// Enable CORS
app.use(cors({
    origin: '*',
    credentials: true,
}));

// JSON Body Parser
app.use(express.json());

// Root route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the CS380 Backend API' });
});

// API Routes
app.use('/api/cart', cartRoutes);
app.use('/api/users', userRoutes);
app.use('/api', classSlotRoutes);
app.use('/api', bookingRoutes);
app.use('/api/payments', paymentRoutes);

// 404 Handler
app.use((req, res, next) => {
    res.status(404).json({ error: 'Not Found' });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err);
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    res.status(status).json({ error: message });
});

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});