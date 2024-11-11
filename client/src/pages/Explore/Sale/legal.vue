<script setup>
import { ref, onMounted ,onBeforeMount} from "vue";
import Title from "@/components/Title.vue";
import { SaleLegalService } from "@/ApiServices/Sale/saleLegal.service";
import { useRouter } from "vue-router";
import { ToastifyService } from "../../../utils/Toastify";
import { loading } from ".././../../utils/Loader"
const router = useRouter();
const isEditModal = ref(false)
const model = ref({})
const edit_id = ref()
const getByIdForUpdate = async (id) => {
  isEditModal.value = !isEditModal.value
  edit_id.value = id
  try {
    const data = await SaleLegalService.getOne(id)
    model.value = data.data
  } catch (error) {
    return ToastifyService.ToastError({ msg: error.messages });
  }
}
const Update = async () => {
  try {

    if (edit_id.value && model.value) {
      const update = await SaleLegalService.Edit(edit_id.value, model.value)
      ToastifyService.ToastSuccess({
        msg: update.data.msg,
      });
      window.location.href = "/explore/sale/legal"
    }
  } catch (error) {
    return ToastifyService.ToastError({ msg: error.messages });
  }
}
const DeleteById = async (id) => {
  try {
    const loading = loader.show()
    const data = await SaleLegalService.Delete(id)
    loader.hide()
    ToastifyService.ToastSuccess({
      msg: data.data.msg,
    });
    const Refresh = () => {
      window.location.href = "/explore/sale/legal"
    }
    setTimeout(Refresh, 1500)
  } catch (error) {
    return ToastifyService.ToastError({ msg: error.messages });
  }
}
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
    const loader = loading.show()
    const Id = await SaleLegalService.confirm({ id });
    loader.hide()
    ToastifyService.ToastSuccess({ msg: "Sotuv tasdiqlandi va bo'yoqqa yuborildi", });
    const TimeOut = () => {
      window.location.href = "/explore/sale/legal"
    }
    setTimeout(TimeOut, 1500)
  } catch (error) {
    return ToastifyService.ToastError({ msg: error.messages });
  }
};
const all_length = ref();
const getAllLength = async () => {
  const loader = loading.show()
  const data = await SaleLegalService.getAllLength();
  loader.hide()
  all_length.value = data.data ? data.data : {};
  
}
const items = ref([]);
const getAll = async () => {
  const loader = loading.show()
  const data = await SaleLegalService.getAll({ status: isActive.value });
  loader.hide()
  items.value = data.data ? data.data : [];
  
}
const isActive = ref(1)
const ActiveTabLink = (num) => {
  if (num === 1) {
    isActive.value = 1
    return getAll(1)
  }
  if (num === 2) {
    isActive.value = 2
    return getAll(2)
  }
  if (num === 3) {
    isActive.value = 3
    return getAll(3)
  }
  if (num === 4) {
    isActive.value = 4
    return getAll(4)
  }
  if (num === 5) {
    isActive.value = 5
    return getAll(5)
  }

}

