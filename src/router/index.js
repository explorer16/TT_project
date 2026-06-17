import {createRouter, createWebHistory} from 'vue-router';
import {useAuthStore} from "../stores/auth.js";

import undexAuth from '../pages/Auth/index.vue';
import indexChat from '../pages/Chat/index.vue';
import callbackAuth from "../pages/Auth/callback.vue";

const routes = [
    {
        path: '/auth',
        component: undexAuth,
        meta: {
            guestOnly: true
        }
    },
    {
        path: '/chat',
        component: indexChat,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/auth/callback',
        component: callbackAuth,
    }
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach(async (to) => {
    const auth = useAuthStore()

    if (auth.loading) {
        await auth.loadUser()
    }

    // ❗ важно: только после загрузки

    if (to.meta.requiresAuth && !auth.isAuth) {
        return '/auth'
    }

    if (to.meta.guestOnly && auth.isAuth) {
        return '/chat'
    }
})

export default router