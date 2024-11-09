<script setup>
import { ref, onMounted } from "vue";
// import { ToastifyService } from "../../../../utils/Toastify";
// import { PaintService } from "@/ApiServices/Paint/paint.service";
// import { SaleLegalService } from "@/ApiServices/Sale/saleLegal.service";
// import { useRouter } from "vue-router";
defineProps({
  items: String,
})
</script>

<template>

  <div class="shadow-md rounded min-h-[15px]">
    <el-table load class="w-full" header-align="center" hight="5" empty-text="Ma'lumot topilmadi... " :default-sort="[
      { prop: 'name', order: 'descending' },
      { prop: 'count', order: 'descending' },
      { prop: 'tranfer', order: 'descending' },
    ]" :data="items" border style="width: 100%" min-height="300" max-height="350">
      <el-table-column header-align="center" align="center" type="index" prop="index" fixed="left" label="№"
        width="60" />

      <el-table-column header-align="center" sortable prop="customer_name" label="Buyurtmachi nomi" width="200" />

      <el-table-column header-align="center" sortable prop="order_number" label="Buyurtma miqdori" width="200" />
      <el-table-column prop="pro_type" label="Mahsulot turi" width="180" header-align="center" align="center" />
      <el-table-column prop="pro_name" label="Mahsulot nomi" width="180" header-align="center" align="center" />
      <el-table-column prop="pro_color" label="Mahsulot rangi" width="180" header-align="center" align="center" />
      <el-table-column prop="order_quantity" label="Buyurtma miqdori" width="180" header-align="center"
        align="center" />
      <el-table-column prop="finished_pro" label="Tayyor mahsulot" width="180" header-align="center" align="center" />
      <el-table-column prop="residual" label="Tayyorlanishi kerak" width="180" header-align="center" align="center" />
      <el-table-column fixed="right" prop="order_status" label="Holati" width="150" header-align="center"
        align="center">
        <template #default="scope">
          <router-link to=""
            class="inline-flex items-center text-red bg-[#f3e77b] hover:bg-[#eedc36] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-[12px] w-ful p-[5px] sm:w-auto text-center">
            {{ scope.row.order_status || 0 }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column fixed="right" prop="id" label="" width="150" header-align="center" align="center">
        <template #default="scope">
          <router-link to="" @click="Confirm(scope.row._id)"
            class="inline-flex items-center  ml-2 text-red bg-yellow-300 hover:bg-yellow-400 font-medium rounded-md text-sm w-full sm:w-auto px-3 py-3 text-center">
            <i class="text-black fa-sharp fa-solid fa-check fa-xs"></i>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>