<script>
</script>
<template>
    <el-dialog v-model="outerVisible" title="Taminot uchun kerakli mahsulotlar qo'shish" width="600">
        <span>
            <form
                class="filter-box md:grid md:grid-cols-3 gap-2 sm:flex sm:flex-wrap rounded shadow-md bg-white p-2 mt-1 mb-1 text-[12px]">
                <div class="mb-1 col-span-1">
                    <label name="resul"
                        class="block mb-1 text-[12px] font-medium text-gray-900 dark:text-white">Pus</label>
                    <el-input v-model="model.pus" clearable class="w-[100%]" size="smal" type="String"
                        placeholder="..." />
                </div>
                <div class="mb-1 col-span-1">
                    <label name="resul"
                        class="block mb-1 text-[12px] font-medium text-gray-900 dark:text-white">Fike</label>
                    <el-input v-model="model.fike" clearable class="w-[100%]" size="smal" type="Number"
                        placeholder="..." />
                </div>

                <div class="mb-1 col-span-1">
                    <label name="resul" class="block mb-1 text-[12px] font-medium text-gray-900 dark:text-white">Rang
                        kodi</label>
                    <el-input v-model="model.color_code" clearable class="w-[100%]" size="smal" type="String"
                        placeholder="..." />
                </div>
                <div class="mb-1 col-span-1">
                    <label name="resul" class="block mb-1 text-[12px] font-medium text-gray-900 dark:text-white">Xom
                        mato
                        miqdori</label>
                    <el-input v-model="model.raw_cloth_quantity" clearable class="w-[100%]" size="smal" type="Number"
                        placeholder="..." />
                </div>
                <div class="mb-1 col-span-1">
                    <label name="resul"
                        class="block mb-1 text-[12px] font-medium text-gray-900 dark:text-white">Tayyorlash
                        muddati</label>
                    <el-input v-model="model.duration_time" clearable class="w-[100%]" size="smal" type="Date"
                        placeholder="..." />
                </div>
            </form>
        </span>
        <el-dialog v-model="innerVisible" width="500" title="Inner Dialog" append-to-body>
            <span>This is the inner Dialog</span>
        </el-dialog>
        <template #footer>
            <div class="dialog-footer ">

                <router-link @click="outerVisible = false" to=""
                    class="inline-flex text-[12px] items-center ml-2 px-3 py-1 mb-1 mt-2 text-sm font-medium text-center text-white bg-red-500 text-bold rounded focus:ring-4 focus:outline-none">
                    <i class=" mr-2 fa-solid fa-arrow-left fa-sm"></i>Orqaga</router-link>
                <router-link @click="Save()" to=""
                    class="inline-flex text-[12px] items-center ml-2 px-3 py-1 mb-1 mt-2 text-sm font-medium text-center text-white bg-[#36d887] text-bold rounded focus:ring-4 focus:outline-none">
                    <i class="mr-2 fa-solid fa-check fa-sm"></i>Yuborish</router-link>


            </div>
        </template>
    </el-dialog>
</template>