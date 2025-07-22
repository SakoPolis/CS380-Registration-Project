
// backend/services/cartService.js

import supabase from '../config/supabase.js';

class CartService {

    constructor(){

    }

    async getAll(userId) {
        const { data, error } = await supabase
            .from('carts')
            .select(`
        id,
        user_id,
        classes (
          id,
          title,
          description,
          price_cents
        )
      `)
            .eq('user_id', userId);

        if (error) throw new Error(error.message);

        return data.map(({ id, user_id, classes }) => ({
            id,
            userId: user_id,
            classes: classes.map(c => ({
                id: c.id,
                title: c.title,
                description: c.description,
                priceCents: c.price_cents
            }))
        }));
    }

    async create(userId, classId) {
        const { data, error } = await supabase
            .from('carts')
            .insert([{ user_id: userId, class_id: classId }])
            .select()
            .single();

        if (error) throw new Error(error.message);

        return {
            id: data.id,
            userId: data.user_id,
            classId: data.class_id
        };
    }

    async cancel(id) {
        const { error } = await supabase
            .from('carts')
            .delete()
            .eq('id', id);

        if (error) throw new Error(error.message);

        return { cancelled: true };
    }

    async cancelAll(userId) {
        const { count, error } = await supabase
            .from('carts')
            .delete({ returning: 'minimal' })
            .eq('user_id', userId);

        if (error) throw new Error(error.message);

        return { cancelledCount: count };
    }
}

export default new CartService();
