<script setup>
import { ref, onMounted } from "vue";
import { SpinningPlanStore } from "../../stores/Spinning/spinningPlan.store";
const store_spinning = SpinningPlanStore();
import { storeToRefs } from "pinia";
const { items } = storeToRefs(store_spinning);
console.log(items);
// const OpenModalById = async (id) => {
//   await store_paint.openModalById({ id, is_modal: true });
// };
</script>
<template>
  <div class="shadow-md rounded min-h-[15px]">
    <el-table
      load
      class="w-full"
      header-align="center"
      hight="5"
      empty-text="Mahsulot tanlanmagan... "
      :default-sort="[
        { prop: 'name', order: 'descending' },
        { prop: 'count', order: 'descending' },
        { prop: 'tranfer', order: 'descending' },
      ]"
      :data="items"
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
        sortable
        prop="delivery_product_box.begunok"
        label="Begunok (kg)"
        width="200"
      />
      <el-table-column
        header-align="center"
        sortable
        prop="delivery_product_box.latun"
        label="Latun (kg)"
        width="200"
      />

      <el-table-column
        prop="delivery_product_box.duration_time"
        label="Yetkazish vaqti"
        width="300"
        header-align="center"
        align="center"
      />
      <el-table-column
        fixed="right"
        prop="status"
        label="Holati"
        width="200"
        header-align="center"
        align="center"
      >
        <template #default="scope">
          <router-link
            to=""
            class="inline-flex items-center text-red bg-[#e4e9e9] hover:bg-[#d7ebeb] font-medium rounded-md text-[12px] w-ful p-[5px] sm:w-auto text-center"
          >
            {{ scope.row.status }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        prop="id"
        label=""
        width="150"
        header-align="center"
        align="center"
      >
        <template #default="scope">
          <router-link
            to=""
            class="inline-flex items-center ml-2 text-red bg-red-500 hover:bg-red-600 font-medium rounded-md text-sm w-full sm:w-auto px-3 py-3 text-center"
          >
            <i class="text-black fa-trash fa-solid fa-trash fa-xs"></i>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
