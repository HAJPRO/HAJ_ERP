import Cookies from "js-cookie";
import { LoginService } from "../../ApiServices/Auth/login.service.js";
import { RegisterService } from "../../ApiServices/Auth/register.service.js";
import { defineStore } from "pinia";

export const AuthStore = defineStore("Auth", {
    state: () => {
        return {
            items: ""
        }
    },
    actions: {
        async register(payload) {
            try {
                const res = await RegisterService.Register(payload);
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
        async login(payload) {
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

});
