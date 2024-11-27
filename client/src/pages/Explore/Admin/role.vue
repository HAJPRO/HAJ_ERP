<script setup>
import { ref, onMounted } from "vue";
import Title from "@/components/Title.vue";
import HeaderTabLink from "../../../components/Admin/role/HeaderTabLink.vue";
</script>

<template>
  <div>
    <Title>
      <template v-slot:title>
        <h3>Role</h3>
      </template>
    </Title>
    <HeaderTabLink />
  </div>
</template>
<style>
.activeTab {
  border-bottom: 2px solid #36d887;
}
</style>
