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
  getOneFromInProcess(id) {
    let url = "paint/paint_get_inprocess";
    return api.post(url, id);
  },
  addDayReportInProcess(data) {
    let url = "paint/paint_add_day_report";
    return api.post(url, data);
  },
  getDayReportFromPaint(id) {
    let url = "paint/paint_get_report";
    return api.post(url, { id });
  },
  Finish(id) {
    let url = "paint/report_finish";
    return api.post(url, { id });
  },
};
