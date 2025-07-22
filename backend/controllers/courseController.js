
// backend/controllers/courseController.js

import CourseService from '../services/courseService.js';
class CourseController {
    async getAll(req, res, next) {
        try { res.json(await CourseService.getAll(req.supabase, req.user.id)); } catch (e) { next(e); }
    }
    async create(req, res, next) {
        try { res.status(201).json(await CourseService.create(req.supabase, req.user.id, req.body)); } catch (e) { next(e); }
    }
    async update(req, res, next) {
        try { res.json(await CourseService.update(req.supabase, req.user.id, req.params.id, req.body)); } catch (e) { next(e); }
    }
    async delete(req, res, next) {
        try { await CourseService.delete(req.supabase, req.params.id); res.json({ message: 'Course deleted' }); } catch (e) { next(e); }
    }
}
export default new CourseController();