<script setup>
import { ref, onMounted } from "vue";
import Title from "@/components/Title.vue";
import HeaderTabLink from "../../../../components/Seam/HeaderTabLink.vue";
import BillOfLoad from "../../../../components/Seam/BillOfLoad.vue";
</script>

<template>
  <div>
    <Title>
      <template v-slot:title>
        <h3>Xom mato skladi</h3>
      </template>
    </Title>
    <HeaderTabLink />
    <BillOfLoad />
  </div>
</template>
<style>
.activeTab {
  border-bottom: 2px solid #36d887;
}
</style>
