import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "@/locales"; // uzantı yazmana gerek yok, otomatik index.ts okur

// i18n import - HATA almamak için "default" olarak alındığından emin oluyoruz
import * as i18nModule from "@/locales";
const i18n = (i18nModule as any).default;

// Stil dosyaları
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@vuepic/vue-datepicker/dist/main.css";
import "./assets/main.css";
import "./assets/css/global.css";

const app = createApp(App);

app.use(router);
app.use(store);
app.use(i18n);
app.mount("#app");