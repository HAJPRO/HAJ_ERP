<script setup>
import { ref } from "vue";
import jsPDF from "jspdf";
const pdf = jsPDF({
  orientation: "p",
  unit: "px",
  format: "letter",
  hotfixes: ["px_scaling"],
});
import html2pdf from "html2pdf.js";
import { SeamWarehouseService } from "../../ApiServices/Seam/warehouse/warehouse.service";
const leaders = ref([
  { name: "N.Boqiyev", id: 1, role: "Director" },
  { name: "Sh.Shermuhammadov", id: 1, role: "Boss" },
]);
const responsibles = ref({
  number: 125,
  from_where: "",
  to_where: "",
  sender: "",
  receiver: "",
  accountant: "",
  director: "",
});
const model = ref({
  name: "",
  type: "",
  color_code: "",
  raw_material_quantity: "",
  unit: "",
});
const submitForm = (formRef) => {
  formRef.validate((valid) => {
    if (valid) {
      ResponsiblesSendToBilling();
      return valid;
    } else {
      return false;
    }
  });
};
const submitFormPro = (formRef) => {
  formRef.validate((valid) => {
    if (valid) {
      PlusToLoad();
      return valid;
    } else {
      return false;
    }
  });
};
const responsiblesBillingObj = ref({});
const ResponsiblesSendToBilling = () => {
  responsiblesBillingObj.value = responsibles.value;
};
const loadArray = ref([]);
const PlusToLoad = () => {
  loadArray.value.push(model.value);
  model.value = [];
};
const is_download = ref(false);
const generateQRCode = async () => {
  try {
    const data = await SeamWarehouseService.GenerateQRCode(loadArray.value);
    if (data) {
      getQRImage();
      is_download.value = true;
    }
  } catch (error) {
    console.log(error);
  }
};
const setQRCodeImageSrc = ref();
const getQRImage = async () => {
  const item = await SeamWarehouseService.getQRImage();
  const qr_code_image = item.data.data[0].qrCodeImage;
  if (qr_code_image && qr_code_image.data) {
    const base64Image = `data:image/png;base64,${btoa(
      new Uint8Array(qr_code_image.data).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ""
      )
    )}`;
    setQRCodeImageSrc.value = base64Image;
  }
};
const rules_validate = ref({
  number: [
    {
      required: true,
      trigger: "blur",
      message: "Maydon to'ldirilishi zarur !",
    },
  ],
  from_where: [
    {
      required: true,
      trigger: "blur",
      message: "Maydon to'ldirilishi zarur !",
    },
  ],
  to_where: [
    {
      required: true,
      trigger: "blur",
      message: "Maydon to'ldirilishi zarur !",
    },
  ],
  sender: [
    {
      required: true,
      trigger: "blur",
      message: "Maydon to'ldirilishi zarur !",
    },
  ],
  receiver: [
    {
      required: true,
      trigger: "blur",
      message: "Maydon to'ldirilishi zarur !",
    },
  ],
  accountant: [
    {
      required: true,
      trigger: "blur",
      message: "Maydon to'ldirilishi zarur !",
    },
  ],
  director: [
    {
      required: true,
      trigger: "blur",
      message: "Maydon to'ldirilishi zarur !",
    },
  ],
});
const pro_validate = ref({
  name: [
    {
      required: true,
      trigger: "blur",
      message: "Maydon to'ldirilishi zarur !",
    },
  ],
  type: [
    {
      required: true,
      trigger: "blur",
      message: "Maydon to'ldirilishi zarur !",
    },
  ],
  color_code: [
    {
      required: true,
      trigger: "blur",
      message: "Maydon to'ldirilishi zarur !",
    },
  ],
  raw_material_quantity: [
    {
      required: true,
      trigger: "blur",
      message: "Maydon to'ldirilishi zarur !",
    },
  ],
  unit: [
    {
      required: true,
      trigger: "blur",
      message: "Maydon to'ldirilishi zarur !",
    },
  ],
});
const is_temp = ref(false);
const content = ref(null);
const download = () => {
  is_download.value = false;
  var element = document.getElementById("content");
  var opt = {
    border: 1,
    margin: 0,
    filename: "doc.pdf",
    image: { type: "jpeg", quality: 1 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };
  html2pdf().set(opt).from(element).save();
  html2pdf(element, opt);
};
</script>

<template>
  <div class="grid grid-cols-7 gap-2 bg-white p-1">
    <div class="col-span-3">
      <div
        class="text-center text-[15px] font-semibold bg-[#e4e9e9] p-1 rounded"
      >
        Yuk xatini shakillantirish
      </div>
      <div
        class="text-[15px] font-semibold bg-slate-50 rounded shadow-md hover:shadow-xl"
      >
        <el-form
          :model="responsibles"
          :rules="rules_validate"
          ref="responsibles"
          label-width="auto"
          class="filter-box md:grid md:grid-cols-8 gap-1 sm:flex sm:flex-wrap rounded shadow-md p-2 mt-1 mb-1 text-[12px]"
          size="small"
          label-position="top"
        >
          <div class="mb-1 col-span-4">
            <el-form-item label="№" prop="number">
              <el-input v-model="responsibles.number" placeholder="...">
              </el-input>
            </el-form-item>
          </div>
          <div class="col-span-4">
            <el-form-item label="Kimdan" prop="from_where">
              <el-select
                :disabled="responsiblesBillingObj.from_where"
                v-model="responsibles.from_where"
                placeholder="..."
              >
                <el-option
                  v-for="item in leaders"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                >
                  <span style="float: left; font-size: 12px; color: #8492a6">{{
                    item.name
                  }}</span>
                  <span style="float: right; color: #36d887; font-size: 10px">{{
                    item.role
                  }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="col-span-4">
            <el-form-item label="Kimga" prop="to_where">
              <el-select
                :disabled="responsiblesBillingObj.to_where"
                v-model="responsibles.to_where"
                clearable
                placeholder="..."
              >
                <el-option
                  v-for="item in leaders"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                >
                  <span style="float: left; font-size: 12px; color: #8492a6">{{
                    item.name
                  }}</span>
                  <span style="float: right; color: #36d887; font-size: 10px">{{
                    item.role
                  }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="col-span-4">
            <el-form-item label="Topshiruvchi" prop="sender">
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
                  <span style="float: left; font-size: 12px; color: #8492a6">{{
                    item.name
                  }}</span>
                  <span style="float: right; color: #36d887; font-size: 10px">{{
                    item.role
                  }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="mb-1 col-span-4">
            <el-form-item label="Qabul qiluvchi" prop="receiver">
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
                  <span style="float: left; font-size: 12px; color: #8492a6">{{
                    item.name
                  }}</span>
                  <span style="float: right; color: #36d887; font-size: 10px">{{
                    item.role
                  }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="mb-1 col-span-4">
            <el-form-item label="Hisobchi" prop="accountant">
              <el-select
                :disabled="responsiblesBillingObj.accountant"
                v-model="responsibles.accountant"
                clearable
                placeholder="..."
              >
                <el-option
                  v-for="item in leaders"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                >
                  <span style="float: left; font-size: 12px; color: #8492a6">{{
                    item.name
                  }}</span>
                  <span style="float: right; color: #36d887; font-size: 10px">{{
                    item.role
                  }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="mb-1 col-span-4">
            <el-form-item label="Rahbar" prop="director">
              <el-select
                :disabled="responsiblesBillingObj.director"
                v-model="responsibles.director"
                clearable
                placeholder="..."
              >
                <el-option
                  v-for="item in leaders"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                >
                  <span style="float: left; font-size: 12px; color: #8492a6">{{
                    item.name
                  }}</span>
                  <span style="float: right; color: #36d887; font-size: 10px">{{
                    item.role
                  }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div
            class="mb-1 col-span-4 flex justify-end"
            v-show="!responsiblesBillingObj.from_where"
          >
            <el-form-item label=".">
              <el-button
                @click="submitForm(responsibles)"
                style="background-color: #36d887; color: white; border: none"
                >Yuborish <i class="ml-2 fa-solid fa-arrow-right fa-sm"></i
              ></el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>

      <div
        class="col-span-8 text-[15px] font-semibold bg-slate-50 rounded mt-4 shadow-md hover:shadow-xl"
      >
        <div class="text-[15px] font-semibold bg-slate-50 rounded">
          <el-form
            :model="model"
            :rules="pro_validate"
            ref="model"
            label-width="auto"
            class="filter-box md:grid md:grid-cols-8 gap-1 sm:flex sm:flex-wrap rounded p-2 mt-1 mb-1 text-[12px]"
            size="small"
            label-position="top"
          >
            <div class="col-span-4">
              <el-form-item label="Nomi" prop="name">
                <el-select v-model="model.name" placeholder="...">
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
            <div class="col-span-4">
              <el-form-item label="Turi" prop="type">
                <el-select v-model="model.type" clearable placeholder="...">
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
            <div class="col-span-4">
              <el-form-item label="Rang kod" prop="color_code">
                <el-select
                  v-model="model.color_code"
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
            <div class="mb-1 col-span-4">
              <el-form-item
                label="Xom mato miqdori"
                prop="raw_material_quantity"
              >
                <el-select
                  v-model="model.raw_material_quantity"
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
            <div class="mb-1 col-span-4">
              <el-form-item label="Birligi" prop="unit">
                <el-select v-model="model.unit" clearable placeholder="...">
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
            <div
              class="mb-1 col-span-4 flex justify-end"
              v-show="!setQRCodeImageSrc"
            >
              <el-form-item label=".">
                <el-button
                  @click="submitFormPro(model)"
                  style="background-color: #36d887; color: white; border: none"
                  ><i class="mr-2 fa-solid fa-plus fa-sm"></i>Qo'shish
                </el-button>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </div>
    </div>
    <div id="content" class="col-span-4">
      <div
        id="content"
        class="bg-white rounded-lg px-8 py-10 max-w-[500] mx-auto"
      >
        <div class="flex items-center justify-between mb-8">
          <div class="flex items-center">
            <img
              class="h-28 w-28 mr-2"
              src="../../../public/haj.jpg"
              alt="Logo"
            />
            <div class="text-gray-700 font-semibold flex flex-col">
              <h5 class="text-[16px]">HAJ Textile Company</h5>
              <p class="text-[9px]">Buxoro villoyati G'ijduvon tumani 41A uy</p>
              <p class="text-[9px]">Tel: +998915005555</p>
              <p class="text-[9px]">Email: HajTexCompany@gmail.com</p>
            </div>
          </div>
          <div class="text-gray-700 flex flex-col">
            <div class="font-bold text-[16px] mb-5">Yuk xati</div>
            <div class="text-[9px]">Date: 01/05/2023</div>
            <div class="text-[9px]">Invoice #: INV12345</div>
          </div>
        </div>
        <div class="flex justify-between p-3 bg-green-100 shadow">
          <div class="border-gray-300 text-gray-700 flex flex-col">
            <h2 class="text-[15px] font-bold mb-2">Kimdan:</h2>
            <div class="text-gray-700 mb-1 text-[13px]">John Doe</div>
            <div class="text-gray-700 mb-1 text-[13px]">123 Main St.</div>
            <div class="text-gray-700 mb-1 text-[13px]">Anytown, USA 12345</div>
          </div>
          <div class="border-gray-300 text-gray-700 flex flex-col">
            <h2 class="text-[15px] font-bold mb-2">Kimga:</h2>
            <div class="text-gray-700 mb-1 text-[13px]">John Doe</div>
            <div class="text-gray-700 mb-1 text-[13px]">123 Main St.</div>
            <div class="text-gray-700 mb-1 text-[13px]">Anytown, USA 12345</div>
          </div>
        </div>

        <div class="relative overflow-x-auto shadow rounded mt-10">
          <table
            class="w-full text-[11px] text-left rtl:text-right text-white dark:text-blue-100"
          >
            <thead
              class="text-[10px] text-white uppercase bg-gray-900 border border-gray-900 dark:text-white"
            >
              <tr>
                <th scope="col" class="px-2 py-2">Product name</th>
                <th scope="col" class="px-2 py-2">Color</th>
                <th scope="col" class="px-2 py-2">Category</th>
                <th scope="col" class="px-2 py-2">Price</th>
                <th scope="col" class="px-2 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="bg-slate-500 border border-gray-900 hover:bg-slate-400"
              >
                <th
                  scope="row"
                  class="px-2 py-2 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100"
                >
                  Apple MacBook Pro 17"
                </th>

                <td class="px-2 py-2">Silver</td>
                <td class="px-2 py-2">Laptop</td>
                <td class="px-2 py-2">$2999</td>
                <td class="px-2 py-2">
                  <a href="#" class="font-medium text-white hover:underline"
                    >Edit</a
                  >
                </td>
              </tr>
              <tr
                class="bg-slate-500 border border-gray-900 hover:bg-slate-400"
              >
                <th
                  scope="row"
                  class="px-2 py-2 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100"
                >
                  Apple MacBook Pro 17"
                </th>

                <td class="px-2 py-2">Silver</td>
                <td class="px-2 py-2">Laptop</td>
                <td class="px-2 py-2">$2999</td>
                <td class="px-2 py-2">
                  <a href="#" class="font-medium text-white hover:underline"
                    >Edit</a
                  >
                </td>
              </tr>
              <tr
                class="bg-slate-500 border border-gray-900 hover:bg-slate-400"
              >
                <th
                  scope="row"
                  class="px-2 py-2 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100"
                >
                  Apple MacBook Pro 17"
                </th>

                <td class="px-2 py-2">Silver</td>
                <td class="px-2 py-2">Laptop</td>
                <td class="px-2 py-2">$2999</td>
                <td class="px-2 py-2">
                  <a href="#" class="font-medium text-white hover:underline"
                    >Edit</a
                  >
                </td>
              </tr>
              <tr
                class="bg-slate-500 border border-gray-900 hover:bg-slate-400"
              >
                <th
                  scope="row"
                  class="px-2 py-2 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100"
                >
                  Apple MacBook Pro 17"
                </th>

                <td class="px-2 py-2">Silver</td>
                <td class="px-2 py-2">Laptop</td>
                <td class="px-2 py-2">$2999</td>
                <td class="px-2 py-2">
                  <a href="#" class="font-medium text-white hover:underline"
                    >Edit</a
                  >
                </td>
              </tr>
              <tr
                class="bg-slate-500 border border-gray-900 hover:bg-slate-400"
              >
                <th
                  scope="row"
                  class="px-2 py-2 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100"
                >
                  Apple MacBook Pro 17"
                </th>

                <td class="px-2 py-2">Silver</td>
                <td class="px-2 py-2">Laptop</td>
                <td class="px-2 py-2">$2999</td>
                <td class="px-2 py-2">
                  <a href="#" class="font-medium text-white hover:underline"
                    >Edit</a
                  >
                </td>
              </tr>
              <tr
                class="bg-slate-500 border border-gray-900 hover:bg-slate-400"
              >
                <th
                  scope="row"
                  class="px-2 py-2 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100"
                >
                  Apple MacBook Pro 17"
                </th>

                <td class="px-2 py-2">Silver</td>
                <td class="px-2 py-2">Laptop</td>
                <td class="px-2 py-2">$2999</td>
                <td class="px-2 py-2">
                  <a href="#" class="font-medium text-white hover:underline"
                    >Edit</a
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="flex justify-between mt-2 mb-20">
          <div class="text-gray-700 mr-2">Total:</div>
          <div class="text-gray-700 font-bold text-xl">$450.50</div>
        </div>
        <div
          v-show="setQRCodeImageSrc"
          class="QRCode mt-28 mb-2 flex justify-between"
        >
          <div class="text-gray-700 font-semibold flex flex-col">
            <h5 class="text-[16px] mb-1">Mamuriyat:</h5>
            <p class="text-[10px]">Boshliq: D.F.Inoyatov</p>
            <p class="text-[10px]">Derektor: S.A.Narziyev</p>
            <p class="text-[10px]">Buhgalter: I.A.Samanov</p>
            <p class="text-[10px]">Xodim: Z.K.Jumayev</p>
          </div>
          <img
            class="w-[100px] h-[100px]"
            :src="setQRCodeImageSrc"
            alt="qr code"
          />
        </div>
      </div>

      <div class="flex justify-end mt-3 mb-3 p-2 shadow-md">
        <el-button
          @click="generateQRCode"
          v-show="
            !setQRCodeImageSrc && responsiblesBillingObj && loadArray.length
          "
          size="small"
          style="background-color: #36d887; color: white; border: none"
        >
          <i class="mr-2 fa-solid fa-plus fa-sm"></i>QR kod</el-button
        >
        <el-button
          v-show="
            is_download &&
            setQRCodeImageSrc &&
            responsiblesBillingObj &&
            loadArray.length
          "
          @click="download()"
          size="small"
          style="background-color: #36d887; color: white; border: none"
        >
          <i class="mr-2 fa-solid fa-check fa-sm"></i>Saqlash</el-button
        >
      </div>
    </div>
  </div>
</template>
