import { RouteRecordRaw } from 'vue-router';
import Home from '@/views/Home/index.vue';

/**
 * 每次创建新路由后，请在 pc 端路由中同步添加对应配置和页面
 *
 * 具体原因，请看 README 中 「路由定义」 部分
 */
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
    // name: 'Home',
    // component: () => import(/* webpackChunkName: "home" */ '@/views/home/index.vue'),
  },
  {
    path: '/home',
    name: 'Home',
    // component: () => import(/* webpackChunkName: "create" */ '@/views/create/index.vue'),
    component: Home,
  },
];

export default routes;
