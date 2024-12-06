<script setup>
import { ref, onMounted } from "vue";
import Title from "@/components/Title.vue";
import HeaderTabLink from "../../../../components/Paint/HeaderTabLink.vue";
import MainTable from "../../../../components/Paint/MainTable.vue";
import ModalConfirm from "../../../../components/Paint/ModalConfirm.vue";
import ModalForProvide from "../../../../components/Paint/ModalForProvide.vue";
import InProcessDetailTable from "../../../../components/Paint/InProcessDetailTable.vue";
import ProvideTable from "../../../../components/Paint/ProvideTable.vue";
import ModalDayReport from "../../../../components/Paint/ModalDayReport.vue";
import { PaintPlanStore } from "../../../../stores/Paint/paintPlan.store";
const store_paint = PaintPlanStore();
import { storeToRefs } from "pinia";
const { is_active, is_report_modal } = storeToRefs(store_paint);
const getModel = async () => {
  await store_paint.GetModel();
};

onMounted(async () => {
  try {
    await getModel();
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
  <MainTable v-if="is_active === 2" />
  <InProcessDetailTable v-if="is_active === 1 || is_active === 3" />
  <ProvideTable v-if="is_active === 5" />
  <ModalDayReport v-if="is_report_modal === true" />
  <ModalConfirm />
  <ModalForProvide />
</template>
