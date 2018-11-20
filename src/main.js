// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from  './store'
import 'muse-ui/lib/styles/base.less';
import 'muse-ui/lib/styles/theme.less';
import { Button, Select, AppBar ,Badge, Icon} from 'muse-ui';


Vue.use(Button);
Vue.use(Select);
Vue.use(AppBar);
Vue.use(Badge);
Vue.use(Icon);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});

