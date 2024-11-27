<script setup>
import { ref, onMounted } from "vue";
import Title from "@/components/Title.vue";
import HeaderTabLink from "../../../components/Admin/users/HeaderTabLink.vue";
import MainTable from "../../../components/Admin/users/MainTable.vue";
</script>

<template>
  <div>
    <Title>
      <template v-slot:title>
        <h3>Foydalanuvchilar</h3>
      </template>
    </Title>
    <HeaderTabLink />
    <MainTable />
  </div>
</template>
<style>
.activeTab {
  border-bottom: 2px solid #36d887;
}
</style>
