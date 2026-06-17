import { createRouter, createWebHistory } from 'vue-router';

import AuthPage from '../pages/AuthPage.vue';
import ChatPage from '../pages/ChatPage.vue';

const routes = [
    {
        path: '/auth',
        component: AuthPage,
    },
    {
        path: '/chat',
        component: ChatPage,
    }
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
})