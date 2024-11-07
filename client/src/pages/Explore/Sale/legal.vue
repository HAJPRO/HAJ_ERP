<script setup>
import { ref, onMounted } from "vue";
import Title from "@/components/Title.vue";
import { SaleLegalService } from "@/ApiServices/Sale/saleLegal.service";
import { useRouter } from "vue-router";
import { ToastifyService } from "../../../utils/Toastify";
const router = useRouter();
import { useLoading } from "vue-loading-overlay";
const loading = useLoading({
  color: "#36d887",
  backgroundColor: "#666",
  opacity: "0.9",
  loader: "bars",
  height: "100px",
  width: "100px",
});
const isDepInfo = ref(false);
const isDepInfoBtn = () => {
  isDepInfo.value = !isDepInfo.value;
};
const outerVisible = ref(false);
const innerVisible = ref(false);
const cardId = ref();
const openModalById = (id) => {
  outerVisible.value = true;
  cardId.value = id;
};
const Export_Excel = async (id) => {
  try {
    const data = await SaleLegalService.export_excel({ id });
  } catch (error) {
    return ToastifyService.ToastError({ msg: error.messages });
  }
};
const Confirm = async (id) => {
  try {
    const Id = await SaleLegalService.confirm({ id });
    ToastifyService.ToastSuccess({
      msg: "Sotuv tasdiqlandi va bo'yoqqa yuborildi",
    });
    setInterval((window.location.href = "/explore/sale/legal"), 2000);
  } catch (error) {
    return ToastifyService.ToastError({ msg: error.messages });
  }
};
const items = ref([]);
const painting_length = ref();
const provide_length = ref();
const filter_order_num = ref({ order_num: "" });
const getAll = async (filter_order_num) => {
  if (!filter_order_num) {
    const data = await SaleLegalService.getAll();
    items.value = data.data.allPosts;
    // painting_length.value = data.data.painting_length.length;
    // provide_length.value = data.data.provide_length.length;
  } else {
    const data = await SaleLegalService.getAll({});
    items.value = data.data.allPosts;
    // painting_length.value = data.data.painting_length.length;
    // provide_length.value = data.data.provide_length.length;
  }
};
onMounted(async () => {
  try {
    await getAll();
  } catch (err) {
    console.log(err);
  }
});
</script>

