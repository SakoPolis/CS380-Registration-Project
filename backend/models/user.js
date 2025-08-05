
// backend/models/user.js

import supabase, {makeSupabaseClient} from "../config/supabase.js";

class User {

    static tableName = 'profiles';

    constructor(data = {}) {

        this.data = {
            id: data.id || null,
            display_name: data.display_name || '',
            avatar_url: data.avatar_url || null,
            bio: data.bio || null,
            preferences: data.preferences || {},
            settings: data.settings || {},
            social_handles: data.social_handles || {},
            signup_source: data.signup_source || null,
            created_at: data.created_at || null,
            updated_at: data.updated_at || null,
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
        return ['id', 'display_name'];
    }

    validate() {
        this.errors = [];
        for (const field of this.getRequiredFields()) {
            if (!this.data[field]) {
                this.errors.push(`${field} is required`);
            }
        }
        return this.errors.length === 0;
    }

    async save() {
        if (!this.validate()) {
            throw new Error(this.errors.join(', '));
        }

        const supabsae = makeSupabaseClient();
        const payload = {
            display_name: this.data.display_name,
            avatar_url: this.data.avatar_url,
            bio: this.data.bio,
            preferences: this.data.preferences,
            settings: this.data.settings,
            social_handles: this.data.social_handles,
            signup_source: this.data.signup_source,
        };

        let result;
        if (this.data.id) {
            result = await supabase
                .from(User.tableName)
                .update(payload)
                .eq('id', this.data.id)
                .single();
        } else {
            throw new Error('Cannot insert profile without user ID');
        }

        const {data, error} = result;
        if (error) throw error;
        this.data = {...this, data, ...data};
        return this;
    }

    async fetch(id) {
        const supabase = makeSupabaseClient();
        const {data, error} = await supabase
            .from(User.tableName)
            .select('*')
            .eq('id', id)
            .single();
        if(error) throw error;
        this.data = data;
        return this;
    }

    async delete() {
        const supabase = makeSupabaseClient();
        const { error } = await supabase
            .from(User.tableName)
            .delete()
            .eq('id', this.data.id);
        if (error) throw error;
    }

}