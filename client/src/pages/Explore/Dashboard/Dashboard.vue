<template>
  <div class="">
    <Title>
      <template v-slot:title>
        <h3>Dashboard</h3>
      </template>
    </Title>
  </div>
  <BarChart />
</template>

<script setup>
import Title from "@/components/Title.vue";
import BarChart from "../../../components/Dashboard/BarChart.vue";

import { onMounted, ref } from "vue";
</script>

<style>
/* #app {
  color: #2ecc71;
} */
</style>
