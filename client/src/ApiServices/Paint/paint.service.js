import api from "@/helpers/api";
// import $api from "../../helpers/$api";

export const PaintService = {
  getModel() {
    let url = "paint/paint_model";
    return api.get(url);
  },
  getAll(status) {
    let url = "paint/get_all";
    return api.post(url, status);
  },
  create(data) {
    let url = "paint/paint_create";
    return api.post(url, data);
  },
  cancelReason(data) {
    let url = "paint/cancel_reason";
    return api.post(url, data);
  },
  // PaintConfirmedOrders(status) {
  //   let url = "paint/";
  //   return api.post(url, status);
  // },

};
