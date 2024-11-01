import { createApp } from "vue";
import ElementPlus from "element-plus";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "element-plus/dist/index.css";
import toast from "vue3-toastify";
import "vue3-toastify/dist/index.css";

import "vue-loading-overlay/dist/css/index.css";
import router from "./router/index";
import store from "./store";

import App from "./App.vue";
import "./css/style.css";
const app = createApp(App);
app.use(router);
app.use(store);
app.use(ElementPlus);
app.use(ElementPlusIconsVue);
app.use(toast);
app.mount("#app");
