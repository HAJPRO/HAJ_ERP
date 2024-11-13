<script setup>
import { ref, onMounted } from "vue"
import { WeavingService } from "@/ApiServices/Weaving/weaving.service";
import { ToastifyService } from "../../utils/Toastify";
// import { loading } from "../../utils/Loader";
const props = defineProps({
    isModalData: {
        type: Object,
        required: true
    },
    is_modal: {
        type: Boolean,
        required: true
    },
    card_id: {
        type: String,
        required: true
    }
})
const model = ref({});
const getModel = async () => {
    const data = await WeavingService.getModel();
    model.value = data.data;
};
const Save = async () => {
    try {
        const loader = loading.show()
        const data = await WeavingService.create({
            items: model.value,
            card_id: props.card_id,
        });
        loader.hide()
        const TimeOut = () => {
            window.location.href = "/explore/department/weaving/working/plan"
        }
        ToastifyService.ToastSuccess({ msg: data.data.msg });
        setTimeout(TimeOut, 1500)
    } catch (err) {
        console.log(err);
    }
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
    <el-dialog v-model="props.isModalData" title="Taminot uchun kerakli mahsulotlar qo'shish" width="600">
        <span>
            <form
                class="filter-box md:grid md:grid-cols-3 gap-2 sm:flex sm:flex-wrap rounded shadow-md bg-white p-2 mt-1 mb-1 text-[12px]">
                <div class="mb-1 col-span-1">
                    <label name="resul" class="block mb-1 text-[12px] font-medium text-gray-900 dark:text-white">Likra
                        (kg)</label>
                    <el-input v-model="model.likra" clearable class="w-[100%]" size="smal" type="String"
                        placeholder="..." />
                </div>
                <div class="mb-1 col-span-1">
                    <label name="resul"
                        class="block mb-1 text-[12px] font-medium text-gray-900 dark:text-white">Polister
                        (kg)</label>
                    <el-input v-model="model.polister" clearable class="w-[100%]" size="smal" type="Number"
                        placeholder="..." />
                </div>

                <div class="mb-1 col-span-1">
                    <label name="resul" class="block mb-1 text-[12px] font-medium text-gray-900 dark:text-white">Melaks
                        ip</label>
                    <el-input v-model="model.melaks_yarn" clearable class="w-[100%]" size="smal" type="String"
                        placeholder="..." />
                </div>
                <div class="mb-1 col-span-1">
                    <label name="resul" class="block mb-1 text-[12px] font-medium text-gray-900 dark:text-white">Ip
                        kalava</label>
                    <el-input v-model="model.yarn_wrap" clearable class="w-[100%]" size="smal" type="Number"
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
                <router-link @click="Save()" to=""
                    class="inline-flex text-[12px] items-center ml-2 px-3 py-1 mb-1 mt-2 text-sm font-medium text-center text-white bg-[#36d887] text-bold rounded ">
                    <i class="mr-2 fa-solid fa-check fa-sm"></i>Yuborish</router-link>

            </div>
        </template>
    </el-dialog>
</template>