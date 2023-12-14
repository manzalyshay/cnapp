import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    repoData: [],
    imageData: [],
  },
  mutations: {
    setRepoData(state, data) {
      state.repoData = data;
    },
    setImageData(state, data) {
      state.imageData = data;
    },
  },
  actions: {
    async fetchRepoData({ commit }) {
      // Replace 'API_URL_TAB_1' with the actual API endpoint for tab 1
      const response = await fetch("/api/repositories");
      const data = await response.json();
      commit("setRepoData", data.data);
    },
    async fetchImageData({ commit }) {
      // Replace 'API_URL_TAB_2' with the actual API endpoint for tab 2
      const response = await fetch("/api/images");
      const data = await response.json();
      commit("setImageData", data.data);
    },
  },
  modules: {},
});
