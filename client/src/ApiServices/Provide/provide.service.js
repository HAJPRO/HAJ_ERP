import api from "@/helpers/api";
// import $api from "../../helpers/$api";

export const ProvideService = {
  getModel() {
    let url = "provide/provide_model";
    return api.get(url);
  },
  create(data) {
    let url = "provide/provide_create";
    return api.post(url, data);
  },
  getAll() {
    let url = "provide/provide_all";
    return api.get(url);
  },
};
