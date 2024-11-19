import api from "@/helpers/api";
// import $api from "../../helpers/$api";

export const SeamWarehouseService = {
    // getModel() {
    //     let url = "spinning/spinning_model";
    //     return api.get(url);
    // },
    // cancelReason(data) {
    //     let url = "spinning/cancel_reason";
    //     return api.post(url, data);
    // },
    GenerateQRCode(data) {
        console.log(data);
        let url = "seam/generate_qrcode";
        return api.post(url, data);
    },
    getQRImage() {
        let url = "seam/image_qrcode";
        return api.get(url);
    },
    // getAll() {
    //     let url = "spinning/spinning_all";
    //     return api.get(url);
    // },
};
