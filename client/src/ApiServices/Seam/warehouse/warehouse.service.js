import api from "@/helpers/api";
// import $api from "../../helpers/$api";

export const SeamWarehouseService = {
    GetModel() {
        let url = "seam/responsibles_model";
        return api.get(url);
    },
    // ExportExcel(data) {
    //     let url = "seam/export_excel";
    //     return api.post(url, data);
    // },
    GenerateQRCode(data) {
        let url = "seam/generate_qrcode";
        return api.post(url, data);
    },
    getQRImage(id) {
        let url = "seam/image_qrcode";
        return api.post(url, id);
    },

};
