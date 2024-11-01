import api from "@/helpers/api";
// import $api from "../../helpers/$api";

export const SaleLegalService = {
  getModel() {
    let url = "sale/legal_model";
    return api.get(url);
  },
  create(data) {
    let url = "sale/legal_create";
    return api.post(url, data);
  },
  confirm(id) {
    let url = "sale/legal_confirm";
    return api.post(url, id);
  },
  getAll() {
    let url = "sale/legal_all";
    return api.get(url);
  },
};
