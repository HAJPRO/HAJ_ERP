import { SaleLegalService } from "../../ApiServices/Sale/saleLegal.service";
import { ToastifyService } from "../../utils/Toastify";
import { loading } from "./../../utils/Loader";
import { defineStore } from "pinia";

export const SaleStore = defineStore("saleStore", {
  state: () => {
    return {
      length: "",
      items: [],
      card_id: "",
      is_modal: false,
      model: "",
      proccess_modal: false,
      proccess_data: {
        order: [],
        paint: [],
        weaving: [],
        spinning: [],
      },
      paint_process: [],

      is_active: "",
    };
  },
  actions: {
    IsActive(payload) {
      this.is_active = payload.is_active;
    },
    async getAll(payload) {
      const loader = loading.show();
      const res = await SaleLegalService.getAll(payload);
      this.length = res.data.length;
      this.items = res.data.all;
      loader.hide();
    },
    async AllOrderProccessById(payload) {
      const data = await SaleLegalService.AllOrderProccessById(payload);
      console.log(data.data.paint[0]);

      this.proccess_modal = true;
      this.proccess_data.order = data.data.order;
      this.proccess_data.paint =
        data.data.paint.length > 0
          ? data.data.paint[0].paint_report.order_report_at_progress
          : [];
      this.proccess_data.weaving =
        data.data.weaving.length > 0
          ? data.data.weaving[0].weaving_report.order_report_at_progress
          : [];
      this.proccess_data.spinning =
        data.data.spinning.length > 0
          ? data.data.spinning[0].spinning_report.order_report_at_progress
          : [];
    },
    async openModalById(payload) {
      this.card_id = payload.id;
      this.is_modal = payload.is_modal;
      const data = await SaleLegalService.getOne(payload.id);
      this.model = data.data;
    },
    // async ProccessModalById(payload) {
    //   this.proccess_modal.id = payload.id;
    //   this.proccess_modal.isModal = payload.is_modal;
    //   const data = await SaleLegalService.getOne(payload.id);
    //   this.model = data.data;
    // },
    // async StatusModalById(payload) {
    //   this.status_modal.id = payload.id;
    //   this.status_modal.isModal = payload.is_modal;

    // },
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