<template>
  <div>
    <Title>
      <template v-slot:title>
        <h3>Sotuvlar</h3>
      </template>
    </Title>
    <div class="flex justify-between bg-white rounded-md shadow-md p-3">
      <div>
        <router-link
          to="/explore/sale/legal/create"
          class="inline-flex text-[13px] items-center mr-2 px-4 py-2 mb-1 text-sm font-medium text-center text-red hover:border-b-2 border-solid border-[#36d887] bg-[#e4e9e9] text-bold rounded focus:ring-4 focus:outline-none"
        >
          <i class="fa-solid fa-info mr-2 fa-xm"></i> Sotuvlar
          <div class="flex flex-shrink-0 ml-2">
            <span
              class="inline-flex items-center justify-center h-5 text-xs font-medium text-white bg-[#36d887] px-2 rounded"
              >{{ painting_length }}</span
            >
          </div>
        </router-link>
        <router-link
          to="/explore/sale/legal/create"
          class="inline-flex text-[13px] items-center px-4 py-2 mb-1 text-sm font-medium text-center text-red hover:border-b-2 border-solid border-[#36d887] bg-[#e4e9e9] text-bold rounded focus:ring-4 focus:outline-none"
        >
          <i class="fa-solid fa-info mr-2 fa-xm"></i> Bo'yoq
          <div class="flex flex-shrink-0 ml-2">
            <span
              class="inline-flex items-center justify-center h-5 text-xs font-medium text-white bg-[#36d887] px-2 rounded"
              >{{ painting_length }}</span
            >
          </div>
        </router-link>

        <router-link
          to="/explore/sale/legal/create"
          class="inline-flex text-[13px] items-center ml-2 px-4 py-2 mb-1 text-sm font-medium text-center text-red hover:border-b-2 border-solid border-[#36d887] bg-[#e4e9e9] text-bold rounded focus:ring-4 focus:outline-none"
        >
          <i class="fa-solid fa-info mr-2 fa-xm"></i> To'quv
          <div class="flex flex-shrink-0 ml-2">
            <span
              class="inline-flex items-center justify-center h-5 text-xs font-medium text-white bg-[#36d887] px-2 rounded"
              >0</span
            >
          </div>
        </router-link>
        <router-link
          to="/explore/sale/legal/create"
          class="inline-flex text-[13px] items-center ml-2 px-4 py-2 mb-1 text-sm font-medium text-center text-red hover:border-b-2 border-solid border-[#36d887] bg-[#e4e9e9] text-bold rounded focus:ring-4 focus:outline-none"
        >
          <i class="fa-solid fa-info mr-2 fa-xm"></i> Yigiruv
          <div class="flex flex-shrink-0 ml-2">
            <span
              class="inline-flex items-center justify-center h-5 text-xs font-medium text-white bg-[#36d887] px-2 rounded"
              >0</span
            >
          </div>
        </router-link>
        <!-- <router-link
          to="/explore/sale/legal/create"
          class="inline-flex text-[13px] items-center ml-2 px-4 py-2 mb-1 text-sm font-medium text-center text-red hover:border-b-2 border-solid border-[#36d887] bg-[#e4e9e9] text-bold rounded focus:ring-4 focus:outline-none"
        >
          <i class="fa-solid fa-info mr-2 fa-xm"></i> Tikuv
          <div class="flex flex-shrink-0 ml-2">
            <span
              class="inline-flex items-center justify-center h-5 text-xs font-medium text-white bg-[#36d887] px-2 rounded"
              >0</span
            >
          </div>
        </router-link> -->
        <router-link
          to="/explore/sale/legal/create"
          class="inline-flex text-[13px] items-center ml-2 px-4 py-2 mb-1 text-sm font-medium text-center text-red hover:border-b-2 border-solid border-[#36d887] bg-[#e4e9e9] text-bold rounded focus:ring-4 focus:outline-none"
        >
          <i class="fa-solid fa-info mr-2 fa-xm"></i> Taminot
          <div class="flex flex-shrink-0 ml-2">
            <span
              class="inline-flex items-center justify-center h-5 text-xs font-medium text-white bg-[#36d887] px-2 rounded"
              >{{ provide_length }}</span
            >
          </div>
        </router-link>
      </div>
      <div class="flex flex-wrap">
        <div class="mr-3 col-span-1">
          <el-input
            @input="getAll()"
            v-model="filter_order_num.order_num"
            clearable
            class="w-[100%]"
            size="large"
            type="String"
            placeholder="Buyutma raqam bo'yicha izla..."
          />
        </div>
        <router-link
          to="/explore/sale/legal/create"
          class="inline-flex text-[13px] items-center px-2 py-2 mb-1 text-sm font-medium text-center text-white bg-[#36d887] text-bold rounded focus:ring-4 focus:outline-none"
        >
          <i class="fa-solid fa-plus mr-2 fa-xm"></i> Karta qo'shish
        </router-link>
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
          label="Buyurtma nomeri"
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
              class="inline-flex items-center text-red bg-[#e4e9e9] hover:bg-[#f7efa9] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-[12px] w-ful p-[5px] sm:w-auto text-center"
            >
              {{ scope.row.order_status }}
            </router-link>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          prop="id"
          label=""
          width="200"
          header-align="center"
          align="center"
        >
          <template #default="scope">
            <router-link
              v-show="scope.row.order_status === 'Tasdiqlanmagan'"
              to=""
              @click="Confirm(scope.row._id)"
              class="inline-flex items-center mt-4 ml-2 text-red bg-[#eedc36] hover:bg-yellow-400 font-medium rounded-md text-sm w-full sm:w-auto px-2 py-3 text-center"
            >
              <i class="text-red fa-solid fa-check fa-xs fa- fa-xs"></i>
            </router-link>
            <router-link
              to=""
              @click="openModalById(scope.row._id)"
              class="inline-flex items-center mt-4 ml-2 text-white bg-[#36d887] hover:bg-[#39c07c] font-medium rounded-md text-sm w-full sm:w-auto px-3 py-3 text-center"
            >
              <i class="text-black fa-sharp fa-solid fa-info fa-xs"></i>
            </router-link>
            <router-link
              v-show="scope.row.order_status === 'Tasdiqlanmagan'"
              to="/explore/sale/legal/create"
              @click="DeleteFromTable(scope.row._id)"
              class="inline-flex items-center mt-4 ml-2 text-white bg-yellow-500 hover:bg-yellow-600 font-medium rounded-md text-sm w-full sm:w-auto px-2 py-3 text-center"
            >
              <i class="text-black fa-sharp fa-solid fa-edit fa-xs"></i>
            </router-link>
            <router-link
              to="/explore/sale/legal/create"
              @click="DeleteFromTable(scope.row._id)"
              class="inline-flex items-center mt-4 ml-2 text-white bg-red-500 hover:bg-red-600 font-medium rounded-md text-sm w-full sm:w-auto px-2 py-3 text-center"
            >
              <i class="text-black fa-sharp fa-solid fa-trash fa-xs"></i>
            </router-link>
            <router-link
              to=""
              @click="Export_Excel(scope.row._id)"
              class="inline-flex items-center mt-4 ml-2 text-white bg-yellow-300 hover:bg-yellow-400 font-medium rounded-md text-sm w-full sm:w-auto px-2 py-3 text-center"
            >
              <i class="text-black fa-sharp fa-solid fa-file-excel fa-xs"></i>
            </router-link>
          </template>
        </el-table-column>
      </el-table>
      <!-- // -->
    </div>
  </div>
  <el-dialog
    v-model="outerVisible"
    title="Buyurtmani ishlab chiqarish jarayoni bo'yicha malumotlari"
    width="700"
  >
    <div>
      <div>
        <span
          to=""
          class="inline-flex text-[11px] items-center px-2 py-1 mb-1 text-sm font-medium text-center text-white bg-[#36d887] text-bold rounded focus:ring-4 focus:outline-none"
        >
          Bo'yoqqa yuborildi
        </span>
        =>
        <span
          to=""
          class="inline-flex text-[11px] items-center px-2 py-1 mb-1 text-sm font-medium text-center text-white bg-[#36d887] text-bold rounded focus:ring-4 focus:outline-none"
        >
          Taminotga yuborildi
        </span>
        =>
        <span
          to=""
          class="inline-flex text-[11px] items-center px-2 py-1 mb-1 text-sm font-medium text-center text-white bg-[#36d887] text-bold rounded focus:ring-4 focus:outline-none"
        >
          To'quvga yuborildi </span
        >=>
        <span
          to=""
          class="inline-flex text-[11px] items-center px-2 py-1 mb-1 text-sm font-medium text-center text-white bg-yellow-500 text-bold rounded focus:ring-4 focus:outline-none"
        >
          Tikuvga yuborildi
        </span>
      </div>
      <div
        class="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl"
      >
        <div
          class="grid grid-cols-3 gap-1 border-t-[1.5px] border-solid border-[#36d887]"
        >
          <header class="py-3 border-b border-gray-100 dark:border-gray-700/60">
            <h5
              class="font-semibold text-[12px] text-gray-800 dark:text-gray-100"
            >
              Buyurtmachi nomi : Humo MCHJ
            </h5>
          </header>
          <header class="py-3 border-b border-gray-100 dark:border-gray-700/60">
            <h5
              class="font-semibold text-[12px] text-gray-800 dark:text-gray-100"
            >
              Buyurtmachi miqdori : 500 kg
            </h5>
          </header>
          <header class="py-3 border-b border-gray-100 dark:border-gray-700/60">
            <h5
              class="font-semibold text-[12px] text-gray-800 dark:text-gray-100"
            >
              Buyurtmachi nomi : Suprima
            </h5>
          </header>
        </div>

        <div class="">
          <!-- Card content -->
          <!-- "Today" group -->
          <div>
            <header
              @click="isDepInfoBtn()"
              class="text-xs uppercase text-center cursor-pointer text-white dark:text-gray-500 bg-[#36d887] dark:bg-gray-700 dark:bg-opacity-50 rounded-sm font-semibold p-2"
            >
              Bo'limlar bo'yicha ma'lumotini ko'rish
              <span class="hidden sm:inline"> -&gt;</span>
            </header>
            <ul v-show="isDepInfo" class="my-1">
              <!-- Item -->
              <li class="flex px-2 cursor-pointer">
                <div class="w-9 h-9 rounded-full shrink-0 bg-red-500 my-2 mr-3">
                  <svg
                    class="w-9 h-9 fill-current text-white"
                    viewBox="0 0 36 36"
                  >
                    <path
                      d="M25 24H11a1 1 0 01-1-1v-5h2v4h12v-4h2v5a1 1 0 01-1 1zM14 13h8v2h-8z"
                    />
                  </svg>
                </div>
                <div
                  class="grow flex items-center border-b border-gray-100 dark:border-gray-700/60 text-sm py-2"
                >
                  <div class="grow flex justify-between">
                    <div class="self-center text-[16px]">Bo'yoq</div>
                    <div class="shrink-0 self-end ml-2">
                      <span class="hidden sm:inline"> -&gt;</span>
                    </div>
                  </div>
                </div>
              </li>
              <div
                class="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl"
              >
                <div class="p-3">
                  <!-- Table -->
                  <div class="overflow-x-auto">
                    <table class="table-auto w-full">
                      <!-- Table header -->
                      <thead
                        class="text-xs text-center font-semibold dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50"
                      >
                        <tr>
                          <th class="p-2 whitespace-nowrap">
                            <div class="font-semibold text-center">№</div>
                          </th>
                          <th class="p-2 whitespace-nowrap">
                            <div class="font-semibold text-center">Pus</div>
                          </th>
                          <th class="p-2 whitespace-nowrap">
                            <div class="font-semibold text-center">Fike</div>
                          </th>
                          <th class="p-2 whitespace-nowrap">
                            <div class="font-semibold text-center">
                              Rang kodi
                            </div>
                          </th>
                          <th class="p-2 whitespace-nowrap">
                            <div class="font-semibold text-center">
                              Xom mato (kg)
                            </div>
                          </th>
                          <th class="p-2 whitespace-nowrap">
                            <div class="font-semibold text-center">Muddati</div>
                          </th>
                        </tr>
                      </thead>
                      <!-- Table body -->
                      <tbody
                        class="text-sm text-center divide-y divide-gray-100 dark:divide-gray-700/60"
                      >
                        <tr>
                          <td>1</td>
                          <td>josa</td>
                          <td>josa</td>
                          <td>josa</td>
                          <td>josa</td>
                          <td>josa</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <li class="flex px-2 cursor-pointer">
                <div class="w-9 h-9 rounded-full shrink-0 bg-red-500 my-2 mr-3">
                  <svg
                    class="w-9 h-9 fill-current text-white"
                    viewBox="0 0 36 36"
                  >
                    <path
                      d="M25 24H11a1 1 0 01-1-1v-5h2v4h12v-4h2v5a1 1 0 01-1 1zM14 13h8v2h-8z"
                    />
                  </svg>
                </div>
                <div
                  class="grow flex items-center border-b border-gray-100 dark:border-gray-700/60 text-sm py-2"
                >
                  <div class="grow flex justify-between">
                    <div class="self-center text-[16px]">Taminot</div>
                    <div class="shrink-0 self-end ml-2">
                      <span class="hidden sm:inline"> -&gt;</span>
                    </div>
                  </div>
                </div>
              </li>
              <div
                class="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl"
              >
                <div class="p-3">
                  <!-- Table -->
                  <div class="overflow-x-auto">
                    <table class="table-auto w-full">
                      <!-- Table header -->
                      <thead
                        class="text-xs text-center font-semibold dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50"
                      >
                        <tr>
                          <th class="p-2 whitespace-nowrap">
                            <div class="font-semibold text-center">№</div>
                          </th>
                          <th class="p-2 whitespace-nowrap">
                            <div class="font-semibold text-center">Pus</div>
                          </th>
                          <th class="p-2 whitespace-nowrap">
                            <div class="font-semibold text-center">Fike</div>
                          </th>
                          <th class="p-2 whitespace-nowrap">
                            <div class="font-semibold text-center">
                              Rang kodi
                            </div>
                          </th>
                          <th class="p-2 whitespace-nowrap">
                            <div class="font-semibold text-center">
                              Xom mato (kg)
                            </div>
                          </th>
                          <th class="p-2 whitespace-nowrap">
                            <div class="font-semibold text-center">Muddati</div>
                          </th>
                        </tr>
                      </thead>
                      <!-- Table body -->
                      <tbody
                        class="text-sm text-center divide-y divide-gray-100 dark:divide-gray-700/60"
                      >
                        <tr>
                          <td>1</td>
                          <td>josa</td>
                          <td>josa</td>
                          <td>josa</td>
                          <td>josa</td>
                          <td>josa</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <li class="flex px-2 cursor-pointer">
                <div class="w-9 h-9 rounded-full shrink-0 bg-red-500 my-2 mr-3">
                  <svg
                    class="w-9 h-9 fill-current text-white"
                    viewBox="0 0 36 36"
                  >
                    <path
                      d="M25 24H11a1 1 0 01-1-1v-5h2v4h12v-4h2v5a1 1 0 01-1 1zM14 13h8v2h-8z"
                    />
                  </svg>
                </div>
                <div
                  class="grow flex items-center border-b border-gray-100 dark:border-gray-700/60 text-sm py-2"
                >
                  <div class="grow flex justify-between">
                    <div class="self-center text-[16px]">To'quv</div>
                    <div class="shrink-0 self-end ml-2">
                      <span class="hidden sm:inline"> -&gt;</span>
                    </div>
                  </div>
                </div>
              </li>
              <li class="flex px-2 cursor-pointer">
                <div class="w-9 h-9 rounded-full shrink-0 bg-red-500 my-2 mr-3">
                  <svg
                    class="w-9 h-9 fill-current text-white"
                    viewBox="0 0 36 36"
                  >
                    <path
                      d="M25 24H11a1 1 0 01-1-1v-5h2v4h12v-4h2v5a1 1 0 01-1 1zM14 13h8v2h-8z"
                    />
                  </svg>
                </div>
                <div
                  class="grow flex items-center border-b border-gray-100 dark:border-gray-700/60 text-sm py-2"
                >
                  <div class="grow flex justify-between">
                    <div class="self-center text-[16px]">Tikuv</div>
                    <div class="shrink-0 self-end ml-2">
                      <span class="hidden sm:inline"> -&gt;</span>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

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
