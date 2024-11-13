import Cookies from "js-cookie";
import { LoginService } from "../../../ApiServices/Auth/login.service.js";
import { RegisterService } from "../../../ApiServices/Auth/register.service.js";

const authModule = {
  namespaces: true,
  state: {
    account: Cookies.get("account")
      ? JSON.stringify(Cookies.get("account"))
      : "",

    token: Cookies.get("token") ? JSON.stringify(Cookies.get("token")) : {},
    data: ""
  },

  mutations: {
    setAccount(state, payload) {
      state.account = payload;
    },
    setToken(state, payload) {
      state.token = payload;
    },
    Data(state, payload) {
      state.data = payload
    }
  },
  actions: {
    async register({ commit }, payload) {
      try {
        const res = await RegisterService.Register(payload);
        commit("Data", res.data)
        if (res.data) {
          Cookies.set("account", JSON.stringify(res.data.user));
          Cookies.set("token", res.data.accessToken);
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }
      } catch (err) {
        console.log(err.message);
      }
    },

    async login({ commit }, payload) {
      try {
        const res = await LoginService.Login(payload);
        if (res.data) {
          Cookies.set("account", JSON.stringify(res.data.user));
          Cookies.set("token", res.data.accessToken);
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }
      } catch (err) {
        console.log(err.message);
      }
    },
  },
};

export default authModule;
