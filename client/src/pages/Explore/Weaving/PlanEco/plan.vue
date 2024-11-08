<script setup>
import { ref, onMounted } from "vue";
import Title from "@/components/Title.vue";
import { WeavingService } from "@/ApiServices/Weaving/weaving.service";
import { SaleLegalService } from "@/ApiServices/Sale/saleLegal.service";

import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";
const router = useRouter();
import "vue3-toastify/dist/index.css";
import { useLoading } from "vue-loading-overlay";
const loading = useLoading({
  color: "#36d887",
  backgroundColor: "#666",
  opacity: "0.9",
  loader: "bars",
  height: "100px",
  width: "100px",
});
const cardId = ref();
const outerVisible = ref(false);
const innerVisible = ref(false);
const openModalById = (id) => {
  outerVisible.value = true;
  cardId.value = id;
};
const model = ref({});
const getModel = async () => {
  const data = await WeavingService.getModel();
  model.value = data.data;
  console.log(data.data);
};
const Save = async () => {
  try {
    const data = await WeavingService.create({
      items: model.value,
      id: cardId.value,
    });
    outerVisible.value = false;
  } catch (err) {
    console.log(err);
  }
};

const items = ref([]);
const sale_quantitiy = ref();
const provide_quantitiy = ref();
const getAll = async () => {
  const data = await SaleLegalService.getAll();
  items.value = data.data.allPosts;
  sale_quantitiy.value = items.value.length;
  // provide_quantitiy.value = data.data.allProvideItems.length;
};
const isActive = ref(0)
const ActiveTabLink = (num) =>{
  if(num === 0){
    isActive.value = 0
  }
  if(num === 1){
    isActive.value = 1
  }
  if(num === 2){
    isActive.value = 2
  }
  if(num === 3){
    isActive.value = 3
  }
  if(num === 4){
    isActive.value = 4
  }
  if(num === 5){
    isActive.value = 5
  }
 
}
onMounted(async () => {
  try {
    await getAll(), await getModel();
  } catch (err) {
    console.log(err);
  }
});
</script>

