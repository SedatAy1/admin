import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "@/locales";

// Stil dosyaları
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@vuepic/vue-datepicker/dist/main.css";
import "./assets/main.css";
import "./assets/css/global.css";


// Lucide ikonları örnek olarak dahil edildi
import { createLucideIcon } from "lucide-vue-next";

const app = createApp(App);

// Lucide örnek ikonları global component olarak tanımla
app.component("PackageIcon", createLucideIcon("Package"));
app.component("ShoppingBagIcon", createLucideIcon("ShoppingBag"));
app.component("SettingsIcon", createLucideIcon("Settings"));
app.component("UsersIcon", createLucideIcon("Users"));
app.component("FileTextIcon", createLucideIcon("FileText"));
app.component("TargetIcon", createLucideIcon("Target"));
app.component("MailIcon", createLucideIcon("Mail"));
app.component("PhoneIcon", createLucideIcon("Phone"));
app.component("BarChartIcon", createLucideIcon("BarChart"));
app.component("LinkIcon", createLucideIcon("Link"));

app.use(router);
app.use(store);
app.use(i18n);

app.mount("#app");
