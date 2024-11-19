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
  getAllLength() {
    let url = "provide/provide_all_length";
    return api.get(url);
  },
};
