<script setup>
import { ref } from "vue";
import { WeavingPlanStore } from "../../stores/Weaving/weaving_plan.store";
const store = WeavingPlanStore();
import { storeToRefs } from "pinia";
const { is_modal, card_id, item, order_id } = storeToRefs(store);
const is_cancel = ref(false);
const Cancel = () => {
  is_cancel.value = !is_cancel.value;
};
const cancel_reason = ref();
const sendReason = async () => {
  await store.cancelSendReason({
    id: card_id.value,
    reason: cancel_reason.value,
  });
  is_modal.value = false;
};
const isConfirm = () => {
  store.isConfirmModal({ is_modal: true, order_id });
};
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
            prop="in_process_detail.customer_name"
            label="Buyurtmachi"
            width="180"
          />

          <el-table-column
            header-align="center"
            prop="in_process_detail.order_number"
            label="Buyurtma nomeri"
            width="150"
          />
          <el-table-column
            prop="in_process_detail.pro_type"
            label="Turi"
            width="100"
            header-align="center"
            align="center"
          />
          <el-table-column
            prop="in_process_detail.pro_name"
            label="Nomi"
            width="100"
            header-align="center"
            align="center"
          />
          <el-table-column
            prop="in_process_detail.pro_color"
            label="Rangi"
            width="100"
            header-align="center"
            align="center"
          />
          <el-table-column
            prop="in_process_detail.pro_width"
            label="Eni"
            width="100"
            header-align="center"
            align="center"
          />
          <el-table-column
            prop="in_process_detail.grammaj"
            label="Gramaji"
            width="100"
            header-align="center"
            align="center"
          />
          <el-table-column
            prop="in_process_detail.order_quantity"
            label="Miqdori"
            width="100"
            header-align="center"
            align="center"
            ><template #default="scope">
              {{ scope.row.weaving_cloth_quantity }}
            </template></el-table-column
          >
          <el-table-column
            prop="in_process_detail.unit"
            label="Birligi"
            width="100"
            header-align="center"
            align="center"
          />
          <el-table-column
            fixed="right"
            prop="in_process_detail.delivery_time"
            label="Yetkazish vaqti"
            width="200"
            header-align="center"
            align="center"
            ><template #default="scope">
              {{ String(scope.row.weaving_delivery_time).substring(0, 10) }}
            </template></el-table-column
          >
        </el-table>
      </div>
      <form
        v-show="is_cancel"
        class="filter-box md:grid md:grid-cols-4 gap-2 sm:flex sm:flex-wrap rounded shadow-md bg-white p-2 mt-1 mb-1 text-[12px]"
      >
        <div class="mb-1 col-span-4">
          <label
            name="resul"
            class="block mb-1 text-[12px] font-medium text-gray-900 dark:text-white"
            >Bekor qilish sababi</label
          >

          <el-input
            v-model="cancel_reason"
            clearable
            maxlength="200"
            show-word-limit
            autosize
            type="textarea"
            placeholder="Sababini kiriting !"
          />
        </div>
      </form>
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
          @click="sendReason()"
          class="inline-flex text-[12px] items-center ml-2 px-3 py-1 mb-1 mt-2 text-sm font-medium text-center text-white bg-[#36d887] text-bold rounded"
        >
          <i class="mr-2 fa-solid fa-check fa-sm"></i>Yuborish</router-link
        >
      </div>
    </template>
  </el-dialog>
</template>
