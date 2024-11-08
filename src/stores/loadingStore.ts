import { defineStore } from "pinia";
import { ref } from "vue";

export const useLoadingStore = defineStore("loading", {
  state: () => ({
    open: false,
    test: "testPlugin",
  }),
  getters: {},
  actions: {
    openLoading() {
      this.open = true;
    },

    closeLoading() {
      this.open = false;
    },
  },
});