import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Login from '../views/auth/Login.vue';
import CreateAccount from '../views/auth/CreateAccount.vue';
import Home from '../views/Home.vue';
import Favorites from '../views/Favorites.vue';
import store from '../store';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/create-account',
    name: 'CreateAccount',
    component: CreateAccount,
  },
  {
    path: '/home',
    name: 'Inicio',
    component: Home,
  },
  {
    path: '/favorites',
    name: 'Favoritos',
    component: Favorites,
  },
];


routes.push({
  path: '*',
  component: () => import('../views/pages/Error404.vue')
});


const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes,
});

router.beforeEach((to, from, next) => {
  if(to.name === 'Login' || to.name === 'CreateAccount') {
    store.dispatch('auth/isLogged').then(() => {
      if(to.name === "Login" || to.name === 'CreateAccount') {
        next({name: "Inicio"});
      }
      next()
    }).catch(() => {
      if (to.name === 'CreateAccount' || to.name === 'Login') {
        next()
      } else {
        console.log('É necessário realizar login')
        next({name: 'Login'})
      }
    })
  }else{
      next();
  }
});

export default router;
