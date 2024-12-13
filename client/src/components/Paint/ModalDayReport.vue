<script setup>
import { ref } from "vue";
import { PaintPlanStore } from "../../stores/Paint/paintPlan.store";
const store_paint = PaintPlanStore();
import { storeToRefs } from "pinia";
const { is_report_modal, order_report, report_paint, DonePaint, paint_status } =
  storeToRefs(store_paint);
const addDayReportInProcess = async () => {
  await store_paint.addDayReportInProcess(model.value);
};
const toFinish = async () => {
  await store_paint.Finish();
};
const DoneWeaving = ref();
if (order_report.value) {
  const initialValue = ref(0);
  DoneWeaving.value = order_report.value.report.reduce(
    (accumulator, currentValue) => accumulator + Number(currentValue.quantity),
    initialValue.value
  );
}

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
      model.value = {
        quantity: "",
        unit: "",
        date: "",
      };
    } else {
      return false;
    }
  });
};
</script>
<template>
  <el-dialog
    v-model="is_report_modal"
    :title="`Kunlik ishlab chiqarilgan mahsulot hisbot oynasi: №${order_report.order_number}`"
    width="800"
  >
    <span>
      <div
        class="flex justify-between flex-wrap font-semibold text-[12px] p-1 bg-slate-100 shadow rounded border-t-[1px] border-[#36d887]"
      >
        <div>Buyurtmachi: {{ order_report.customer_name }}</div>

        <div
          class="bg-red-50 p-1 rounded text-[11px] border-[1px] border-red-500"
        >
          {{
            Number(order_report.weaving_cloth_quantity) - DoneWeaving === 0
              ? "To'quv yakunladi"
              : "To'quvda jarayonda"
          }}
        </div>
      </div>
      <div class="shadow-md rounded min-h-[15px]">
        <el-table
          load
          class="w-full"
          header-align="center"
          hight="5"
          empty-text="Mahsulot tanlanmagan... "
          :data="order_report.report"
          border
          style="width: 100%; font-size: 13px"
          min-height="150"
          max-height="150"
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
            prop="quantity"
            label="Miqdori"
            width="180"
          />
          <el-table-column
            header-align="center"
            prop="unit"
            label="Birligi"
            width="150"
          />
          <el-table-column
            header-align="center"
            prop="date"
            label="Sana"
            width="250"
          />
          <el-table-column
            fixed="right"
            label=""
            width="127"
            header-align="center"
            align="center"
          >
            <template #default="">
              <router-link
                to=""
                class="inline-flex items-center mt-4 ml-2 text-red bg-[#eedc36] hover:bg-yellow-400 font-medium rounded-md text-sm w-full sm:w-auto px-2 py-3 text-center"
              >
                <i class="text-red fa-solid fa-check fa-xs fa- fa-xs"></i>
              </router-link>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div
        class="flex justify-between flex-wrap font-semibold text-[12px] mb-2 p-1 bg-slate-100 shadow"
      >
        <div>
          Buyurtma:
          {{
            order_report.weaving_cloth_quantity
              ? order_report.weaving_cloth_quantity
              : 0
          }}
        </div>
        <div>Bajarildi: {{ DoneWeaving ? DoneWeaving : 0 }}</div>
        <div>
          Qoldi:
          {{
            DoneWeaving
              ? Number(order_report.weaving_cloth_quantity) - DoneWeaving
              : 0
          }}
        </div>
      </div>
      <div class="text-[14px] bg-white rounded shadow hover:shadow-md mt-2">
        <div
          class="bg-slate-100 font-semibold p-1 mt-1 align-center text-center shadow rounded border-t-[1px] border-[#36d887]"
        >
          Bo'yoq hisobot qo'shish
        </div>
        <el-form
          :disabled="parseInt(report_paint.order_quantity - DonePaint) < 0"
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
              />
            </el-form-item>
          </div>
        </el-form>
        <div class="shadow-md rounded min-h-[15px]">
          <el-table
            load
            class="w-full"
            header-align="center"
            hight="5"
            empty-text="Mahsulot tanlanmagan... "
            :data="report_paint.report"
            border
            style="width: 100%; font-size: 13px"
            min-height="170"
            max-height="170"
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
              prop="quantity"
              label="Miqdori"
              width="180"
            />
            <el-table-column
              header-align="center"
              prop="unit"
              label="Birligi"
              width="150"
            />
            <el-table-column
              header-align="center"
              prop="date"
              label="Sana"
              width="250"
            />
            <el-table-column
              fixed="right"
              label=""
              width="127"
              header-align="center"
              align="center"
            >
              <template #default="">
                <router-link
                  to=""
                  class="inline-flex items-center mt-4 ml-2 text-red bg-[#eedc36] hover:bg-yellow-400 font-medium rounded-md text-sm w-full sm:w-auto px-2 py-3 text-center"
                >
                  <i class="text-red fa-solid fa-check fa-xs fa- fa-xs"></i>
                </router-link>
              </template>
            </el-table-column>
          </el-table>
          <div
            class="flex justify-between flex-wrap font-semibold text-[12px] p-1 bg-slate-100 shadow"
          >
            <div>
              Buyurtma:
              {{
                Number(report_paint.order_quantity)
                  ? Number(report_paint.order_quantity)
                  : 0
              }}
            </div>
            <div>Bajarildi: {{ DonePaint ? DonePaint : 0 }}</div>
            <div>
              Qoldi:
              {{
                DonePaint ? Number(report_paint.order_quantity) - DonePaint : 0
              }}
            </div>
          </div>
        </div>
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
      <div class="dialog-footer flex justify-end gap-4">
        <el-button
          size="small"
          v-if="parseInt(report_paint.order_quantity - DonePaint) > 0"
          @click="validate(formRef)"
          style="background-color: #36d887; color: white; border: none"
          ><i class="mr-2 fa-solid fa-check fa-sm"></i>Yuborish
        </el-button>
        <div
          v-if="paint_status === 'Yakunlandi'"
          class="bg-red-50 p-1 rounded text-[11px] font-bold border-[1px] border-red-500"
        >
          Bo'yoq yakunladi
        </div>
        <el-button
          :disabled="paint_status === 'Yakunlandi'"
          v-if="parseInt(report_paint.order_quantity - DonePaint) === 0"
          size="small"
          @click="toFinish()"
          style="background-color: #36d887; color: white; border: none"
          ><i class="mr-2 fa-solid fa-check fa-sm"></i>Yakunlash
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
