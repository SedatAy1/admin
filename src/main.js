"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = require("vue");
var App_vue_1 = require("./App.vue");
var router_1 = require("./router");
var store_1 = require("./store"); // Vuex Store'u dahil ettik
var locales_1 = require("./locales"); // i18n modülünü dahil ettik
require("bootstrap/dist/css/bootstrap.min.css");
require("bootstrap/dist/js/bootstrap.bundle.min.js");
require("@fortawesome/fontawesome-free/css/all.min.css");
require("@vuepic/vue-datepicker/dist/main.css");
require("./assets/main.css");
require("./assets/css/global.css");
require("bootstrap/dist/css/bootstrap.min.css");
require("./assets/main.css"); // veya styles.css, hangi ismi verdiysen
require("bootstrap/dist/js/bootstrap.bundle.min.js");
require("bootstrap/dist/css/bootstrap.min.css");
require("bootstrap/dist/js/bootstrap.bundle.min.js");
var app = (0, vue_1.createApp)(App_vue_1.default);
app.use(router_1.default);
app.use(store_1.default); // Store'u dahil ettik
app.use(locales_1.default); // i18n'i dahil ettik
app.mount("#app");
