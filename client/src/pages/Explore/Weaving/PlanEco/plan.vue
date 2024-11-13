<script setup>
import Title from "@/components/Title.vue";
import { ref, onBeforeMount, onMounted, computed } from "vue";
import { useCounterStore } from "../../../../stores/weaving/counter"
const store = useCounterStore()
import HeaderTabLink from "../../../../components/Weaving/HeaderTabLink.vue";
import MainTable from "../../../../components/Weaving/MainTabel.component.vue";
import AddProductForProvideModal from "../../../../components/Weaving/AddProductForProvideModal.component.vue";
import PaganationWeavingComponents from "../../../../components/Weaving/PaganationWeaving.components.vue";

const card_id = ref();
const is_modal = ref();
const isModalData = ref();
// const DataForWeavingModal = (data) => {
//   isModalData.value = data;
//   card_id.value = data.id;
//   is_modal.value = data.is_modal;
// };


onBeforeMount(() => {
  try {
    DataForWeavingModal();
  } catch (err) {
    console.log(err);
  }
});
onMounted(() => {
  try {

  } catch (err) {
    console.log(err);
  }
});
</script>

<template>
  <div>
    <Title>
      <template v-slot:title>
        <h3>To'quv reja iqtisod {{ store.count }}</h3>
      </template>
    </Title>
    <HeaderTabLink />
    <MainTable :items="items" @DataForWeavingModal="DataForWeavingModal" />
  </div>
  <AddProductForProvideModal :is_modal="is_modal" :isModalData="isModalData" :card_id="card_id" />
  <PaganationWeavingComponents />
</template>
