import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'prismjs/themes/prism.css';
import Vue from 'vue';
import App from './App.vue';
import CodeBox from './components/code-box';
import VueClipboard from 'vue-clipboard2';
import Componet from '../src/index';
import '../src/style/index.less';
import './styles/index.less';
import { Button } from '@zcy/uni-design-vue';

// 注册组件库
Vue.use(Button);
Vue.use(Componet);
Vue.use(VueClipboard);
Vue.component(CodeBox.name, CodeBox);
Vue.config.productionTip = false;
Vue.config.devtools = true;

new Vue({
  render: h => h(App),
}).$mount('#app');
