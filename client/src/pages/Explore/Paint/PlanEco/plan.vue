<script setup>
import { ref, onMounted } from "vue";
import Title from "@/components/Title.vue";
import { PaintPlanStore } from "../../../../stores/Paint/paintPlan.store";
const store = PaintPlanStore();
import { PaintService } from "../../../../ApiServices/Paint/paint.service";
import HeaderTabLink from "../../../../components/Paint/HeaderTabLink.vue";
import MainTable from "../../../../components/Paint/MainTable.vue";
import ModalConfirm from "../../../../components/Paint/ModalConfirm.vue";
import ModalForProvide from "../../../../components/Paint/ModalForProvide.vue";
const getModel = async () => {
  await store.GetModel();
};
const getQRImage = async () => {
  const qr = await PaintService.getQRImage()
  console.log(qr);
}

onMounted(async () => {
  try {
    await getModel(); getQRImage()
  } catch (err) {
    console.log(err);
  }
});
</script>

<template>
  <Title>
    <template v-slot:title>
      <h3>Bo'yoq reja iqtisod</h3>
    </template>
  </Title>
  <HeaderTabLink />
  <MainTable />
  <ModalConfirm />
  <ModalForProvide />

</template>
