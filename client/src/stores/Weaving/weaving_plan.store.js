import { SaleLegalService } from "../../ApiServices/Sale/saleLegal.service";
import { WeavingService } from "../../ApiServices/Weaving/weaving.service";
import { ToastifyService } from "../../utils/Toastify";
import { loading } from "./../../utils/Loader";
import { defineStore } from "pinia";

export const WeavingPlanStore = defineStore("WeavingPlan", {
    state: () => {
        return {
            items: "",
            card_id: "",
            is_modal: false
        }
    },
    actions: {
        async getAll(payload) {
            const res = await SaleLegalService.getAll(payload);
            this.items = res.data
        },
        async openModalById(payload) {
            this.card_id = payload.id
            this.is_modal = payload.is_modal
        },
        async SaveToProvide(payload) {
            try {
                const loader = loading.show();
                const data = await WeavingService.create({
                    items: payload.data,
                    card_id: payload.id,
                });
                loader.hide();
                const TimeOut = () => {
                    window.location.href = "/explore/department/weaving/working/plan";
                };
                ToastifyService.ToastSuccess({ msg: data.data.msg });
                setTimeout(TimeOut, 1000);
            } catch (err) {
                console.log(err);
            }
        },
    },

});
