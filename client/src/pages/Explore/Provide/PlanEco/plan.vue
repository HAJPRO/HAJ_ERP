<script setup>
import { ref, onMounted } from "vue";
import Title from "@/components/Title.vue";
import HeaderTabLink from "../../../../components/Provide/HeaderTabLink.vue"
import MainTable from "../../../../components/Provide/MainTable.vue"

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
  </div>
</template>
<style>
.activeTab {
  border-bottom: 2px solid #36d887
}
</style>
