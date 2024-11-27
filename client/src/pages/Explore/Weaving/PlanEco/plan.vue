<script setup>
import Title from "@/components/Title.vue";
import HeaderTabLink from "../../../../components/Weaving/HeaderTabLink.vue";
import MainTable from "../../../../components/Weaving/MainTabel.component.vue";
import ModalConfirm from "../../../../components/Weaving/ModalConfirm.vue";
import ModalForProvide from "../../../../components/Weaving/ModalForProvide.vue";
import InProcessDetailTable from "../../../../components/Paint/InProcessDetailTable.vue";
import { SaleStore } from "../../../../stores/Sale/sale.store";
const store_sale = SaleStore();
import { storeToRefs } from "pinia";
const { is_active } = storeToRefs(store_sale);
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
    <MainTable v-if="is_active !== 0" />
    <InProcessDetailTable v-if="is_active === 0" />
    <ModalForProvide />
    <ModalConfirm />

    <!-- <PaganationWeavingComponents/> -->
  </div>
</template>
