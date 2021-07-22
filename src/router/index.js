import Vue from 'vue';
import VueRouter from 'vue-router';
import firebase from 'firebase/app';
import 'firebase/auth'
import Login from '../views/Login';
import Dashboard from '../views/admin/Dashboard';
import AddFurniture from "../views/admin/AddFurniture";
import Management from "../views/admin/Management";
import SignUp from "@/views/SignUp";
import Catalog from "@/views/admin/Catalog";
import Bedroom from "@/views/admin/Bedroom";
import LivingRoom from "@/views/admin/LivingRoom";
import DiningRoom from "@/views/admin/DiningRoom";
import Accessories from "@/views/admin/Accessories";

Vue.use(VueRouter)

const routes = [
    {
        // Login Page
        path: '/',
        name: '/',
        component: Login
    },
    {
        // Login Page
        path: '/signup',
        component: SignUp
    },
    {
        path: '/admin',
        component: () => import('../views/admin/AdminHome.vue'),
        children: [
            {path: '', component: Dashboard},
            {path: 'add-furniture', component: AddFurniture},
            {path: 'management', component: Management},
            {path: 'all', component: Catalog, name: Catalog},
            {path: 'bedroom', component: Bedroom, name: Bedroom},
            {path: 'living-room', component: LivingRoom, name: LivingRoom},
            {path: 'dining', component: DiningRoom, name: DiningRoom},
            {path: 'accessories', component: Accessories, name: Accessories},
        ],
        meta: {
            requiresAuth: true,
            title: "Furniture Catalog",
            icon: "/logo.png"
        }
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!(firebase.auth().currentUser)) {
            next({name: '/'});
        } else {
            next();
        }
    } else if (to.path == '/') {
        if (firebase.auth().currentUser) {
            next({path: '/admin'});
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router
