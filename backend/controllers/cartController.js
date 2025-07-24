
// backend/controllers/cartController.js

import CartService from '../services/cartService.js';
import BaseController from "./baseController.js";
import supabase from "../config/supabase.js";

class CartController extends BaseController {

    constructor() {
        super(CartService);
    }

    async add(req, res, next) {
        try {
            const item = await CartService.add(req.supabase, req.user.id, req.body);
            res.status(201).json(item);
        } catch (err) { next(err); }
    }
    async getAll(req, res, next) {
        try {
            const items = await CartService.getAll(req.supabase, req.user.id);
            res.json(items);
        } catch (err) { next(err); }
    }
    async delete(req, res, next) {
        try {
            const info = await CartService.delete(req.supabase, req.user.id, req.params.id);
            res.json({
                message: `Cart item deleted: slot ${info.slotId} on ${info.classDate} (${info.dayOfWeek}, ${info.groupType})`
            });
        } catch (err) { next(err); }
    }

    async clear(req, res, next) {
        try {
            await CartService.clear(req.supabase, req.user.id);
            res.json({ message: 'Cart cleared' });
        } catch (err) {
            next(err);
        }
    }

}
export default new CartController();