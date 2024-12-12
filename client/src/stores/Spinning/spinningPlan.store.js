import { SaleLegalService } from "../../ApiServices/Sale/saleLegal.service";
import { SpinningService } from "../../ApiServices/Spinning/spinning.service";
import { ToastifyService } from "../../utils/Toastify";
import { loading } from "../../utils/Loader";
import { defineStore } from "pinia";

export const SpinningPlanStore = defineStore("SpinningPlan", {
  state: () => {
    return {
      process_order_id: "",
      order_id: "",
      sale_order_id: "",
      all_length: {},
      card_id: "",
      is_modal: false,
      is_active: "",
      items: [],
      item: [],
      model: "",
      is_provide: false,
      is_report_modal: false,
      order_report: [],
      DoneSpinning: "",
    };
  },
  actions: {
    IsActive(payload) {
      this.is_active = payload.is_active;
    },
    async GetModel() {
      try {
        const data = await SaleLegalService.getModel();
        this.model = data.data;
      } catch (err) {
        console.log(err);
      }
    },
    async GetAll(status) {
      try {
        const data = await SpinningService.getAll(status);
        this.items = data.data.items;
        this.all_length = data.data.all_length;
        console.log(data.data);
      } catch (err) {
        console.log(err);
      }
    },
    async openModalById(payload) {
      this.card_id = payload.id;
      const data = await SpinningService.getOne(payload.id);
      this.is_modal = true;
      this.item = data.data;
      this.sale_order_id = data.data[0].in_process_detail._id;
    },

    async cancelSendReason(payload) {
      try {
        const loader = loading.show();
        const data = await SpinningService.cancelReason({
          reason: payload.reason,
          card_id: payload.id,
        });
        loader.hide();
        const Refresh = () => {
          window.location.href = "/explore/department/spinning/workin/plan";
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
        const data = await SpinningService.create({
          items: payload.data,
          card_id: payload.id,
          order_id: this.sale_order_id,
        });
        loader.hide();
        const TimeOut = () => {
          window.location.href = "/explore/department/spinning/working/plan";
        };
        ToastifyService.ToastSuccess({ msg: data.data.msg });
        setTimeout(TimeOut, 1000);
      } catch (err) {
        console.log(err);
      }
    },
    async OpenReportModalById(payload) {
      const data = await SpinningService.getOneFromInProcess({
        id: payload.id,
      });
      this.process_order_id = payload.id;
      this.order_report = data.data;
      this.is_report_modal = true;
      this.order_id = data.data.sale_order_id;

      if (data.data.report.length > 0) {
        const initialValuePaint = 0;
        this.DoneSpinning = data.data.report.reduce(
          (a, b) => a + Number(b.quantity),
          initialValuePaint
        );
      }
    },

    async addDayReportInProcess(items) {
      const data = await SpinningService.addDayReportInProcess({
        items,
        id: this.order_id,
      });
      await this.OpenReportModalById({ id: this.process_order_id });
    },
  },
});
