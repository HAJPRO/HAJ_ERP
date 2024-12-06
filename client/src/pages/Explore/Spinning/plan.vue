<script setup>
import Title from "@/components/Title.vue";
import HeaderTabLink from "../../../components/Spinning/HeaderTabLink.vue";
import MainTable from "../../../components/Spinning/MainTable.vue";
import ModalConfirm from "../../../components/Spinning/ModalConfirm.vue";
import ModalForProvide from "../../../components/Spinning/ModalForProvide.vue";
import InProcessDetailTable from "../../../components/Spinning/InProcessDetailTable.vue";
import ProvideTable from "../../../components/Spinning/ProvideTable.vue";
import { SpinningPlanStore } from "../../../stores/Spinning/spinningPlan.store";
const store_spinning = SpinningPlanStore();
import { storeToRefs } from "pinia";
import ModalDayReport from "../../../components/Spinning/ModalDayReport.vue";
const { is_active, is_report_modal } = storeToRefs(store_spinning);
</script>
<template>
  <div>
    <Title>
      <template v-slot:title>
        <h3>Yigiruv reja iqtisod</h3>
      </template>
    </Title>
    <HeaderTabLink />
    <MainTable v-if="is_active === 4" />
    <InProcessDetailTable v-if="is_active === 1" />
    <ProvideTable v-if="is_active === 5" />
    <ModalDayReport v-if="is_report_modal === true" />
    <ModalConfirm />
    <ModalForProvide />
  </div>
</template>
<style></style>
