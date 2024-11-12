<script setup>
import { ref, onMounted, onBeforeUpdate } from "vue";
import { SaleLegalService } from "../../ApiServices/Sale/saleLegal.service";

const props = defineProps({
    isProccessModal: {
        type: Boolean,
        default: false,
    },
    cardId: {
        type: Number,
        default: false,
    },
});
const emit = defineEmits({});
const isDepInfo = ref(false);
const isDepInfoBtn = () => {
    isDepInfo.value = !isDepInfo.value;
};
const proccess = ref([]);
const customer_name = ref();
const order_quantity = ref();
const order_number = ref();
const dep_paint_data = ref([]);
const author = ref();
const AllOrderProccessById = async () => {
    try {
        const items = await SaleLegalService.AllOrderProccessById(props.cardId);
        proccess.value = items.data.process_status;
        customer_name.value = items.data.customer_name;
        order_quantity.value = items.data.order_quantity;
        order_number.value = items.data.order_number;
        dep_paint_data.value = Array(items.data.dep_paint_data);
        author.value = items.data.author
    } catch (error) {
        return error.message;
    }
};
onBeforeUpdate(async () => {
    try {
        await AllOrderProccessById();
    } catch (err) {
        console.log(err);
    }
});
</script>

<template>
    <el-dialog v-model="isProccessModal" title="Buyurtmani ishlab chiqarish jarayoni bo'yicha malumotlari" width="800">
        <div class="">
            <div class="Pragress flex gap-1">
                <div v-for="itim in proccess" :key="itim.index">
                    <span to=""
                        class="cursor-pointer inline-flex items-center px-1.5 py-1.5 mb-1 text-[10px] font-semibold text-center text-white bg-[#36d887] text-bold rounded">
                        {{ itim.status }} =>
                    </span>
                </div>
            </div>
            <div class="Main bg-white dark:bg-gray-800 shadow-sm rounded-xl">
                <div class="Header flex justify-between gap-1 border-t-[1.5px] border-solid border-[#36d887]">
                    <header class="py-2 border-b border-gray-100 dark:border-gray-700/60">
                        <h5 class="font-semibold text-[12px] text-gray-800 dark:text-gray-100">
                            Buyurtmachi nomi : {{ customer_name }}
                        </h5>
                    </header>
                    <header class="py-2 border-b border-gray-100 dark:border-gray-700/60">
                        <h5 class="font-semibold text-[12px] text-gray-800 dark:text-gray-100">
                            Buyurtma raqami : {{ order_number }}
                        </h5>
                    </header>
                    <header class="py-2 border-b border-gray-100 dark:border-gray-700/60">
                        <h5 class="font-semibold text-[12px] text-gray-800 dark:text-gray-100">
                            Buyurtmachi miqdori : {{ order_quantity }} kg
                        </h5>
                    </header>
                </div>
                <div class="Department">
                    <div>
                        <header @click="isDepInfoBtn()"
                            class="text-xs uppercase text-center cursor-pointer text-white dark:text-gray-500 bg-[#36d887] dark:bg-gray-700 dark:bg-opacity-50 rounded-sm font-semibold p-2">
                            Bo'limlar bo'yicha ma'lumotini ko'rish
                            <span class="hidden sm:inline"> -&gt;</span>
                        </header>
                        <div v-show="isDepInfo" class="mt-2">
                            <!-- Item -->
                            <div class="Paint">
                                <div class="flex gap-2 mb-2 mt-2 ">
                                    <div class="w-8 h-8 rounded-full shrink-0 bg-red-500">
                                        <svg class="w-8 h-8 fill-current text-white" viewBox="0 0 36 36">
                                            <path
                                                d="M25 24H11a1 1 0 01-1-1v-5h2v4h12v-4h2v5a1 1 0 01-1 1zM14 13h8v2h-8z" />
                                        </svg>
                                    </div>
                                    <div class="mt-1 mr-3 text-[15px] font-semibold">Bo'yoq</div>
                                </div>
                                <div class="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
                                    <div class="">
                                        <!-- Table -->
                                        <div class="overflow-x-auto">
                                            <div class="shadow-md rounded min-h-[15px]">
                                                <el-table load class="w-full" header-align="center" hight="5"
                                                    style="width: 100%" empty-text="Mahsulot topilmadi... "
                                                    :default-sort="[]" :data="dep_paint_data" border min-height="200"
                                                    max-height="200">
                                                    <el-table-column header-align="center" align="center" type="index"
                                                        prop="index" fixed="left" label="№" width="60" />
                                                    <el-table-column header-align="center" prop="pus" label="Pus"
                                                        width="90" />
                                                    <el-table-column header-align="center" prop="fike" label="Fike"
                                                        width="90" />
                                                    <el-table-column prop="color_code" label="Rang kode" width="100"
                                                        header-align="center" align="center" />
                                                    <el-table-column prop="raw_cloth_quantity" label="Mato" width="100"
                                                        header-align="center" align="center" />
                                                    <el-table-column prop="duration_time" label="Muddati" width="180"
                                                        header-align="center" align="center" />
                                                    <el-table-column fixed="right" prop="order_status" label="Holati"
                                                        width="150" header-align="center" align="center">
                                                        <template #default="scope">
                                                            <router-link to=""
                                                                class="inline-flex items-center text-red bg-[#e4e9e9] hover:bg-[#f7efa9] focus:ring-blue-300 font-medium rounded-md text-[12px] w-ful p-[5px] sm:w-auto text-center">
                                                                {{ scope.row.paint_status }}
                                                            </router-link>
                                                        </template>
                                                    </el-table-column>
                                                </el-table>
                                                <!-- // -->
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="To'quv">
                                <div class="flex gap-2 mb-2 mt-2">
                                    <div class="w-8 h-8 rounded-full shrink-0 bg-red-500">
                                        <svg class="w-8 h-8 fill-current text-white" viewBox="0 0 36 36">
                                            <path
                                                d="M25 24H11a1 1 0 01-1-1v-5h2v4h12v-4h2v5a1 1 0 01-1 1zM14 13h8v2h-8z" />
                                        </svg>
                                    </div>
                                    <div class="mt-1 mr-3 text-[15px] font-semibold">To'quv</div>
                                </div>
                                <div class="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
                                    <div class="">
                                        <!-- Table -->
                                        <div class="overflow-x-auto">
                                            <div class="shadow-md rounded min-h-[15px]">
                                                <el-table load class="w-full" header-align="center" hight="5"
                                                    style="width: 100%" empty-text="Mahsulot topilmadi... "
                                                    :default-sort="[]" :data="dep_paint_data" border min-height="200"
                                                    max-height="200">
                                                    <el-table-column header-align="center" align="center" type="index"
                                                        prop="index" fixed="left" label="№" width="60" />
                                                    <el-table-column header-align="center" prop="pus" label="Pus"
                                                        width="90" />
                                                    <el-table-column header-align="center" prop="fike" label="Fike"
                                                        width="90" />
                                                    <el-table-column prop="color_code" label="Rang kode" width="100"
                                                        header-align="center" align="center" />
                                                    <el-table-column prop="raw_cloth_quantity" label="Mato" width="100"
                                                        header-align="center" align="center" />
                                                    <el-table-column prop="duration_time" label="Muddati" width="180"
                                                        header-align="center" align="center" />
                                                    <el-table-column fixed="right" prop="order_status" label="Holati"
                                                        width="150" header-align="center" align="center">
                                                        <template #default="scope">
                                                            <router-link to=""
                                                                class="inline-flex items-center text-red bg-[#e4e9e9] hover:bg-[#f7efa9] focus:ring-blue-300 font-medium rounded-md text-[12px] w-ful p-[5px] sm:w-auto text-center">
                                                                {{ scope.row.paint_status }}
                                                            </router-link>
                                                        </template>
                                                    </el-table-column>
                                                </el-table>
                                                <!-- // -->
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="Yigiruv">
                                <div class="flex gap-2 mb-2 mt-2">
                                    <div class="w-8 h-8 rounded-full shrink-0 bg-red-500">
                                        <svg class="w-8 h-8 fill-current text-white" viewBox="0 0 36 36">
                                            <path
                                                d="M25 24H11a1 1 0 01-1-1v-5h2v4h12v-4h2v5a1 1 0 01-1 1zM14 13h8v2h-8z" />
                                        </svg>
                                    </div>
                                    <div class="mt-1 mr-3 text-[15px] font-semibold">Yigiruv</div>
                                </div>
                                <div class="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
                                    <div class="">
                                        <!-- Table -->
                                        <div class="overflow-x-auto">
                                            <div class="shadow-md rounded min-h-[15px]">
                                                <el-table load class="w-full" header-align="center" hight="5"
                                                    style="width: 100%" empty-text="Mahsulot topilmadi... "
                                                    :default-sort="[]" :data="dep_paint_data" border min-height="200"
                                                    max-height="200">
                                                    <el-table-column header-align="center" align="center" type="index"
                                                        prop="index" fixed="left" label="№" width="60" />
                                                    <el-table-column header-align="center" prop="pus" label="Pus"
                                                        width="90" />
                                                    <el-table-column header-align="center" prop="fike" label="Fike"
                                                        width="90" />
                                                    <el-table-column prop="color_code" label="Rang kode" width="100"
                                                        header-align="center" align="center" />
                                                    <el-table-column prop="raw_cloth_quantity" label="Mato" width="100"
                                                        header-align="center" align="center" />
                                                    <el-table-column prop="duration_time" label="Muddati" width="180"
                                                        header-align="center" align="center" />
                                                    <el-table-column fixed="right" prop="order_status" label="Holati"
                                                        width="150" header-align="center" align="center">
                                                        <template #default="scope">
                                                            <router-link to=""
                                                                class="inline-flex items-center text-red bg-[#e4e9e9] hover:bg-[#f7efa9] focus:ring-blue-300 font-medium rounded-md text-[12px] w-ful p-[5px] sm:w-auto text-center">
                                                                {{ scope.row.paint_status }}
                                                            </router-link>
                                                        </template>
                                                    </el-table-column>
                                                </el-table>
                                                <!-- // -->
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="Taminot">
                                <div class="flex gap-2 mb-2 mt-2">
                                    <div class="w-8 h-8 rounded-full shrink-0 bg-red-500">
                                        <svg class="w-8 h-8 fill-current text-white" viewBox="0 0 36 36">
                                            <path
                                                d="M25 24H11a1 1 0 01-1-1v-5h2v4h12v-4h2v5a1 1 0 01-1 1zM14 13h8v2h-8z" />
                                        </svg>
                                    </div>
                                    <div class="mt-1 mr-3 text-[15px] font-semibold">Taminot</div>
                                </div>
                                <div class="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
                                    <div class="">
                                        <!-- Table -->
                                        <div class="overflow-x-auto">
                                            <div class="shadow-md rounded min-h-[15px]">
                                                <el-table load class="w-full" header-align="center" hight="5"
                                                    style="width: 100%" empty-text="Mahsulot topilmadi... "
                                                    :default-sort="[]" :data="dep_paint_data" border min-height="200"
                                                    max-height="200">
                                                    <el-table-column header-align="center" align="center" type="index"
                                                        prop="index" fixed="left" label="№" width="60" />
                                                    <el-table-column header-align="center" prop="pus" label="Pus"
                                                        width="90" />
                                                    <el-table-column header-align="center" prop="fike" label="Fike"
                                                        width="90" />
                                                    <el-table-column prop="color_code" label="Rang kode" width="100"
                                                        header-align="center" align="center" />
                                                    <el-table-column prop="raw_cloth_quantity" label="Mato" width="100"
                                                        header-align="center" align="center" />
                                                    <el-table-column prop="duration_time" label="Muddati" width="180"
                                                        header-align="center" align="center" />
                                                    <el-table-column fixed="right" prop="order_status" label="Holati"
                                                        width="150" header-align="center" align="center">
                                                        <template #default="scope">
                                                            <router-link to=""
                                                                class="inline-flex items-center text-red bg-[#e4e9e9] hover:bg-[#f7efa9] focus:ring-blue-300 font-medium rounded-md text-[12px] w-ful p-[5px] sm:w-auto text-center">
                                                                {{ scope.row.paint_status }}
                                                            </router-link>
                                                        </template>
                                                    </el-table-column>
                                                </el-table>
                                                <!-- // -->
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                    <router-link to=""
                        class="inline-flex text-[13px] items-center px-2 py-1 mb-1 text-sm font-medium text-center text-white bg-yellow-500 text-bold rounded">
                        <i class="fa-solid fa-file-excel mr-2 fa-xm"></i> Excel
                    </router-link>
                    <router-link @click="emit('isProccess', false)" to=""
                        class="inline-flex text-[13px] items-center ml-2 px-2 py-1 mb-1 text-sm font-medium text-center text-white bg-red-500 text-bold rounded">
                        <i class="fa-solid fa-file-excel mr-2 fa-xm"></i> Yopish
                    </router-link>
                </div>
            </div>
        </template>
    </el-dialog>
</template>
