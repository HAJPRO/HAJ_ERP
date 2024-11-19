<script setup>
import { ProvidePlanStore } from "../../stores/Provide/provideStore";
const StoreProvide = ProvidePlanStore();
import { storeToRefs } from "pinia";
const openModalById = async (id) => {
    await StoreProvide.openModalById({ id, is_modal: true });
};
const { items } = storeToRefs(StoreProvide);
</script>
<template>
    <div class="shadow-md rounded min-h-[15px]">
        <el-table load class="w-full" header-align="center" hight="5" empty-text="Mahsulot tanlanmagan... "
            :default-sort="[
                { prop: 'departmen', order: 'descending' },
                { prop: 'duration_time', order: 'descending' },
            ]" :data="items" border style="width: 100%" min-height="300" max-height="350">
            <el-table-column header-align="center" align="center" type="index" prop="index" fixed="left" label="№"
                width="60" />

            <el-table-column header-align="center" align="center" sortable prop="departmen" label="Bo'lim"
                width="180" />
            <el-table-column header-align="center" align="center" prop="author" label="Masul" width="220" />
            <el-table-column prop="duration_time" sortable label="Yetkazish vaqti" width="300" header-align="center"
                align="center" />
            <el-table-column fixed="right" prop="status" label="Holati" width="200" header-align="center"
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
                    <router-link to=""
                        class="inline-flex items-center  ml-2 text-red bg-yellow-300 hover:bg-yellow-400 font-medium rounded-md text-sm w-full sm:w-auto px-3 py-3 text-center">
                        <i class="text-black fa-sharp fa-solid fa-check fa-xs"></i>
                    </router-link>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
