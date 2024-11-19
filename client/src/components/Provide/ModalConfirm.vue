<script setup>
import { ref, onMounted } from "vue";
import { ToastifyService } from "../../utils/Toastify";
import { loading } from "../../utils/Loader";
import { SaleLegalService } from "../../ApiServices/Sale/saleLegal.service";
import { PaintPlanStore } from "../../stores/Paint/paintPlan.store";
import ModalForProvide from "../../components/Paint/ProvideTable.vue";
const store = PaintPlanStore();
import { storeToRefs } from "pinia";
const { is_modal, card_id, items, model } = storeToRefs(store)
const is_cancel = ref(false)
const Cancel = () => {
    is_cancel.value = !is_cancel.value
}
const cancel_reason = ref()
const sendReason = async () => {
    await store.cancelSendReason({ id: card_id.value, reason: cancel_reason.value })
    is_modal.value = false

}
const isConfirm = () => {
    store.isConfirmModal({ is_modal: true })
}
</script>
<template>
    <el-dialog v-model="is_modal" title="Buyurtmani qabul qilish oynasi! " width="800">
        <span>
            <div class="shadow-md rounded min-h-[15px]">
                <el-table load class="w-full" header-align="center" hight="5" empty-text="Mahsulot tanlanmagan... "
                    :default-sort="[{ prop: 'duration_time', order: 'descending' }]" :data="items" border
                    style="width: 100%" min-height="300" max-height="350">
                    <el-table-column header-align="center" align="center" type="index" prop="index" fixed="left"
                        label="№" width="60" />
                    <el-table-column header-align="center" prop="customer_name" label="Buyurtmachi nomi" width="200" />
                    <el-table-column header-align="center" prop="order_number" label="Buyurtma miqdori" width="200" />
                    <el-table-column prop="pus" label="Pus (kg)" width="180" header-align="center" align="center" />
                    <el-table-column prop="fike" label="Fike (kg)" width="180" header-align="center" align="center" />
                    <el-table-column prop="color_code" label="Rang kod" width="180" header-align="center"
                        align="center" />
                    <el-table-column prop="raw_cloth_quantity" label="Xom mato" width="180" header-align="center"
                        align="center" />
                    <el-table-column prop="duration_time" sortable label="Yetkazish vaqti" width="180"
                        header-align="center" align="center" />
                    <el-table-column fixed="right" prop="status" label="Holati" width="150" header-align="center"
                        align="center">
                        <template #default="scope">
                            <router-link to=""
                                class="inline-flex items-center text-red bg-[#f3e77b] hover:bg-[#eedc36] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-[12px] w-ful p-[5px] sm:w-auto text-center">
                                {{ scope.row.status }}
                            </router-link>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" prop="id" label="" width="150" header-align="center" align="center">
                        <template #default="scope">
                            <router-link to="" @click="openModalById(scope.row._id)"
                                class="inline-flex items-center mt-4 ml-2 text-red bg-[#eedc36] hover:bg-yellow-400 font-medium rounded-md text-sm w-full sm:w-auto px-2 py-3 text-center">
                                <i class="text-red fa-solid fa-check fa-xs fa- fa-xs"></i>
                            </router-link>
                            <router-link to="/explore/sale/legal/create" @click="DeleteFromTable(scope.row._id)"
                                class="inline-flex items-center mt-4 ml-2 text-red bg-[#36d887] hover:bg-[#39c07c] font-medium rounded-md text-sm w-full sm:w-auto px-3 py-3 text-center">
                                <i class="text-black fa-sharp fa-solid fa-info fa-xs"></i>
                            </router-link>
                        </template>
                    </el-table-column>
                </el-table>
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
                <router-link v-show="!is_cancel" to="" @click="Cancel()"
                    class="inline-flex text-[12px] items-center ml-2 px-3 py-1 mb-1 mt-2 text-sm font-medium text-center text-white bg-red-500 text-bold rounded ">
                    <i class=" mr-2 fa-solid fa-xmark fa-sm"></i>Bekor qilish</router-link>
                <router-link v-show="!is_cancel" type="" to="" @click="Confirm()" class=" inline-flex
                    text-[12px] items-center ml-2 px-3 py-1 mb-1 mt-2 text-sm font-medium text-center text-white
                    bg-[#36d887] text-bold rounded ">
                    <i class=" mr-2 fa-solid fa-check fa-sm"></i>Qabul qilish</router-link>
                <router-link v-show="is_cancel" type="" @click="is_cancel = false" to=""
                    class="inline-flex text-[12px] items-center ml-2 px-3 py-1 mb-1 mt-2 text-sm font-medium text-center text-white bg-red-500 text-bold rounded ">
                    <i class=" mr-2 fa-solid fa-arrow-left fa-sm"></i>Orqaga</router-link>
                <router-link v-show="is_cancel" type="" to="" @click="sendReason()"
                    class="inline-flex text-[12px] items-center ml-2 px-3 py-1 mb-1 mt-2 text-sm font-medium text-center text-white bg-[#36d887] text-bold rounded ">
                    <i class="mr-2 fa-solid fa-check fa-sm"></i>Yuborish</router-link>
            </div>
        </template>
    </el-dialog>
</template>