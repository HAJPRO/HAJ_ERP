import api from "@/helpers/api";
// import $api from "../../helpers/$api";

export const SpinningService = {
  getModel() {
    let url = "spinning/spinning_model";
    return api.get(url);
  },
  create(data) {
    let url = "spinning/spinning_create";
    return api.post(url, data);
  },
  confirm(id) {
    let url = "spinning/spinning_confirm";
    return api.post(url, id);
  },
  getAll() {
    let url = "spinning/spinning_all";
    return api.get(url);
  },
};
