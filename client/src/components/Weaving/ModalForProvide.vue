<script setup>
import { ref } from "vue";
import { WeavingPlanStore } from "../../stores/Weaving/weaving_plan.store";
const store_weaving = WeavingPlanStore();
import { storeToRefs } from "pinia";
const { is_provide, card_id, order_id, paint_process_id, model } =
  storeToRefs(store_weaving);
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
  await store_weaving.SaveToProvide({
    id: card_id.value,
    data: model.value,
    order_id: order_id.value,
    paint_process_id: paint_process_id.value,
  });
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
          <el-form-item label="Likra (kg)" prop="likra" :rules="rules">
            <el-input
              v-model="model.ModelForProvide.likra"
              clearable
              class="w-[100%]"
              size="smal"
              type="Number"
              placeholder="..."
            />
          </el-form-item>
        </div>
        <div class="mb-1 col-span-4">
          <el-form-item label="Polister (kg)" prop="polister" :rules="rules">
            <el-input
              v-model="model.ModelForProvide.polister"
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
            label="Melaks ip (kg)"
            prop="melaks_yarn"
            :rules="rules"
          >
            <el-input
              v-model="model.ModelForProvide.melaks_yarn"
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
        Yigiruv uchun talabnoma qo'shish
      </div>
      <el-form
        ref="formRef"
        :model="model.ModelForSpinning"
        label-width="auto"
        class="filter-box bg-white md:grid md:grid-cols-8 gap-1 sm:flex sm:flex-wrap rounded shadow-sm p-2 mt-2 mb-2 text-[13px]"
        size="small"
        label-position="top"
      >
        <div class="mb-1 col-span-4">
          <el-form-item
            label="Ip kalava (kg)"
            prop="spinning_yarn_wrap_quantity"
            :rules="rules"
          >
            <el-input
              v-model="model.ModelForSpinning.spinning_yarn_wrap_quantity"
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
            prop="spinning_delivery_time"
            :rules="rules"
          >
            <el-date-picker
              style="width: 100%"
              v-model="model.ModelForSpinning.spinning_delivery_time"
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
          @click="SaveToProvideValidate(formRef)"
          to=""
          class="inline-flex text-[12px] items-center ml-2 px-3 py-1 mb-1 mt-2 text-sm font-medium text-center text-white bg-[#36d887] text-bold rounded"
        >
          <i class="mr-2 fa-solid fa-check fa-sm"></i>Yuborish</router-link
        >
      </div>
    </template>
  </el-dialog>
</template>
