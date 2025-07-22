
// backend/controllers/bookingController.js

import BookingService from '../services/bookingService.js';
import BaseController from "./baseController.js";

class BookingController extends BaseController {

    constructor() {
        super(BookingService);
    }

    async getAll(req, res, next) {
        try {
            res.json(await BookingService.getAll(req.supabase, req.user.id));
        } catch (e) {
            next(e);
        }
    }
    async create(req, res, next) {
        try {
            const booking = await this.service.add(req.supabase, req.user.id, req.body);
            res.status(201).json(booking);
        } catch (error) {
            next(error);
        }
    }
    async delete(req, res, next) {
        try {
            await BookingService.delete(req.supabase, req.user.id, req.params.id); res.json({ message: 'Booking deleted' });
        } catch (e) {
            next(e); 
        }
    }
}
export default new BookingController();