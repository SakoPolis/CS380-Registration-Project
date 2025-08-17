
// unused_test_index.js

/*(
import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './controllers/userController.js';    // adjust paths as needed
import courseRoutes from './controllers/courseController.js';
import classSlotRoutes from './controllers/classSlotController.js';
import cartRoutes from './controllers/cartController.js';
import paymentRoutes from './controllers/paymentController.js';
import authenticate from './middleware/authenticate.js';

dotenv.config();
const app = express();
app.use(express.json());

// Public user routes
app.use('/user', userRoutes);

// All other routes require auth
app.use(authenticate);
app.use('/course',        courseRoutes);
app.use('/classSlots',    classSlotRoutes);
app.use('/cart',          cartRoutes);
app.use('/payment',       paymentRoutes);

// Global error handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));*/
