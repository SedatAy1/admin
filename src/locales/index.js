import { createI18n } from "vue-i18n";
import en from "./en.json";
import tr from "./tr.json";
const i18n = createI18n({
    legacy: false,
    locale: localStorage.getItem("lang") || "tr",
    fallbackLocale: "tr",
    messages: {
        en,
        tr
    }
});
export default i18n;
