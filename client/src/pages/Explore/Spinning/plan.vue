<script setup>
import Title from "@/components/Title.vue";
import HeaderTabLink from "../../../components/Spinning/HeaderTabLink.vue";
import MainTable from "../../../components/Spinning/MainTable.vue";
import ModalConfirm from "../../../components/Spinning/ModalConfirm.vue";
import ModalForProvide from "../../../components/Spinning/ModalForProvide.vue";
</script>
<template>
  <div>
    <Title>
      <template v-slot:title>
        <h3>Yigiruv reja iqtisod</h3>
      </template>
    </Title>
    <HeaderTabLink />
    <MainTable />
    <ModalConfirm />
    <ModalForProvide />
  </div>
</template>
<style></style>
