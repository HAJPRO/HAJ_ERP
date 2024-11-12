<script setup>
import Title from "@/components/Title.vue";
import { ref, onMounted, onBeforeMount } from "vue";
import { ToastifyService } from "../../../../utils/Toastify";
import { loading } from ".././../../../utils/Loader"
import { WeavingService } from "@/ApiServices/Weaving/weaving.service";
import { SaleLegalService } from "@/ApiServices/Sale/saleLegal.service";
import MainTable from "../../../../components/Weaving/MainTabel.component.vue";
import AddProductForProvideModal from "../../../../components/Weaving/AddProductForProvideModal.component.vue";
import PaganationWeavingComponents from "../../../../components/Weaving/PaganationWeaving.components.vue";
const all_length = ref();
const getAllLength = async () => {
  const loader = loading.show()
  const data = await SaleLegalService.getAllLength();
  loader.hide()
  all_length.value = data.data ? data.data : {};

}
const items = ref([]);
const getAll = async () => {
  const loader = loading.show()
  const data = await SaleLegalService.getAll({ status: isActive.value });
  loader.hide()
  items.value = data.data ? data.data : [];

}
const card_id = ref()
const is_modal = ref()
const isModalData = ref()
const DataForWeavingModal = (data) => {
  isModalData.value = data
  card_id.value = data.id
  is_modal.value = data.is_modal

}
const Save = async () => {
  try {
    const loader = loading.show()
    const data = await PaintService.create({
      items: model.value,
      card_id: cardId.value,
    });
    loader.hide()
    outerVisible.value = false
    is_confirm.value = false
    const TimeOut = () => {
      window.location.href = "/explore/department/paint/working/plan"
    }
    ToastifyService.ToastSuccess({ msg: data.data.msg });
    setTimeout(TimeOut, 1500)

  } catch (err) {
    console.log(err);
  }
};
const isActive = ref(0)
const ActiveTabLink = (num) => {
  if (num === 0) {
    isActive.value = 0
    return getAll(0)
  }
  if (num === 1) {
    isActive.value = 1
    return getAll(1)
  }
  if (num === 2) {
    isActive.value = 2
    return getAll(2)
  }
  if (num === 3) {
    isActive.value = 3
    return getAll(3)
  }
  if (num === 4) {
    isActive.value = 4
    return getAll(4)
  }
  if (num === 5) {
    isActive.value = 5
    return getAll(5)
  }

}
onBeforeMount(() => {
  try {
    DataForWeavingModal()
  } catch (err) {
    console.log(err);
  }
});
onMounted(async () => {
  try {
    await getAll(), getAllLength()
  } catch (err) {
    console.log(err);
  }
});
</script>

<template>
  <div>
    <Title>
      <template v-slot:title>
        <h3>To'quv reja iqtisod</h3>
      </template>
    </Title>
    <div class="grid grid-cols-12 grid-flow-col justify-between bg-white rounded-md shadow-md p-2 mb-2 ">
      <div class="col-span-9 grid-flow-col ">
        <router-link to="" @click="ActiveTabLink(0)" :class="{ activeTab: isActive === 0 }"
          class="inline-flex text-[13px] items-center mr-1 px-4 py-1 mb-1 text-sm font-medium text-center text-red hover:border-b-2 border-solid border-[#36d887] bg-[#e4e9e9] text-bold rounded ">
          <i class="fa-solid fa-info mr-2 fa-xm"></i> Bajarilgan
          <div class="flex flex-shrink-0 ml-2">
            <span
              class="inline-flex items-center justify-center h-5 text-[11px] font-medium text-white bg-[#36d887] px-3 py-2 rounded">
              <span class=" ">0</span>/{{ (all_length ? all_length.paint_length : 0) || 0 }}</span>
          </div>
        </router-link>
        <router-link to="" @click="ActiveTabLink(3)" :class="{ activeTab: isActive === 3 }"
          class="inline-flex text-[13px] items-center mr-1 px-4 py-1 mb-1 text-sm font-medium text-center text-red hover:border-b-2 border-solid border-[#36d887] bg-[#e4e9e9] text-bold rounded ">
          <i class="fa-solid fa-info mr-2 fa-xm"></i> Bo'yoq
          <div class="flex flex-shrink-0 ml-2">
            <span
              class="inline-flex items-center justify-center h-5 text-[11px] font-medium text-white bg-[#36d887] px-3 py-2 rounded">
              <span class=" ">0</span>/{{ (all_length ? all_length.paint_length : 0) || 0 }}</span>
          </div>
        </router-link>
        <router-link to="" @click="ActiveTabLink(4)" :class="{ activeTab: isActive === 4 }"
          class="inline-flex text-[13px] items-center mr-1  px-4 py-1 mb-1 text-sm font-medium text-center text-red hover:border-b-2 border-solid border-[#36d887] bg-[#e4e9e9] text-bold rounded ">
          <i class="fa-solid fa-info mr-2 fa-xm"></i> Yigiruv
          <div class="flex flex-shrink-0 ml-2">
            <span
              class="inline-flex items-center justify-center h-5 text-[11px] font-medium text-white bg-[#36d887] px-3 py-2 rounded"><span
                class=" ">0</span>/{{ (all_length ? all_length.spinning_length : 0) || 0 }}</span>
          </div>
        </router-link>
        <router-link to="" @click="ActiveTabLink(5)" :class="{ activeTab: isActive === 5 }"
          class="inline-flex text-[13px] items-center px-4 py-1 mb-1 text-sm font-medium text-center text-red hover:border-b-2 border-solid border-[#36d887] bg-[#e4e9e9] text-bold rounded ">
          <i class="fa-solid fa-info mr-2 fa-xm"></i> Taminot
          <div class="flex flex-shrink-0 ml-2">
            <span
              class="inline-flex items-center justify-center h-5 text-[11px] font-medium text-white bg-[#36d887] px-3 py-2 rounded">
              <span class=" ">0</span>/{{ (all_length ? all_length.provide_length_length : 0) || 0 }}</span>
          </div>
        </router-link>
      </div>
    </div>
    <MainTable :items="items" @DataForWeavingModal="DataForWeavingModal" />
  </div>
  <AddProductForProvideModal :is_modal="is_modal" :isModalData="isModalData" :card_id="card_id" />
  <PaganationWeavingComponents />
</template>
<style>
.activeTab {
  border-bottom: 2px solid #36d887
}
</style>
