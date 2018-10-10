import "@babel/polyfill";
import Vue from "vue";
import VueResource from "vue-resource";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import "./registerServiceWorker";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";

Vue.config.productionTip = false;

Vue.use(VueResource);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
