<!-- <script setup>
import { SaleStore } from "../../stores/Sale/sale.store";
const store = SaleStore();
import { storeToRefs } from "pinia";
</script>

<template>
    <el-dialog v-model="store.status_modal.isModal" title="Holati haqida ma'lumot" width="500">
        <span>
            <form
                class="filter-box md:grid md:grid-cols-12 gap-2 sm:flex sm:flex-wrap rounded shadow-md bg-white p-1 mt-1 mb-1 text-[12px]">
                <div class="mb-1 col-span-6">
                    <label name="resul" class="block mb-1 text-[12px] font-medium text-gray-900 dark:text-white">
                        Username</label>
                    <el-input disabled clearable class="w-[100%]" size="smal" type="String" placeholder="..." />
                </div>

                <div class="mb-1 col-span-6">
                    <label name="resul" class="block mb-1 text-[12px] font-medium text-gray-900 dark:text-white">Sana
                    </label>
                    <el-input disabled clearable class="w-[100%]" size="smal" type="String" placeholder="..." />

                </div>
                <div class="mb-1 col-span-12">
                    <label name="resul" class="block mb-1 text-[12px] font-medium text-gray-900 dark:text-white">Sababi
                    </label>
                    <el-input disabled type="textarea" autosize>
                    </el-input>
                </div>
            </form>
        </span>
        <el-dialog v-model="innerVisible" width="500" title="Inner Dialog" append-to-body>
            <span>This is the inner Dialog</span>
        </el-dialog>
        <template #footer>

        </template>
    </el-dialog>
</template> -->
