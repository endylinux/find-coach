// import { defineAsyncComponent } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

// import CoachDetail from '@/pages/coaches/CoachDetail';
import CoachesList from '@/pages/coaches/CoachesList';
// import CoachRegistration from '@/pages/coaches/CoachRegistration';
// import ContactCoach from '@/pages/requests/ContactCoach';
import RequestsReceived from '@/pages/requests/RequestsReceived';
import UserAuth from '@/pages/auth/UserAuth';
import NotFound from '@/pages/NotFound';
import store from '@/store/index.js';

const CoachDetail = () => import('./pages/coaches/CoachDetail.vue');
const CoachRegistration =  () => import('./pages/coaches/CoachRegistration.vue');
const ContactCoach = () => import('./pages/requests/ContactCoach.vue');

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachesList },
    {
      path: '/coaches/:id',
      component: CoachDetail ,
      props: true,
      children: [
        { path: 'contact', component: ContactCoach },  // /coaches/c1/contact
      ]},
    { path: '/register', component: CoachRegistration, meta:{ requiresAuth: true} },
    { path: '/requests', component: RequestsReceived, meta:{ requiresAuth: true} },
    { path: '/auth', component: UserAuth , meta:{ requiresUnAuth: true}},
    { path: '/:notFound(.*)', component: NotFound },
  ],
});


router.beforeEach(function(to, from, next) {
  if(to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/auth');
  } else if(to.meta.requiresUnAuth && store.getters.isAuthenticated) {
    next('/coaches');
  } else {
    next();
  }
});

export default router;
