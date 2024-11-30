<script setup>
import { ref, onMounted } from "vue";
import { WeavingPlanStore } from "../../stores/Weaving/weaving_plan.store";
const store = WeavingPlanStore();
import { storeToRefs } from "pinia";
const { is_report_modal, order_report } = storeToRefs(store);
const addDayReportInProcess = async () => {
  await store.addDayReportInProcess(model.value);
};
const model = ref({
  quantity: "",
  unit: "",
  date: "",
});
const units = ref([
  { id: 1, name: "Kg" },
  { id: 2, name: "Metr" },
  { id: 3, name: "Dona" },
  { id: 4, name: "Pachka" },
]);
const rules = ref([
  {
    required: true,
    message: `Maydon to'ldirilishi zarur !`,
    trigger: "blur",
  },
]);

const formRef = ref();
const validate = async (formRef) => {
  await formRef.validate((valid) => {
    if (valid === true) {
      addDayReportInProcess();
    } else {
      return false;
    }
  });
};
</script>
<template>
  <el-dialog
    v-model="is_report_modal"
    title="Kunlik ishlab chiqarilgan mahsulot hisbot oynasi "
    width="800"
  >
    <span>
      <div class="shadow-md rounded min-h-[15px]">
        <el-table
          load
          class="w-full"
          header-align="center"
          hight="5"
          empty-text="Mahsulot tanlanmagan... "
          :data="order_report.reportArray"
          border
          style="width: 100%"
          min-height="300"
          max-height="350"
        >
          <el-table-column
            header-align="center"
            align="center"
            type="index"
            prop="index"
            fixed="left"
            label="№"
            width="60"
          />

          <el-table-column
            header-align="center"
            prop="customer_name"
            label="Buyurtmachi"
            width="180"
          />

          <el-table-column
            header-align="center"
            prop="order_number"
            label="Buyurtma nomeri"
            width="150"
          />
          <el-table-column
            prop="pro_type"
            label="Turi"
            width="100"
            header-align="center"
            align="center"
          />
          <el-table-column
            prop="pro_name"
            label="Nomi"
            width="100"
            header-align="center"
            align="center"
          />
          <el-table-column
            prop="pro_color"
            label="Rangi"
            width="100"
            header-align="center"
            align="center"
          />
          <el-table-column
            prop="pro_width"
            label="Eni"
            width="100"
            header-align="center"
            align="center"
          />
          <el-table-column
            prop="grammaj"
            label="Gramaji"
            width="100"
            header-align="center"
            align="center"
          />
          <el-table-column
            prop="order_quantity"
            label="Miqdori"
            fixed="right"
            width="100"
            header-align="center"
            align="center"
          />
          <el-table-column
            prop="delivery_time"
            label="Yetkazish vaqti"
            width="200"
            header-align="center"
            align="center"
          />
        </el-table>
      </div>
      <div
        class="text-[15px] font-semibold bg-white rounded shadow hover:shadow-md mt-2"
      >
        <el-form
          ref="formRef"
          :model="model"
          label-width="auto"
          class="filter-box md:grid md:grid-cols-12 gap-1 sm:flex sm:flex-wrap rounded p-2 mt-1 mb-1 text-[12px]"
          size="small"
          label-position="top"
          status-icon
        >
          <div class="col-span-4">
            <el-form-item label="Miqdori" prop="quantity" :rules="rules">
              <el-input
                v-model="model.quantity"
                type="Number"
                clearable
                placeholder="..."
              >
              </el-input>
            </el-form-item>
          </div>
          <div class="col-span-4">
            <el-form-item label="Birligi" prop="unit" :rules="rules">
              <el-select v-model="model.unit" clearable placeholder="...">
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
          <div class="col-span-4">
            <el-form-item label="Vaqt" prop="date" :rules="rules">
              <el-date-picker
                v-model="model.date"
                style="width: 100%"
                clearable
                type="date"
                placeholder="..."
                :size="size"
              />
            </el-form-item>
          </div>
        </el-form>
      </div>
    </span>
    <el-dialog
      v-model="innerVisible"
      width="600"
      title="Inner Dialog"
      append-to-body
    >
      <span>Cancel And Of Reason</span>
    </el-dialog>
    <template #footer>
      <div class="dialog-footer">
        <el-button
          size="small"
          @click="validate(formRef)"
          style="background-color: #36d887; color: white; border: none"
          ><i class="mr-2 fa-solid fa-check fa-sm"></i>Yuborish
        </el-button>

        <!-- <router-link
          v-show="is_cancel"
          type=""
          to=""
          @click="sendReason()"
          class="inline-flex text-[12px] items-center ml-2 px-3 py-1 mb-1 mt-2 text-sm font-medium text-center text-white bg-[#36d887] text-bold rounded"
        >
          <i class="mr-2 fa-solid fa-check fa-sm"></i>Yuborish</router-link
        > -->
      </div>
    </template>
  </el-dialog>
</template>
