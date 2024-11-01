import api from "@/helpers/api";

export const RegisterService = {
  Register(data) {
    let url = "auth/register";
    return api.post(url, data);
  },
};
