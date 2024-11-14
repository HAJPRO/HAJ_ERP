<script>
</script>
<template>
    <!-- //// Tasdiqlash Modal -->
    <el-dialog v-model="is_confirm" title="Buyurtmani qabul qilish oynasi! " width="800">
        <span>
            <div class="shadow-md rounded min-h-[15px]">
                <!-- // Sale table  -->
                <el-table load class="w-full" header-align="center" hight="5" empty-text="Mahsulot tanlanmagan... "
                    :data="confirmDataById" border style="width: 100%" min-height="300" max-height="350">
                    <el-table-column header-align="center" align="center" type="index" prop="index" fixed="left"
                        label="№" width="60" />

                    <el-table-column header-align="center" prop="customer_name" label="Buyurtmachi" width="180" />

                    <el-table-column header-align="center" prop="order_number" label="Buyurtma nomeri" width="150" />
                    <el-table-column prop="pro_type" label="Turi" width="100" header-align="center" align="center" />
                    <el-table-column prop="pro_name" label="Nomi" width="100" header-align="center" align="center" />
                    <el-table-column prop="pro_color" label="Rangi" width="100" header-align="center" align="center" />
                    <el-table-column prop="pro_width" label="Eni" width="100" header-align="center" align="center" />
                    <el-table-column prop="grammaj" label="Gramaji" width="100" header-align="center" align="center" />
                    <el-table-column prop="order_quantity" label="Miqdori" fixed="right" width="100"
                        header-align="center" align="center" />
                    <el-table-column prop="delivery_time" label="Yetkazish vaqti" width="200" header-align="center"
                        align="center" />
                </el-table>
                <!-- // -->
            </div>
            <form v-show="is_cancel"
                class="filter-box md:grid md:grid-cols-4 gap-2 sm:flex sm:flex-wrap rounded shadow-md bg-white p-2 mt-1 mb-1 text-[12px]">
                <div class="mb-1 col-span-4">
                    <label name="resul" class="block mb-1 text-[12px] font-medium text-gray-900 dark:text-white">Bekor
                        qilish
                        sababi</label>

                    <el-input v-model="cancel_reason" clearable maxlength="200" show-word-limit autosize type="textarea"
                        placeholder="Sababini kiriting !" />
                </div>
            </form>
        </span>
        <el-dialog v-model="innerVisible" width="600" title="Inner Dialog" append-to-body>
            <span>Cancel And Of Reason</span>
        </el-dialog>
        <template #footer>
            <div class="dialog-footer">
                <router-link v-show="!is_cancel" @click="Cancel()" to=""
                    class="inline-flex text-[12px] items-center ml-2 px-3 py-1 mb-1 mt-2 text-sm font-medium text-center text-white bg-red-500 text-bold rounded focus:ring-4 focus:outline-none">
                    <i class=" mr-2 fa-solid fa-arrow-left fa-sm"></i>Bekor qilish</router-link>
                <router-link v-show="!is_cancel" type="" @click="CanfirmById()" to=""
                    class="inline-flex text-[12px] items-center ml-2 px-3 py-1 mb-1 mt-2 text-sm font-medium text-center text-white bg-[#36d887] text-bold rounded focus:ring-4 focus:outline-none">
                    <i class="mr-2 fa-solid fa-check fa-sm"></i>Qabul qilish</router-link>
                <router-link v-show="is_cancel" type="" @click="cancelBack()" to=""
                    class="inline-flex text-[12px] items-center ml-2 px-3 py-1 mb-1 mt-2 text-sm font-medium text-center text-white bg-red-500 text-bold rounded focus:ring-4 focus:outline-none">
                    <i class=" mr-2 fa-solid fa-arrow-left fa-sm"></i>Orqaga</router-link>
                <router-link v-show="is_cancel" type="" @click="cancelSendReason()" to=""
                    class="inline-flex text-[12px] items-center ml-2 px-3 py-1 mb-1 mt-2 text-sm font-medium text-center text-white bg-[#36d887] text-bold rounded focus:ring-4 focus:outline-none">
                    <i class="mr-2 fa-solid fa-check fa-sm"></i>Yuborish</router-link>
            </div>
        </template>
    </el-dialog>
    <!-- //// -->
</template>