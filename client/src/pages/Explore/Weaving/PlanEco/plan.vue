<script setup>
import { ref, onMounted } from "vue";
import Title from "@/components/Title.vue";
import HeaderTabLink from "../../../../components/Weaving/HeaderTabLink.vue";
import MainTable from "../../../../components/Weaving/MainTabel.component.vue";
import ModalConfirm from "../../../../components/Weaving/ModalConfirm.vue";
import ModalForProvide from "../../../../components/Weaving/ModalForProvide.vue";
import { storeToRefs } from "pinia";
import ProvideTable from "../../../../components/Weaving/ProvideTable.vue";
import InProcessDetailTable from "../../../../components/Weaving/InProcessDetailTable.vue";
import ModalDayReport from "../../../../components/Weaving/ModalDayReport.vue";
import { WeavingPlanStore } from "../../../../stores/Weaving/weaving_plan.store";
const store_weaving = WeavingPlanStore();
const { is_active, is_report_modal } = storeToRefs(store_weaving);
const getModel = async () => {
  await store_weaving.GetModel();
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
  <div>
    <Title>
      <template v-slot:title>
        <h3>To'quv reja iqtisod</h3>
      </template>
    </Title>
    <HeaderTabLink />
    <MainTable v-if="is_active === 2" />
    <InProcessDetailTable v-if="is_active === 1" />
    <InProcessDetailTable v-if="is_active === 4" />
    <ProvideTable v-if="is_active === 5" />
    <ModalDayReport v-if="is_report_modal === true" />
    <ModalForProvide />
    <ModalConfirm />

    <!-- <PaganationWeavingComponents/> -->
  </div>
</template>