<template>
  <div>
    <Title>
      <template v-slot:title>
        <h3>To'quv reja iqtisod</h3>
      </template>
    </Title>
    <div class="grid grid-cols-12 grid-flow-col justify-between bg-white rounded-md shadow-md p-3 mb-2 ">
      <div class="col-span-8 grid-flow-col ">
        <router-link to="" @click="ActiveTabLink(0)" 
        :class = "{activeTab : isActive === 0}"
          class="inline-flex text-[13px] items-center  mr-2 px-4 py-2 mb-1 text-sm font-medium text-center text-red hover:border-b-2 border-solid border-[#36d887] bg-[#e4e9e9] text-bold rounded ">
          <i class="fa-solid fa-info mr-2 fa-xm"></i> Bajarilgan
          <div class="flex flex-shrink-0 ml-2">
            <span
              class="inline-flex items-center justify-center h-5 text-xm font-medium text-white bg-[#36d887] px-3 py-3 rounded">
              <span class=" ">0</span>/{{provide_length || 0 }}</span>
          </div>
        </router-link>
        <router-link to="" @click="ActiveTabLink(2)" 
        :class = "{activeTab : isActive === 2 }"
          class="inline-flex text-[13px] items-center px-4 py-2 mb-1 text-sm font-medium text-center text-red hover:border-b-2 border-solid border-[#36d887] bg-[#e4e9e9] text-bold rounded ">
          <i class="fa-solid fa-info mr-2 fa-xm"></i> Bo'yoq
          <div class="flex flex-shrink-0 ml-2">
            <span
              class="inline-flex items-center justify-center h-5 text-xm font-medium text-white bg-[#36d887] px-3 py-3 rounded">
              <span class=" ">0</span>/{{ painting_length || 0}}</span>
          </div>
        </router-link>
        <router-link to="" @click="ActiveTabLink(4)" 
        :class = "{activeTab : isActive === 4 }"
          class="inline-flex text-[13px] items-center ml-2 px-4 py-2 mb-1 text-sm font-medium text-center text-red hover:border-b-2 border-solid border-[#36d887] bg-[#e4e9e9] text-bold rounded ">
          <i class="fa-solid fa-info mr-2 fa-xm"></i> Yigiruv
          <div class="flex flex-shrink-0 ml-2">
            <span
              class="inline-flex items-center justify-center h-5 text-xm font-medium text-white bg-[#36d887] px-3 py-3 rounded"><span class=" ">0</span>/0</span>
          </div>
        </router-link>
        <router-link to="" @click="ActiveTabLink(5)" 
        :class = "{activeTab : isActive === 5 }"
          class="inline-flex text-[13px] items-center ml-2 px-4 py-2 mb-1 text-sm font-medium text-center text-red hover:border-b-2 border-solid border-[#36d887] bg-[#e4e9e9] text-bold rounded ">
          <i class="fa-solid fa-info mr-2 fa-xm"></i> Taminot
          <div class="flex flex-shrink-0 ml-2">
            <span
              class="inline-flex items-center justify-center h-5 text-xm font-medium text-white bg-[#36d887] px-3 py-3 rounded">
              <span class=" ">0</span>/{{provide_length || 0 }}</span>
          </div>
        </router-link>
      </div>
     <div class="flex justify-end flex-wrap gap-2 col-span-4 grid-flow-col">
      <div class="">
        <el-input clearable size="large" type="String" placeholder="Buyurtma nomer bo'yicha izla..." />
      </div>
      <div class="row-span-1 grid-flow-col">
        <router-link to=""
          class="inline-flex text-[13px] items-center px-2 py-2 mb-1 text-sm font-medium text-center text-white bg-[#36d887] text-bold rounded ">
          <i class="fa-solid fa-file-excel mr-2 fa-xm"></i> Excel
        </router-link>
      </div>
      </div>
    </div>
    <div class="shadow-md rounded min-h-[15px]">
      <!-- // TRansfer table  -->
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
          prop="customer_name"
          label="Buyurtmachi nomi"
          width="200"
        />

        <el-table-column
          header-align="center"
          sortable
          prop="order_number"
          label="Buyurtma miqdori"
          width="200"
        />
        <el-table-column
          prop="pro_type"
          label="Mahsulot turi"
          width="180"
          header-align="center"
          align="center"
        />
        <el-table-column
          prop="pro_name"
          label="Mahsulot nomi"
          width="180"
          header-align="center"
          align="center"
        />
        <el-table-column
          prop="pro_color"
          label="Mahsulot rangi"
          width="180"
          header-align="center"
          align="center"
        />
        <el-table-column
          prop="order_quantity"
          label="Buyurtma miqdori"
          width="180"
          header-align="center"
          align="center"
        />
        <el-table-column
          prop="finished_pro"
          label="Tayyor mahsulot"
          width="180"
          header-align="center"
          align="center"
        />
        <el-table-column
          prop="residual"
          label="Tayyorlanishi kerak"
          width="180"
          header-align="center"
          align="center"
        />
        <el-table-column
          fixed="right"
          prop="order_status"
          label="Holati"
          width="150"
          header-align="center"
          align="center"
        >
          <template #default="scope">
            <router-link
              to=""
              class="inline-flex items-center text-red bg-[#f3e77b] hover:bg-[#eedc36] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-[12px] w-ful p-[5px] sm:w-auto text-center"
            >
              {{ scope.row.order_status }}
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
              @click="openModalById(scope.row._id)"
              class="inline-flex items-center mt-4 ml-2 text-red bg-[#eedc36] hover:bg-yellow-400 font-medium rounded-md text-sm w-full sm:w-auto px-2 py-3 text-center"
            >
              <i class="text-red fa-solid fa-check fa-xs fa- fa-xs"></i>
            </router-link>
            <router-link
              to="/explore/sale/legal/create"
              @click="DeleteFromTable(scope.row._id)"
              class="inline-flex items-center mt-4 ml-2 text-red bg-[#36d887] hover:bg-[#39c07c] font-medium rounded-md text-sm w-full sm:w-auto px-3 py-3 text-center"
            >
              <i class="text-black fa-sharp fa-solid fa-info fa-xs"></i>
            </router-link>
            <!-- <router-link
              to=""
              @click="DeleteFromTable(scope.row._id)"
              class="inline-flex items-center mt-4 ml-2 text-white bg-red-600 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-2 py-3 text-center"
            >
              <i class="text-black fa-sharp fa-solid fa-trash fa-xs"></i>
            </router-link> -->
          </template>
        </el-table-column>
      </el-table>
      <!-- // -->
    </div>
  </div>

  <el-dialog
    v-model="outerVisible"
    title="Taminot uchun kerakli mahsulotlar qo'shish"
    width="600"
  >
    <span>
      <form
        class="filter-box md:grid md:grid-cols-3 gap-2 sm:flex sm:flex-wrap rounded shadow-md bg-white p-2 mt-1 mb-1 text-[12px]"
      >
        <div class="mb-1 col-span-1">
          <label
            name="resul"
            class="block mb-1 text-[12px] font-medium text-gray-900 dark:text-white"
            >Likra (kg)</label
          >
          <el-input
            v-model="model.likra"
            clearable
            class="w-[100%]"
            size="smal"
            type="String"
            placeholder="..."
          />
        </div>
        <div class="mb-1 col-span-1">
          <label
            name="resul"
            class="block mb-1 text-[12px] font-medium text-gray-900 dark:text-white"
            >Polister (kg)</label
          >
          <el-input
            v-model="model.polister"
            clearable
            class="w-[100%]"
            size="smal"
            type="Number"
            placeholder="..."
          />
        </div>

        <div class="mb-1 col-span-1">
          <label
            name="resul"
            class="block mb-1 text-[12px] font-medium text-gray-900 dark:text-white"
            >Melaks ip</label
          >
          <el-input
            v-model="model.melaks_yarn"
            clearable
            class="w-[100%]"
            size="smal"
            type="String"
            placeholder="..."
          />
        </div>
        <div class="mb-1 col-span-1">
          <label
            name="resul"
            class="block mb-1 text-[12px] font-medium text-gray-900 dark:text-white"
            >Ip kalava</label
          >
          <el-input
            v-model="model.yarn_wrap"
            clearable
            class="w-[100%]"
            size="smal"
            type="Number"
            placeholder="..."
          />
        </div>
        <div class="mb-1 col-span-1">
          <label
            name="resul"
            class="block mb-1 text-[12px] font-medium text-gray-900 dark:text-white"
            >Tayyorlash muddati</label
          >
          <el-input
            v-model="model.duration_time"
            clearable
            class="w-[100%]"
            size="smal"
            type="Date"
            placeholder="..."
          />
        </div>
      </form>
    </span>
    <el-dialog
      v-model="innerVisible"
      width="500"
      title="Inner Dialog"
      append-to-body
    >
      <span>This is the inner Dialog</span>
    </el-dialog>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="outerVisible = false">Yopish</el-button>
        <el-button type="" @click="Save()"> Yuborish </el-button>
      </div>
    </template>
  </el-dialog>

  <!-- //PAGANATION PAGANATION PAGANATION PAGANATION// -->
  <div class="flex justify-between mt-2 bg-white p-2 shadow-md">
    <div></div>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage1"
        :page-size="100"
        layout="total, prev, pager, next"
        :total="1000"
      >
      </el-pagination>
    </div>
  </div>
  <!-- //////// -->
</template>
<style></style>
