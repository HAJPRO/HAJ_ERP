<script setup>
</script>

<template>
    <!-- //PAGANATION PAGANATION PAGANATION PAGANATION// -->
  <div class="flex justify-between mt-2 bg-white p-2 shadow-md">
    <div>
      <router-link to=""
        class="inline-flex text-[13px] items-center px-2 mr-2 py-1 mb-1 text-sm font-medium text-center text-white bg-[#36d887] text-bold rounded ">
        <i class="fa-solid fa-file-excel mr-2 fa-xm"></i> Excel
      </router-link>
      <router-link to=""
        class="inline-flex text-[13px] items-center px-2 py-1 mb-1 text-sm font-medium text-center text-white bg-yellow-500 text-bold rounded ">
        <i class="fa-solid fa-file-pdf mr-2 fa-xm"></i> Pdf
      </router-link>
      <div class="inline-flex text-[13px] items-center px-2 py-1 mb-1 text-sm font-medium text-center text-white">
        <el-input clearable size="smal" width="50px" type="String" placeholder="Buyurtma nomer bo'yicha izla..." />
      </div>
    </div>

    <div class="block">
      <el-pagination @size-change=" handleSizeChange " @current-change=" handleCurrentChange "
        :current-page.sync=" currentPage1 " :page-size=" 100 " layout="prev, pager, next" :total=" 1000 ">
      </el-pagination>
    </div>
  </div>
  <!-- //////// -->
</template>