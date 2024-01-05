import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import ShopPage from '../views/ShopPage.vue';
import AboutPage from '../views/AboutPage.vue';
import contactUs from '../views/ContactUs.vue';
import card_product from '../components/card_product.vue';
import login_form from '../components/login&register/login_form.vue';
import register_form from '../components/login&register/register_form.vue';
import adminpage from '../components/AdminPage/Admin.vue';
import processPay from '../components/processPay.vue';
import invoice from '../components/invoice.vue';
import listProduct from '../components/AdminPage/Crudpage/seeallproduct.vue';
import orderHistory from '../components/orderHistory.vue';
import favorite from '../components/Favorite.vue'
import viewProfile from '../components/ViewProfile.vue'
import upadteproduct from '../components/AdminPage/crudpage/Updateproduct.vue'
import deleteproduct from '../components/AdminPage/crudpage/deleteproduct.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage,
    },
    {
      path: '/about',
      name: 'AboutPage',
      component: AboutPage,
    },
    {
      path: '/shop',
      name: 'ShopPage',
      component: ShopPage,
    },
    {
      path: '/contact',
      name: 'ContactUs',
      component: contactUs,
    },
    {
      path: '/card',
      name: 'CardProduct',
      component: card_product,
    },
    {
      path: '/cart/payment',
      name: 'payment',
      component: processPay,
    },
    {
      path: '/cart/invoice',
      name: 'invoice',
      component: invoice,
    },
    {
      path: '/product-list',
      name: 'productList',
      component: listProduct,
    },
    {
      path: '/order-history',
      name: 'ordereHistory',
      component: orderHistory,
    },
    {
      path: '/acount/login',
      name: 'LoginForm',
      component: login_form,
    },
    {
      path: '/acount/register',
      name: 'RegisterForm',
      component: register_form,
    },
    {
      path:'/upadteproduct',
      name:'upadteproduct',
      component:upadteproduct
    },
    {
      path:'/delete',
      name:'delete',
      component:deleteproduct
    },
    ////
    {
      path:'/favorite',
      name:'favorite',
      component:favorite
    },
    ////
    {
      path:'/profile',
      name:'profile',
      component:viewProfile
    },
    ////
    {
      path: '/adminpage',
      name: 'adminpage',
      component: adminpage,
    }, 
  ],
});

export default router;
