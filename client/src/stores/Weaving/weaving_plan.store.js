import { SaleLegalService } from "../../ApiServices/Sale/saleLegal.service";
import { WeavingService } from "../../ApiServices/Weaving/weaving.service";
import { ToastifyService } from "../../utils/Toastify";
import { loading } from "./../../utils/Loader";
import { defineStore } from "pinia";

export const WeavingPlanStore = defineStore("WeavingPlan", {
  state: () => {
    return {
      item: [],
      card_id: "",
      is_modal: false,
      items: [],
      model: "",
      is_provide: false,
      is_active: "",
      order_id: "",
      paint_process_id: "",
      all_length: {},
      order_report: [],
      report_weaving: [],
      is_report_modal: false,
      sale_order_id: "",
      DoneWeaving: "",
    };
  },
  actions: {
    async GetModel() {
      try {
        const data = await WeavingService.getModel();
        this.model = data.data;
      } catch (err) {
        console.log(err);
      }
    },
    IsActive(payload) {
      this.is_active = payload.is_active;
    },
    async GetAll(status) {
      try {
        const data = await WeavingService.getAll(status);
        this.items = data.data.items;
        this.all_length = data.data.all_length;
      } catch (err) {
        console.log(err);
      }
    },
    async openModalById(payload) {
      this.card_id = payload.id;
      this.is_modal = true;
      const data = await WeavingService.getOne(payload.id);
      this.item = data.data;
      console.log(data);

      this.order_id = data.data[0].in_process_detail._id;
      this.paint_process_id = data.data[0]._id;
    },
    async cancelSendReason(payload) {
      try {
        const loader = loading.show();
        const data = await WeavingService.cancelReason({
          reason: payload.reason,
          card_id: payload.id,
        });
        loader.hide();
        const Refresh = () => {
          window.location.href = "/explore/department/weaving/working/plan";
        };
        ToastifyService.ToastSuccess({ msg: data.data.msg });
        setTimeout(Refresh, 1500);
      } catch (error) {
        ToastifyService.ToastError({
          msg: error.message,
        });
      }
    },
    isConfirmModal(payload) {
      this.is_provide = payload.is_modal;
    },
    async SaveToProvide(payload) {
      try {
        const loader = loading.show();
        const data = await WeavingService.create({
          items: payload.data,
          card_id: payload.id,
          order_id: payload.order_id,
          paint_process_id: payload.paint_process_id,
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
    async StatusModalById(payload) {
      this.status_modal.id = payload.id;
      this.status_modal.isModal = payload.is_modal;
      const data = await SaleLegalService.getOne(payload.id);
      this.model = data.data;
    },
    async OpenReportModalById(payload) {
      const data = await WeavingService.getOneFromInProcess({ id: payload.id });
      this.order_report = data.data;
      this.is_report_modal = true;
      this.sale_order_id = data.data.sale_order_id;
      this.getDayReportFromWeaving(this.sale_order_id);
    },
    async addDayReportInProcess(items) {
      const data = await WeavingService.addDayReportInProcess({
        items,
        id: this.sale_order_id,
      });
      this.getDayReportFromWeaving(this.sale_order_id);
    },
    async getDayReportFromWeaving(id) {
      const data = await WeavingService.getDayReportFromWeaving(id);
      this.report_weaving = data.data;
      if (data.data.report.length > 0) {
        const initialValuePaint = 0;
        this.DoneWeaving = data.data.report.reduce(
          (a, b) => a + Number(b.quantity),
          initialValuePaint
        );
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
