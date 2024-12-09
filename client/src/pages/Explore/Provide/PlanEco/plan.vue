<script setup>
import { ref, onMounted } from "vue";
import Title from "@/components/Title.vue";
import HeaderTabLink from "../../../../components/Provide/HeaderTabLink.vue";
import MainTable from "../../../../components/Provide/MainTable.vue";
import { ProvidePlanStore } from "../../../../stores/Provide/provideStore";
const store_provide = ProvidePlanStore();
import { storeToRefs } from "pinia";
import PaintTable from "../../../../components/Provide/PaintTable.vue";
import ModalConfirm from "../../../../components/Provide/ModalConfirm.vue";
const { is_active, is_modal } = storeToRefs(store_provide);
</script>

<template>
  <div>
    <Title>
      <template v-slot:title>
        <h3>Taminot reja iqtisod</h3>
      </template>
    </Title>
    <HeaderTabLink />
    <MainTable />
    <ModalConfirm v-if="is_modal" />
  </div>
</template>
<style>
.activeTab {
  border-bottom: 2px solid #36d887;
}
</style>
