<script setup>
import { ref, onMounted } from "vue";
import { loading } from "../../utils/Loader";
import { SpinningPlanStore } from "../../stores/Spinning/spinningPlan.store";
import { storeToRefs } from "pinia";
const store_spinning = SpinningPlanStore();
const { all_length } = storeToRefs(store_spinning);
const getAll = async () => {
  const loader = loading.show();
  await store_spinning.GetAll({ status: isActive.value });
  loader.hide();
};
const is_Active = () => {
  store_spinning.IsActive({ is_active: isActive.value });
};
const isActive = ref(1);
const ActiveTabLink = (num) => {
  if (num === 1) {
    isActive.value = 1;
    is_Active();
    getAll();
  }
  if (num === 4) {
    isActive.value = 4;
    is_Active();
    getAll();
  }
  if (num === 5) {
    isActive.value = 5;
    is_Active();
    getAll();
  }
};
onMounted(async () => {
  try {
    await getAll(), is_Active();
  } catch (err) {
    console.log(err);
  }
});
</script>
<template>
  <div
    class="grid grid-cols-12 grid-flow-col justify-between bg-white rounded-md shadow-md p-2 mb-2"
  >
    <div class="col-span-9 grid-flow-col">
      <router-link
        @click="ActiveTabLink(1)"
        to=""
        :class="{ activeTab: isActive === 1 }"
        class="inline-flex text-[13px] items-center mr-1 px-4 py-1 mb-1 font-medium text-center text-red hover:border-b-2 border-solid border-[#36d887] bg-[#e4e9e9] text-bold rounded"
      >
        <i class="fa-solid fa-info mr-2 fa-xm"></i> Jarayonda
        <div class="flex flex-shrink-0 ml-2">
          <span
            class="inline-flex items-center justify-center h-5 text-[11px] font-medium text-white bg-[#36d887] px-3 py-2 rounded"
          >
            <span class=" ">0</span>/{{
              (all_length ? all_length.process_length : 0) || 0
            }}</span
          >
        </div>
      </router-link>
      <router-link
        to=""
        @click="ActiveTabLink(4)"
        :class="{ activeTab: isActive === 4 }"
        class="inline-flex text-[13px] items-center mr-1 px-4 py-1 mb-1 font-medium text-center text-red hover:border-b-2 border-solid border-[#36d887] bg-[#e4e9e9] text-bold rounded"
      >
        <i class="fa-solid fa-info mr-2 fa-xm"></i> To'quv
        <div class="flex flex-shrink-0 ml-2">
          <span
            class="inline-flex items-center justify-center h-5 text-[11px] font-medium text-white bg-[#36d887] px-3 py-2 rounded"
            ><span class=" ">0</span>/{{
              (all_length ? all_length.weaving_length : 0) || 0
            }}</span
          >
        </div>
      </router-link>
      <router-link
        to=""
        @click="ActiveTabLink(5)"
        :class="{ activeTab: isActive === 5 }"
        class="inline-flex text-[13px] items-center px-4 py-1 mb-1 font-medium text-center text-red hover:border-b-2 border-solid border-[#36d887] bg-[#e4e9e9] text-bold rounded"
      >
        <i class="fa-solid fa-info mr-2 fa-xm"></i> Taminot
        <div class="flex flex-shrink-0 ml-2">
          <span
            class="inline-flex items-center justify-center h-5 text-[11px] font-medium text-white bg-[#36d887] px-3 py-2 rounded"
          >
            <span class=" ">0</span>/{{
              (all_length ? all_length.provide_length : 0) || 0
            }}</span
          >
        </div>
      </router-link>
    </div>
  </div>
</template>
<style>
.activeTab {
  border-bottom: 2px solid #36d887;
}
</style>
