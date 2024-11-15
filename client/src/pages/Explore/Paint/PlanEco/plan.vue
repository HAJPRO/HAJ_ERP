<script setup>
import { ref, onMounted } from "vue";
import Title from "@/components/Title.vue";
import { PaintPlanStore } from "../../../../stores/Paint/paintPlan.store";
const store = PaintPlanStore();
import HeaderTabLink from "../../../../components/Paint/HeaderTabLink.vue";
import MainTable from "../../../../components/Paint/MainTable.vue";
import ModalConfirm from "../../../../components/Paint/ModalConfirm.vue";
import ModalForProvide from "../../../../components/Paint/ModalForProvide.vue";

const getModel = async () => {
  await store.GetModel();
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
