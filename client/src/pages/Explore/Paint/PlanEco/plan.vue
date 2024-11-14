<script setup>
import { ref, onMounted } from "vue";
import Title from "@/components/Title.vue";
import { ToastifyService } from "../../../../utils/Toastify";
import { loading } from "../../../../utils/Loader";
// import DoneTabelComponent from "../../../../components/Paint/DoneTable.vue";
// import WeavingTabelComponent from "../../../../components/Paint/WeavingTable.vue";
// import ProvideTabelComponent from "../../../../components/Paint/ProvideTable.vue";
import HeaderTabLink from "../../../../components/Paint/HeaderTabLink.vue";
import MainTable from "../../../../components/Paint/MainTable.vue";

// const cardId = ref();
// const outerVisible = ref(false);
// const innerVisible = ref(false);
// const is_confirm = ref(false);
// const confirmDataById = ref([]);

// const Confirm = async (id) => {
//   is_confirm.value = !is_confirm.value;
//   cardId.value = id;
//   try {
//     const item = await SaleLegalService.getOne(id);
//     confirmDataById.value = Array(item.data);
//   } catch (error) {
//     return ToastifyService.ToastError({ msg: error.message });
//   }
// };
// const is_cancel = ref(false);
// const Cancel = () => {
//   is_cancel.value = is_cancel.value = !is_cancel.value;
// };
// const cancelBack = () => {
//   is_cancel.value = !is_cancel.value;
// };
// const CanfirmById = (id) => {
//   outerVisible.value = true;
// };
// const model = ref({});
// const getModel = async () => {
//   const data = await PaintService.getModel();
//   model.value = data.data;
// };
// const cancel_reason = ref("");
// const cancelSendReason = async () => {
//   try {
//     const loader = loading.show();
//     const data = await PaintService.cancelReason({
//       reason: cancel_reason.value,
//       card_id: cardId.value,
//     });
//     loader.hide();
//     innerVisible.value = false;
//     is_confirm.value = false;
//     const Refresh = () => {
//       window.location.href = "/explore/department/paint/working/plan";
//     };
//     ToastifyService.ToastSuccess({ msg: data.data.msg });
//     setTimeout(Refresh, 1500);
//   } catch (error) {
//     ToastifyService.ToastError({
//       msg: error.message,
//     });
//   }
// };
// const Save = async () => {
//   try {
//     const loader = loading.show();
//     const data = await PaintService.create({
//       items: model.value,
//       card_id: cardId.value,
//     });
//     loader.hide();
//     outerVisible.value = false;
//     is_confirm.value = false;
//     const TimeOut = () => {
//       window.location.href = "/explore/department/paint/working/plan";
//     };
//     ToastifyService.ToastSuccess({ msg: data.data.msg });
//     setTimeout(TimeOut, 1500);
//   } catch (err) {
//     console.log(err);
//   }
// };

// const items = ref([]);
// const sales_length = ref();
// const provide_quantitiy = ref();
// const getAllFromSale = async () => {
//   const loader = loading.show();
//   const data = await PaintService.getAllFromSale();
//   items.value = data.data.allPosts;
//   sales_length.value = items.value.length;
//   loader.hide();
// };

// const weaving_length = ref();
// function WeavingLength(weaving) {
//   weaving_length.value = weaving;
// }
// const provide_length = ref();
// function ProvideLength(provide) {
//   provide_length.value = provide;
// }
// onMounted(async () => {
//   try {
//     await getAllFromSale(), await getModel();
//   } catch (err) {
//     console.log(err);
//   }
// });
</script>

<template>
  <Title>
    <template v-slot:title>
      <h3>Bo'yoq reja iqtisod</h3>
    </template>
  </Title>
  <HeaderTabLink />
  <MainTable />
  <!-- <DoneTabelComponent v-show="isActive === 0" class="" :items="items" />
  <WeavingTabelComponent
    @WeavingLength="WeavingLength"
    v-show="isActive === 3"
    class=""
    :items="items"
  />
  <ProvideTabelComponent
    @ProvideLength="ProvideLength"
    v-show="isActive === 5"
    class=""
  /> -->
  <ModalConfirm />
  <ModalForProvide />
</template>
