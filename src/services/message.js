import { supabase } from "./supabase.js";

export const messageService = {
    async getAll(conversationId) {
        const { data, error } = await supabase
            .from("messages")
            .select("*, sender:profiles(display_name, avatar_url)")
            .eq('conversation_id', conversationId)
            .order('created_at')

        if (error) throw error
        return data
    },
    async create({ conversation_id, sender_id, content }) {
        const { data, error } = await supabase
            .from("messages")
            .insert({ conversation_id, sender_id, content })

        if (error) throw error
    }
}