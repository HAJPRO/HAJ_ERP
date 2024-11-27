<script setup></script>

<template>
  <!-- //PAGANATION PAGANATION PAGANATION PAGANATION// -->
  <div
    class="sticky b-0 flex justify-between bg-white pr-2 pl-2 w-full mx-auto"
  >
    <div class="pt-2">
      <!-- <router-link to=""
                class="inline-flex text-[11px] items-center px-2 mr-2 py-1 mb-1  font-medium text-center text-white bg-[#36d887] text-bold rounded ">
                <i class="fa-solid fa-file-excel mr-2 fa-xm"></i> Excel
            </router-link>
            <router-link to=""
                class="inline-flex text-[11px] items-center px-2 py-1 mb-1  font-medium text-center text-white bg-yellow-500 text-bold rounded ">
                <i class="fa-solid fa-file-pdf mr-2 fa-xm"></i> Pdf
            </router-link> -->
      <div
        class="inline-flex text-[13px] items-center px-2 py-1 mb-1 font-medium text-center text-white"
      >
        <el-input
          clearable
          size="smal"
          width="50px"
          type="String"
          placeholder="Buyurtma nomer bo'yicha izla..."
        />
      </div>
    </div>
    <div
      class="cursor-pointer opacity-[80%] text-[11px] text-slate-500 font-semibold pt-6"
    >
      HAJ Textile Company ©{{ String(new Date()).substr(11, 4) }}
    </div>
    <div class="block pt-4">
      <el-pagination
        small
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage1"
        :page-size="10"
        layout="prev, pager, next"
        :total="50"
      >
      </el-pagination>
    </div>
  </div>
  <!-- //////// -->
</template>
<style>
.background {
  background-color: red;
}
</style>
