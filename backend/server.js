
// backend/server.js

import express from 'express';
import cartRoutes from './routes/cartRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import userRoutes from './routes/userRoutes.js';
import classSlotRoutes from './routes/classSlotRoutes.js';
import cors from 'cors';

const app = express();

// Enable CORS
app.use(cors({
    origin: '*', // Allow all origins for testing
    credentials: true,
}));

// JSON Body Parser
app.use(express.json());

// testing Root route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the CS380 Backend API' });
});

// API Mounts
app.use('/api/cart', cartRoutes); // Already includes authenticate in cartRoutes.js
app.use('/api/classes', courseRoutes); // Already includes authenticate in courseRoutes.js
app.use('/api/payments', paymentRoutes); // Already includes authenticate in paymentRoutes.js
app.use('/api/users', userRoutes); // No authenticate here
app.use('/api/slots', classSlotRoutes); // Already includes authenticate in classSlotRoutes.js

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