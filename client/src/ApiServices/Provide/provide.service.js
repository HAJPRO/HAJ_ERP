import api from "@/helpers/api";
// import $api from "../../helpers/$api";

export const ProvideService = {
  cancelReason(data) {
    let url = "provide/cancel_reason";
    return api.post(url, data);
  },
  create(data) {
    let url = "provide/provide_create";
    return api.post(url, data);
  },
  getAll(status) {
    let url = "provide/provide_all";
    return api.post(url, status);
  },
  getOne(id) {
    let url = "provide/provide_get_one";
    return api.post(url, { id });
  },
  cancelReason(data) {
    let url = "provide/cancel_reason";
    return api.post(url, data);
  },
  Confirm(id) {
    let url = "provide/confirm";
    return api.post(url, { id });
  },
  Delivered(data) {
    let url = "provide/delivered";
    return api.post(url, data);
  },
};
