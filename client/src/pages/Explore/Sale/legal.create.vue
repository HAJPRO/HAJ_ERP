<script setup>
import { onMounted, ref } from "vue";
import Title from "@/components/Title.vue";
import { SaleLegalService } from "@/ApiServices/Sale/saleLegal.service";
import { ToastifyService } from "../../../utils/Toastify.js";
import { useRouter } from "vue-router";
const router = useRouter();
const units = ref([
  { id: 1, name: "Kg" },
  { id: 2, name: "Metr" },
  { id: 3, name: "Dona" },
  { id: 4, name: "Pachka" },
]);
const model = ref({});
const getModel = async () => {
  const data = await SaleLegalService.getModel();
  model.value = data.data;
};

const formRef = ref();
const CreateValidate = async (formRef) => {
  await formRef.validate((valid) => {
    if (valid === true) {
      Save();
    } else {
      return false;
    }
  });
};
const Save = async () => {
  try {
    const data = await SaleLegalService.create(model.value);
    model.value = {};
    const TimeOut = () => {
      window.location.href = "/explore/sale/legal";
    };
    ToastifyService.ToastSuccess({ msg: data.data.msg });
    setTimeout(TimeOut, 1500);
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
const rules = ref({
  required: true,
  message: `Maydon to'ldirilishi zarur !`,
  trigger: "blur",
});
</script>

<template>
  <div>
    <Title>
      <template v-slot:title>
        <h3>Sotuv karta yaratish</h3>
      </template>
    </Title>
    <el-form
      ref="formRef"
      :model="model"
      label-width="auto"
      class="filter-box bg-white md:grid md:grid-cols-9 gap-1 sm:flex sm:flex-wrap rounded shadow-sm p-2 mt-2 mb-2 text-[13px]"
      size="small"
      label-position="top"
    >
      <div class="mb-1 col-span-3">
        <el-form-item
          label="Buyurtmachi nomi"
          prop="customer_name"
          :rules="rules"
        >
          <el-input
            required
            v-model="model.customer_name"
            clearable
            class="w-[100%]"
            size="smal"
            type="String"
            placeholder="..."
          />
        </el-form-item>
      </div>
      <div class="mb-1 col-span-3">
        <el-form-item
          label="Buyurtma nomeri"
          prop="order_number"
          :rules="rules"
        >
          <el-input
            disabled
            required
            v-model="model.order_number"
            clearable
            class="w-[100%]"
            size="smal"
            type="String"
            placeholder="..."
          />
        </el-form-item>
      </div>
      <div class="mb-1 col-span-3">
        <el-form-item label="Mahsulot nomi" prop="pro_name" :rules="rules">
          <el-input
            required
            v-model="model.pro_name"
            clearable
            class="w-[100%]"
            size="smal"
            type="String"
            placeholder="..."
          />
        </el-form-item>
      </div>
      <div class="mb-1 col-span-3">
        <el-form-item label="Mahsulot turi" prop="pro_type" :rules="rules">
          <el-input
            required
            v-model="model.pro_type"
            clearable
            class="w-[100%]"
            size="smal"
            type="String"
            placeholder="..."
          />
        </el-form-item>
      </div>
      <div class="mb-1 col-span-3">
        <el-form-item label="Mahsulot rangi" prop="pro_color" :rules="rules">
          <el-input
            required
            v-model="model.pro_color"
            clearable
            class="w-[100%]"
            size="smal"
            type="String"
            placeholder="..."
          />
        </el-form-item>
      </div>
      <div class="mb-1 col-span-3">
        <el-form-item label="Eni" prop="pro_width" :rules="rules">
          <el-input
            required
            v-model="model.pro_width"
            clearable
            class="w-[100%]"
            size="smal"
            type="Number"
            placeholder="..."
          />
        </el-form-item>
      </div>
      <div class="mb-1 col-span-3">
        <el-form-item label="Grammaji" prop="grammaj" :rules="rules">
          <el-input
            required
            v-model="model.grammaj"
            clearable
            class="w-[100%]"
            size="smal"
            type="Number"
            placeholder="..."
          />
        </el-form-item>
      </div>
      <div class="mb-1 col-span-3">
        <el-form-item
          label="Buyurtma miqdori"
          prop="order_quantity"
          :rules="rules"
        >
          <el-input
            required
            v-model="model.order_quantity"
            clearable
            class="w-[100%]"
            size="smal"
            type="Number"
            placeholder="..."
          />
        </el-form-item>
      </div>
      <div class="mb-1 col-span-3">
        <el-form-item label="Birligi" prop="unit" :rules="rules">
          <el-select
            required
            size="smal"
            v-model="model.unit"
            clearable
            placeholder="..."
          >
            <el-option
              v-for="item in units"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="mb-1 col-span-3">
        <el-form-item
          label="Tayyorlash muddati"
          prop="delivery_time"
          :rules="rules"
        >
          <el-date-picker
            required
            v-model="model.delivery_time"
            clearable
            style="width: 100%"
            size="smal"
            type="date"
            placeholder="..."
          />
        </el-form-item>
      </div>
    </el-form>

    <div class="flex justify-end bg-white rounded-md shadow-md p-2">
      <div></div>
      <el-button
        @click="CreateValidate(formRef)"
        style="
          background-color: #36d887;
          color: white;
          border: none;
          cursor: pointer;
        "
      >
        <i class="fa-solid fa-check mr-2 fa-md"></i> Saqlash
      </el-button>
    </div>
  </div>
</template>
