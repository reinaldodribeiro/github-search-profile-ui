import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
/* eslint-disable */

Vue.config.productionTip = false;

const initApp = async () => {
  new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
  }).$mount("#app");
};
initApp();
