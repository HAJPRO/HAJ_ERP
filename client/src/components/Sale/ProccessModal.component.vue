<script setup>
import jspdf from "jspdf";
import { utils, writeFileXLSX } from "xlsx";

const ExportExcel = () => {
  const heading = [["№", "Miqdori", "Birligi ", "Vaqt"]];
  const ws = utils.json_to_sheet(proccess_data.paint);
  const wb = utils.book_new();
  utils.sheet_add_aoa(ws, heading);
  utils.book_append_sheet(wb, ws, "proccess");
  writeFileXLSX(wb, `${Date.now()}.xlsx`);
};

const PdfDownload = () => {
  const doc = new jspdf();
  const opt = {
    orientation: "p",
    unit: "px",
    format: "letter",
    putOnlyUsedFonts: true,
  };

  const html = document.getElementById("tabel");
  doc.html(html, {
    callback: function (doc) {
      doc.save("report.pdf", opt);
    },
    x: 5,
    y: 15,
    html2canvas: { scale: 0.23 },
  });
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
  <div>
    <Report v-show="report" id="report" />
    <el-dialog
      id="content"
      v-model="proccess_modal"
      title="Buyurtmani ishlab chiqarish jarayoni bo'yicha malumotlari"
      width="900"
    >
      <div class="">
        <section class="lg:py-1 xl:py-2">
          <div class="mx-auto max-w-7xl">
            <ul
              class="mx-auto grid w-full grid-cols-8 gap-1 lg:mt-2 lg:max-w-5xl"
            >
              <li
                v-for="item in proccess_data.order[0].process_status"
                :key="item.index"
                class="flex-start group relative"
              >
                <span
                  class="absolute top-14 w-px bg-gray-300 lg:right-0 lg:left-auto lg:top-[20px] lg:h-px lg:w-[calc(100%_-_40px)]"
                  aria-hidden="true"
                ></span>
                <div
                  class="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-gray-100 bg-[#36d887] transition-all duration-200 group-hover:bg-[#36d887]"
                >
                  <i class="fa-solid fa-check text-white"></i>
                </div>
                <div class="lg:ml-0">
                  <h4 class="mt-1 text-[11px] text-gray-700">
                    {{ item.status }}
                  </h4>
                </div>
              </li>
              <li
                v-for="item in proccess_data.order[0].process_status"
                :key="item.index"
                class="flex-start group relative"
              >
                <span
                  class="absolute top-14 w-px bg-gray-300 lg:right-0 lg:left-auto lg:top-[20px] lg:h-px lg:w-[calc(100%_-_40px)]"
                  aria-hidden="true"
                ></span>
                <div
                  class="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-gray-100 bg-[#36d887] transition-all duration-200 group-hover:bg-[#36d887]"
                >
                  <i class="fa-solid fa-check text-white"></i>
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

        <div
          id="tabel"
          class="Main bg-white dark:bg-gray-800 shadow-sm rounded-xl"
        >
          <div
            class="Header flex justify-between gap-1 border-t-[1.5px] border-solid border-[#36d887]"
          >
            <header
              class="py-2 border-b border-gray-100 dark:border-gray-700/60"
            >
              <h5
                class="font-semibold text-[12px] text-gray-800 dark:text-gray-100"
              >
                Buyurtmachi nomi : {{ proccess_data.order[0].customer_name }}
              </h5>
            </header>
            <header
              class="py-2 border-b border-gray-100 dark:border-gray-700/60"
            >
              <h5
                class="font-semibold text-[12px] text-gray-800 dark:text-gray-100"
              >
                Buyurtma raqami : {{ proccess_data.order[0].order_number }}
              </h5>
            </header>
            <header
              class="py-2 border-b border-gray-100 dark:border-gray-700/60"
            >
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
                  <div class="flex justify-between rounded bg-slate-100 p-2">
                    <div class="mt-1 mr-3 text-[15px] font-semibold">
                      <i class="fa-solid fa-landmark mr-2"></i>Bo'yoq
                    </div>
                    <div
                      class="bg-red-50 p-1 rounded text-[11px] items-center text-center font-bold border-[1px] border-red-500"
                    >
                      Jarayonda
                    </div>
                  </div>
                  <div
                    class="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl"
                  >
                    <div class="">
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
                              width="70"
                            />

                            <el-table-column
                              header-align="center"
                              prop="quantity"
                              label="Miqdori"
                              width="300"
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
                              width="300"
                              header-align="center"
                              align="center"
                              ><template #default="scope">{{
                                String(scope.row.date).substring(0, 10)
                              }}</template></el-table-column
                            >
                          </el-table>
                          <div
                            class="flex justify-between flex-wrap font-semibold text-[12px] p-1 bg-slate-100 shadow"
                          >
                            <div>
                              Buyurtma:
                              {{ 0 }}
                            </div>
                            <div>Bajarildi: {{ 0 }}</div>
                            <div>
                              Qoldi:
                              {{ 0 }}
                            </div>
                          </div>
                          <!-- // -->
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="To'quv mt-2">
                  <div class="flex justify-between rounded bg-slate-100 p-2">
                    <div class="mt-1 mr-3 text-[15px] font-semibold">
                      <i class="fa-solid fa-landmark mr-2"></i>To'quv
                    </div>
                    <div
                      class="bg-red-50 p-1 rounded text-[11px] items-center text-center font-bold border-[1px] border-red-500"
                    >
                      Jarayonda
                    </div>
                  </div>
                  <div
                    class="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl"
                  >
                    <div class="">
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
                              width="70"
                            />

                            <el-table-column
                              header-align="center"
                              prop="quantity"
                              label="Miqdori"
                              width="300"
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
                              width="300"
                              header-align="center"
                              align="center"
                              ><template #default="scope">{{
                                String(scope.row.date).substring(0, 10)
                              }}</template></el-table-column
                            >
                          </el-table>
                          <div
                            class="flex justify-between flex-wrap font-semibold text-[12px] p-1 bg-slate-100 shadow"
                          >
                            <div>
                              Buyurtma:
                              {{ 0 }}
                            </div>
                            <div>Bajarildi: {{ 0 }}</div>
                            <div>
                              Qoldi:
                              {{ 0 }}
                            </div>
                          </div>
                          <!-- // -->
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="Yigiruv mt-2">
                  <div class="flex justify-between rounded bg-slate-100 p-2">
                    <div class="mt-1 mr-3 text-[15px] font-semibold">
                      <i class="fa-solid fa-landmark mr-2"></i>Yigiruv
                    </div>
                    <div
                      class="bg-red-50 p-1 rounded text-[11px] items-center text-center font-bold border-[1px] border-red-500"
                    >
                      Jarayonda
                    </div>
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
                              width="70"
                            />

                            <el-table-column
                              header-align="center"
                              prop="quantity"
                              label="Miqdori"
                              width="300"
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
                              width="300"
                              header-align="center"
                              align="center"
                              ><template #default="scope">{{
                                String(scope.row.date).substring(0, 10)
                              }}</template></el-table-column
                            >
                          </el-table>
                          <div
                            class="flex justify-between flex-wrap font-semibold text-[12px] p-1 bg-slate-100 shadow"
                          >
                            <div>
                              Buyurtma:
                              {{ 0 }}
                            </div>
                            <div>Bajarildi: {{ 0 }}</div>
                            <div>
                              Qoldi:
                              {{ 0 }}
                            </div>
                          </div>
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
        <div v-if="isDepInfo" class="dialog-footer">
          <div class="">
            <router-link
              @click="ExportExcel()"
              to=""
              class="inline-flex text-[11px] items-center px-2 py-1 mb-1 font-medium text-center text-white bg-[#36d887] text-bold rounded"
            >
              <i class="fa-solid fa-file-excel mr-2 fa-xm"></i> Excel
            </router-link>
            <router-link
              to=""
              @click="PdfDownload()"
              class="inline-flex text-[11px] items-center ml-2 px-2 py-1 mb-1 font-medium text-center text-white bg-yellow-500 text-bold rounded"
            >
              <i class="fa-solid fa-file-pdf mr-2 fa-xm"></i> Pdf
            </router-link>
          </div>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
