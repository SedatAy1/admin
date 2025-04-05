import { createStore } from "vuex";

interface State {
  language: string;
}

const store = createStore<State>({
  state: {
    language: localStorage.getItem("lang") || "en"
  },
  mutations: {
    setLanguage(state, lang: string) {
      state.language = lang;
      localStorage.setItem("lang", lang);
    }
  },
  actions: {
    changeLanguage({ commit }, lang: string) {
      commit("setLanguage", lang);
    }
  },
  getters: {
    getLanguage: (state) => state.language
  }
});

export default store;