
// backend/controllers/bookingController.js

import BookingService from '../services/bookingService.js';
class BookingController {
    async getAll(req, res, next) {
        try { res.json(await BookingService.getAll(req.supabase, req.user.id)); } catch (e) { next(e); }
    }
    async create(req, res, next) {
        try { res.status(201).json(await BookingService.add(req.supabase, req.user.id, req.body)); } catch (e) { next(e); }
    }
    async delete(req, res, next) {
        try { await BookingService.delete(req.supabase, req.user.id, req.params.id); res.json({ message: 'Booking deleted' }); } catch (e) { next(e); }
    }
}
export default new BookingController();