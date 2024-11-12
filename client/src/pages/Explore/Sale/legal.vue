<script setup>
import { ref, onMounted } from "vue";
import Title from "@/components/Title.vue";
import ProccessModal from "../../../components/Sale/ProccessModal.component.vue";
import StatusInfoModal from "../../../components/Sale/StatusModal.component.vue";
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
const is_status_info_modal = ref(false)
const StatusModal = (id) => {
  is_status_info_modal.value = !is_status_info_modal.value
  console.log(id);
}
const innerVisible = ref(false);
const cardId = ref();
const isProccessModal = ref(false);
const ProccessModalById = (id) => {
  isProccessModal.value = !isProccessModal.value;
  cardId.value = id;
};
const isProccess = (is_proccess) => {
  isProccessModal.value = is_proccess
}
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
    await getAll(); getAllLength();
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
              <span class=" ">1</span>/{{ (all_length ? all_length.notConfirmed_length : 0) || 0 }}</span>
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
              <span class=" ">0</span>/{{ (all_length ? all_length.provide_length_length : 0) || 0 }}</span>
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
            <router-link to="" @click="StatusModal(scope.row.order_status)"
              class="cursor-pointer inline-flex items-center text-red bg-[#e4e9e9] hover:bg-[#f7efa9]  focus:ring-blue-300 font-medium rounded-md text-[12px] w-ful p-[5px] sm:w-auto text-center">
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
              @click="ProccessModalById(scope.row._id)"
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
  <!-- // Proccess Modal -->
  <ProccessModal @isProccess="isProccess" :isProccessModal="isProccessModal" :cardId="cardId" />
  <!-- ////// -->
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
  <StatusInfoModal :is_status="is_status_info_modal" />
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
