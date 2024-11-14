<template>
  <div class="">
    <Title>
      <template v-slot:title>
        <h3>Dashboard</h3>
      </template>
    </Title>
    <MainTable />
  </div>
</template>

<script setup>
import Title from "@/components/Title.vue";
import MainTable from "../../../components/Weaving/MainTabel.component.vue";

import { ref } from "vue";

</script>

<style></style>
