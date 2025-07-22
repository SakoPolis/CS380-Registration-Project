// backend/controllers/courseController.js
import CourseService from '../services/courseService.js';

class CourseController {
    async getAll(req, res, next) {
        try {
            const userId = req.user.id; // From authenticate middleware
            const courses = await CourseService.getAll(userId);
            res.json(courses);
        } catch (error) {
            next(error);
        }
    }

    async create(req, res, next) {
        try {
            const userId = req.user.id;
            const course = await CourseService.create(userId, req.body);
            res.status(201).json(course);
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const userId = req.user.id;
            const course = await CourseService.update(userId, req.params.id, req.body);
            res.json(course);
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            await CourseService.delete(req.params.id);
            res.json({ message: 'Course deleted' });
        } catch (error) {
            next(error);
        }
    }
}

export default new CourseController();