// controllers/baseController.js

export default class baseController {
    constructor(service) {
        this.service = service;
        this.getAll = this.getAll.bind(this);
        this.create = this.create.bind(this);
        this.delete = this.delete.bind(this);
    }

    async getAll(req, res, next) {
        try {
            const items = await this.service.getAll(req.user.id);
            res.json(items);
        } catch (err) {
            next(err);
        }
    }

    async create(req, res, next) {
        try {
            const items = await this.service.create(req.user.id, req.body);
            res.status(201).json(items);
        } catch (err) {
            next(err);
        }
    }

    async delete(req, res, next) {
        try {
            const items = await this.service.delete(req.user.id, req.params.id);
            res.status(204).json(items);
        } catch (err) {
            next(err);
        }
    }

}