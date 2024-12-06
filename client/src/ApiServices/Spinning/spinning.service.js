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
  getAll(status) {
    let url = "spinning/spinning_all";
    return api.post(url, status);
  },
  getOne(id) {
    let url = "spinning/spinning_get_one";
    return api.post(url, { id });
  },
  getOneFromInProcess(id) {
    let url = "spinning/spinning_get_inprocess";
    return api.post(url, id);
  },
  addDayReportInProcess(data) {
    let url = "spinning/spinning_add_day_report";
    return api.post(url, data);
  },
  // getDayReportFromSpinning(id) {
  //   let url = "spinning/spinning_get_report";
  //   return api.post(url, { id });
  // },
};
