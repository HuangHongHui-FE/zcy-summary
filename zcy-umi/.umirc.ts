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
  ],
  fastRefresh: {},
});
