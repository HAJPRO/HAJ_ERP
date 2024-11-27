<script setup>
import { SaleStore } from "../../stores/Sale/sale.store";
const store = SaleStore();
import { storeToRefs } from "pinia";
const { id, is_modal, model } = storeToRefs(store);

const Update = async () => {
  const data = await store.Update(model.value);
};
</script>

<template>
  <el-dialog
    v-model="is_modal"
    title="Sotuv kartani o'zgartirish oynasi "
    width="700"
  >
    <span>
      <form
        class="filter-box md:grid md:grid-cols-3 gap-2 sm:flex sm:flex-wrap rounded shadow-md bg-white p-3 mt-1 mb-3 text-[12px]"
      >
        <div class="mb-1 col-span-1">
          <label
            name="resul"
            class="block mb-1 text-[12px] font-medium text-gray-900 dark:text-white"
            >Buyurtmachi nomi</label
          >
          <el-input
            v-model="model.customer_name"
            clearable
            class="w-[100%]"
            size="smal"
            type="String"
            placeholder="..."
          />
        </div>
        <div class="mb-1 col-span-1">
          <label
            name="resul"
            class="block mb-1 text-[12px] font-medium text-gray-900 dark:text-white"
            >Buyurtma nomeri</label
          >
          <el-input
            disabled
            v-model="model.order_number"
            clearable
            class="w-[100%]"
            size="smal"
            type="String"
            placeholder="..."
          />
        </div>

        <div class="mb-1 col-span-1">
          <label
            name="resul"
            class="block mb-1 text-[12px] font-medium text-gray-900 dark:text-white"
            >Mahsulot nomi</label
          >
          <el-input
            v-model="model.pro_name"
            clearable
            class="w-[100%]"
            size="smal"
            type="String"
            placeholder="..."
          />
        </div>
        <div class="mb-1 col-span-1">
          <label
            name="resul"
            class="block mb-1 text-[12px] font-medium text-gray-900 dark:text-white"
            >Mahsulot turi</label
          >
          <el-input
            v-model="model.pro_type"
            clearable
            class="w-[100%]"
            size="smal"
            type="String"
            placeholder="..."
          />
        </div>
        <div class="mb-1 col-span-1">
          <label
            name="resul"
            class="block mb-1 text-[12px] font-medium text-gray-900 dark:text-white"
            >Mahsulot rangi</label
          >
          <el-input
            v-model="model.pro_color"
            clearable
            class="w-[100%]"
            size="smal"
            type="String"
            placeholder="..."
          />
        </div>
        <div class="mb-1 col-span-1">
          <label
            name="resul"
            class="block mb-1 text-[12px] font-medium text-gray-900 dark:text-white"
            >Eni</label
          >
          <el-input
            v-model="model.pro_width"
            clearable
            class="w-[100%]"
            size="smal"
            type="Number"
            placeholder="..."
          />
        </div>

        <div class="mb-1 col-span-1">
          <label
            name="resul"
            class="block mb-1 text-[12px] font-medium text-gray-900 dark:text-white"
            >Grammaji</label
          >
          <el-input
            v-model="model.grammaj"
            clearable
            class="w-[100%]"
            size="smal"
            type="String"
            placeholder="..."
          />
        </div>

        <div class="mb-1 col-span-1">
          <label
            name="resul"
            class="block mb-1 text-[12px] font-medium text-gray-900 dark:text-white"
            >Yetkazish miqdori</label
          >
          <el-input
            v-model="model.order_quantity"
            clearable
            class="w-[100%]"
            size="smal"
            type="Number"
            placeholder="..."
          />
        </div>
        <div class="mb-1 col-span-1">
          <label
            name="resul"
            class="block mb-1 text-[12px] font-medium text-gray-900 dark:text-white"
            >Yetkazib berish muddati</label
          >
          <el-date-picker
            class="w-[100%]"
            v-model="model.delivery_time"
            clearable
            type="date"
            placeholder="Yetkazish vaqti"
            :size="size"
          />
        </div>
      </form>
    </span>
    <el-dialog
      v-model="innerVisible"
      width="500"
      title="Inner Dialog"
      append-to-body
    >
      <span>This is the inner Dialog</span>
    </el-dialog>
    <template #footer>
      <div class="dialog-footer">
        <!-- <router-link @click="outerVisible = false" to=""
          class="inline-flex text-[12px] items-center ml-2 px-3 py-1 mb-1 mt-2 text-sm font-medium text-center text-white bg-red-500 text-bold rounded ">
          <i class=" mr-2 fa-solid fa-arrow-left fa-sm"></i>Orqaga</router-link> -->
        <router-link
          @click="Update()"
          to=""
          class="inline-flex text-[12px] items-center ml-2 px-3 py-1 mb-1 mt-2 text-sm font-medium text-center text-white bg-[#36d887] text-bold rounded"
        >
          <i class="mr-2 fa-solid fa-check fa-sm"></i>Yangilash</router-link
        >
      </div>
    </template>
  </el-dialog>
</template>
