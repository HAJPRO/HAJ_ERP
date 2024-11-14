<script setup>
import Title from "@/components/Title.vue";
import { ref, onBeforeMount, onMounted } from "vue";
import HeaderTabLink from "../../../../components/Weaving/HeaderTabLink.vue";
import MainTable from "../../../../components/Weaving/MainTabel.component.vue";
import AddProductForProvideModal from "../../../../components/Weaving/AddProductForProvideModal.component.vue";
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
    <AddProductForProvideModal />
    <!-- <PaganationWeavingComponents/> -->
  </div>

</template>
