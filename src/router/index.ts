import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        //路由初始指向
        path: '/',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
    },
    {
        path: '/preview',
        component: () => import('@/views/preview/index.vue'),
        name: 'preview'
    },
    {
        path: '/404',
        component: () => import('@/views/404/index.vue'),
        name: '404'
    },
    // {
    //     path: '/:pathMatch(.*)*',
    //     redirect: '/404',
    //     name: 'Any'
    // },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
