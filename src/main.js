import Vue from 'vue';
import App from './App.vue';
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { BFormInput, BRow, BCol, BButton, BSpinner } from 'bootstrap-vue';

library.add(fas);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('b-form-input', BFormInput);
Vue.component('b-row', BRow);
Vue.component('b-col', BCol);
Vue.component('b-button', BButton);
Vue.component('b-spinner', BSpinner);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
