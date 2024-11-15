import { SaleLegalService } from "../../ApiServices/Sale/saleLegal.service";
import { SpinningService } from "../../ApiServices/Spinning/spinning.service";
import { ToastifyService } from "../../utils/Toastify";
import { loading } from "../../utils/Loader";
import { defineStore } from "pinia";

export const SpinningPlanStore = defineStore("SpinningPlan", {
    state: () => {
        return {
            items: "",
            card_id: "",
            is_modal: false,
            items: [],
            model: "",
            is_provide: false
        };
    },
    actions: {
        async GetModel() {
            try {
                const data = await SaleLegalService.getModel();
                this.model = data.data

            } catch (err) {
                console.log(err);
            }
        },
        async openModalById(payload) {
            this.card_id = payload.id;
            this.is_modal = payload.is_modal;
            const data = await SaleLegalService.getOne(payload.id);
            this.items = Array(data.data);
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
