import { defineStore } from 'pinia'
import { supabase } from '../services/supabase'
import { profileService } from '../services/profile'
import router from "../router";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        session: null,
        profile: null,
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

            if (this.user && !this.profile) {
                await this.ensureProfile(this.user)
            }
        },
        initAuth() {
            supabase.auth.onAuthStateChange(async (event, session) => {
                this.session = session
                this.user = session?.user || null
            })
        },
        async ensureProfile(user) {
            const existing = await profileService.getById(user.id);
            if (existing) {
                this.profile = existing
            } else {
                this.profile = await profileService.create({
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
        async loginWithGithub() {
            await supabase.auth.signInWithOAuth({
                provider: 'github',
                options: {
                    redirectTo: 'http://localhost:5173/auth/callback',
                }
            })
        },
        async logout() {
            await supabase.auth.signOut()
            this.user = null
            this.session = null
            router.push('/auth')
        }
    }
})