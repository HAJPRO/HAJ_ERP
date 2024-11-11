<script setup>
import { ref, onMounted } from "vue";
import { PaintService } from "../../ApiServices/Paint/paint.service"
import { ToastifyService } from "../../utils/Toastify";
import { loading } from "../../utils/Loader";

defineProps({})
const emit = defineEmits(['ProvideLength'])
const items = ref([])
const provide_length = ref()
const getAllForProvide = async () => {
    const loader = loading.show()
    const data = await PaintService.getAllForProvide();
    items.value = data.data
    provide_length.value = items.value.length;
    emit("ProvideLength", provide_length.value);

    loader.hide()
};
onMounted(async () => {
    try {
        await getAllForProvide()
    } catch (err) {
        console.log(err);
    }
});
</script>

<template>
    <div class="shadow-md rounded min-h-[15px]">
        <el-table load class="w-full" header-align="center" hight="5" empty-text="Mahsulot tanlanmagan... "
            :default-sort="[
                { prop: 'pus', order: 'descending' },
                { prop: 'fike', order: 'descending' },
                { prop: 'duration_time', order: 'descending' },
            ]" :data="items" border style="width: 100%" min-height="300" max-height="350">
            <el-table-column header-align="center" align="center" type="index" prop="index" fixed="left" label="№"
                width="100" />

            <el-table-column header-align="center" align="center" sortable prop="pus" label="Pus" width="300" />
            <el-table-column header-align="center" align="center" sortable prop="fike" label="Fike" width="300" />
            <el-table-column prop="color_code" label="Rang miqdori" width="300" header-align="center" align="center" />
            <el-table-column prop="duration_time" label="Yetkazish vaqti" width="300" header-align="center"
                align="center" />
            <el-table-column fixed="right" prop="paint_status" label="Holati" width="200" header-align="center"
                align="center">
                <template #default="scope">
                    <router-link to=""
                        class="inline-flex items-center text-red bg-[#f3e77b] hover:bg-[#eedc36] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-[12px] w-ful p-[5px] sm:w-auto text-center">
                        {{ scope.row.paint_status }}
                    </router-link>
                </template>
            </el-table-column>
            <el-table-column fixed="right" prop="id" label="" width="150" header-align="center" align="center">
                <template #default="scope">
                    <router-link to=""
                        class="inline-flex items-center  ml-2 text-red bg-yellow-300 hover:bg-yellow-400 font-medium rounded-md text-sm w-full sm:w-auto px-3 py-3 text-center">
                        <i class="text-black fa-sharp fa-solid fa-check fa-xs"></i>
                    </router-link>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>