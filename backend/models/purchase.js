
// backend/models/purchase.js

import { makeSupabaseClient } from '../config/supabase.js';

class Purchase {
    static tableName = 'purchases';

    constructor(data = {}) {
        this.data = {
            id: data.id,
            userId: data.userId,
            amountCents: data.amountCents,
            status: data.status,
            purchasedAt: data.purchasedAt,
            refundedAt: data.refundedAt
        };
        this.errors = [];
    }

    get(field) {
        return this.data[field];
    }

    set(field, value) {
        this.data[field] = value;
        return this;
    }

    getRequiredFields() {
        return ['userId', 'amountCents', 'status'];
    }

    validate() {
        this.errors = [];
        for (const field of this.getRequiredFields()) {
            if (!this.data[field] && this.data[field] !== 0) {
                this.errors.push(`${field} is required`);
            }
        }
        if (this.data.amountCents < 0) {
            this.errors.push('amountCents must be non-negative');
        }
        if (
            this.data.status &&
            !['pending', 'confirmed', 'refunded'].includes(this.data.status)
        ) {
            this.errors.push("status must be 'pending', 'confirmed', or 'refunded'");
        }
        return this.errors.length === 0;
    }

    async save() {
        if (!this.validate()) {
            throw new Error(`Validation failed: ${this.errors.join(', ')}`);
        }

        const dbData = {
            id: this.data.id,
            user_id: this.data.userId,
            amount_cents: this.data.amountCents,
            status: this.data.status,
            purchased_at: this.data.purchasedAt,
            refunded_at: this.data.refundedAt
        };

        if (this.data.id) {
            const { data, error } = await makeSupabaseClient
                .from(Purchase.tableName)
                .update(dbData)
                .eq('id', this.data.id)
                .select()
                .single();
            if (error) throw new Error(`Failed to update ${Purchase.tableName}: ${error.message}`);
            this.data = {
                id: data.id,
                userId: data.user_id,
                amountCents: data.amount_cents,
                status: data.status,
                purchasedAt: data.purchased_at,
                refundedAt: data.refunded_at
            };
            return this;
        } else {
            const { data, error } = await makeSupabaseClient
                .from(Purchase.tableName)
                .insert([dbData])
                .select()
                .single();
            if (error) throw new Error(`Failed to create ${Purchase.tableName}: ${error.message}`);
            this.data = {
                id: data.id,
                userId: data.user_id,
                amountCents: data.amount_cents,
                status: data.status,
                purchasedAt: data.purchased_at,
                refundedAt: data.refunded_at
            };
            return this;
        }
    }

    async fetch(id) {
        const { data, error } = await makeSupabaseClient
            .from(Purchase.tableName)
            .select('id, user_id, amount_cents, status, purchased_at, refunded_at')
            .eq('id', id)
            .single();
        if (error) throw new Error(`Failed to fetch ${Purchase.tableName}: ${error.message}`);
        this.data = {
            id: data.id,
            userId: data.user_id,
            amountCents: data.amount_cents,
            status: data.status,
            purchasedAt: data.purchased_at,
            refundedAt: data.refunded_at
        };
        return this;
    }

    async delete(id) {
        const { error } = await makeSupabaseClient
            .from(Purchase.tableName)
            .delete()
            .eq('id', id);
        if (error) throw new Error(`Failed to delete ${Purchase.tableName}: ${error.message}`);
        this.data = {};
        return this;
    }

    async refund(refundAmountCents) {
        if (this.data.status === 'refunded') {
            throw new Error('Purchase already refunded');
        }
        this.set('status', 'refunded').set('refundedAt', new Date());
        await this.save();
        return this;
    }
}

export default Purchase;
