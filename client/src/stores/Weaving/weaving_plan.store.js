import { SaleLegalService } from "../../ApiServices/Sale/saleLegal.service";
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
            console.log(payload);
            this.card_id = payload.id
            this.is_modal = payload.is_modal
        },
    },

});
