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
  export_excel(id) {
    let url = "sale/legal_export_excel";
    return api.post(url, id);
  },
  confirm(id) {
    let url = "sale/legal_confirm";
    return api.post(url, id);
  },
  getAll(order_num) {
    console.log(order_num);
    let url = "sale/legal_all";
    return api.post(url, order_num);
  },
  Edit(id, data) {
    let url = `sale/legal_edit/${id}`;
    return api.put(url, data);
  },
  getOne(id) {
    let url = `sale/legal_get_one/${id}`;
    return api.get(url);
  },
  Delete(id) {
    let url = `sale/legal_delete/${id}`;
    return api.delete(url);
  },
};
