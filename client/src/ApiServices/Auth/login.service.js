import api from "@/helpers/api";

export const LoginService = {
  Login(data) {
    let url = "auth/login";
    return api.post(url, data);
  },
};
