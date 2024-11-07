<script setup>
import { ref, onMounted } from "vue";
import Title from "@/components/Title.vue";
import { PaintService } from "@/ApiServices/Paint/paint.service";
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
const is_confirm = ref(false)
const Confirm = () => {
  is_confirm.value = !is_confirm.value
}
const is_cancel = ref(false)
const Cancel = () => {
  is_cancel.value = is_cancel.value = !is_cancel.value
}
const cancelBack = () => {
  is_cancel.value = !is_cancel.value
}
const CanfirmById = (id) => {
  outerVisible.value = true;
  cardId.value = id;
};
const model = ref({});
const getModel = async () => {
  const data = await PaintService.getModel();
  model.value = data.data;
};
const Save = async () => {
  try {
    const data = await PaintService.create({
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
  const data = await PaintService.getAll();
  items.value = data.data.allPosts;
  sale_quantitiy.value = items.value.length;
  provide_quantitiy.value = data.data.allProvideItems.length;
};
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
        <h3>Bo'yoq reja iqtisod</h3>
      </template>
    </Title>
    <div class="flex justify-between bg-white rounded-md shadow-md p-3">
      <div>
        <router-link to="/explore/sale/legal/create"
          class="inline-flex text-[13px] items-center px-4 py-2 mb-1 text-sm font-medium text-center text-red hover:border-b-2 border-solid border-[#36d887] bg-[#e4e9e9] text-bold rounded focus:ring-4 focus:outline-none">
          <i class="fa-solid fa-info mr-2 fa-xm"></i> Sotuv
          <div class="flex flex-shrink-0 ml-2">
            <span
              class="inline-flex items-center justify-center h-5 text-xs font-medium text-white bg-[#36d887] px-2 rounded">{{
                sale_quantitiy }}</span>
          </div>
        </router-link>
        <router-link to="/explore/sale/legal/create"
          class="inline-flex text-[13px] items-center ml-2 px-4 py-2 mb-1 text-sm font-medium text-center text-red hover:border-b-2 border-solid border-[#36d887] bg-[#e4e9e9] text-bold rounded focus:ring-4 focus:outline-none">
          <i class="fa-solid fa-info mr-2 fa-xm"></i> Taminot
          <div class="flex flex-shrink-0 ml-2">
            <span
              class="inline-flex items-center justify-center h-5 text-xs font-medium text-white bg-[#36d887] px-2 rounded">{{
                provide_quantitiy }}</span>
          </div>
        </router-link>
        <router-link to="/explore/sale/legal/create"
          class="inline-flex text-[13px] items-center ml-2 px-4 py-2 mb-1 text-sm font-medium text-center text-red hover:border-b-2 border-solid border-[#36d887] bg-[#e4e9e9] text-bold rounded focus:ring-4 focus:outline-none">
          <i class="fa-solid fa-info mr-2 fa-xm"></i> To'quv
          <div class="flex flex-shrink-0 ml-2">
            <span
              class="inline-flex items-center justify-center h-5 text-xs font-medium text-white bg-[#36d887] px-2 rounded">0</span>
          </div>
        </router-link>
        <router-link to="/explore/sale/legal/create"
          class="inline-flex text-[13px] items-center ml-2 px-4 py-2 mb-1 text-sm font-medium text-center text-red hover:border-b-2 border-solid border-[#36d887] bg-[#e4e9e9] text-bold rounded focus:ring-4 focus:outline-none">
          <i class="fa-solid fa-info mr-2 fa-xm"></i> Yigiruv
          <div class="flex flex-shrink-0 ml-2">
            <span
              class="inline-flex items-center justify-center h-5 text-xs font-medium text-white bg-[#36d887] px-2 rounded">0</span>
          </div>
        </router-link>
        <router-link to="/explore/sale/legal/create"
          class="inline-flex text-[13px] items-center ml-2 px-4 py-2 mb-1 text-sm font-medium text-center text-red hover:border-b-2 border-solid border-[#36d887] bg-[#e4e9e9] text-bold rounded focus:ring-4 focus:outline-none">
          <i class="fa-solid fa-info mr-2 fa-xm"></i> Tikuv
          <div class="flex flex-shrink-0 ml-2">
            <span
              class="inline-flex items-center justify-center h-5 text-xs font-medium text-white bg-[#36d887] px-2 rounded">0</span>
          </div>
        </router-link>
      </div>
      <div>
        <router-link to="/explore/sale/legal/create"
          class="inline-flex text-[13px] items-center px-2 py-2 mb-1 text-sm font-medium text-center text-white bg-[#36d887] text-bold rounded focus:ring-4 focus:outline-none">
          <i class="fa-solid fa-plus mr-2 fa-xm"></i> Karta qo'shish
        </router-link>
      </div>
    </div>
    <div class="shadow-md rounded min-h-[15px]">
      <!-- // TRansfer table  -->
      <el-table load class="w-full" header-align="center" hight="5" empty-text="Mahsulot tanlanmagan... " :default-sort="[
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
              {{ scope.row.order_status }}
            </router-link>
          </template>
        </el-table-column>
        <el-table-column fixed="right" prop="id" label="" width="150" header-align="center" align="center">
          <template #default="scope">
            <router-link to="" @click="openModalById(scope.row._id)"
              class="inline-flex items-center mt-4 ml-2 text-red bg-[#eedc36] hover:bg-yellow-400 font-medium rounded-md text-sm w-full sm:w-auto px-2 py-3 text-center">
              <i class="text-red fa-solid fa-check fa-xs fa- fa-xs"></i>
            </router-link>
            <router-link to="" @click="Confirm(scope.row._id)"
              class="inline-flex items-center mt-4 ml-2 text-red bg-[#36d887] hover:bg-[#39c07c] font-medium rounded-md text-sm w-full sm:w-auto px-3 py-3 text-center">
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

  <el-dialog v-model="outerVisible" title="Taminot uchun kerakli mahsulotlar qo'shish" width="600">
    <span>
      <form
        class="filter-box md:grid md:grid-cols-3 gap-2 sm:flex sm:flex-wrap rounded shadow-md bg-white p-2 mt-1 mb-1 text-[12px]">
        <div class="mb-1 col-span-1">
          <label name="resul" class="block mb-1 text-[12px] font-medium text-gray-900 dark:text-white">Pus</label>
          <el-input v-model="model.pus" clearable class="w-[100%]" size="smal" type="String" placeholder="..." />
        </div>
        <div class="mb-1 col-span-1">
          <label name="resul" class="block mb-1 text-[12px] font-medium text-gray-900 dark:text-white">Fike</label>
          <el-input v-model="model.fike" clearable class="w-[100%]" size="smal" type="Number" placeholder="..." />
        </div>

        <div class="mb-1 col-span-1">
          <label name="resul" class="block mb-1 text-[12px] font-medium text-gray-900 dark:text-white">Rang kodi</label>
          <el-input v-model="model.color_code" clearable class="w-[100%]" size="smal" type="String" placeholder="..." />
        </div>
        <div class="mb-1 col-span-1">
          <label name="resul" class="block mb-1 text-[12px] font-medium text-gray-900 dark:text-white">Xom mato
            miqdori</label>
          <el-input v-model="model.raw_cloth_quantity" clearable class="w-[100%]" size="smal" type="Number"
            placeholder="..." />
        </div>
        <div class="mb-1 col-span-1">
          <label name="resul" class="block mb-1 text-[12px] font-medium text-gray-900 dark:text-white">Tayyorlash
            muddati</label>
          <el-input v-model="model.duration_time" clearable class="w-[100%]" size="smal" type="Date"
            placeholder="..." />
        </div>
      </form>
    </span>
    <el-dialog v-model="innerVisible" width="500" title="Inner Dialog" append-to-body>
      <span>This is the inner Dialog</span>
    </el-dialog>
    <template #footer>
      <div class="dialog-footer ">

        <router-link @click="outerVisible = false" to=""
          class="inline-flex text-[12px] items-center ml-2 px-3 py-1 mb-1 mt-2 text-sm font-medium text-center text-white bg-red-500 text-bold rounded focus:ring-4 focus:outline-none">
          <i class=" mr-2 fa-solid fa-arrow-left fa-sm"></i>Orqaga</router-link>
        <router-link @click="Save()" to=""
          class="inline-flex text-[12px] items-center ml-2 px-3 py-1 mb-1 mt-2 text-sm font-medium text-center text-white bg-[#36d887] text-bold rounded focus:ring-4 focus:outline-none">
          <i class="mr-2 fa-solid fa-check fa-sm"></i>Yuborish</router-link>


      </div>
    </template>
  </el-dialog>
  <!-- //// Tasdiqlash Modal -->
  <el-dialog v-model="is_confirm" title="Buyurtmani qabul qilish oynasi! " width="800">
    <span>
      <div class="shadow-md rounded min-h-[15px]">
        <!-- // Sale table  -->
        <el-table load class="w-full" header-align="center" hight="5" empty-text="Mahsulot tanlanmagan... "
          :data="items" border style="width: 100%" min-height="300" max-height="350">
          <el-table-column header-align="center" align="center" type="index" prop="index" fixed="left" label="№"
            width="60" />

          <el-table-column header-align="center" prop="customer_name" label="Buyurtmachi" width="180" />

          <el-table-column header-align="center" prop="order_number" label="Buyurtma nomeri" width="150" />
          <el-table-column prop="pro_type" label="Turi" width="100" header-align="center" align="center" />
          <el-table-column prop="pro_name" label="Nomi" width="100" header-align="center" align="center" />
          <el-table-column prop="pro_color" label="Rangi" width="100" header-align="center" align="center" />
          <el-table-column prop="pro_width" label="Eni" width="100" header-align="center" align="center" />
          <el-table-column prop="grammaj" label="Gramaji" width="100" header-align="center" align="center" />
          <el-table-column prop="order_quantity" label="Miqdori" fixed="right" width="100" header-align="center"
            align="center" />
          <el-table-column prop="delivery_time" label="Yetkazish vaqti" width="200" header-align="center"
            align="center" />
        </el-table>
        <!-- // -->
      </div>
      <form v-show="is_cancel"
        class="filter-box md:grid md:grid-cols-4 gap-2 sm:flex sm:flex-wrap rounded shadow-md bg-white p-2 mt-1 mb-1 text-[12px]">
        <div class="mb-1 col-span-4">
          <label name="resul" class="block mb-1 text-[12px] font-medium text-gray-900 dark:text-white">Bekor qilish
            sababi</label>

          <el-input clearable maxlength="200" show-word-limit autosize type="textarea"
            placeholder="Sababini kiriting !" />
        </div>
      </form>
    </span>
    <el-dialog v-model="innerVisible" width="600" title="Inner Dialog" append-to-body>
      <span>Cancel And Of Reason</span>
    </el-dialog>
    <template #footer>
      <div class="dialog-footer">
        <router-link v-show="!is_cancel" @click="Cancel()" to=""
          class="inline-flex text-[12px] items-center ml-2 px-3 py-1 mb-1 mt-2 text-sm font-medium text-center text-white bg-red-500 text-bold rounded focus:ring-4 focus:outline-none">
          <i class=" mr-2 fa-solid fa-arrow-left fa-sm"></i>Bekor qilish</router-link>
        <router-link v-show="!is_cancel" type="" @click="CanfirmById()" to=""
          class="inline-flex text-[12px] items-center ml-2 px-3 py-1 mb-1 mt-2 text-sm font-medium text-center text-white bg-[#36d887] text-bold rounded focus:ring-4 focus:outline-none">
          <i class="mr-2 fa-solid fa-check fa-sm"></i>Qabul qilish</router-link>
        <router-link v-show="is_cancel" type="" @click="cancelBack()" to=""
          class="inline-flex text-[12px] items-center ml-2 px-3 py-1 mb-1 mt-2 text-sm font-medium text-center text-white bg-red-500 text-bold rounded focus:ring-4 focus:outline-none">
          <i class=" mr-2 fa-solid fa-arrow-left fa-sm"></i>Orqaga</router-link>
        <router-link v-show="is_cancel" type="" @click="cancelSend()" to=""
          class="inline-flex text-[12px] items-center ml-2 px-3 py-1 mb-1 mt-2 text-sm font-medium text-center text-white bg-[#36d887] text-bold rounded focus:ring-4 focus:outline-none">
          <i class="mr-2 fa-solid fa-check fa-sm"></i>Yuborish</router-link>

      </div>
    </template>
  </el-dialog>

  <!-- //// -->

  <!-- //PAGANATION PAGANATION PAGANATION PAGANATION// -->
  <div class="flex justify-between mt-2 bg-white p-2 shadow-md">
    <div></div>
    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page.sync="currentPage1" :page-size="100" layout="total, prev, pager, next" :total="1000">
      </el-pagination>
    </div>
  </div>
  <!-- //////// -->
</template>
<style></style>
