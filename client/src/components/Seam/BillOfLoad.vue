<script setup>
import { ref } from "vue"
import { SeamWarehouseService } from "../../ApiServices/Seam/warehouse/warehouse.service"
const responsibles = ref({
    number: 25,
    from_where: "",
    to_where: "",
    sender: "",
    receiver: "",
    accountant: "",
    director: "",

})
const model = ref({
    name: "",
    type: "",
    color_code: "",
    raw_material_quantity: "",
    unit: "",
})
const responsiblesBillingObj = ref({}
)
const ResponsiblesSendToBilling = () => {
    responsiblesBillingObj.value = responsibles.value

}
const loadArray = ref([])
const PlusToLoad = () => {
    loadArray.value.push(model.value)
    model.value = []
}

const generateQRCode = async () => {
    try {
        const data = await SeamWarehouseService.GenerateQRCode(loadArray.value)
        if (data) {
            getQRImage()
        }
    } catch (error) {
        console.log(error);
    }
}
const setQRCodeImageSrc = ref()
const getQRImage = async () => {
    const item = await SeamWarehouseService.getQRImage()
    const qr_code_image = item.data.data[0].qrCodeImage;
    if (qr_code_image && qr_code_image.data) {
        const base64Image = `data:image/png;base64,${btoa(
            new Uint8Array(qr_code_image.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
        )}`;
        setQRCodeImageSrc.value = base64Image;
        console.log(base64Image);

    }
};
</script>

