import { SaleLegalService } from "../../ApiServices/Sale/saleLegal.service";
import { PaintService } from "../../ApiServices/Paint/paint.service";
import { ToastifyService } from "../../utils/Toastify";
import { loading } from "./../../utils/Loader";
import { defineStore } from "pinia";

export const PaintPlanStore = defineStore("paintPlanStore", {
  state: () => {
    return {
      card_id: "",
      is_modal: false,
      items: [],
      all_length: {},
      item: [],
      confirmed_orders: [],
      order_report: [],
      report_paint: [],
      is_report_modal: false,
      model: "",
      is_provide: false,
      is_active: "",
      sale_order_id: "",
      DonePaint: "",
      paint_status: "",
    };
  },
  actions: {
    IsActive(payload) {
      this.is_active = payload.is_active;
    },
    async GetModel() {
      try {
        const data = await PaintService.getModel();
        this.model = data.data;
      } catch (err) {
        console.log(err);
      }
    },
    async GetAll(status) {
      try {
        const data = await PaintService.getAll(status);
        this.items = data.data.items;
        this.all_length = data.data.all_length;
      } catch (err) {
        console.log(err);
      }
    },
    async openModalById(payload) {
      this.card_id = payload.id;
      this.is_modal = payload.is_modal;
      const data = await SaleLegalService.getOne(payload.id);
      this.item = Array(data.data);
    },
    async PaintConfirmedOrders(payload) {
      const data = await PaintService.PaintConfirmedOrders(payload.status).then(
        (items) => {
          items.map((item) => {
            return item.confirmed_orders;
          });
        }
      );

      this.confirmed_orders = Array(data.data);
    },
    async cancelSendReason(payload) {
      try {
        const loader = loading.show();
        const data = await PaintService.cancelReason({
          reason: payload.reason,
          card_id: payload.id,
        });
        loader.hide();
        const Refresh = () => {
          window.location.href = "/explore/department/paint/working/plan";
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
        const data = await PaintService.create({
          items: payload.data,
          card_id: payload.id,
        });
        loader.hide();
        const TimeOut = () => {
          window.location.href = "/explore/department/paint/working/plan";
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
    async OpenReportModalById(payload) {
      const data = await PaintService.getOneFromInProcess({ id: payload.id });
      this.order_report = data.data;
      (this.is_report_modal = true),
        (this.sale_order_id = data.data.sale_order_id);
      await this.getDayReportFromPaint(this.sale_order_id);
    },
    async addDayReportInProcess(items) {
      const data = await PaintService.addDayReportInProcess({
        items,
        id: this.sale_order_id,
      });
      await this.getDayReportFromPaint(this.sale_order_id);
    },
    async getDayReportFromPaint(id) {
      const data = await PaintService.getDayReportFromPaint(id);
      if (data.data.report.length > 0) {
        const initialValuePaint = 0;
        this.DonePaint = data.data.report.reduce(
          (a, b) => a + Number(b.quantity),
          initialValuePaint
        );
      }
      this.report_paint = data.data;
      this.paint_status = data.data.status;
    },
    async Finish() {
      try {
        const loader = loading.show();
        const data = await PaintService.Finish(this.sale_order_id);
        loader.hide();
        ToastifyService.ToastSuccess({
          msg: data.data.msg,
        });
        const Refresh = () => {
          window.location.href = "/explore/department/paint/working/plan";
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
