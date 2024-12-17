<script setup>
import { ref, onMounted } from "vue";
import { read, utils, writeFileXLSX } from "xlsx";
import Scanner from "../../components/Seam/Scanner.vue";
import { ToastifyService } from "../../utils/Toastify";
import { loading } from "./../../utils/Loader";
import { SeamStore } from "../../stores/Seam/seam.store";
const store = SeamStore();
import { storeToRefs } from "pinia";
const { isActive } = storeToRefs(store);
import jspdf from "jspdf";
import { SeamWarehouseService } from "../../ApiServices/Seam/warehouse/warehouse.service";
const Export_Excel = () => {
  const heading = [["ID", "Name", "Turi", "Rang kod", "Miqdori", "Birligi"]];
  const ws = utils.json_to_sheet(loadArray.value);
  const wb = utils.book_new();
  utils.sheet_add_aoa(ws, heading);
  utils.book_append_sheet(wb, ws, "Bill Of Load");
  writeFileXLSX(wb, `${Date.now()}.xlsx`);
};
const leaders = ref([]);
const sklads = ref([]);
const responsibles = ref({});
const load = ref({});
const material_name = ref([]);
const material_type = ref([]);
const color_code = ref([]);
const unit = ref([]);

const GetModel = async () => {
  try {
    const data = await SeamWarehouseService.GetModel();
    responsibles.value = data.data.responsibles;
    load.value = data.data.load;
    leaders.value = data.data.leaders;
    sklads.value = data.data.sklads;
    material_name.value = data.data.material_name;
    material_type.value = data.data.material_type;
    color_code.value = data.data.color_code;
    unit.value = data.data.unit;
  } catch (error) {
    return error.message;
  }
};
onMounted(() => {
  GetModel();
});
const Refresh = () => {
  responsiblesBillingObj.value = {};
  loadArray.value = [];
  setQRCodeImageSrc.value = "";
  is_trash.value = true;
  is_download.value = false;
  GetModel();
};

const DeleteByIdFromArray = (data) => {
  const load = data.load;
  const filterLoad = loadArray.value.filter((item) => {
    return item.id !== load.id;
  });
  loadArray.value = filterLoad;
};
const responsiblesBillingObj = ref({});
const formRef = ref();
const ResponsiblesSendToBilling = () => {
  responsiblesBillingObj.value = responsibles.value;
};
const ResponsiblesValidate = async (formRef) => {
  await formRef.validate((valid) => {
    if (valid === true) {
      ResponsiblesSendToBilling();
    } else {
      return false;
    }
  });
};
const loadArray = ref([]);
const formRefLoad = ref();
const PlusToLoad = () => {
  load.value.id = Math.floor(Math.random() * 10000000);
  loadArray.value.push(load.value);
  load.value = {
    name: "",
    type: "",
    color_code: "",
    raw_material_quantity: "",
    unit: "",
  };
};
const PlusToLoadValidate = async (formRefLoad) => {
  await formRefLoad.validate((valid) => {
    if (valid === true) {
      PlusToLoad();
    } else {
      return false;
    }
  });
};

const is_trash = ref(true);
const is_download = ref(false);
const generateQRCode = async () => {
  try {
    is_trash.value = false;
    const loader = loading.show();
    const data = await SeamWarehouseService.GenerateQRCode({
      load: loadArray.value,
      responsibles: responsiblesBillingObj.value,
    });
    is_download.value = true;
    loader.hide();
    ToastifyService.ToastSuccess({
      msg: "QR kode qo'shildi",
    });

    if (data.data.id) {
      getQRImage(data.data.id);
    }
  } catch (error) {
    console.log(error);
  }
};
const setQRCodeImageSrc = ref("");
const getQRImage = async (id) => {
  const item = await SeamWarehouseService.getQRImage({ id });
  if (item) {
    const qr_code_image = item.data.data.qrCodeImage;
    if (qr_code_image && qr_code_image.data) {
      const base64Image = `data:image/png;base64,${btoa(
        new Uint8Array(qr_code_image.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      )}`;
      setQRCodeImageSrc.value = base64Image;
    }
  } else {
    return;
  }
};
const show = ref(false);
const download = () => {
  is_download.value = false;
  const pdf = new jspdf();
  const opt = {
    orientation: "p",
    unit: "cm",
    format: "letter",
    putOnlyUsedFonts: true,
  };
  const element = document.getElementById("content");
  pdf.html(element, {
    callback: function (doc) {
      doc.save("report.pdf", opt);
    },
    x: 5,
    y: 15,
    html2canvas: { scale: 0.175 },
  });
  // html2pdf().set(opt).from(element).save();
  // html2pdf(element, opt);
};
const rules = ref({
  required: true,
  message: `Maydon to'ldirilishi zarur !`,
  trigger: "blur",
});
</script>

