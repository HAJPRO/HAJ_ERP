import { SaleLegalService } from "../../ApiServices/Sale/saleLegal.service";
import { ProvideService } from "../../ApiServices/Provide/provide.service";
import { ToastifyService } from "../../utils/Toastify";
import { loading } from "./../../utils/Loader";
import { defineStore } from "pinia";

export const ProvidePlanStore = defineStore("ProvidePlanStore", {
  state: () => {
    return {
      card_id: "",
      is_modal: false,
      data: [],
      all_length: {},
      item: [],
      model: "",
      is_provide: false,
      departmen: "",
      is_active: "",
    };
  },
  actions: {
    async GetModel() {
      try {
        const data = await SaleLegalService.getModel();
        this.model = data.data;
      } catch (err) {
        console.log(err);
      }
    },
    IsActive(payload) {
      this.is_active = payload.is_active;
    },
    async getAll(payload) {
      const res = await ProvideService.getAll(payload);
      this.data = res.data.items;
      this.all_length = res.data.all_length;
    },

    async openModalById(payload) {
      this.card_id = payload.id;
      this.is_modal = true;
      const data = await ProvideService.getOne(payload.id);
      this.item = Array(data.data.box);
      this.card_id = payload.id;
    },
    async cancelSendReason(payload) {
      try {
        const loader = loading.show();
        const data = await ProvideService.cancelReason({
          reason: payload.reason,
          card_id: this.card_id,
        });
        loader.hide();
        const Refresh = () => {
          window.location.href = "/explore/department/provide/working/plan";
        };
        ToastifyService.ToastSuccess({ msg: data.data.msg });
        setTimeout(Refresh, 1500);
      } catch (error) {
        ToastifyService.ToastError({
          msg: error.message,
        });
      }
    },
    async Confirm() {
      const loader = loading.show();
      const data = await ProvideService.Confirm(this.card_id);
      loader.hide();
      ToastifyService.ToastSuccess({
        msg: data.data.msg,
      });
      const Refresh = () => {
        window.location.href = "/explore/department/provide/working/plan";
      };
      setTimeout(Refresh, 1500);
    },
    async Delivered(payload) {
      try {
        const loader = loading.show();
        const data = await ProvideService.Delivered({
          reason: payload.reason,
          card_id: payload.id,
        });
        loader.hide();
        const Refresh = () => {
          window.location.href = "/explore/department/provide/working/plan";
        };
        ToastifyService.ToastSuccess({ msg: data.data.msg });
        setTimeout(Refresh, 1500);
      } catch (error) {
        ToastifyService.ToastError({
          msg: error.message,
        });
      }
    },

    // async cancelSendReason(payload) {
    //     console.log(payload);
    //     try {
    //         const loader = loading.show();
    //         const data = await PaintService.cancelReason({
    //             reason: payload.reason,
    //             card_id: payload.id,
    //         });
    //         loader.hide();
    //         const Refresh = () => {
    //             window.location.href = "/explore/department/paint/working/plan";
    //         };
    //         ToastifyService.ToastSuccess({ msg: data.data.msg });
    //         setTimeout(Refresh, 1500);
    //     } catch (error) {
    //         ToastifyService.ToastError({
    //             msg: error.message,
    //         });
    //     }
    // },
    // isConfirmModal(payload) {
    //     this.is_provide = payload.is_modal;

    // },
    // async SaveToProvide(payload) {
    //     try {
    //         const loader = loading.show();
    //         const data = await PaintService.create({
    //             items: payload.data,
    //             card_id: payload.id,
    //         });
    //         loader.hide();
    //         const TimeOut = () => {
    //             window.location.href = "/explore/department/paint/working/plan";
    //         };
    //         ToastifyService.ToastSuccess({ msg: data.data.msg });
    //         setTimeout(TimeOut, 1000);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // },
    // async StatusModalById(payload) {
    //     this.status_modal.id = payload.id;
    //     this.status_modal.isModal = payload.is_modal;
    //     // const data = await SaleLegalService.getOne(payload.id)
    //     // this.model = data.data
    // },
    // async Update(payload) {
    //     try {
    //         const loader = loading.show();
    //         const updateData = await SaleLegalService.Edit(this.card_id, payload);
    //         loader.hide();
    //         ToastifyService.ToastSuccess({
    //             msg: updateData.data.msg,
    //         });
    //         const Refresh = () => {
    //             window.location.href = "/explore/sale/legal";
    //         };
    //         setTimeout(Refresh, 1500);
    //     } catch (error) {
    //         return ToastifyService.ToastError({ msg: error.messages });
    //     }
    // },

    // async Confirm(id) {
    //     try {
    //         const loader = loading.show();
    //         const confirmData = await SaleLegalService.confirm(id);
    //         loader.hide();
    //         ToastifyService.ToastSuccess({
    //             msg: confirmData.data.msg,
    //         });
    //         const Refresh = () => {
    //             window.location.href = "/explore/sale/legal";
    //         };
    //         setTimeout(Refresh, 1500);
    //     } catch (error) {
    //         return ToastifyService.ToastError({ msg: error.messages });
    //     }
    // },

    // async DeleteById(id) {
    //     try {
    //         const loader = loading.show();
    //         const data = await SaleLegalService.Delete(id);
    //         loader.hide();
    //         ToastifyService.ToastSuccess({
    //             msg: data.data.msg,
    //         });
    //         const Refresh = () => {
    //             window.location.href = "/explore/sale/legal";
    //         };
    //         setTimeout(Refresh, 1500);
    //     } catch (error) {
    //         return ToastifyService.ToastError({ msg: error.messages });
    //     }
    // },
  },
});
