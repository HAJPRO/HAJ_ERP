<script setup>
import ProvideTable from "../../components/Provide/ProvideTable.vue"
import PaintTable from "../../components/Provide/PaintTable.vue"
import WeavingTable from "../../components/Provide/WeavingTable.vue"
import SpinningTable from "../../components/Provide/SpinningTable.vue"
import { ProvidePlanStore } from "../../stores/Provide/provideStore";
const StoreProvide = ProvidePlanStore();
import { storeToRefs } from "pinia";
const { departmen } = storeToRefs(StoreProvide);
</script>
<template>
    <!-- <ProvideTable v-show="departmen === ''" /> -->
    <PaintTable v-show="departmen === `Bo'yoq`" />
    <WeavingTable v-show="departmen === `To'quv`" />
    <SpinningTable v-show="departmen === `Yigiruv`" />
</template>