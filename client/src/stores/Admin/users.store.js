import { UserService } from "../../ApiServices/Admin/user.service";
import { ToastifyService } from "../../utils/Toastify";
import { loading } from "./../../utils/Loader";
import { defineStore } from "pinia";

export const UsersStore = defineStore("UsersStore", {
    state: () => {
        return {
            card_id: "",
            is_modal: false,
            items: [],
            model: "",
            is_provide: false,
            departmen: ""
        };
    },
    actions: {
        async GetUsers(payload) {
            const res = await UserService.GetUsers(payload);
            console.log(res.data);
            this.items = res.data;
        },
    },
});
