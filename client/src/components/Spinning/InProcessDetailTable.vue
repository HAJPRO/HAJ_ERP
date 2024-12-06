<script setup>
import { ref, onMounted } from "vue";
import { SpinningPlanStore } from "../../stores/Spinning/spinningPlan.store";
const store_spinning = SpinningPlanStore();
import { storeToRefs } from "pinia";
const { items } = storeToRefs(store_spinning);
const openReportModalById = async (id) => {
  await store_spinning.OpenReportModalById({ id });
};
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
        prop="sale_order.customer_name"
        label="Buyurtmachi nomi"
        width="200"
      />
      <el-table-column
        header-align="center"
        sortable
        prop="sale_order.order_number"
        label="Buyurtma miqdori"
        width="200"
      />
      <el-table-column
        prop="sale_order.pro_type"
        label="Mahsulot turi"
        width="180"
        header-align="center"
        align="center"
      />
      <el-table-column
        prop="sale_order.pro_name"
        label="Mahsulot nomi"
        width="180"
        header-align="center"
        align="center"
      />
      <el-table-column
        prop="sale_order.pro_color"
        label="Mahsulot rangi"
        width="180"
        header-align="center"
        align="center"
      />
      <el-table-column
        prop="more.spinning_yarn_wrap_quantity"
        label="Buyurtma miqdori"
        width="180"
        header-align="center"
        align="center"
      />

      <el-table-column
        prop="more.spinning_delivery_time"
        label="Muddati"
        width="190"
        header-align="center"
        align="center"
      />

      <el-table-column
        fixed="right"
        label="Holati"
        width="150"
        header-align="center"
        align="center"
      >
        <template #default="scope">
          <router-link
            to=""
            class="inline-flex items-center text-red bg-[#e4e9e9] hover:bg-[#d7ebeb] font-medium rounded-md text-[12px] w-ful p-[5px] sm:w-auto text-center"
          >
            {{ scope.row.status_inprocess }}
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
            @click="openReportModalById(scope.row._id)"
            class="inline-flex items-center ml-2 text-red bg-[#36d887] hover:bg-[#3dcc84] font-medium rounded-md text-sm w-full sm:w-auto px-3 py-3 text-center"
          >
            <i class="text-black fa-sharp fa-solid fa-file-lines fa-xs"></i>
          </router-link>
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
