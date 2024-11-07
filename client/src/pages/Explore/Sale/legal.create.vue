<script setup>
import { onMounted, ref } from "vue";
import Title from "@/components/Title.vue";
import { SaleLegalService } from "@/ApiServices/Sale/saleLegal.service";
import { ToastifyService } from "../../../utils/Toastify.js";
import { useRouter } from "vue-router";
import Cookies from "js-cookie";
const router = useRouter();
import { useLoading } from "vue-loading-overlay";
const loading = useLoading({
  color: "#36d887",
  backgroundColor: "#666",
  opacity: "0.9",
  loader: "bars",
  height: "100px",
  width: "100px",
});

const model = ref({});
const getModel = async () => {
  const data = await SaleLegalService.getModel();
  model.value = data.data;
};
const Save = async () => {
  try {
    const {
      customer_name,
      order_number,
      pro_name,
      pro_type,
      pro_color,
      pro_width,
      grammaj,
      delivery_time,
      order_quantity,
    } = model.value;
    if (
      customer_name &&
      order_number &&
      pro_name &&
      pro_type &&
      pro_color &&
      pro_width &&
      grammaj &&
      delivery_time &&
      order_quantity
    ) {
      const data = await SaleLegalService.create(model.value);
      model.value = {};
      ToastifyService.ToastSuccess({ msg: data.data.msg });
      setInterval((window.location.href = "/explore/sale/legal"), 1500);
    } else {
      return ToastifyService.ToastError({
        msg: "Barcha qatorlarni to'ldiring !",
      });
    }
  } catch (error) {
    return ToastifyService.ToastError({ msg: error.message });
  }
};
onMounted(async () => {
  try {
    await getModel();
  } catch (error) {
    return ToastifyService.ToastError({ msg: error.message });
  }
});
</script>

<template>
  <div>
    <Title>
      <template v-slot:title>
        <h3>Sotuv karta yaratish</h3>
      </template>
    </Title>
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
          v-model="model.order_number"
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
        <el-input
          v-model="model.delivery_time"
          clearable
          class="w-[100%]"
          size="smal"
          type="Date"
          placeholder=""
        />
      </div>

      <!-- <div class="mb-1 col-span-3">
        <label
          name="resul"
          class="block mb-1 text-[12px] font-medium text-gray-900 dark:text-white"
          >Yetkazib berish Muddati</label
        >
        <el-input
          maxlength="200"
          placeholder="Mahsulot haqida ma'lumot kiriting..."
          show-word-limit
          type="String"
        />
      </div> -->
    </form>

    <div class="flex justify-end bg-white rounded-md shadow-md p-3">
      <div></div>
      <router-link
        @click="Save()"
        to=""
        class="inline-flex text-[13px] items-center px-6 py-2 mb-1 text-sm font-medium text-center text-white bg-[#36d887] text-bold rounded focus:ring-4 focus:outline-none"
      >
        <i class="fa-solid fa-check mr-2 fa-lg"></i> Saqlash
      </router-link>
    </div>
  </div>
</template>
