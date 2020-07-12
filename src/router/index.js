import Vue from 'vue';
import VueRouter from 'vue-router';
import Overview from '../components/Overview.vue';
import Results from '../components/Results.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Overview',
    component: Overview,
    props: true,
    meta: { title: 'Overview - Recipe' },
  },
  {
    path: '/results/:query',
    name: 'Results',
    component: Results,
    props: true,
    meta: { title: 'Results - Recipe' },
  }
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

export default router;
