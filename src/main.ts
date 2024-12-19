import {createApp} from "vue";
import {createPinia} from "pinia";
import "@/assets/styles/style.scss";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "vue3-toastify/dist/index.css";
import Vue3Toasity from 'vue3-toastify';

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app
    .use(Vue3Toasity)
    .use(ElementPlus)
    .use(createPinia())
    .use(router)
    .mount("#app");
