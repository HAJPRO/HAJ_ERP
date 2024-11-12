import api from "@/helpers/api";
// import $api from "../../helpers/$api";

export const WeavingService = {
  getModel() {
    let url = "weaving/weaving_model";
    return api.get(url);
  },
  cancelReason(data) {
    let url = "weaving/cancel_reason";
    return api.post(url, data);
  },
  create(data) {
    let url = "weaving/weaving_create";
    return api.post(url, data);
  },
  getAll() {
    let url = "weaving/weaving_all";
    return api.get(url);
  },
};
