<script setup>
import { ref, onMounted } from "vue";
import { loading } from "../../../utils/Loader";
import { UsersStore } from "../../../stores/Admin/users.store";
const store = UsersStore();
import { storeToRefs } from "pinia";

const GetUsers = async () => {
  const loader = loading.show();
  await store.GetUsers({ status: isActive.value });
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
    GetUsers();
  }
  if (num === 1) {
    isActive.value = 1;
    is_Active();
    GetUsers();
  }
  if (num === 2) {
    isActive.value = 2;
    is_Active();
    GetUsers();
  }
};
onMounted(async () => {
  try {
    await GetUsers();
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
        @click="ActiveTabLink(1)"
        :class="{ activeTab: isActive === 1 }"
        class="inline-flex text-[13px] items-center mr-2 px-4 py-1 mb-1 text-sm font-medium text-center text-red hover:border-b-2 border-solid border-[#36d887] bg-[#e4e9e9] text-bold rounded"
      >
        <i class="fa-solid fa-info mr-2 fa-xm"></i> Users
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
        <i class="fa-solid fa-info mr-2 fa-xm"></i> Admins
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
          class="inline-flex items-center px-3 py-1 mb-1 text-[13px] font-medium text-center text-white bg-[#36d887] text-bold rounded"
        >
          <i class="fa-solid fa-plus mr-2 fa-sm"></i> To Add
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
