<script setup>
import { ref, onMounted } from "vue";
import { ToastifyService } from "../../utils/Toastify";
import { loading } from "../../utils/Loader";
import { SaleLegalService } from "../../ApiServices/Sale/saleLegal.service";
import { SeamStore } from "../../stores/Seam/seam.store";
import { SaleStore } from "../../stores/Sale/sale.store";
const store_seam = SeamStore();
const store_sale = SaleStore();
import { storeToRefs } from "pinia";
const all_length = ref();
const IsActive = (is_active) => {
  store_seam.GetIsActive(is_active);
};
const getAllLength = async () => {
  const data = await SaleLegalService.getAllLength();
  all_length.value = data.data ? data.data : {};
};
const getAll = async () => {
  const loader = loading.show();
  await store_sale.getAll();
  IsActive(isActive.value);
  loader.hide();
};
const isActive = ref(1);
const ActiveTabLink = (num) => {
  if (num === 0) {
    isActive.value = 0;
    return getAll();
  }
  if (num === 1) {
    isActive.value = 1;
    return getAll();
  }
  if (num === 2) {
    isActive.value = 2;
    return getAll();
  }
  if (num === 3) {
    isActive.value = 3;
    return getAll();
  }
  if (num === 4) {
    isActive.value = 4;
    return getAll();
  }
  if (num === 5) {
    isActive.value = 5;
    return getAll();
  }
};
onMounted(async () => {
  try {
    await getAllLength(), getAll();
  } catch (err) {
    console.log(err);
  }
});
</script>
<template>
  <div
    class="grid grid-cols-12 grid-flow-col justify-between bg-white rounded-md shadow-md p-3 mb-2"
  >
    <div class="col-span-9 grid-flow-col flex-wrap">
      <router-link
        to=""
        @click="ActiveTabLink(1)"
        :class="{ activeTab: isActive === 1 }"
        class="inline-flex text-[13px] items-center mr-2 px-4 py-1 mb-1 text-sm font-medium text-center text-red hover:border-b-2 border-solid border-[#36d887] bg-[#e4e9e9] text-bold rounded"
      >
        <i class="fa-solid fa-info mr-2 fa-xm"></i> Tavarlar
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
        <i class="fa-solid fa-truck mr-2 fa-xm"></i> Yuk xati
        <div class="flex flex-shrink-0 ml-2">
          <span
            class="inline-flex items-center justify-center h-5 text-[11px] font-medium text-white bg-[#36d887] px-2 py-2 rounded"
          >
            <span class=" "> <i class="fa-solid fa-truck fa-md"></i></span
          ></span>
        </div>
      </router-link>
      <router-link
        @click="ActiveTabLink(3)"
        to=""
        :class="{ activeTab: isActive === 3 }"
        class="inline-flex text-[13px] items-center mr-2 px-4 py-1 mb-1 text-sm font-medium text-center text-red hover:border-b-2 border-solid border-[#36d887] bg-[#e4e9e9] text-bold rounded"
      >
        <i class="fa-solid fa-qrcode mr-2 fa-xm"></i> Scanner
        <div class="flex flex-shrink-0 ml-2">
          <span
            class="inline-flex items-center justify-center h-5 text-[11px] font-medium text-white bg-[#36d887] px-2 py-2 rounded"
          >
            <span class=" "> <i class="fa-solid fa-qrcode fa-md"></i></span
          ></span>
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
