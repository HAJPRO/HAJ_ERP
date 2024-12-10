<script setup>
import { ref } from "vue";
import { ProvidePlanStore } from "../../stores/Provide/provideStore";
const store_provide = ProvidePlanStore();
import { storeToRefs } from "pinia";
const { is_modal, card_id, item, model } = storeToRefs(store_provide);

const is_cancel = ref(false);
const Cancel = () => {
  is_cancel.value = !is_cancel.value;
};
const confirm = () => {
  store_provide.Confirm();
};
const cancel_reason = ref();
const sendReason = async () => {
  await store_provide.cancelSendReason({
    reason: cancel_reason.value,
  });
};
</script>
<template>
  <div>
    <el-dialog
      v-model="is_modal"
      title="Buyurtmani qabul qilish oynasi! "
      width="800"
    >
      <span>
        <div v-if="item[0].pus" class="shadow-md rounded min-h-[15px]">
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
              width="80"
            />
            <el-table-column
              prop="pus"
              label="Pus"
              width="180"
              header-align="center"
              align="center"
            />
            <el-table-column
              prop="fike"
              label="Fike (kg)"
              width="180"
              header-align="center"
              align="center"
            />
            <el-table-column
              prop="color_code"
              label="Rang kod"
              width="200"
              header-align="center"
              align="center"
            />

            <el-table-column
              fixed="right"
              prop="duration_time"
              sortable
              label="Yetkazish vaqti"
              width="180"
              header-align="center"
              align="center"
            />
          </el-table>
        </div>
        <div v-if="item[0].likra" class="shadow-md rounded min-h-[15px]">
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
              width="80"
            />
            <el-table-column
              prop="likra"
              label="Likra"
              width="180"
              header-align="center"
              align="center"
            />
            <el-table-column
              prop="polister"
              label="Polister (kg)"
              width="180"
              header-align="center"
              align="center"
            />
            <el-table-column
              prop="melaks_yarn"
              label="Melaks ip"
              width="200"
              header-align="center"
              align="center"
            />

            <el-table-column
              fixed="right"
              prop="duration_time"
              sortable
              label="Yetkazish vaqti"
              width="180"
              header-align="center"
              align="center"
            />
          </el-table>
        </div>
        <div v-if="item[0].latun" class="shadow-md rounded min-h-[15px]">
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
              width="80"
            />
            <el-table-column
              prop="latun"
              label="Latun"
              width="200"
              header-align="center"
              align="center"
            />
            <el-table-column
              prop="begunok"
              label="Begunok (kg)"
              width="200"
              header-align="center"
              align="center"
            />

            <el-table-column
              fixed="right"
              prop="duration_time"
              sortable
              label="Yetkazish vaqti"
              width="300"
              header-align="center"
              align="center"
            />
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
            v-if="!is_cancel"
            to=""
            @click="Cancel()"
            class="inline-flex text-[12px] items-center ml-2 px-3 py-1 mb-1 mt-2 text-sm font-medium text-center text-white bg-red-500 text-bold rounded"
          >
            <i class="mr-2 fa-solid fa-xmark fa-sm"></i>Bekor
            qilish</router-link
          >
          <router-link
            v-if="!is_cancel"
            type=""
            to=""
            @click="confirm()"
            class="inline-flex text-[12px] items-center ml-2 px-3 py-1 mb-1 mt-2 text-sm font-medium text-center text-white bg-[#36d887] text-bold rounded"
          >
            <i class="mr-2 fa-solid fa-check fa-sm"></i>Qabul
            qilish</router-link
          >
          <router-link
            v-if="is_cancel"
            type=""
            @click="is_cancel = false"
            to=""
            class="inline-flex text-[12px] items-center ml-2 px-3 py-1 mb-1 mt-2 text-sm font-medium text-center text-white bg-red-500 text-bold rounded"
          >
            <i class="mr-2 fa-solid fa-arrow-left fa-sm"></i>Orqaga</router-link
          >
          <router-link
            v-if="is_cancel"
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
  </div>
</template>
