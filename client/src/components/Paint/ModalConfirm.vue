<script setup>
import { ref, onMounted } from "vue";
import { PaintPlanStore } from "../../stores/Paint/paintPlan.store";
const store = PaintPlanStore();
import { storeToRefs } from "pinia";
const { is_modal, card_id, item, model } = storeToRefs(store);
const is_cancel = ref(false);
const Cancel = () => {
  is_cancel.value = !is_cancel.value;
};
const cancel_reason = ref({ reason: "" });
const formRefReson = ref();
const sendReasonValidate = async (formRefReson) => {
  await formRefReson.validate((valid) => {
    if (valid === true) {
      sendReason();
    } else {
      return false;
    }
  });
};
const sendReason = async () => {
  await store.cancelSendReason({
    id: card_id.value,
    reason: cancel_reason.value.reason,
  });
  is_modal.value = false;
};
const isConfirm = () => {
  store.isConfirmModal({ is_modal: true });
};
const rules = ref({
  required: true,
  message: `Maydon to'ldirilishi zarur !`,
  trigger: "blur",
});
</script>
<template>
  <el-dialog
    v-model="is_modal"
    title="Buyurtmani qabul qilish oynasi! "
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
          :data="item"
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
            fixed="right"
            prop="delivery_time"
            sortable
            label="Muddati"
            width="190"
            header-align="center"
            align="center"
          >
            <template #default="scope">
              {{ scope.row.delivery_time.substring(0, 10) }}
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-form
        v-show="is_cancel"
        ref="formRefReson"
        :model="cancel_reason"
        label-width="auto"
        size="small"
        label-position="top"
        class="filter-box md:grid md:grid-cols-4 gap-2 sm:flex sm:flex-wrap rounded shadow-md bg-white p-2 mt-1 mb-1 text-[12px]"
      >
        <div class="mb-1 col-span-4">
          <el-form-item
            label="Bekor qilish sababi"
            prop="reason"
            :rules="rules"
          >
            <el-input
              v-model="cancel_reason.reason"
              clearable
              maxlength="200"
              show-word-limit
              autosize
              type="textarea"
              placeholder="Sababini yozing... !"
            />
          </el-form-item>
        </div>
      </el-form>
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
        <router-link
          v-show="!is_cancel"
          to=""
          @click="Cancel()"
          class="inline-flex text-[12px] items-center ml-2 px-3 py-1 mb-1 mt-2 text-sm font-medium text-center text-white bg-red-500 text-bold rounded"
        >
          <i class="mr-2 fa-solid fa-xmark fa-sm"></i>Bekor qilish</router-link
        >
        <router-link
          v-show="!is_cancel"
          type=""
          to=""
          @click="isConfirm()"
          class="inline-flex text-[12px] items-center ml-2 px-3 py-1 mb-1 mt-2 text-sm font-medium text-center text-white bg-[#36d887] text-bold rounded"
        >
          <i class="mr-2 fa-solid fa-check fa-sm"></i>Qabul qilish</router-link
        >
        <router-link
          v-show="is_cancel"
          type=""
          @click="is_cancel = false"
          to=""
          class="inline-flex text-[12px] items-center ml-2 px-3 py-1 mb-1 mt-2 text-sm font-medium text-center text-white bg-red-500 text-bold rounded"
        >
          <i class="mr-2 fa-solid fa-arrow-left fa-sm"></i>Orqaga</router-link
        >
        <router-link
          v-show="is_cancel"
          type=""
          to=""
          @click="sendReasonValidate(formRefReson)"
          class="inline-flex text-[12px] items-center ml-2 px-3 py-1 mb-1 mt-2 text-sm font-medium text-center text-white bg-[#36d887] text-bold rounded"
        >
          <i class="mr-2 fa-solid fa-check fa-sm"></i>Yuborish</router-link
        >
      </div>
    </template>
  </el-dialog>
</template>
