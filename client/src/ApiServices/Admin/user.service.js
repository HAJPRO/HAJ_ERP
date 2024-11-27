import api from "@/helpers/api";
// import $api from "../../helpers/$api";

export const UserService = {
    cancelReason(data) {
        let url = "provide/cancel_reason";
        return api.post(url, data);
    },
    create(data) {
        let url = "provide/provide_create";
        return api.post(url, data);
    },
    GetUsers(status) {
        let url = "admin/users";
        return api.post(url, status);
    },
    getAllLength() {
        let url = "provide/provide_all_length";
        return api.get(url);
    },
};
