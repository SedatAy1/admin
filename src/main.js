import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "@/i18n"; // ✅ BURAYA DİKKAT
// Global stil dosyaları
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@vuepic/vue-datepicker/dist/main.css";
import "./assets/main.css";
import "./assets/css/global.css";
// Lucide ikon bileşenleri
import { Package, ShoppingBag, Settings, Users, FileText, Target, Mail, Phone, BarChart2, Link } from "lucide-vue-next";
// Uygulama oluşturuluyor
const app = createApp(App);
// Lucide ikonlarını global olarak tanımla
app.component("PackageIcon", Package);
app.component("ShoppingBagIcon", ShoppingBag);
app.component("SettingsIcon", Settings);
app.component("UsersIcon", Users);
app.component("FileTextIcon", FileText);
app.component("TargetIcon", Target);
app.component("MailIcon", Mail);
app.component("PhoneIcon", Phone);
app.component("BarChartIcon", BarChart2);
app.component("LinkIcon", Link);
// Vue eklentilerini bağla
app.use(router);
app.use(store);
app.use(i18n); // ✅ i18n buraya başarıyla eklendi
// Uygulamayı DOM'a bağla
app.mount("#app");