onMounted(async () => {
  try {
    await getAll();getAllLength();
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
    <div class="grid grid-cols-12 grid-flow-col justify-between bg-white rounded-md shadow-md p-2 mb-2 ">
      <div class="col-span-9 grid-flow-col ">
        <router-link @click="ActiveTabLink(1)" to="" :class="{ activeTab: isActive === 1 }"
          class="inline-flex  text-[13px] items-center mr-1 px-4 py-1 mb-1 text-sm font-medium text-center text-red hover:border-b-2 border-solid border-[#36d887] bg-[#e4e9e9] text-bold rounded ">
          <i class="fa-solid fa-info mr-2 fa-xm"></i> Sotuv
          <div class="flex flex-shrink-0 ml-2">
            <span
              class=" inline-flex items-center justify-center h-5 text-[11px] font-medium text-white bg-red-500 px-3 py-2 rounded">
              <span class=" ">1</span>/{{(all_length ? all_length.notConfirmed_length : 0) || 0 }}</span>
          </div>
        </router-link>
        <router-link to="" @click="ActiveTabLink(2)" :class="{ activeTab: isActive === 2 }"
          class="inline-flex text-[13px] items-center mr-1 px-4 py-1 mb-1 text-sm font-medium text-center text-red hover:border-b-2 border-solid border-[#36d887] bg-[#e4e9e9] text-bold rounded ">
          <i class="fa-solid fa-info mr-2 fa-xm"></i> Bo'yoq
          <div class="flex flex-shrink-0 ml-2">
            <span
              class="inline-flex items-center justify-center h-5 text-[11px] font-medium text-white bg-[#36d887] px-3 py-2 rounded">
              <span class=" ">0</span>/{{ (all_length ? all_length.paint_length : 0) || 0 }}</span>
          </div>
        </router-link>
        <router-link to="" @click="ActiveTabLink(3)" :class="{ activeTab: isActive === 3 }"
          class="inline-flex text-[13px] items-center mr-1 px-4 py-1 mb-1 text-sm font-medium text-center text-red hover:border-b-2 border-solid border-[#36d887] bg-[#e4e9e9] text-bold rounded ">
          <i class="fa-solid fa-info mr-2 fa-xm"></i> To'quv
          <div class="flex flex-shrink-0 ml-2">
            <span
              class="inline-flex items-center justify-center h-5 text-[11px] font-medium text-white bg-[#36d887] px-3 py-2 rounded"><span
                class=" ">0</span>/{{ (all_length ? all_length.weaving_length : 0) || 0 }}</span>
          </div>
        </router-link>
        <router-link to="" @click="ActiveTabLink(4)" :class="{ activeTab: isActive === 4 }"
          class="inline-flex text-[13px] items-center mr-1  px-4 py-1 mb-1 text-sm font-medium text-center text-red hover:border-b-2 border-solid border-[#36d887] bg-[#e4e9e9] text-bold rounded ">
          <i class="fa-solid fa-info mr-2 fa-xm"></i> Yigiruv
          <div class="flex flex-shrink-0 ml-2">
            <span
              class="inline-flex items-center justify-center h-5 text-[11px] font-medium text-white bg-[#36d887] px-3 py-2 rounded"><span
                class=" ">0</span>/{{ (all_length ? all_length.spinning_length : 0) || 0 }}</span>
          </div>
        </router-link>
        <router-link to="" @click="ActiveTabLink(5)" :class="{ activeTab: isActive === 5 }"
          class="inline-flex text-[13px] items-center px-4 py-1 mb-1 text-sm font-medium text-center text-red hover:border-b-2 border-solid border-[#36d887] bg-[#e4e9e9] text-bold rounded ">
          <i class="fa-solid fa-info mr-2 fa-xm"></i> Taminot
          <div class="flex flex-shrink-0 ml-2">
            <span
              class="inline-flex items-center justify-center h-5 text-[11px] font-medium text-white bg-[#36d887] px-3 py-2 rounded">
              <span class=" ">0</span>/{{(all_length ? all_length.provide_length_length : 0) || 0}}</span>
          </div>
        </router-link>
      </div>
      <div class="row-span-1 flex justify-end flex-wrap col-span-3 grid-flow-col">
        <div class="col-span-2"></div>
        <div class="col-span-1">
          <router-link to="/explore/sale/legal/create"
            class="inline-flex  items-center px-2 py-1 mb-1 text-sm font-medium text-center text-white bg-[#36d887] text-bold rounded ">
            <i class="fa-solid fa-plus mr-2 fa-sm"></i> Karta qo'shish
          </router-link>
        </div>
      </div>
    </div>
    <div class="shadow-md rounded min-h-[15px]">
      <!-- // TRansfer table  -->
      <el-table load class="w-full" header-align="center" hight="5" style="width: 100%"
        empty-text="Mahsulot tanlanmagan... " :default-sort="[
          { prop: 'customer_name', order: 'customer_name' },
          { prop: 'order_number', order: 'order_number' },
          { prop: 'pro_type', order: 'pro_type' },
          { prop: 'delivery_time', order: 'delivery_time' },
        ]" :data="items" border min-height="300" max-height="400">
        <el-table-column header-align="center" align="center" type="index" prop="index" fixed="left" label="№"
          width="60" />

        <el-table-column header-align="center" sortable prop="customer_name" label="Buyurtmachi" width="200" />

        <el-table-column header-align="center" sortable prop="order_number" label="Buyurtma nomeri" width="200" />
        <el-table-column prop="pro_type" sortable label="Turi" width="180" header-align="center" align="center" />
        <el-table-column prop="pro_name" label="Nomi" width="180" header-align="center" align="center" />
        <el-table-column prop="pro_color" label="Rangi" width="180" header-align="center" align="center" />
        <el-table-column prop="order_quantity" label="Miqdori" width="180" header-align="center" align="center" />
        <el-table-column prop="delivery_time" sortable label="Muddati" width="180" header-align="center"
          align="center" />
        <el-table-column fixed="right" prop="order_status" label="Holati" width="150" header-align="center"
          align="center">
          <template #default="scope">
            <router-link to=""
              class="inline-flex items-center text-red bg-[#e4e9e9] hover:bg-[#f7efa9]  focus:ring-blue-300 font-medium rounded-md text-[12px] w-ful p-[5px] sm:w-auto text-center">
              {{ scope.row.order_status }}
            </router-link>
          </template>
        </el-table-column>
        <el-table-column fixed="right" prop="id" label="" width="200" header-align="center" align="center">
          <template #default="scope">
            <router-link v-show="scope.row.order_status === 'Tasdiqlanmagan'" to="" @click="Confirm(scope.row._id)"
              class="inline-flex items-center mt-4 ml-2 text-red bg-[#eedc36] hover:bg-yellow-400 font-medium rounded-md text-sm w-full sm:w-auto px-2 py-3 text-center">
              <i class="text-red fa-solid fa-check fa-xs fa- fa-xs"></i>
            </router-link>
            <router-link to="" v-show="scope.row.order_status !== 'Tasdiqlanmagan'"
              @click="openModalById(scope.row._id)"
              class="inline-flex items-center mt-4 ml-2 text-white bg-[#36d887] hover:bg-[rgb(57,192,124)] font-medium rounded-md text-sm w-full sm:w-auto px-3 py-3 text-center">
              <i class="text-black fa-sharp fa-solid fa-info fa-xs"></i>
            </router-link>
            <router-link v-show="scope.row.order_status === 'Tasdiqlanmagan'" to=""
              @click="getByIdForUpdate(scope.row._id)"
              class="inline-flex items-center mt-4 ml-2 text-white bg-[#36d887] hover:bg-[rgb(57,192,124)] font-medium rounded-md text-sm w-full sm:w-auto px-2 py-3 text-center">
              <i class="text-black fa-sharp fa-solid fa-edit fa-xs"></i>
            </router-link>
            <router-link to="" @click="DeleteById(scope.row._id)"
              class="inline-flex items-center mt-4 ml-2 text-white bg-red-500 hover:bg-red-600 font-medium rounded-md text-sm w-full sm:w-auto px-2 py-3 text-center">
              <i class="text-black fa-sharp fa-solid fa-trash fa-xs"></i>
            </router-link>
            <router-link to="" @click="Export_Excel(scope.row._id)"
              class="inline-flex items-center mt-4 ml-2 text-white bg-yellow-300 hover:bg-yellow-400 font-medium rounded-md text-sm w-full sm:w-auto px-2 py-3 text-center">
              <i class="text-black fa-sharp fa-solid fa-file-excel fa-xs"></i>
            </router-link>
          </template>
        </el-table-column>
      </el-table>
      <!-- // -->
    </div>
  </div>
  <el-dialog v-model="outerVisible" title="Buyurtmani ishlab chiqarish jarayoni bo'yicha malumotlari" width="700">
    <div>
      <div>
        <span to=""
          class="inline-flex text-[11px] items-center px-2 py-1 mb-1 text-sm font-medium text-center text-white bg-[#36d887] text-bold rounded ">
          Bo'yoqqa yuborildi
        </span>
        =>
        <span to=""
          class="inline-flex text-[11px] items-center px-2 py-1 mb-1 text-sm font-medium text-center text-white bg-[#36d887] text-bold rounded ">
          Taminotga yuborildi
        </span>
        =>
        <span to=""
          class="inline-flex text-[11px] items-center px-2 py-1 mb-1 text-sm font-medium text-center text-white bg-[#36d887] text-bold rounded ">
          To'quvga yuborildi </span>=>
        <span to=""
          class="inline-flex text-[11px] items-center px-2 py-1 mb-1 text-sm font-medium text-center text-white bg-yellow-500 text-bold rounded ">
          Tikuvga yuborildi
        </span>
      </div>
      <div class="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
        <div class="grid grid-cols-3 gap-1 border-t-[1.5px] border-solid border-[#36d887]">
          <header class="py-3 border-b border-gray-100 dark:border-gray-700/60">
            <h5 class="font-semibold text-[12px] text-gray-800 dark:text-gray-100">
              Buyurtmachi nomi : Humo MCHJ
            </h5>
          </header>
          <header class="py-3 border-b border-gray-100 dark:border-gray-700/60">
            <h5 class="font-semibold text-[12px] text-gray-800 dark:text-gray-100">
              Buyurtmachi miqdori : 500 kg
            </h5>
          </header>
          <header class="py-3 border-b border-gray-100 dark:border-gray-700/60">
            <h5 class="font-semibold text-[12px] text-gray-800 dark:text-gray-100">
              Buyurtmachi nomi : Suprima
            </h5>
          </header>
        </div>

        <div class="">
          <!-- Card content -->
          <!-- "Today" group -->
          <div>
            <header @click="isDepInfoBtn()"
              class="text-xs uppercase text-center cursor-pointer text-white dark:text-gray-500 bg-[#36d887] dark:bg-gray-700 dark:bg-opacity-50 rounded-sm font-semibold p-2">
              Bo'limlar bo'yicha ma'lumotini ko'rish
              <span class="hidden sm:inline"> -&gt;</span>
            </header>
            <ul v-show="isDepInfo" class="my-1">
              <!-- Item -->
              <li class="flex px-2 cursor-pointer">
                <div class="w-9 h-9 rounded-full shrink-0 bg-red-500 my-2 mr-3">
                  <svg class="w-9 h-9 fill-current text-white" viewBox="0 0 36 36">
                    <path d="M25 24H11a1 1 0 01-1-1v-5h2v4h12v-4h2v5a1 1 0 01-1 1zM14 13h8v2h-8z" />
                  </svg>
                </div>
                <div class="grow flex items-center border-b border-gray-100 dark:border-gray-700/60 text-sm py-1">
                  <div class="grow flex justify-between">
                    <div class="self-center text-[16px]">Bo'yoq</div>
                    <div class="shrink-0 self-end ml-2">
                      <span class="hidden sm:inline"> -&gt;</span>
                    </div>
                  </div>
                </div>
              </li>
              <div class="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
                <div class="p-3">
                  <!-- Table -->
                  <div class="overflow-x-auto">
                    <table class="table-auto w-full">
                      <!-- Table header -->
                      <thead
                        class="text-xs text-center font-semibold dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50">
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
                      <tbody class="text-sm text-center divide-y divide-gray-100 dark:divide-gray-700/60">
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
                  <svg class="w-9 h-9 fill-current text-white" viewBox="0 0 36 36">
                    <path d="M25 24H11a1 1 0 01-1-1v-5h2v4h12v-4h2v5a1 1 0 01-1 1zM14 13h8v2h-8z" />
                  </svg>
                </div>
                <div class="grow flex items-center border-b border-gray-100 dark:border-gray-700/60 text-sm py-1">
                  <div class="grow flex justify-between">
                    <div class="self-center text-[16px]">Taminot</div>
                    <div class="shrink-0 self-end ml-2">
                      <span class="hidden sm:inline"> -&gt;</span>
                    </div>
                  </div>
                </div>
              </li>
              <div class="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
                <div class="p-3">
                  <!-- Table -->
                  <div class="overflow-x-auto">
                    <table class="table-auto w-full">
                      <!-- Table header -->
                      <thead
                        class="text-xs text-center font-semibold dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50">
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
                      <tbody class="text-sm text-center divide-y divide-gray-100 dark:divide-gray-700/60">
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
                  <svg class="w-9 h-9 fill-current text-white" viewBox="0 0 36 36">
                    <path d="M25 24H11a1 1 0 01-1-1v-5h2v4h12v-4h2v5a1 1 0 01-1 1zM14 13h8v2h-8z" />
                  </svg>
                </div>
                <div class="grow flex items-center border-b border-gray-100 dark:border-gray-700/60 text-sm py-1">
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
                  <svg class="w-9 h-9 fill-current text-white" viewBox="0 0 36 36">
                    <path d="M25 24H11a1 1 0 01-1-1v-5h2v4h12v-4h2v5a1 1 0 01-1 1zM14 13h8v2h-8z" />
                  </svg>
                </div>
                <div class="grow flex items-center border-b border-gray-100 dark:border-gray-700/60 text-sm py-1">
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

    <el-dialog v-model="innerVisible" width="500" title="Inner Dialog" append-to-body>
      <span>This is the inner Dialog</span>
    </el-dialog>
    <template #footer>
      <div class="dialog-footer">
        <div class="">
          <router-link @click="outerVisible" to=""
            class="inline-flex text-[13px] items-center px-2 py-1 mb-1 text-sm font-medium text-center text-white bg-yellow-500 text-bold rounded ">
            <i class="fa-solid fa-file-excel mr-2 fa-xm"></i> Excel
          </router-link>
        </div>
      </div>
    </template>
  </el-dialog>
  <!-- // EDIT Modal -->
  <el-dialog v-model="isEditModal" title="Sotuv kartani o'zgartirish oynasi " width="700">
    <span>
      <form
        class="filter-box md:grid md:grid-cols-3 gap-2 sm:flex sm:flex-wrap rounded shadow-md bg-white p-3 mt-1 mb-3 text-[12px]">
        <div class="mb-1 col-span-1">
          <label name="resul" class="block mb-1 text-[12px] font-medium text-gray-900 dark:text-white">Buyurtmachi
            nomi</label>
          <el-input v-model="model.customer_name" clearable class="w-[100%]" size="smal" type="String"
            placeholder="..." />
        </div>
        <div class="mb-1 col-span-1">
          <label name="resul" class="block mb-1 text-[12px] font-medium text-gray-900 dark:text-white">Buyurtma
            nomeri</label>
          <el-input v-model="model.order_number" clearable class="w-[100%]" size="smal" type="Number"
            placeholder="..." />
        </div>

        <div class="mb-1 col-span-1">
          <label name="resul" class="block mb-1 text-[12px] font-medium text-gray-900 dark:text-white">Mahsulot
            nomi</label>
          <el-input v-model="model.pro_name" clearable class="w-[100%]" size="smal" type="String" placeholder="..." />
        </div>
        <div class="mb-1 col-span-1">
          <label name="resul" class="block mb-1 text-[12px] font-medium text-gray-900 dark:text-white">Mahsulot
            turi</label>
          <el-input v-model="model.pro_type" clearable class="w-[100%]" size="smal" type="String" placeholder="..." />
        </div>
        <div class="mb-1 col-span-1">
          <label name="resul" class="block mb-1 text-[12px] font-medium text-gray-900 dark:text-white">Mahsulot
            rangi</label>
          <el-input v-model="model.pro_color" clearable class="w-[100%]" size="smal" type="String" placeholder="..." />
        </div>
        <div class="mb-1 col-span-1">
          <label name="resul" class="block mb-1 text-[12px] font-medium text-gray-900 dark:text-white">Eni</label>
          <el-input v-model="model.pro_width" clearable class="w-[100%]" size="smal" type="Number" placeholder="..." />
        </div>

        <div class="mb-1 col-span-1">
          <label name="resul" class="block mb-1 text-[12px] font-medium text-gray-900 dark:text-white">Grammaji</label>
          <el-input v-model="model.grammaj" clearable class="w-[100%]" size="smal" type="String" placeholder="..." />
        </div>

        <div class="mb-1 col-span-1">
          <label name="resul" class="block mb-1 text-[12px] font-medium text-gray-900 dark:text-white">Yetkazish
            miqdori</label>
          <el-input v-model="model.order_quantity" clearable class="w-[100%]" size="smal" type="Number"
            placeholder="..." />
        </div>
        <div class="mb-1 col-span-1">
          <label name="resul" class="block mb-1 text-[12px] font-medium text-gray-900 dark:text-white">Yetkazib berish
            muddati</label>
          <el-date-picker class="w-[100%]" v-model="model.delivery_time" clearable type="date"
            placeholder="Yetkazish vaqti" :size="size" />

        </div>
      </form>
    </span>
    <el-dialog v-model="innerVisible" width="500" title="Inner Dialog" append-to-body>
      <span>This is the inner Dialog</span>
    </el-dialog>
    <template #footer>
      <div class="dialog-footer ">

        <!-- <router-link @click="outerVisible = false" to=""
          class="inline-flex text-[12px] items-center ml-2 px-3 py-1 mb-1 mt-2 text-sm font-medium text-center text-white bg-red-500 text-bold rounded ">
          <i class=" mr-2 fa-solid fa-arrow-left fa-sm"></i>Orqaga</router-link> -->
        <router-link @click="Update()" to=""
          class="inline-flex text-[12px] items-center ml-2 px-3 py-1 mb-1 mt-2 text-sm font-medium text-center text-white bg-[#36d887] text-bold rounded ">
          <i class="mr-2 fa-solid fa-check fa-sm"></i>Yangilash</router-link>


      </div>
    </template>
  </el-dialog>
  <!-- // -->
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
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page.sync="currentPage1" :page-size="100" layout="prev, pager, next" :total="1000">
      </el-pagination>
    </div>
  </div>
  <!-- //////// -->
</template>
<style>
.activeTab {
  border-bottom: 2px solid #36d887
}
</style>
