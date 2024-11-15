<script setup>
import Title from "@/components/Title.vue";
import HeaderTabLink from "../../../../components/Weaving/HeaderTabLink.vue";
import MainTable from "../../../../components/Weaving/MainTabel.component.vue";
import ModalConfirm from "../../../../components/Paint/ModalConfirm.vue";
import ModalForProvide from "../../../../components/Weaving/ModalForProvide.vue";
// import PaganationWeavingComponents from "../../../../components/Weaving/PaganationWeaving.components.vue";
</script>

<template>
  <div>
    <Title>
      <template v-slot:title>
        <h3>To'quv reja iqtisod</h3>
      </template>
    </Title>
    <HeaderTabLink />
    <MainTable />
    <ModalForProvide />
    <ModalConfirm />

    <!-- <PaganationWeavingComponents/> -->
  </div>

</template>
