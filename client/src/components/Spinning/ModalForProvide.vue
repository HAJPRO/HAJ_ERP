<script setup>
import { ref, onMounted } from "vue";
import { SpinningService } from "../../ApiServices/Spinning/spinning.service"
import { SpinningPlanStore } from "../../stores/Spinning/spinningPlan.store";
const StoreSpinning = SpinningPlanStore();
import { storeToRefs } from "pinia";
const { is_provide, card_id } = storeToRefs(StoreSpinning);
const model = ref({});
const getModel = async () => {
    const data = await SpinningService.getModel();
    model.value = data.data;
};
const SaveToProvide = async () => {
    await StoreSpinning.SaveToProvide({ id: card_id.value, data: model.value });
    is_provide.value = false;
};

onMounted(async () => {
    try {
        await getModel();
    } catch (err) {
        console.log(err);
    }
});
</script>

<template>
    <el-dialog v-model="is_provide" title="Taminot uchun kerakli mahsulotlar qo'shish" width="600">
        <span>
            <form
                class="filter-box md:grid md:grid-cols-3 gap-2 sm:flex sm:flex-wrap rounded shadow-md bg-white p-2 mt-1 mb-1 text-[12px]">
                <div class="mb-1 col-span-1">
                    <label name="resul" class="block mb-1 text-[12px] font-medium text-gray-900 dark:text-white">Begunok
                        (kg)</label>
                    <el-input v-model="model.begunok" clearable class="w-[100%]" size="smal" type="Number"
                        placeholder="..." />
                </div>
                <div class="mb-1 col-span-1">
                    <label name="resul" class="block mb-1 text-[12px] font-medium text-gray-900 dark:text-white">Latun
                        (kg)</label>
                    <el-input v-model="model.latun" clearable class="w-[100%]" size="smal" type="Number"
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
            <div class="dialog-footer">
                <router-link @click="SaveToProvide()" to=""
                    class="inline-flex text-[12px] items-center ml-2 px-3 py-1 mb-1 mt-2 text-sm font-medium text-center text-white bg-[#36d887] text-bold rounded">
                    <i class="mr-2 fa-solid fa-check fa-sm"></i>Yuborish</router-link>
            </div>
        </template>
    </el-dialog>
</template>
