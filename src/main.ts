import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store"; // Vuex Store'u dahil ettik
import i18n from "./locales"; // i18n modülünü dahil ettik
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@vuepic/vue-datepicker/dist/main.css";
import "./assets/main.css";
import "./assets/css/global.css";


const app = createApp(App);

app.use(router);
app.use(store); // Store'u dahil ettik
app.use(i18n); // i18n'i dahil ettik
app.mount("#app");
