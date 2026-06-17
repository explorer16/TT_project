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
}