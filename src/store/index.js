import { createStore } from "vuex";
const store = createStore({
    state: {
        language: localStorage.getItem("lang") || "en"
    },
    mutations: {
        setLanguage(state, lang) {
            state.language = lang;
            localStorage.setItem("lang", lang);
        }
    },
    actions: {
        changeLanguage({ commit }, lang) {
            commit("setLanguage", lang);
        }
    },
    getters: {
        getLanguage: (state) => state.language
    }
});
export default store;
