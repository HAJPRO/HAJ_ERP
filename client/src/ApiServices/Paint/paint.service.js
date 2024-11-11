import api from "@/helpers/api";
// import $api from "../../helpers/$api";

export const PaintService = {
  getModel() {
    let url = "paint/paint_model";
    return api.get(url);
  },
  create(data) {
    let url = "paint/paint_create";
    return api.post(url, data);
  },
  cancelReason(data) {
    let url = "paint/cancel_reason";
    return api.post(url, data);
  },
  getAllFromSale() {
    let url = "paint/paint_all";
    return api.get(url);
  },
  getAllForProvide() {
    let url = "paint/provide_all";
    return api.get(url);
  },
};