<template>
    <div class="grid grid-cols-7 gap-2 bg-white shadow-md p-1  ">
        <div class="col-span-3">
            <div class="text-center text-[15px] font-semibold bg-[#e4e9e9] p-1 rounded">Yuk xatini shakillantirish</div>
            <div class="text-[15px] font-semibold bg-slate-50 rounded ">
                <form
                    class="filter-box md:grid md:grid-cols-8 gap-1 sm:flex sm:flex-wrap rounded shadow-md  p-2 mt-1 mb-1 text-[12px]">
                    <div class="mb-1 col-span-8">
                        <label name="resul"
                            class="block mb-1 text-[12px] font-medium text-gray-900 dark:text-white">№</label>
                        <el-input disabled clearable class="w-[100%]" v-model="responsibles.number" size="smal"
                            type="String" placeholder="..." />
                    </div>
                    <div class="mb-1 col-span-4">
                        <label name="resul"
                            class="block mb-1 text-[12px] font-medium text-gray-900 dark:text-white">Kimdan</label>
                        <el-input :disabled="responsiblesBillingObj.from_where" v-model="responsibles.from_where"
                            class=" w-[100%]" size="smal" type="String" placeholder="..." />
                    </div>
                    <div class="mb-1 col-span-4">
                        <label name="resul"
                            class="block mb-1 text-[12px] font-medium text-gray-900 dark:text-white">Kimga</label>
                        <el-input :disabled="responsiblesBillingObj.to_where" v-model="responsibles.to_where" clearable
                            class="w-[100%]" size="smal" type="String" placeholder="..." />
                    </div>
                    <div class="mb-1 col-span-4">
                        <label name="resul"
                            class="block mb-1 text-[12px] font-medium text-gray-900 dark:text-white">Topshiruvchi</label>
                        <el-input :disabled="responsiblesBillingObj.sender" v-model="responsibles.sender"
                            class=" w-[100%]" size="smal" type="String" placeholder="..." />
                    </div>
                    <div class="mb-1 col-span-4">
                        <label name="resul"
                            class="block mb-1 text-[12px] font-medium text-gray-900 dark:text-white">Qabl
                            qiluvchi</label>
                        <el-input :disabled="responsiblesBillingObj.receiver" v-model="responsibles.receiver" clearable
                            class="w-[100%]" size="smal" type="String" placeholder="..." />
                    </div>
                    <div class="mb-1 col-span-4">
                        <label name="resul"
                            class="block mb-1 text-[12px] font-medium text-gray-900 dark:text-white">Hisobchi</label>
                        <el-input :disabled="responsiblesBillingObj.accountant" v-model="responsibles.accountant"
                            class="w-[100%]" size="smal" type="String" placeholder="..." />
                    </div>
                    <div class="mb-1 col-span-4">
                        <label name="resul"
                            class="block mb-1 text-[12px] font-medium text-gray-900 dark:text-white">Rahbar</label>
                        <el-input :disabled="responsiblesBillingObj.director" v-model="responsibles.director" clearable
                            class="w-[100%]" size="smal" type="String" placeholder="..." />
                    </div>
                    <!-- <div class="mb-1 col-span-1">
                        <label name="resul"
                            class="block mb-1 text-[12px] font-medium text-gray-900 dark:text-white">Yetkazish
                            vaqti</label>
                        <el-input clearable class="w-[100%]" size="smal" type="Date" placeholder="..." />
                    </div> -->

                </form>
                <div v-show="!responsiblesBillingObj.from_where" class=" flex justify-end mb-2 p-2 shadow-md">
                    <router-link to="" @click="ResponsiblesSendToBilling()"
                        class="inline-flex text-[12px] items-center ml-2 px-3 py-1 mb-1 mt-2 text-sm font-medium text-center text-white bg-[#36d887] text-bold rounded focus:ring-4 focus:outline-none">
                        Yuborish<i class="ml-2 fa-solid fa-arrow-right fa-sm"></i></router-link>
                </div>
            </div>

            <div class="col-span-8 text-[15px] font-semibold bg-slate-50  rounded">

                <form
                    class="filter-box md:grid md:grid-cols-2 gap-2 sm:flex sm:flex-wrap rounded shadow-md  p-2 mt-1 mb-1 text-[12px]">

                    <div class="mb-1 col-span-1">
                        <label name="resul"
                            class="block mb-1 text-[12px] font-medium text-gray-900 dark:text-white">Nomi</label>
                        <el-input clearable class="w-[100%]" v-model="model.name" size="smal" type="String"
                            placeholder="..." />
                    </div>
                    <div class="mb-1 col-span-1">
                        <label name="resul"
                            class="block mb-1 text-[12px] font-medium text-gray-900 dark:text-white">Turi</label>
                        <el-input clearable class="w-[100%]" v-model="model.type" size="smal" type="String"
                            placeholder="..." />
                    </div>

                    <div class="mb-1 col-span-1">
                        <label name="resul"
                            class="block mb-1 text-[12px] font-medium text-gray-900 dark:text-white">Rang
                            kodi</label>
                        <el-input class="w-[100%]" v-model="model.color_code" size="smal" type="String"
                            placeholder="..." />
                    </div>
                    <div class="mb-1 col-span-1">
                        <label name="resul" class="block mb-1 text-[12px] font-medium text-gray-900 dark:text-white">Xom
                            mato
                            miqdori</label>
                        <el-input clearable class="w-[100%]" v-model="model.raw_material_quantity" size="smal"
                            type="Number" placeholder="..." />
                    </div>
                    <div class="mb-1 col-span-1">
                        <label name="resul"
                            class="block mb-1 text-[12px] font-medium text-gray-900 dark:text-white">Birligi</label>
                        <el-input class="w-[100%]" v-model="model.unit" size="smal" type="String" placeholder="..." />
                    </div>
                </form>
                <div v-show="!setQRCodeImageSrc" class="flex justify-end mt-3 mb-3 p-2 shadow-md">
                    <router-link to="" @click="PlusToLoad()"
                        class="inline-flex text-[12px] items-center ml-2 px-3 py-1 mb-1 mt-2 text-sm font-medium text-center text-white bg-[#36d887] text-bold rounded focus:ring-4 focus:outline-none">
                        <i class="mr-2 fa-solid fa-plus fa-sm"></i>Qo'shish</router-link>
                </div>
            </div>

        </div>
        <div class="col-span-4 ">
            <div class="text-center text-[15px] p-1 font-semibold bg-[#e4e9e9] rounded">Yuk xati № {{
                            responsiblesBillingObj.number }}</div>
            <div class="text-[15px] rounded">
                <div class="header flex justify-between bg-slate-100 text-[12px] mt-2 mb-2 p-4 shadow-md rounded ">
                    <div class=" font-semibold">Kimdan :<span>{{ responsiblesBillingObj.from_where }}</span> </div>
                    <div class="font-semibold">Kimga :<span>{{ responsiblesBillingObj.to_where }}</span> </div>
                </div>
                <div class="shadow-md rounded min-h-[15px]">

                    <el-table load class="w-full" header-align="center" hight="5" empty-text="Mahsulot tanlanmagan... "
                        :data="loadArray" border style="width: 100%" min-height="205" max-height="205">
                        <el-table-column header-align="center" align="center" type="index" prop="index" fixed="left"
                            label="№" width="60" />

                        <el-table-column header-align="center" prop="name" label="Nomi" width="220" />

                        <el-table-column header-align="center" prop="type" label="Turi" width="150" />
                        <el-table-column prop="color_code" label="Rang kod" width="150" header-align="center"
                            align="center" />

                        <el-table-column prop="unit" label="Birligi" width="150" header-align="center" align="center" />
                        <el-table-column prop="raw_material_quantity" label="Miqdori" width="210" header-align="center"
                            align="center" />
                        <el-table-column fixed="right" prop="id" label="" width="150" header-align="center"
                            align="center">
                            <template #default="scope">
                                <!-- <router-link to="" @click="OpenModalById(scope.row._id)"
                                    class="inline-flex items-center  ml-2 text-red bg-yellow-300 hover:bg-yellow-400 font-medium rounded-md text-sm w-full sm:w-auto px-3 py-3 text-center">
                                    <i class="text-black fa-sharp fa-solid fa-check fa-xs"></i>
                                </router-link> -->
                                <router-link to=""
                                    class="inline-flex items-center  ml-2 text-red  hover:bg-red-600 font-medium rounded-md text-sm w-full sm:w-auto px-2 py-3 text-center">
                                    <i class="text-black fa-trash fa-solid fa-trash fa-sm "></i>
                                </router-link>
                            </template>
                        </el-table-column>

                    </el-table>

                </div>
                <div class="bg-slate-100  mt-2 p-2 shadow-md rounded">
                    <div class="header flex justify-between text-[12px] mt-2  p-2">
                        <div class="font-semibold">Rahbar :<span>{{ responsiblesBillingObj.director }}</span> </div>
                        <div class="font-semibold">Bosh hisobchi :<span>{{ responsiblesBillingObj.accountant }}</span>
                        </div>
                    </div>
                    <div class="header flex justify-between text-[12px] p-2">
                        <div class="font-semibold">Topshiruvchi :<span>{{ responsiblesBillingObj.sender }}</span> </div>
                        <div class="font-semibold">Qabul qiluvchi :<span>{{ responsiblesBillingObj.receiver }}</span>
                        </div>
                    </div>
                </div>
                <div v-show="setQRCodeImageSrc" class="QRCode mt-10 mb-2 text-center flex justify-between">
                    <div></div>
                    <img class="w-[70px] h-[70px] " :src='setQRCodeImageSrc' alt="qr code">
                    <div></div>
                </div>
                <div class="flex justify-end mt-3 mb-3 p-2 shadow-md">
                    <router-link v-show="!setQRCodeImageSrc && responsiblesBillingObj && loadArray.length" to=""
                        @click="generateQRCode()"
                        class="inline-flex text-[12px] items-center ml-2 px-3 py-1 mb-1 mt-2 text-sm font-medium text-center text-white bg-yellow-400 text-bold rounded focus:ring-4 focus:outline-none">
                        <i class="mr-2 fa-solid fa-plus fa-sm"></i>QR kod</router-link>
                    <router-link v-show="setQRCodeImageSrc" to="" @click="SaveQRCodeData()"
                        class="inline-flex text-[12px] items-center ml-2 px-3 py-1 mb-1 mt-2 text-sm font-medium text-center text-white bg-[#36d887] text-bold rounded focus:ring-4 focus:outline-none">
                        <i class="mr-2 fa-solid fa-check fa-sm"></i>Saqlash</router-link>
                    <!-- <router-link to="" @click="SaveToProvide()"
                        class="inline-flex text-[12px] items-center ml-2 px-3 py-1 mb-1 mt-2 text-sm font-medium text-center text-white bg-yellow-400 text-bold rounded focus:ring-4 focus:outline-none">
                        <i class="mr-2 fa-solid fa-file-pdf fa-sm"></i>PDF</router-link> -->
                </div>
            </div>

        </div>
    </div>
</template>