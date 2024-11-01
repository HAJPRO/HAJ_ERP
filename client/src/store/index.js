import { createStore } from "vuex";
import authModule from "./modules/auth";

export default createStore({
  state: {
    loading: false,
    toast: {
      show: false,
      type: "",
      msg: "",
    },
    change_limit_options: [
      {
        value: "20",
        label: "20",
      },
      {
        value: "50",
        label: "50",
      },
      {
        value: "100",
        label: "100",
      },
      {
        value: "200",
        label: "200",
      },
      {
        value: "300",
        label: "300",
      },
    ],
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    ToastError(data) {
      toast.error(data.msg, {
        autoClose: 1000,
      });
    },
    ToastSuccess(data) {
      toast.success(data.msg, {
        autoClose: 1000,
      });
    },

    ToastInfo(data) {
      toast.info(data.msg, {
        autoClose: 1000,
      });
    },
  },

  actions: {},
  modules: {
    auth: authModule,
  },
});
