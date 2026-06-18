import { supabase } from './supabase';

export const ConversationService = {
    async create({ name, is_group}) {
        const id = crypto.randomUUID();
        const {data, error} = await supabase
            .from('conversations')
            .insert({ id, name, is_group })

        if (error) throw error
        return { id, name, is_group }
    },
    async addMember({conversation_id, profile_id}) {
        const {data, error} = await supabase
            .from('conversation_members')
            .insert({conversation_id, profile_id})

        if (error) throw error
       return data
    },
    async getAll() {
        const {data, error} = await supabase
            .from('conversations')
            .select()
            .order('created_at')

        if (error) throw error
        return data
    }
}