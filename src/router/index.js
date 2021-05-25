import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import firebase from 'firebase/app';
import 'firebase/auth';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/bookmarks',
    name: 'Bookmarks',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "bookmarks" */ '../views/BookMarks.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    meta: {
      requiresGuest: true,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  //check for required auth guard
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if NOT logged in, go to login in page
    if (!firebase.auth().currentUser) {
      // go to login
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      });
    } else {
      // logged in, go to route
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    // Check if logged in, no need to go to login, go to homepage
    if (firebase.auth().currentUser) {
      next({
        path: '/',
        query: { redirect: to.fullPath },
      });
    } else {
      // not logged in, go to route
      next();
    }
  } else {
    // go to route
    next();
  }
});

export default router;
