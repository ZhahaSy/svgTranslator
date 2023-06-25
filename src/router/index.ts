import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import ProjectLayout from '@/layouts/ProjectLayout.vue';
import SecurityLayout from '@/layouts/SecurityLayout.vue';
import BasicLayout from '@/layouts/BasicLayout.vue';
import pageRoutes from './routes';

/**
 * 由于 pc 端和 mobile 端使用的是相同域名，
 * 访问系统时，会在网关层做对应的处理，根据 User-Agent 判断，应该返回 pc 端还是 mobile 端的页面。
 * 所以 2 个系统在路由声明中需要保持一致。
 * 否则访问同一个 url，在 2 端可能展示的页面不一致，造成 bug。
 *
 * 每次创建新路由后，请在 mobile 端路由中同步添加对应配置和页面
 */
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'ProjectLayout',
    component: ProjectLayout,
    children: [
      {
        path: '/',
        name: 'SecurityLayout',
        component: SecurityLayout,
        children: [
          {
            path: '/',
            name: 'BasicLayout',
            component: BasicLayout,
            children: [
              ...pageRoutes,
              {
                path: '/404',
                name: '404',
                props: true,
                component: () => import(/* webpackChunkName: "not-found" */ '@/error/NotFound.vue'),
              },
              {
                path: '/403',
                name: '403',
                component: () => import(/* webpackChunkName: "no-permission" */ '@/error/NoPermission.vue'),
              },
              {
                // 匹配 404（如果页面不存在，则默认渲染首页）
                path: '/:pathMatch(.*)*',
                component: () => import(/* webpackChunkName: "not-found" */ '@/error/NotFound.vue'),
              },
            ],
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

export default router;
