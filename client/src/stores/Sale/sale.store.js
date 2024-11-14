import { SaleLegalService } from "../../ApiServices/Sale/saleLegal.service";
import { ToastifyService } from "../../utils/Toastify";
import { loading } from "./../../utils/Loader";
import { defineStore } from "pinia";

export const SaleStore = defineStore("saleStore", {
  state: () => {
    return {
      items: "",
      card_id: "",
      is_modal: false,
      model: "",
      proccess_modal: {
        id: "",
        isModal: false,
      },
      status_modal: {
        id: "",
        isModal: false,
      },
    };
  },
  actions: {
    async getAll(payload) {
      const res = await SaleLegalService.getAll(payload);
      this.items = res.data;
    },
    async openModalById(payload) {
      this.card_id = payload.id;
      this.is_modal = payload.is_modal;
      const data = await SaleLegalService.getOne(payload.id);
      this.model = data.data;
    },
    async ProccessModalById(payload) {
      this.proccess_modal.id = payload.id;
      this.proccess_modal.isModal = payload.is_modal;
      const data = await SaleLegalService.getOne(payload.id);
      this.model = data.data;
    },
    async StatusModalById(payload) {
      this.status_modal.id = payload.id;
      this.status_modal.isModal = payload.is_modal;
      // const data = await SaleLegalService.getOne(payload.id)
      // this.model = data.data
    },
    async Update(payload) {
      try {
        const loader = loading.show();
        const updateData = await SaleLegalService.Edit(this.card_id, payload);
        loader.hide();
        ToastifyService.ToastSuccess({
          msg: updateData.data.msg,
        });
        const Refresh = () => {
          window.location.href = "/explore/sale/legal";
        };
        setTimeout(Refresh, 1500);
      } catch (error) {
        return ToastifyService.ToastError({ msg: error.messages });
      }
    },

    async Confirm(id) {
      try {
        const loader = loading.show();
        const confirmData = await SaleLegalService.confirm(id);
        loader.hide();
        ToastifyService.ToastSuccess({
          msg: confirmData.data.msg,
        });
        const Refresh = () => {
          window.location.href = "/explore/sale/legal";
        };
        setTimeout(Refresh, 1500);
      } catch (error) {
        return ToastifyService.ToastError({ msg: error.messages });
      }
    },

    async DeleteById(id) {
      try {
        const loader = loading.show();
        const data = await SaleLegalService.Delete(id);
        loader.hide();
        ToastifyService.ToastSuccess({
          msg: data.data.msg,
        });
        const Refresh = () => {
          window.location.href = "/explore/sale/legal";
        };
        setTimeout(Refresh, 1500);
      } catch (error) {
        return ToastifyService.ToastError({ msg: error.messages });
      }
    },
  },
});
