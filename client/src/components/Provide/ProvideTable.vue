<script setup>
import { ProvidePlanStore } from "../../stores/Provide/provideStore";
const store_provide = ProvidePlanStore();
import { storeToRefs } from "pinia";
const delivered = async (id) => {
  await store_provide.Delivered({ id, reason: "Yetkazib berildi" });
};
const { data, is_active } = storeToRefs(store_provide);
</script>
<template>
  <div class="shadow-md rounded min-h-[15px]">
    <el-table
      load
      class="w-full"
      header-align="center"
      hight="5"
      empty-text="Mahsulot tanlanmagan... "
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
        width="60"
      />
      <el-table-column
        header-align="center"
        align="center"
        sortable
        label="Xodim"
        width="180"
        ><template #default="scope">
          <div>
            {{ scope.row.author.username }}
          </div>
        </template></el-table-column
      >
      <el-table-column
        header-align="center"
        align="center"
        sortable
        label="Bo'lim"
        width="180"
        ><template #default="scope">
          <div>
            {{ scope.row.author.department }}
          </div>
        </template></el-table-column
      >

      <el-table-column
        header-align="center"
        align="center"
        sortable
        label="Yetkazish vaqti"
        width="250"
        ><template #default="scope">
          <div>
            {{ scope.row.delivery_product_box.duration_time }}
          </div>
        </template></el-table-column
      >
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
            @click="delivered(scope.row._id)"
            to=""
            class="inline-flex items-center ml-2 text-red bg-yellow-300 hover:bg-yellow-400 font-medium rounded-md text-sm w-full sm:w-auto px-3 py-3 text-center"
          >
            <i class="text-black fa-sharp fa-solid fa-check fa-xs"></i>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
