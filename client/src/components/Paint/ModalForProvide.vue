<script setup>
import { ref } from "vue";

import { PaintPlanStore } from "../../stores/Paint/paintPlan.store";
const store = PaintPlanStore();
import { storeToRefs } from "pinia";
const { is_provide, model, card_id, item } = storeToRefs(store);
const formRef = ref();
const SaveToProvideValidate = async (formRef) => {
  await formRef.validate((valid) => {
    if (valid === true) {
      SaveToProvide();
    } else {
      return false;
    }
  });
};
const SaveToProvide = async () => {
  await store.SaveToProvide({ id: card_id.value, data: model.value });
  is_provide.value = false;
};
const rules = ref({
  required: true,
  message: `Maydon to'ldirilishi zarur !`,
  trigger: "blur",
});
</script>
<template>
  <el-dialog
    v-model="is_provide"
    title="Taminot uchun kerakli mahsulotlar qo'shish"
    width="600"
  >
    <span>
      <el-form
        ref="formRef"
        :model="model.ModelForProvide"
        label-width="auto"
        class="filter-box bg-white md:grid md:grid-cols-8 gap-1 sm:flex sm:flex-wrap rounded shadow-sm p-2 mt-2 mb-2 text-[13px]"
        size="small"
        label-position="top"
      >
        <div class="mb-1 col-span-4">
          <el-form-item label="Pus (kg)" prop="pus" :rules="rules">
            <el-input
              v-model="model.ModelForProvide.pus"
              clearable
              class="w-[100%]"
              size="smal"
              type="Number"
              placeholder="..."
            />
          </el-form-item>
        </div>
        <div class="mb-1 col-span-4">
          <el-form-item label="Fike (kg)" prop="fike" :rules="rules">
            <el-input
              v-model="model.ModelForProvide.fike"
              clearable
              class="w-[100%]"
              size="smal"
              type="Number"
              placeholder="..."
            />
          </el-form-item>
        </div>
        <div class="mb-1 col-span-4">
          <el-form-item label="Rang kodi" prop="color_code" :rules="rules">
            <el-input
              v-model="model.ModelForProvide.color_code"
              clearable
              class="w-[100%]"
              size="smal"
              type="String"
              placeholder="..."
            />
          </el-form-item>
        </div>
        <div class="mb-1 col-span-4">
          <el-form-item
            label="Tayyorlash muddati"
            prop="duration_time"
            :rules="rules"
          >
            <el-date-picker
              style="width: 100%"
              v-model="model.ModelForProvide.duration_time"
              clearable
              type="date"
              placeholder="..."
              size="smal"
            />
          </el-form-item>
        </div>
      </el-form>
    </span>
    <span class="">
      <div class="text-[16px] text-gray-800">
        To'quv uchun talabnoma qo'shish
      </div>
      <el-form
        ref="formRef"
        :model="model.ModelForWeaving"
        label-width="auto"
        class="filter-box bg-white md:grid md:grid-cols-8 gap-1 sm:flex sm:flex-wrap rounded shadow-sm p-2 mt-2 mb-2 text-[13px]"
        size="small"
        label-position="top"
      >
        <div class="mb-1 col-span-4">
          <el-form-item
            label="Xom mato miqdori (kg)"
            prop="weaving_cloth_quantity"
            :rules="rules"
          >
            <el-input
              v-model="model.ModelForWeaving.weaving_cloth_quantity"
              clearable
              class="w-[100%]"
              size="smal"
              type="Number"
              placeholder="..."
            />
          </el-form-item>
        </div>
        <div class="mb-1 col-span-4">
          <el-form-item
            label="Tayyorlash muddati"
            prop="weaving_delivery_time"
            :rules="rules"
          >
            <el-date-picker
              style="width: 100%"
              v-model="model.ModelForWeaving.weaving_delivery_time"
              clearable
              type="date"
              placeholder="..."
              size="smal"
            />
          </el-form-item>
        </div>
      </el-form>
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
        <router-link
          @click="is_provide = false"
          to=""
          class="inline-flex text-[12px] items-center ml-2 px-3 py-1 mb-1 mt-2 text-sm font-medium text-center text-white bg-red-500 text-bold rounded focus:ring-4 focus:outline-none"
        >
          <i class="mr-2 fa-solid fa-arrow-left fa-sm"></i>Orqaga</router-link
        >
        <router-link
          to=""
          @click="SaveToProvideValidate(formRef)"
          class="inline-flex text-[12px] items-center ml-2 px-3 py-1 mb-1 mt-2 text-sm font-medium text-center text-white bg-[#36d887] text-bold rounded focus:ring-4 focus:outline-none"
        >
          <i class="mr-2 fa-solid fa-check fa-sm"></i>Yuborish</router-link
        >
      </div>
    </template>
  </el-dialog>
</template>
