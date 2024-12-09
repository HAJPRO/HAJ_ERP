<script setup>
import ProvideTable from "../../components/Provide/ProvideTable.vue";
import PaintTable from "../../components/Provide/PaintTable.vue";
import WeavingTable from "../../components/Provide/WeavingTable.vue";
import SpinningTable from "../../components/Provide/SpinningTable.vue";
import { ProvidePlanStore } from "../../stores/Provide/provideStore";
const StoreProvide = ProvidePlanStore();
import { storeToRefs } from "pinia";
const { is_active } = storeToRefs(StoreProvide);
</script>
<template>
  <div>
    <ProvideTable v-if="is_active === 1" />
    <PaintTable v-if="is_active === 2" />
    <WeavingTable v-if="is_active === 3" />
    <SpinningTable v-if="is_active === 4" />
  </div>
</template>
