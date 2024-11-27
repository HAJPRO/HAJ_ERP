<script setup>
import { ref, onMounted } from "vue";
import Cookies from "js-cookie";
const dep = ref(JSON.parse(Cookies.get("account")).department);
import { loading } from "../../../utils/Loader";
import { SaleLegalService } from "../../../ApiServices/Sale/saleLegal.service";
import { SaleStore } from "../../../stores/Sale/sale.store";
const store = SaleStore();
import { storeToRefs } from "pinia";
const all_length = ref();
const getAllLength = async () => {
  const data = await SaleLegalService.getAllLength();
  all_length.value = data.data ? data.data : {};
};
const getAll = async () => {
  const loader = loading.show();
  await store.getAll({ status: isActive.value, department: dep.value });
  loader.hide();
};
const is_Active = () => {
  store.IsActive({ is_active: isActive.value });
};
const isActive = ref(0);
const ActiveTabLink = (num) => {
  if (num === 0) {
    isActive.value = 0;
    is_Active();
    getAll();
  }
  if (num === 1) {
    isActive.value = 1;
    is_Active();
    getAll();
  }
  if (num === 2) {
    isActive.value = 2;
    is_Active();
    getAll();
  }
  if (num === 3) {
    isActive.value = 3;
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
    await getAllLength(), getAll();
    is_Active();
  } catch (err) {
    console.log(err);
  }
});
</script>
<template>
  <div
    class="grid grid-cols-12 grid-flow-col justify-between bg-white rounded-md shadow-md p-2 mb-2"
  >
    <div class="col-span-9 grid-flow-col flex-wrap">
      <router-link
        to=""
        @click="ActiveTabLink(0)"
        :class="{ activeTab: isActive === 0 }"
        class="inline-flex text-[13px] items-center mr-2 px-4 py-1 mb-1 text-sm font-medium text-center text-red hover:border-b-2 border-solid border-[#36d887] bg-[#e4e9e9] text-bold rounded"
      >
        <i class="fa-solid fa-info mr-2 fa-xm"></i> Roles
        <div class="flex flex-shrink-0 ml-2">
          <span
            class="inline-flex items-center justify-center h-5 text-[11px] font-medium text-white bg-[#36d887] px-3 py-2 rounded"
          >
            <span class=" ">0</span>/{{
              (all_length ? all_length.sale_length : 0) || 0
            }}</span
          >
        </div>
      </router-link>
      <router-link
        @click="ActiveTabLink(2)"
        to=""
        :class="{ activeTab: isActive === 2 }"
        class="inline-flex text-[13px] items-center mr-2 px-4 py-1 mb-1 text-sm font-medium text-center text-red hover:border-b-2 border-solid border-[#36d887] bg-[#e4e9e9] text-bold rounded"
      >
        <i class="fa-solid fa-info mr-2 fa-xm"></i> Permissions
        <div class="flex flex-shrink-0 ml-2">
          <span
            class="inline-flex items-center justify-center h-5 text-[11px] font-medium text-white bg-red-500 px-3 py-2 rounded"
          >
            <span class=" ">0</span>/{{
              (all_length ? all_length.paint_length : 0) || 0
            }}</span
          >
        </div>
      </router-link>
    </div>
    <div class="row-span-1 flex justify-end flex-wrap col-span-3 grid-flow-col">
      <div class="col-span-2"></div>
      <div class="col-span-1">
        <router-link
          to="/explore/sale/legal/create"
          class="inline-flex items-center px-3 py-1 mb-1 text-[13px] font-medium text-center text-white bg-yellow-500 text-bold rounded"
        >
          <i class="fa-solid fa-plus mr-2 fa-sm"></i> Role
        </router-link>
        <router-link
          to="/explore/sale/legal/create"
          class="inline-flex ml-2 items-center px-3 py-1 mb-1 text-[13px] font-medium text-center text-white bg-[#36d887] text-bold rounded"
        >
          <i class="fa-solid fa-plus mr-2 fa-sm"></i> Permission
        </router-link>
      </div>
    </div>
  </div>
</template>
<style>
.activeTab {
  border-bottom: 2px solid #36d887;
}
</style>
