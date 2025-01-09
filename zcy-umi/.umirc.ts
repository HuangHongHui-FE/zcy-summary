import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  // layout配置
  layout: {},

  routes: [
    { path: '/', component: '@/pages/index' },
    { exact: true, path: '/001-context', component: '@/pages/001-context' },
    { exact: true, path: '/002-react-lines-ellipsis', component: '@/pages/002-react-lines-ellipsis' },
    { exact: true, path: '/003-qs', component: '@/pages/003-qs' },
    { exact: true, path: '/004-classNames', component: '@/pages/004-classNames' },
    { exact: true, path: '/005-scrollTo', component: '@/pages/005-scrollTo' },
    { exact: true, path: '/006-countDown', component: '@/pages/006-countDown' },
    // { exact: true, path: '/004-classNames', component: '@/pages/004-classNames' },
    // { exact: true, path: '/004-classNames', component: '@/pages/004-classNames' },
    // { exact: true, path: '/004-classNames', component: '@/pages/004-classNames' },
    // { exact: true, path: '/004-classNames', component: '@/pages/004-classNames' },
    // { exact: true, path: '/004-classNames', component: '@/pages/004-classNames' },
    // { exact: true, path: '/004-classNames', component: '@/pages/004-classNames' },
    // { exact: true, path: '/004-classNames', component: '@/pages/004-classNames' },
    // { exact: true, path: '/004-classNames', component: '@/pages/004-classNames' },
    // { exact: true, path: '/004-classNames', component: '@/pages/004-classNames' },
    // { exact: true, path: '/004-classNames', component: '@/pages/004-classNames' },
    // { exact: true, path: '/004-classNames', component: '@/pages/004-classNames' },
    // { exact: true, path: '/004-classNames', component: '@/pages/004-classNames' },
    // { exact: true, path: '/004-classNames', component: '@/pages/004-classNames' },
    // { exact: true, path: '/004-classNames', component: '@/pages/004-classNames' },
  ],
  fastRefresh: {},
});