<template>
  <div>
    <Scanner v-if="isActive === 3" />
    <div
      v-show="isActive === 2"
      class="grid grid-cols-7 gap-2 bg-white p-1 h-[500px]"
    >
      <div class="col-span-2 shadow overflow-y-auto h-[800]">
        <div
          class="text-center text-[15px] font-semibold bg-[#e4e9e9] p-1 rounded"
        >
          Yuk xatini shakillantirish
        </div>
        <div
          class="text-[15px] font-semibold bg-white rounded shadow hover:shadow-md mt-2"
        >
          <el-form
            ref="formRef"
            :model="responsibles"
            label-width="auto"
            class="filter-box md:grid md:grid-cols-8 gap-1 sm:flex sm:flex-wrap rounded p-2 mt-1 mb-1 text-[12px]"
            size="small"
            label-position="top"
            status-icon
          >
            <div class="col-span-8">
              <el-form-item label="№" prop="invoice_number" :rules="rules">
                <el-input
                  disabled
                  v-model="responsibles.invoice_number"
                  autocomplete="off"
                  placeholder="..."
                >
                </el-input>
              </el-form-item>
            </div>
            <div class="col-span-8">
              <el-form-item label="Kimdan" prop="from_where" :rules="rules">
                <el-select
                  :disabled="responsiblesBillingObj.from_where"
                  v-model="responsibles.from_where"
                  placeholder="..."
                >
                  <el-option
                    autocomplete="on"
                    v-for="item in sklads"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name"
                  >
                    <span
                      style="float: left; font-size: 12px; color: #8492a6"
                      >{{ item.name }}</span
                    >
                    <span
                      style="float: right; color: #36d887; font-size: 10px"
                      >{{ item.role }}</span
                    >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="col-span-8">
              <el-form-item label="Kimga" prop="to_where" :rules="rules">
                <el-select
                  :disabled="responsiblesBillingObj.to_where"
                  v-model="responsibles.to_where"
                  clearable
                  placeholder="..."
                >
                  <el-option
                    v-for="item in sklads"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name"
                  >
                    <span
                      style="float: left; font-size: 12px; color: #8492a6"
                      >{{ item.name }}</span
                    >
                    <span
                      style="float: right; color: #36d887; font-size: 10px"
                      >{{ item.role }}</span
                    >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="col-span-8">
              <el-form-item label="Topshiruvchi" prop="sender" :rules="rules">
                <el-select
                  :disabled="responsiblesBillingObj.sender"
                  v-model="responsibles.sender"
                  clearable
                  placeholder="..."
                >
                  <el-option
                    v-for="item in leaders"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name"
                  >
                    <span
                      style="float: left; font-size: 12px; color: #8492a6"
                      >{{ item.name }}</span
                    >
                    <span
                      style="float: right; color: #36d887; font-size: 10px"
                      >{{ item.role }}</span
                    >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="col-span-8">
              <el-form-item
                label="Qabul qiluvchi"
                prop="receiver"
                :rules="rules"
              >
                <el-select
                  :disabled="responsiblesBillingObj.receiver"
                  v-model="responsibles.receiver"
                  clearable
                  placeholder="..."
                >
                  <el-option
                    v-for="item in leaders"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name"
                  >
                    <span
                      style="float: left; font-size: 12px; color: #8492a6"
                      >{{ item.name }}</span
                    >
                    <span
                      style="float: right; color: #36d887; font-size: 10px"
                      >{{ item.role }}</span
                    >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="col-span-8">
              <el-form-item label="Hisobchi" prop="accountant" :rules="rules">
                <el-select
                  required
                  :disabled="responsiblesBillingObj.accountant"
                  v-model="responsibles.accountant"
                  clearable
                  placeholder="..."
                >
                  <el-option
                    required
                    v-for="item in leaders"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name"
                  >
                    <span
                      style="float: left; font-size: 12px; color: #8492a6"
                      >{{ item.name }}</span
                    >
                    <span
                      style="float: right; color: #36d887; font-size: 10px"
                      >{{ item.role }}</span
                    >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="col-span-8">
              <el-form-item label="Rahbar" prop="director" :rules="rules">
                <el-select
                  required
                  :disabled="responsiblesBillingObj.director"
                  v-model="responsibles.director"
                  clearable
                  placeholder="..."
                >
                  <el-option
                    required
                    v-for="item in leaders"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name"
                  >
                    <span
                      style="float: left; font-size: 12px; color: #8492a6"
                      >{{ item.name }}</span
                    >
                    <span
                      style="float: right; color: #36d887; font-size: 10px"
                      >{{ item.role }}</span
                    >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div
              class="col-span-8 flex justify-end"
              v-if="!responsiblesBillingObj.director"
            >
              <el-form-item>
                <el-button
                  @click="ResponsiblesValidate(formRef)"
                  style="background-color: #36d887; color: white; border: none"
                  >Yuborish <i class="ml-2 fa-solid fa-arrow-right fa-sm"></i
                ></el-button>
              </el-form-item>
            </div>
          </el-form>
        </div>

        <div
          v-show="responsiblesBillingObj.director"
          class="col-span-8 text-[15px] font-semibold bg-white rounded mt-4 shadow hover:shadow-md"
        >
          <div class="text-[15px] font-semibold bg-white rounded">
            <el-form
              ref="formRefLoad"
              :model="load"
              label-width="auto"
              class="filter-box md:grid md:grid-cols-8 gap-1 sm:flex sm:flex-wrap rounded p-2 mt-1 mb-1 text-[12px]"
              size="small"
              label-position="top"
            >
              <div class="col-span-8">
                <el-form-item
                  label="Nomi"
                  prop="name"
                  :rules="[
                    {
                      required: true,
                      message: `Maydon to'ldirilishi zarur !`,
                      trigger: 'blur',
                    },
                  ]"
                >
                  <el-select
                    :disabled="is_trash === false"
                    v-model="load.name"
                    placeholder="..."
                  >
                    <el-option
                      v-for="item in material_name"
                      :key="item.id"
                      :label="item.name"
                      :value="item.name"
                    >
                      <span
                        style="float: left; font-size: 12px; color: #8492a6"
                        >{{ item.name }}</span
                      >
                      <span
                        style="float: right; color: #36d887; font-size: 10px"
                        >{{ item.role }}</span
                      >
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="col-span-8">
                <el-form-item
                  label="Turi"
                  prop="type"
                  :rules="[
                    {
                      required: true,
                      message: `Maydon to'ldirilishi zarur !`,
                      trigger: 'blur',
                    },
                  ]"
                >
                  <el-select
                    :disabled="is_trash === false"
                    v-model="load.type"
                    clearable
                    placeholder="..."
                  >
                    <el-option
                      v-for="item in material_type"
                      :key="item.id"
                      :label="item.name"
                      :value="item.name"
                    >
                      <span
                        style="float: left; font-size: 12px; color: #8492a6"
                        >{{ item.name }}</span
                      >
                      <span
                        style="float: right; color: #36d887; font-size: 10px"
                        >{{ item.role }}</span
                      >
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="col-span-8">
                <el-form-item
                  label="Rang kod"
                  prop="color_code"
                  :rules="[
                    {
                      required: true,
                      message: `Maydon to'ldirilishi zarur !`,
                      trigger: 'blur',
                    },
                  ]"
                >
                  <el-select
                    :disabled="is_trash === false"
                    v-model="load.color_code"
                    clearable
                    placeholder="..."
                  >
                    <el-option
                      v-for="item in color_code"
                      :key="item.id"
                      :label="item.role"
                      :value="item.role"
                    >
                      <span
                        style="float: left; font-size: 12px; color: #8492a6"
                        >{{ item.name }}</span
                      >
                      <span
                        style="float: right; color: #36d887; font-size: 10px"
                        >{{ item.role }}</span
                      >
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="col-span-8">
                <el-form-item
                  label="Xom mato miqdori"
                  prop="raw_material_quantity"
                  :rules="[
                    {
                      required: true,
                      message: `Maydon to'ldirilishi zarur !`,
                      trigger: 'blur',
                    },
                  ]"
                >
                  <el-input
                    :disabled="is_trash === false"
                    type="Number"
                    v-model="load.raw_material_quantity"
                    clearable
                    placeholder="..."
                  >
                  </el-input>
                </el-form-item>
              </div>
              <div class="col-span-8">
                <el-form-item
                  label="Birligi"
                  prop="unit"
                  :rules="[
                    {
                      required: true,
                      message: `Maydon to'ldirilishi zarur !`,
                      trigger: 'blur',
                    },
                  ]"
                >
                  <el-select
                    :disabled="is_trash === false"
                    v-model="load.unit"
                    clearable
                    placeholder="..."
                  >
                    <el-option
                      v-for="item in unit"
                      :key="item.id"
                      :label="item.name"
                      :value="item.name"
                    >
                      <span
                        style="float: left; font-size: 12px; color: #8492a6"
                        >{{ item.name }}</span
                      >
                      <span
                        style="float: right; color: #36d887; font-size: 10px"
                        >{{ item.role }}</span
                      >
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div
                class="col-span-8 flex justify-end"
                v-show="!setQRCodeImageSrc"
              >
                <el-form-item>
                  <el-button
                    @click="PlusToLoadValidate(formRefLoad)"
                    style="
                      background-color: #36d887;
                      color: white;
                      border: none;
                    "
                    ><i class="mr-2 fa-solid fa-plus fa-sm"></i>Qo'shish
                  </el-button>
                </el-form-item>
              </div>
            </el-form>
            <el-alert
              @click="IsAlert(2)"
              v-if="error_alert_load"
              title="Xatolik !"
              type="error"
              description="Barcha maydon to'ldirilishi zarur !"
              show-icon
            />
          </div>
        </div>
      </div>
      <div
        class="col-span-5 shadow overflow-y-auto h-[800] scroll-m-0 snap-start scroll-p-0"
      >
        <div id="content" class="bg-white rounded-lg px-8 py-10 mx-auto">
          <div class="flex items-center justify-between mb-8">
            <div class="flex items-center">
              <img
                class="h-64 w-64 mr-2"
                src="../../../public/haj.jpg"
                alt="Logo"
              />
              <div class="text-gray-700 font-semibold flex flex-col">
                <h5 class="text-[22px]">HAJ Textile Company</h5>
                <p class="text-[14px]">
                  Buxoro villoyati G'ijduvon tumani 41A uy
                </p>
                <p class="text-[12px]">Tel: +998915005555</p>
                <p class="text-[12px]">Email: HajTexCompany@gmail.com</p>
              </div>
            </div>
            <div class="text-gray-700 flex flex-col">
              <div class="font-bold text-[22px] mb-5">Yuk xati</div>
              <div class="text-[12px]">
                Invoice №: {{ responsiblesBillingObj.invoice_number }}
              </div>
              <div class="text-[12px]">
                Date: {{ String(new Date()).substr(0, 25) }}
              </div>
            </div>
          </div>
          <div class="flex justify-between p-3 bg-green-100 shadow">
            <div class="border-gray-300 text-gray-700 flex flex-col">
              <h2 class="text-[17px] font-bold mb-2">Kimdan:</h2>
              <div class="text-gray-700 mb-1 text-[14px]">
                <span>{{ responsiblesBillingObj.from_where }}</span>
              </div>
              <div class="text-gray-700 mb-1 text-[14px]">
                {{ String(new Date()).substring(0, 25) }}
              </div>
              <div class="text-gray-700 mb-1 text-[14px]">Buxoro, UZB</div>
            </div>
            <div class="border-gray-300 text-gray-700 flex flex-col">
              <h2 class="text-[17px] font-bold mb-2">Kimga:</h2>
              <div class="text-gray-700 mb-1 text-[14px]">
                <span>{{ responsiblesBillingObj.to_where }}</span>
              </div>
              <div class="text-gray-700 mb-1 text-[14px]">
                {{ String(new Date()).substring(0, 25) }}
              </div>
              <div class="text-gray-700 mb-1 text-[14px]">Anytown, USA</div>
            </div>
          </div>

          <div class="relative overflow-x-auto shadow rounded mt-10">
            <table
              class="w-full text-[11px] text-left rtl:text-right text-white dark:text-blue-100"
            >
              <thead
                class="text-[13px] text-white uppercase bg-gray-900 border border-gray-900 dark:text-white"
              >
                <tr>
                  <th scope="col-2" class="px-2 py-2">№</th>
                  <th scope="col-2" class="px-2 py-2">Nomi</th>
                  <th scope="col-2" class="px-2 py-2">Turi</th>
                  <th scope="col-2" class="px-2 py-2">Rang kod</th>
                  <th scope="col-2" class="px-2 py-2">Birligi</th>
                  <th scope="col-2" class="px-2 py-2">Miqdori</th>
                  <th
                    v-show="is_trash === true"
                    scope="col-1"
                    class="px-2 py-2"
                  ></th>
                </tr>
              </thead>
              <tbody class="text-[12px]">
                <tr
                  v-for="(item, index) in loadArray"
                  :key="index"
                  class="bg-slate-500 border border-gray-900 hover:bg-slate-400"
                >
                  <td scope="col-2" class="px-2 py-2">{{ index + 1 }}</td>
                  <td scope="col-2" class="px-2 py-2">{{ item.name }}</td>
                  <td scope="col-2" class="px-2 py-2">{{ item.type }}</td>
                  <td scope="col-2" class="px-2 py-2">{{ item.color_code }}</td>
                  <td scope="col-2" class="px-2 py-2">{{ item.unit }}</td>
                  <td scope="col-2" class="px-2 py-2">
                    {{ item.raw_material_quantity }}
                  </td>
                  <td v-if="is_trash == true" scope="col-1" class="px-2 py-2">
                    <router-link
                      to=""
                      @click="DeleteByIdFromArray({ load: item, i: index })"
                      class="inline-flex items-center ml-2 text-red hover:bg-red-600 font-medium rounded-md text-sm w-full sm:w-auto px-2 py-3 text-center"
                    >
                      <i
                        class="text-black fa-trash fa-solid fa-trash fa-sm"
                      ></i>
                    </router-link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- <div class="flex justify-between mt-2 mb-20">
          <div class="text-gray-700 mr-2">Total:</div>
          <div class="text-gray-700 font-bold text-xl">$450.50</div>
        </div> -->
          <div
            v-show="setQRCodeImageSrc"
            class="QRCode mt-44 flex justify-between"
          >
            <div class="text-gray-700 flex flex-col text-[17px]">
              <h5 class="text-[20px] font-semibold mb-3">Ma'muriyat:</h5>
              <p>
                Derektor: <span>{{ responsiblesBillingObj.director }}</span>
              </p>
              <p>
                Buhgalter: <span>{{ responsiblesBillingObj.accountant }}</span>
              </p>
              <p>
                Topshiruvchi: <span>{{ responsiblesBillingObj.sender }}</span>
              </p>
              <p>
                Qabul qiluvchi:
                <span>{{ responsiblesBillingObj.receiver }}</span>
              </p>
            </div>

            <div class="">
              <img
                class="w-[160px] h-[160px]"
                :src="setQRCodeImageSrc"
                alt="qr code"
              />
              <p class="text-[11px] text-center">HAJ TEXTILE COMPANY</p>
            </div>
          </div>
        </div>
        <div class="flex justify-between mt-2 mb-2 p-2 shadow-md">
          <div>
            <el-button
              v-if="
                setQRCodeImageSrc && responsiblesBillingObj && loadArray.length
              "
              @click="Refresh()"
              size="small"
              style="background-color: #36d887; color: white; border: none"
            >
              <i class="mr-2 fa-solid fa-arrows-rotate fa-sm"></i>Refresh
            </el-button>
          </div>
          <div>
            <el-button
              v-show="
                !is_download &&
                setQRCodeImageSrc === '' &&
                responsiblesBillingObj &&
                loadArray.length
              "
              @click="generateQRCode"
              size="small"
              style="background-color: #36d887; color: white; border: none"
            >
              <i class="mr-2 fa-solid fa-qrcode fa-sm"></i>QR kod</el-button
            >
            <el-button
              v-if="
                setQRCodeImageSrc && responsiblesBillingObj && loadArray.length
              "
              @click="download"
              size="small"
              style="background-color: #bfbf0f; color: white; border: none"
            >
              <i class="mr-2 fa-solid fa-file-pdf fa-sm"></i>PDF
            </el-button>

            <el-button
              v-if="
                setQRCodeImageSrc && responsiblesBillingObj && loadArray.length
              "
              @click="Export_Excel"
              size="small"
              style="background-color: #36d887; color: white; border: none"
            >
              <i class="mr-2 fa-solid fa-file-excel fa-sm"></i>Excel
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.el-alert {
  margin: 4px 0 0;
  padding: 2px;
}
.el-alert:first-child {
  margin: 0;
}
</style>
