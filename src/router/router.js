import UserPage from "@/pages/UserPage.vue";
import HistoryAll from "@/pages/HistoryAll.vue"
import HistoryAdd from "@/pages/HistoryOfAdditions.vue"
import HistoryDel from "@/pages/HistoryOfDeletions.vue"
import Main from "@/pages/Main-main.vue";
import { createRouter, createWebHistory } from "vue-router";


const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/users',
        component: UserPage
    },
    {
        path: '/history',
        component: HistoryAll
    },
    {
        path: '/historyAdd',
        component: HistoryAdd
    },
    {
        path: '/historyDel',
        component: HistoryDel
    },
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;