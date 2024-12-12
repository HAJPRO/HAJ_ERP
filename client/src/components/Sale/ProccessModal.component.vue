<script setup>
import jsPDF from "jspdf";
const pdf = jsPDF({
  orientation: "p",
  unit: "px",
  format: "a4",
  compress: true,
  putOnlyUsedFonts: true,
  hotfixes: ["px_scaling"],
});
import html2pdf from "html2pdf.js";
const download = () => {
  var element = document.getElementById("content");
  var opt = {
    image: { quality: 10, type: "jpeg" },
    x: 10,
    y: 10,
    margin: 0.1,
    filename: "report.pdf",
    html2canvas: { scale: 4 },
  };
  html2pdf().set(opt).from(element).save();
  html2pdf(element, opt);
};
import { ref } from "vue";
import { SaleStore } from "../../stores/Sale/sale.store";
const store_sale = SaleStore();
import { storeToRefs } from "pinia";
const { proccess_modal, proccess_data } = storeToRefs(store_sale);
const isDepInfo = ref(false);
const active = ref(2);
</script>

<template>
  <el-dialog
    id="content"
    v-model="proccess_modal"
    title="Buyurtmani ishlab chiqarish jarayoni bo'yicha malumotlari"
    width="800"
  >
    <div class="">
      <section class="lg:py-1 xl:py-2">
        <div class="mx-auto max-w-7xl">
          <ul
            class="mx-auto grid max-w-md grid-cols-1 gap-10 sm:mt-16 lg:mt-2 lg:max-w-5xl lg:grid-cols-4"
          >
            <li
              v-for="item in proccess_data.order[0].process_status"
              :key="item.index"
              class="flex-start group relative flex lg:flex-col"
            >
              <span
                class="absolute top-14 w-px bg-gray-300 lg:right-0 lg:left-auto lg:top-[20px] lg:h-px lg:w-[calc(100%_-_40px)]"
                aria-hidden="true"
              ></span>
              <div
                class="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-gray-100 bg-[#36d887] transition-all duration-200 group-hover:bg-[#36d887]"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-white group-hover:text-white"
                >
                  <path
                    d="M21 12C21 13.6569 16.9706 15 12 15C7.02944 15 3 13.6569 3 12M21 5C21 6.65685 16.9706 8 12 8C7.02944 8 3 6.65685 3 5M21 5C21 3.34315 16.9706 2 12 2C7.02944 2 3 3.34315 3 5M21 5V19C21 20.6569 16.9706 22 12 22C7.02944 22 3 20.6569 3 19V5"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </div>
              <div class="lg:ml-0">
                <h4 class="mt-1 text-[11px] text-gray-700">
                  {{ item.status }}
                </h4>
              </div>
            </li>
          </ul>
        </div>
      </section>
      <!-- <el-steps
        class=""
        :space="150"
        style="max-width: 800px"
        :active="`${proccess_data.order[0].process_status.length}`"
        finish-status="success"
      >
        <el-step
          v-for="item in proccess_data.order[0].process_status"
          :key="item.index"
          :title="`${item.status}`"
        />
      </el-steps> -->
      <!-- <div class="Pragress flex gap-1"> -->
      <!-- <div
          v-for="item in proccess_data.order[0].process_status"
          :key="item.index"
        >
          <span
            to=""
            class="cursor-pointer inline-flex items-center px-1.5 py-1.5 mb-1 text-[10px] font-semibold text-center text-white bg-[#36d887] text-bold rounded"
          >
            {{ item.status }} =>
          </span>
        </div> -->
      <!-- </div> -->
      <div class="Main bg-white dark:bg-gray-800 shadow-sm rounded-xl">
        <div
          class="Header flex justify-between gap-1 border-t-[1.5px] border-solid border-[#36d887]"
        >
          <header class="py-2 border-b border-gray-100 dark:border-gray-700/60">
            <h5
              class="font-semibold text-[12px] text-gray-800 dark:text-gray-100"
            >
              Buyurtmachi nomi : {{ proccess_data.order[0].customer_name }}
            </h5>
          </header>
          <header class="py-2 border-b border-gray-100 dark:border-gray-700/60">
            <h5
              class="font-semibold text-[12px] text-gray-800 dark:text-gray-100"
            >
              Buyurtma raqami : {{ proccess_data.order[0].order_number }}
            </h5>
          </header>
          <header class="py-2 border-b border-gray-100 dark:border-gray-700/60">
            <h5
              class="font-semibold text-[12px] text-gray-800 dark:text-gray-100"
            >
              Buyurtmachi miqdori :
              {{ proccess_data.order[0].order_quantity }} kg
            </h5>
          </header>
        </div>
        <div class="Department">
          <div>
            <header
              @click="isDepInfo = !isDepInfo"
              class="text-[12px] uppercase text-center cursor-pointer text-white dark:text-gray-500 bg-[#36d887] dark:bg-gray-700 dark:bg-opacity-50 rounded-sm font-semibold p-2"
            >
              Bo'limlar bo'yicha ma'lumotini ko'rish
              <span class="hidden sm:inline"> -&gt;</span>
            </header>
            <div v-show="isDepInfo" class="mt-2">
              <!-- Item -->
              <div class="Paint">
                <div class="flex gap-2 mb-2 mt-2">
                  <div class="w-8 h-8 rounded-full shrink-0 bg-red-500">
                    <svg
                      class="w-8 h-8 fill-current text-white"
                      viewBox="0 0 36 36"
                    >
                      <path
                        d="M25 24H11a1 1 0 01-1-1v-5h2v4h12v-4h2v5a1 1 0 01-1 1zM14 13h8v2h-8z"
                      />
                    </svg>
                  </div>
                  <div class="mt-1 mr-3 text-[15px] font-semibold">Bo'yoq</div>
                </div>
                <div
                  class="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl"
                >
                  <div class="">
                    <!-- Table -->
                    <div class="overflow-x-auto">
                      <div class="shadow-md rounded min-h-[15px]">
                        <el-table
                          load
                          class="w-full"
                          header-align="center"
                          hight="5"
                          style="width: 100%"
                          empty-text="Mahsulot topilmadi... "
                          :data="proccess_data.paint"
                          border
                          min-height="200"
                          max-height="200"
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
                            prop="quantity"
                            label="Miqdori"
                            width="250"
                          />
                          <el-table-column
                            prop="unit"
                            label="Birligi"
                            width="200"
                            header-align="center"
                            align="center"
                          />
                          <el-table-column
                            prop="date"
                            label="Vaqt"
                            width="260"
                            header-align="center"
                            align="center"
                            ><template #default="scope">{{
                              String(scope.row.date).substring(0, 10)
                            }}</template></el-table-column
                          >
                        </el-table>
                        <!-- // -->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="To'quv">
                <div class="flex gap-2 mb-2 mt-2">
                  <div class="w-8 h-8 rounded-full shrink-0 bg-red-500">
                    <svg
                      class="w-8 h-8 fill-current text-white"
                      viewBox="0 0 36 36"
                    >
                      <path
                        d="M25 24H11a1 1 0 01-1-1v-5h2v4h12v-4h2v5a1 1 0 01-1 1zM14 13h8v2h-8z"
                      />
                    </svg>
                  </div>
                  <div class="mt-1 mr-3 text-[15px] font-semibold">To'quv</div>
                </div>
                <div
                  class="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl"
                >
                  <div class="">
                    <!-- Table -->
                    <div class="overflow-x-auto">
                      <div class="shadow-md rounded min-h-[15px]">
                        <el-table
                          load
                          class="w-full"
                          header-align="center"
                          hight="5"
                          style="width: 100%"
                          empty-text="Mahsulot topilmadi... "
                          :data="proccess_data.weaving"
                          border
                          min-height="200"
                          max-height="200"
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
                            prop="quantity"
                            label="Miqdori"
                            width="250"
                          />
                          <el-table-column
                            prop="unit"
                            label="Birligi"
                            width="200"
                            header-align="center"
                            align="center"
                          />
                          <el-table-column
                            prop="date"
                            label="Vaqt"
                            width="260"
                            header-align="center"
                            align="center"
                            ><template #default="scope">{{
                              String(scope.row.date).substring(0, 10)
                            }}</template></el-table-column
                          >
                        </el-table>
                        <!-- // -->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="Yigiruv">
                <div class="flex gap-2 mb-2 mt-2">
                  <div class="w-8 h-8 rounded-full shrink-0 bg-red-500">
                    <svg
                      class="w-8 h-8 fill-current text-white"
                      viewBox="0 0 36 36"
                    >
                      <path
                        d="M25 24H11a1 1 0 01-1-1v-5h2v4h12v-4h2v5a1 1 0 01-1 1zM14 13h8v2h-8z"
                      />
                    </svg>
                  </div>
                  <div class="mt-1 mr-3 text-[15px] font-semibold">Yigiruv</div>
                </div>
                <div
                  class="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl"
                >
                  <div class="">
                    <!-- Table -->
                    <div class="overflow-x-auto">
                      <div class="shadow-md rounded min-h-[15px]">
                        <el-table
                          load
                          class="w-full"
                          header-align="center"
                          hight="5"
                          style="width: 100%"
                          empty-text="Mahsulot topilmadi... "
                          :data="proccess_data.spinning"
                          border
                          min-height="200"
                          max-height="200"
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
                            prop="quantity"
                            label="Miqdori"
                            width="250"
                          />
                          <el-table-column
                            prop="unit"
                            label="Birligi"
                            width="200"
                            header-align="center"
                            align="center"
                          />
                          <el-table-column
                            prop="date"
                            label="Vaqt"
                            width="260"
                            header-align="center"
                            align="center"
                            ><template #default="scope">{{
                              String(scope.row.date).substring(0, 10)
                            }}</template></el-table-column
                          >
                        </el-table>
                        <!-- // -->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
        <div class="">
          <router-link
            to=""
            class="inline-flex text-[11px] items-center px-2 py-1 mb-1 font-medium text-center text-white bg-[#36d887] text-bold rounded"
          >
            <i class="fa-solid fa-file-excel mr-2 fa-xm"></i> Excel
          </router-link>
          <router-link
            to=""
            @click="download"
            class="inline-flex text-[11px] items-center ml-2 px-2 py-1 mb-1 font-medium text-center text-white bg-yellow-500 text-bold rounded"
          >
            <i class="fa-solid fa-file-pdf mr-2 fa-xm"></i> Pdf
          </router-link>
        </div>
      </div>
    </template>
  </el-dialog>
</template>
