import { defineStore } from 'pinia'
import { supabase } from '../services/supabase'
import { profileService } from '../services/profile'
import router from "../router";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        session: null,
        loading: true
    }),
    getters: {
        isAuth: (state) => !!state.user
    },
    actions: {
        async loadUser() {
            const { data } = await supabase.auth.getSession()

            this.session = data.session
            this.user = data.session?.user || null

            this.loading = false
        },
        initAuth() {
            supabase.auth.onAuthStateChange(async (event, session) => {
                this.session = session
                this.user = session?.user || null
                if (this.user) {
                    router.push('/chat')
                }
            })
        },
        async ensureProfile(user) {
            console.log('ensureProfile', user)
            const existing = await profileService.getById(user.id)
            console.log('ensureProfile', existing)
            if (!existing) {
                await profileService.create({
                    id: user.id,
                    display_name: user.user_metadata?.full_name || 'User',
                    avatar_url: user.user_metadata?.avatar_url || null,
                    username: user.user_metadata?.full_name
                })
            }
        },
        async loginWithGoogle() {
            await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: 'http://localhost:5173/auth/callback',
                }
            })
        },
        async logout() {
            await supabase.auth.signOut()
            this.user = null
            this.session = null
        }
    }
})