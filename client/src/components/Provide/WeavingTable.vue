<script setup>
import { ProvidePlanStore } from "../../stores/Provide/provideStore";
const store_provide = ProvidePlanStore();
import { storeToRefs } from "pinia";
const { data, is_active } = storeToRefs(store_provide);
const OpenModalById = async (id) => {
  await store_provide.openModalById({ id });
};
</script>
<template>
  <div v-if="is_active === 3" class="shadow-md rounded min-h-[15px]">
    <el-table
      load
      class="w-full"
      header-align="center"
      hight="5"
      empty-text="Mahsulot tanlanmagan... "
      :default-sort="[{ prop: 'duration_time', order: 'descending' }]"
      :data="data"
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
        prop="delivery_product_box.likra"
        label="Likra (kg)"
        width="180"
        header-align="center"
        align="center"
      />
      <el-table-column
        prop="delivery_product_box.polister"
        label="Polister (kg)"
        width="180"
        header-align="center"
        align="center"
      />
      <el-table-column
        prop="delivery_product_box.melaks_yarn"
        label="Melaks ip"
        width="200"
        header-align="center"
        align="center"
      />

      <el-table-column
        prop="delivery_product_box.duration_time"
        sortable
        label="Yetkazish vaqti"
        width="250"
        header-align="center"
        align="center"
      />
      <el-table-column
        fixed="right"
        prop="status"
        label="Holati"
        width="150"
        header-align="center"
        align="center"
      >
        <template #default="scope">
          <router-link
            to=""
            class="inline-flex items-center text-red bg-[#e4e9e9] hover:bg-[#d7ebeb] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-[12px] w-ful p-[5px] sm:w-auto text-center"
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
            v-if="scope.row.status === `Tasdiqlanmagan`"
            to=""
            @click="OpenModalById(scope.row._id)"
            class="inline-flex items-center mt-4 ml-2 text-red bg-[#eedc36] hover:bg-yellow-400 font-medium rounded-md text-sm w-full sm:w-auto px-2 py-3 text-center"
          >
            <i class="text-red fa-solid fa-check fa-xs fa- fa-xs"></i>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
