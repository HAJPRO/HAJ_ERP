import api from "@/helpers/api";
// import $api from "../../helpers/$api";

export const SeamWarehouseService = {
  GetModel() {
    let url = "seam/responsibles_model";
    return api.get(url);
  },

  GenerateQRCode(data) {
    let url = "seam/generate_qrcode";
    return api.post(url, data);
  },
  getQRImage(id) {
    let url = "seam/image_qrcode";
    return api.post(url, id);
  },
};
