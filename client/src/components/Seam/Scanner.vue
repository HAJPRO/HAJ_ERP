<script setup>
import { QrStream, QrCapture, QrDropzone } from "vue3-qr-reader";
import { ref } from "vue";
const items = ref([]);
function onDecode(data) {
  items.value = JSON.parse(data);
}
const cancel = () => {
  items.value = [];
};
const is_camera = ref(false);
const ShowCamera = () => {
  is_camera.value = !is_camera.value;
};
</script>
<template>
  <div class="grid grid-cols-7 gap-2 h-[400px]">
    <div
      class="stream border border-[#36d887] col-span-2 mt-1 h-[400px] shadow"
    >
      <div
        v-if="is_camera === false"
        class="col-span-2 mt-3 mb-3 shadow hover:shadow-md bg-white rounded m-4 p-4 flex justify-center"
      >
        <el-button
          @click="ShowCamera"
          size="small"
          style="background-color: #36d887; color: white; border: none"
        >
          <i class="mr-2 fa-solid fa-camera fa-sm"></i>Kamerani
          yoqish</el-button
        >
      </div>
      <qr-stream v-if="is_camera === true" @decode="onDecode" class="mb">
        <div style="color: red" class="frame"></div>
      </qr-stream>
    </div>
    <div class="col-span-5">
      <div class="rounded h-[350px] mt-1 text-[11px]">
        <el-table
          style="font-size: 12px"
          load
          class="w-full"
          header-align="right"
          header-hight="1"
          empty-text="Mahsulot qo'shilmagan... "
          :data="items"
          border
          height="300"
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
            align="center"
            header-align="center"
            prop="name"
            label="Nomi"
            width="200"
          />

          <el-table-column
            align="center"
            header-align="center"
            prop="type"
            label="Turi"
            width="200"
          />
          <el-table-column
            prop="color_code"
            label="Rang kod"
            width="200"
            header-align="center"
            align="center"
          />

          <el-table-column
            align="center"
            prop="unit"
            label="Birligi"
            width="180"
            header-align="center"
          />
          <el-table-column
            prop="raw_material_quantity"
            label="Miqdori"
            width="200"
            header-align="center"
            align="center"
          />
          <el-table-column
            v-show="is_download"
            fixed="right"
            prop="id"
            label=""
            width="60"
            header-align="center"
            align="center"
          >
            <template #default="scope">
              <router-link
                to=""
                class="inline-flex items-center ml-2 text-red hover:bg-red-600 font-medium rounded-md text-sm w-full sm:w-auto px-2 py-3 text-center"
              >
                <i class="text-black fa-trash fa-solid fa-trash fa-sm"></i>
              </router-link>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="flex justify-between mt-3 mb-3 p-2 shadow-md">
        <div>
          <el-button
            v-show="is_camera === true"
            @click="ShowCamera"
            size="small"
            style="background-color: red; color: white; border: none"
          >
            <i class="mr-2 fa-solid fa-xmark fa-sm"></i>Kamerani o'chirish
          </el-button>
        </div>
        <div>
          <el-button
            @click="generateQRCode"
            size="small"
            style="background-color: #36d887; color: white; border: none"
          >
            <i class="mr-2 fa-solid fa-check fa-sm"></i>Saqlash</el-button
          >
          <el-button
            @click="cancel()"
            size="small"
            style="background-color: red; color: white; border: none"
          >
            <i class="mr-2 fa-solid fa-xmark fa-sm"></i>Bekor qilish
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.col_span {
  display: grid;
  grid-column: 7;
}
</style>
