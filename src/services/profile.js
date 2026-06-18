import { supabase } from './supabase'

export const profileService = {
    async getById(id) {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', id)
            .maybeSingle()

        if (error) throw error
        return data
    },
    async create(profile) {
        const { data, error } = await supabase
            .from('profiles')
            .insert(profile)
            .select()
            .single()

        if (error) throw error
        return data
    },
    async search(query, excludeId) {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .ilike('display_name', `%${query}%`)
            .neq('id', excludeId)
            .limit(10)

        if (error) throw error
        return data
    }
}