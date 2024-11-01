<script setup>
import { onMounted, ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import Cookies from "js-cookie";
const employe = JSON.parse(Cookies.get("account")).username;
import { useStore } from "vuex";
import Title from "@/components/Title.vue";
import { TransferInfoService } from "../../ApiServices/Transfer/transfer_info.service";
import { ProductsService } from "../../ApiServices/Products/products.service";

import { toast } from "vue3-toastify";
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
const fullPage = ref(false);

function ToastError(data) {
  toast.error(data.msg, {
    autoClose: 3000,
  });
}
function ToastSuccess(data) {
  toast.success(data.msg, {
    autoClose: 3000,
  });
}
function ToastInfo(data) {
  toast.info(data.msg, {
    autoClose: 1500,
  });
}
const router = useRouter();
const route = useRoute();
const store = useStore();
const ext = ref({
  from: "",
  to: "",
  status: "",
  createdAt: "",
  name: "",
  page: 1,
  limit: 10,
});
const options = computed(() => {
  return store.state.change_limit_options;
});
const change_limit = ref("");
const onChange = async (change_limit) => {
  if (change_limit) {
    ext.value.page = 1;
    ext.value.limit = change_limit;
    await TransferGetList();
  } else {
    ext.value.page = 1;
    ext.value.limit = 10;
    await TransferGetList();
  }
};
const handleSizeChange = (limit) => {
  return (limit = 10);
};
const handleCurrentChange = (page) => {
  ext.value.page = page;
  ext.value.limit = 10;
  TransferGetList();
};
const visible = ref(false);
const total = ref("");
const transfer_info_list = ref([]);
const TransferGetList = async () => {
  const loader = loading.show();
  try {
    const res = await TransferInfoService.GetList(ext.value);
    transfer_info_list.value = res.data.data;
    total.value = res.data.total;

    loader.hide();
  } catch (err) {
    ToastError({ msg: err.message });
  }
};
const tabPosition = ref("left");
const transfer_data_by_id = ref([]);
const transferDataShowById = async (id) => {
  try {
    const res = await TransferInfoService.TransferDataShowById(id);
    transfer_data_by_id.value = res.data.data;

    visible.value = true;
  } catch (err) {
    ToastError({ msg: err.message });
  }
};
const TransferConfirmation = async (id) => {
  const loader = loading.show();
  try {
    const res = await TransferInfoService.TransferDataShowById(id);
    const items = res.data.data;
    const transfer_items = items.transfer_products;

    for (let i = 0; i <= transfer_items.length - 1; i++) {
      const item = {
        name: transfer_items[i].name,

        sklad: transfer_items[i].sklad,

        count: transfer_items[i].transfer_count,

        categories: transfer_items[i].categories,

        price: transfer_items[i].price,

        description: transfer_items[i].description,

        code: transfer_items[i].code,

        unit: transfer_items[i].unit,

        image: transfer_items[i].image,

        isType: "Chiquvchi",

        productionDate: transfer_items[i].productionDate,

        expirationDate: transfer_items[i].expirationDate,
      };

      const res = await ProductsService.CreateProduct(item);
    }
    for (let j = 0; j <= transfer_items.length - 1; j++) {
      const d = {
        name: transfer_items[j].name,

        sklad: items.to,

        count: transfer_items[j].transfer_count,

        categories: transfer_items[j].categories,

        price: transfer_items[j].price,

        description: transfer_items[j].description,

        code: transfer_items[j].code,

        unit: transfer_items[j].unit,

        image: transfer_items[j].image,

        isType: "Kiruvchi",

        productionDate: transfer_items[j].productionDate,

        expirationDate: transfer_items[j].expirationDate,
      };
      const res = await ProductsService.CreateProduct(d);
    }
    const status = (items.status = "Tasdiqlangan");
    const data = await TransferInfoService.TransferConfirmationById({
      items,
    });

    const pdf = await PDFService.CreatePDf(data.data);

    //
    ToastSuccess({ msg: data.data.msg });
    // setTimeout(() => {
    //   document.location.href = "/explore/products/transfer";
    // }, 1500);
    loader.hide();
  } catch (err) {
    ToastError({ msg: err.message });
  }
};
const TransferConfirmationByModal = async () => {
  const loader = loading.show();
  try {
    const res = await TransferInfoService.TransferDataShowById(
      transfer_data_by_id.value._id
    );
    const items = res.data.data;
    const status = (items.status = "Tasdiqlangan");
    const data = await TransferInfoService.TransferConfirmationById({
      items,
    });

    ToastSuccess({ msg: data.data.msg });
    setTimeout(() => {
      document.location.href = "/explore/products/transfer";
    }, 1500);
    loader.hide();
  } catch (err) {
    ToastError({ msg: err.message });
  }
};
const TransferCancel = async (id) => {
  try {
    const items = await TransferInfoService.TransferDataShowById(
      transfer_data_by_id.value._id
    );
    const status = (items.data.data.status = "Rad etilgan");
    const data = await TransferInfoService.TransferCancelById({
      items,
    });
    ToastSuccess({ msg: data.data.msg });
    setTimeout(() => {
      document.location.href = "/explore/products/transfer";
    }, 1500);
  } catch (err) {
    ToastError({ msg: err.message });
  }
};
const emit = defineEmits(["TransferEdit"]);
const TransferEdit = async (id) => {
  try {
    const items = await TransferInfoService.TransferDataShowById(id);
    emit("TransferEdit", items);
  } catch (err) {
    ToastError({ msg: err.message });
  }
};
const TransferDelete = async (id) => {
  try {
    const data = await TransferInfoService.TransferDelete(id);

    ToastSuccess({ msg: data.data.msg });
    setTimeout(() => {
      document.location.href = "/explore/products/transfer";
    }, 2000);
  } catch (err) {
    ToastError({ msg: err.message });
  }
};

const sklad = ref([]);
const GetSklad = async () => {
  try {
    const res = await ProductsService.GetSkladList();
    sklad.value = res.data.sklad;
  } catch (err) {
    console.log(err.message);
  }
};
const status = ref([]);
const GetStatus = async () => {
  try {
    const res = await ProductsService.GetStatusList();
    status.value = res.data.status;
  } catch (err) {
    console.log(err.message);
  }
};

onMounted(async () => {
  try {
    await TransferGetList();
    GetSklad();
    GetStatus();
  } catch (err) {
    console.log(err);
  }
});
</script>

<template>
  <div>
    <Title>
      <template v-slot:title>
        <h3>Transferlar</h3>
      </template>
    </Title>
    <div v-show="visible" class="rounded-md">
      <el-dialog class="rounded-md" v-model="visible" :show-close="false">
        <template #header="{ close, titleId, titleClass }">
          <div class="my-header bg-white shadow-md p-2 rounded-sm">
            <h4 :id="titleId" :class="titleClass">Transfer</h4>
            <div
              v-show="transfer_data_by_id.status === 'Tasdiqlanmagan'"
              class="inline-flex cursor-pointer items-center text-gray-500 border-[1px] border-red-500 bg-red-100 hover:bg-red-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-2 py-1 text-center"
            >
              {{ transfer_data_by_id.status }}
            </div>
            <div
              v-show="transfer_data_by_id.status === 'Tasdiqlangan'"
              class="inline-flex cursor-pointer items-center text-gray-500 border-[1px] border-[#36d887] bg-[#b9e6cf] hover:bg-[#36d887] hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-2 py-1 text-center"
            >
              {{ transfer_data_by_id.status }}
            </div>
            <div
              v-show="transfer_data_by_id.status === 'Rad etilgan'"
              class="inline-flex cursor-pointer items-center text-gray-500 border-[1px] border-yellow-400 hover:bg-yellow-400 hover:text-white bg-yellow-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-2 py-1 text-center"
            >
              {{ transfer_data_by_id.status }}
            </div>
            <div
              class="inline-flex cursor-pointer items-center bg-yellow-500 text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-2 py-1 text-center"
            >
              <i
                class="fa-solid fa-file-excel mr-2 fa-sm"
                style="color: #ffffff"
              ></i
              >Excel
            </div>

            <div class="space-x-2">
              <router-link
                v-show="transfer_data_by_id.status === 'Tasdiqlanmagan'"
                to=""
                @click="TransferConfirmationByModal"
                class="inline-flex text-[12px] items-center px-3 py-1 text-sm font-medium text-center text-white bg-[#36d887] text-bold rounded focus:ring-4 focus:outline-none"
                ><i class="fa-solid fa-check mr-2 fa-sm"></i>
                Tasdiqlash</router-link
              >
              <router-link
                v-show="transfer_data_by_id.status === 'Tasdiqlanmagan'"
                @click="TransferCancel"
                to=""
                class="inline-flex text-[12px] items-center px-3 py-1 text-sm font-medium text-center text-white bg-red-500 text-bold rounded focus:ring-4 focus:outline-none"
                ><i class="fa-solid fa-x fa-sm mr-2"></i> Bekor
                qilish</router-link
              >
            </div>
          </div>
        </template>
        <div class="rounded-md p-2 shadow-md mb-2 flex justify-between">
          <h6><b>Ijrochi</b>: {{ employe }}</h6>
          <h6><b>Chiquvchi</b>: {{ transfer_data_by_id.from }}</h6>
          <h6><b>Kiruvch</b>: {{ transfer_data_by_id.to }}</h6>
        </div>

        <div class="shadow-md rounded min-h-[15px]">
          <!-- // TRansfer table  -->
          <el-table
            class="w-full"
            header-align="center"
            min-height="300"
            max-height="400"
            empty-text="Mahsulot kiritilmagan... "
            :default-sort="[
              { prop: 'name', order: 'descending' },
              { prop: 'count', order: 'descending' },
              { prop: 'tranfer', order: 'descending' },
            ]"
            :data="transfer_data_by_id.transfer_products"
            border
            style="width: 100%"
          >
            <el-table-column
              header-align="center"
              align="center"
              type="index"
              prop="index"
              fixed="left"
              label="№"
              width="50"
            />

            <el-table-column
              header-align="center"
              sortable
              prop="name"
              label="Mahsulot"
              width="150"
            />
            <el-table-column
              header-align="center"
              sortable
              prop="sklad"
              label="Sklad"
              width="100"
            />
            <el-table-column
              header-align="center"
              sortable
              prop="categories"
              label="Categoriyasi"
              width="150"
            />
            <el-table-column
              header-align="center"
              sortable
              prop="unit"
              label="Birligi"
              width="100"
            />
            <el-table-column
              header-align="center"
              sortable
              prop="code"
              label="Kodi"
              width="100"
            />
            <el-table-column
              header-align="center"
              sortable
              prop="transfer_count"
              label="Soni"
              width="100"
            />

            <el-table-column
              header-align="center"
              sortable
              prop="price"
              label="Narxi"
              width="100"
            />
            <el-table-column
              header-align="center"
              sortable
              prop="total_price"
              label="Summa"
              width="120"
            />

            <el-table-column
              fixed="right"
              prop="id"
              label="Actions"
              width="100"
              header-align="center"
              align="center"
            >
              <template #default="scope">
                <!-- scope.row.id -->
                <router-link
                  v-show="transfer_data_by_id.status === 'Tasdiqlanmagan'"
                  :to="`/explore/products/list/${scope.row._id}`"
                  class="inline-flex items-center mt-4 text-white bg-[#36d887] font-medium rounded-md text-sm w-full sm:w-auto px-2 py-3 text-center"
                >
                  <i class="fa-solid fa-pen fa-xs text-black"></i>
                </router-link>
                <router-link
                  to=""
                  @click="DeleteProduct(scope.row._id)"
                  class="inline-flex items-center mt-4 ml-2 text-white bg-red-600 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-2 py-3 text-center"
                >
                  <i class="text-black fa-sharp fa-solid fa-trash fa-xs"></i>
                </router-link>
              </template>
            </el-table-column>
          </el-table>
          <!-- // -->
        </div>
      </el-dialog>
    </div>
    <form
      class="filter-box md:grid md:grid-cols-4 gap-2 sm:flex sm:flex-wrap rounded shadow-md bg-white p-3 mt-1 mb-3 text-[12px]"
    >
      <div class="mb-1 col-span-1">
        <label
          class="block mb-1 text-[12px] font-medium text-gray-900 dark:text-white"
          >Vaqt bo'yicha izlash...</label
        >
        <el-date-picker
          clearable
          type="date"
          v-model="ext.createdAt"
          @change="TransferGetList()"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
          placeholder="06-11-2023"
          size="small"
          default="06-11-2023"
          style="width: 99%"
        />
      </div>

      <div class="mb-1 col-span-1">
        <label
          name=""
          for=""
          class="block mb-1 text-[12px] font-medium text-gray-900 dark:text-white"
          >Chiquvchi skalad bo'yicha
        </label>
        <el-select
          v-model="ext.from"
          @change="TransferGetList()"
          clearable
          class="w-[100%]"
          placeholder="S2"
          size="small"
        >
          <el-option
            v-for="item in sklad"
            :key="item"
            :label="item.name"
            :value="item.name"
          />
        </el-select>
      </div>

      <div class="mb-1 col-span-1">
        <label
          name=""
          for=""
          class="block mb-1 text-[12px] font-medium text-gray-900 dark:text-white"
          >Kiruvchi skalad bo'yicha</label
        >
        <el-select
          v-model="ext.to"
          @change="TransferGetList()"
          clearable
          size="small"
          class="w-[100%]"
          placeholder="S1"
        >
          <el-option
            v-for="item in sklad"
            :key="item"
            :label="item.name"
            :value="item.name"
          />
        </el-select>
      </div>

      <div class="mb-1 col-span-1">
        <label
          name=""
          for=""
          class="block mb-1 text-[12px] font-medium text-gray-900 dark:text-white"
          >Status bo'yicha</label
        >
        <el-select
          @change="TransferGetList()"
          v-model="ext.status"
          size="small"
          clearable
          class="w-[100%]"
          placeholder="Tasdiqlangan..."
        >
          <el-option
            v-for="item in status"
            :key="item"
            :label="item.name"
            :value="item.name"
          />
        </el-select>
      </div>
    </form>

    <div class="shadow-md rounded min-h-[15px]">
      <!-- // TRansfer table  -->
      <el-table
        class="w-full"
        header-align="center"
        min-height="200"
        max-height="400"
        empty-text="Mahsulot topilmadi... "
        :default-sort="[
          { prop: 'name', order: 'descending' },
          { prop: 'count', order: 'descending' },
          { prop: 'from', order: 'descending' },
          { prop: 'to', order: 'descending' },
          { prop: 'status', order: 'descending' },
        ]"
        :data="transfer_info_list"
        border
      >
        <el-table-column
          header-align="center"
          align="center"
          type="index"
          prop="index"
          fixed="left"
          label="№"
          width="120"
        />

        <el-table-column
          header-align="center"
          sortable
          prop="from"
          label="Dan"
          width="250"
        />
        <el-table-column
          header-align="center"
          sortable
          prop="to"
          label="Ga "
          width="250"
        />

        <el-table-column
          header-align="center"
          align="center"
          sortable
          prop="status"
          label="Status"
          width="200"
        >
          <template #default="scope">
            <div
              v-show="scope.row.status === 'Tasdiqlanmagan'"
              class="inline-flex cursor-pointer items-center text-gray-500 border-[1px] border-red-500 bg-red-100 hover:bg-red-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-2 py-1 text-center"
            >
              {{ scope.row.status }}
            </div>
            <div
              v-show="scope.row.status === 'Tasdiqlangan'"
              class="inline-flex cursor-pointer items-center text-gray-500 border-[1px] border-[#36d887] bg-[#b9e6cf] hover:bg-[#36d887] hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-2 py-1 text-center"
            >
              {{ scope.row.status }}
            </div>
            <div
              v-show="scope.row.status === 'Rad etilgan'"
              class="inline-flex cursor-pointer items-center text-gray-500 border-[1px] border-yellow-400 hover:bg-yellow-400 hover:text-white bg-yellow-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-2 py-1 text-center"
            >
              {{ scope.row.status }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          sortable
          prop=""
          label="Vaqt"
          width="300"
        >
          <template #default="scope">
            <h5>{{ scope.row.createdAt.slice(0, 10) }}</h5>
          </template>
        </el-table-column>

        <el-table-column
          fixed="right"
          prop="id"
          label="Actions"
          width="300"
          header-align="center"
          align="center"
        >
          <template #default="scope">
            <!-- scope.row.id -->
            <router-link
              @click="TransferConfirmation(scope.row._id)"
              v-show="scope.row.status === 'Tasdiqlanmagan'"
              to=""
              class="inline-flex items-center mt-4 text-white bg-[#36d887] font-medium rounded-md text-sm w-full sm:w-auto px-2 py-3 text-center"
            >
              <i class="fa-solid fa-check fa-sm"></i>
            </router-link>
            <router-link
              v-show="scope.row.status === 'Tasdiqlanmagan'"
              to=""
              @click="TransferEdit(scope.row._id)"
              class="inline-flex items-center ml-2 mt-4 text-white bg-[#36d887] font-medium rounded-md text-sm w-full sm:w-auto px-2 py-3 text-center"
            >
              <i class="fa-solid fa-pen fa-xs text-black"></i>
            </router-link>
            <router-link
              @click="transferDataShowById(scope.row._id)"
              to=""
              class="inline-flex ml-2 items-center mt-4 text-white bg-yellow-500 hover:bg-yellow-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-2 py-3 text-center"
            >
              <i class="text-black fa-regular fa-eye fa-xs"></i>
            </router-link>
            <router-link
              to=""
              @click="TransferDelete(scope.row._id)"
              class="inline-flex items-center mt-4 ml-2 text-white bg-red-600 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-2 py-3 text-center"
            >
              <i class="text-black fa-sharp fa-solid fa-trash fa-xs"></i>
            </router-link>
          </template>
        </el-table-column>
      </el-table>
      <!-- // -->
    </div>

    <!-- // Paganation -->
    <div
      class="pagenation text-[12px] mt-2 py-2 text-center bg-white p-4 shadow hover:shadow-xl rounded md:flex md:justify-between sm:flex-wrap"
    >
      <div
        class="bg-[#409EFF] w-[15%] inline-grid text-[12px] font-bold rounded-md text-white mt-3 mb-3 text-center"
      >
        <p class="mt-2">Jami : {{ total }}</p>
      </div>
      <div class="md:w-[30%] sm:w-[100%] m-auto">
        <el-pagination
          style="color: #36d887"
          type="success"
          small
          background
          layout="prev, pager, next"
          :total="total"
          class="mt-2 mb-1 text-center"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
      <div class="mt-2 mb-1 text-center">
        <el-select
          @change="onChange(change_limit)"
          v-model="change_limit"
          clearable
          class="m-2 w-[40%]"
          placeholder="10"
        >
          <el-option
            v-for="item in options"
            :key="item.label"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>

      <el-radio-group v-model="tabPosition" class="mt-2 mb-1 text-center">
        <el-radio-button label="left">So'm</el-radio-button>
        <el-radio-button label="right">Dollor</el-radio-button>
      </el-radio-group>
    </div>
    <!-- // -->
  </div>
</template>

<style scoped>
.my-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
