
// controllers/baseController.js

export default class BaseController {
    constructor(service) {
        this.service = service;
        this.getAll = this.getAll.bind(this);
        this.create = this.create.bind(this);
        this.delete = this.delete.bind(this);
    }

    // Fetch all items for the authenticated user
    async getAll(req, res, next) {
        try {
            const items = await this.service.getAll(req.supabase, req.user.id);
            res.json(items);
        } catch (err) {
            next(err);
        }
    }

    // Create a new item for the authenticated user
    async create(req, res, next) {
        try {
            const item = await this.service.create(req.supabase, req.user.id, req.body);
            res.status(201).json(item);
        } catch (err) {
            next(err);
        }
    }

    // Delete an item by ID for the authenticated user
    async delete(req, res, next) {
        try {
            await this.service.delete(req.supabase, req.user.id, req.params.id);
            res.status(204).send();
        } catch (err) {
            next(err);
        }
    }
}