<script setup>
import { ref, onMounted } from "vue";
import Title from "@/components/Title.vue";
import { PaintPlanStore } from "../../../../stores/Paint/paintPlan.store";
const store_paint = PaintPlanStore();
import { SaleStore } from "../../../../stores/Sale/sale.store";
const store_sale = SaleStore();
import { storeToRefs } from "pinia";
import HeaderTabLink from "../../../../components/Paint/HeaderTabLink.vue";
import MainTable from "../../../../components/Paint/MainTable.vue";
import ModalConfirm from "../../../../components/Paint/ModalConfirm.vue";
import ModalForProvide from "../../../../components/Paint/ModalForProvide.vue";
import InProcessDetailTable from "../../../../components/Paint/InProcessDetailTable.vue";
import ProvideTable from "../../../../components/Paint/ProvideTable.vue";
const { is_active } = storeToRefs(store_paint);
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
  <MainTable v-if="is_active !== 1 && is_active !== 5" />
  <InProcessDetailTable v-if="is_active === 1" />
  <ProvideTable v-if="is_active === 5" />
  <ModalConfirm />
  <ModalForProvide />
</template>
