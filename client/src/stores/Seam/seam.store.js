import { SeamWarehouseService } from "../../ApiServices/Seam/warehouse/warehouse.service";
import { ToastifyService } from "../../utils/Toastify";
import { loading } from "../../utils/Loader";
import { defineStore } from "pinia";

export const SeamStore = defineStore("SeamPlan", {
  state: () => {
    return {
      isActive: "",
    };
  },
  actions: {
    GetIsActive(payload) {
      this.isActive = payload;
    },
  },
});
