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
  getAll(status) {
    let url = "weaving/weaving_all";
    return api.post(url, status);
  },
  getOne(id) {
    let url = `weaving/weaving_get_one/${id}`;
    return api.get(url);
  },
  getOneFromInProcess(id) {
    let url = "weaving/weaving_get_inprocess";
    return api.post(url, id);
  },
  addDayReportInProcess(data) {
    let url = "weaving/weaving_add_day_report";
    return api.post(url, data);
  },
  getDayReportFromWeaving(id) {
    let url = "weaving/weaving_get_report";
    return api.post(url, { id });
  },
};
