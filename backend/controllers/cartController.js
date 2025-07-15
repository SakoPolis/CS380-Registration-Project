import * as cartService from '../services/cartService';

export async function getCart (req, res, next) {
    try {
        const user_id = req.user.id;
        const items = await cartService.getCartItems(user_id);
        res.json(items);
    } catch(err) {
        next(err);
    }
}

export async function postCart(req, res, next) {
    try {
        const user_id = req.user.id;
        const newItem = await cartService.addCartItem(user_id, req.body);
        const items = await cartService.getCartItems(user_id);
        res.json(items);
    } catch(err) {
        next(err);
    }
}

export async function deleteCartItem (req, res, next) {
    try {
        const user_id = req.user.id;
        await cartService.removeCartItem(user_id, req.params.id);
        const items=await cartService.getCartItems(user_id);
        res.json(items);
    } catch(err) {
        next(err);
    }
}