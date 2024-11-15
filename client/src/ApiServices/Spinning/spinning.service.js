import api from "@/helpers/api";
// import $api from "../../helpers/$api";

export const SpinningService = {
  getModel() {
    let url = "spinning/spinning_model";
    return api.get(url);
  },
  cancelReason(data) {
    let url = "spinning/cancel_reason";
    return api.post(url, data);
  },
  create(data) {
    let url = "spinning/spinning_create";
    return api.post(url, data);
  },
  getAll() {
    let url = "spinning/spinning_all";
    return api.get(url);
  },
};
