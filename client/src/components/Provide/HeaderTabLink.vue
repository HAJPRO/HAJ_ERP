<script setup>
import { ref, onMounted } from "vue";
import { ToastifyService } from "../../utils/Toastify.js";
import { loading } from "../../utils/Loader";
import { ProvideService } from "../../ApiServices/Provide/provide.service.js";
import { ProvidePlanStore } from "../../stores/Provide/provideStore.js";
const store = ProvidePlanStore();
import { storeToRefs } from "pinia";
const all_length = ref();
const getAllLength = async () => {
    const data = await ProvideService.getAllLength();
    all_length.value = data.data ? data.data : {};
};
const getAll = async () => {
    const loader = loading.show();
    await store.getAll({ status: isActive.value });
    loader.hide();
};
const isActive = ref(1);
const ActiveTabLink = (num) => {
    if (num === 1) {
        isActive.value = 1;
        return getAll();
    }
    if (num === 2) {
        isActive.value = 2;
        return getAll();
    }
    if (num === 3) {
        isActive.value = 3;
        return getAll();
    }
    if (num === 4) {
        isActive.value = 4;
        return getAll();
    }
    if (num === 5) {
        isActive.value = 5;
        return getAll();
    }
};
onMounted(async () => {
    try {
        await getAllLength(), getAll();
    } catch (err) {
        console.log(err);
    }
});
</script>

<template>
    <div class="grid grid-cols-12 grid-flow-col justify-between bg-white rounded-md shadow-md p-2 mb-2">
        <div class="col-span-9 grid-flow-col">
            <router-link @click="ActiveTabLink(1)" to="" :class="{ activeTab: isActive === 1 }"
                class="inline-flex text-[13px] items-center mr-1 px-4 py-1 mb-1 text-sm font-medium text-center text-red hover:border-b-2 border-solid border-[#36d887] bg-[#e4e9e9] text-bold rounded">
                <i class="fa-solid fa-info mr-2 fa-xm"></i> Jarayonda
                <div class="flex flex-shrink-0 ml-2">
                    <span
                        class="inline-flex items-center justify-center h-5 text-[11px] font-medium text-white bg-red-500 px-3 py-2 rounded">
                        <span class=" ">1</span>/{{
                (all_length ? all_length.provide_length : 0) || 0
            }}</span>
                </div>
            </router-link>
            <router-link to="" @click="ActiveTabLink(2)" :class="{ activeTab: isActive === 2 }"
                class="inline-flex text-[13px] items-center mr-1 px-4 py-1 mb-1 text-sm font-medium text-center text-red hover:border-b-2 border-solid border-[#36d887] bg-[#e4e9e9] text-bold rounded">
                <i class="fa-solid fa-info mr-2 fa-xm"></i> Bo'yoq
                <div class="flex flex-shrink-0 ml-2">
                    <span
                        class="inline-flex items-center justify-center h-5 text-[11px] font-medium text-white bg-[#36d887] px-3 py-2 rounded">
                        <span class=" ">0</span>/{{
                (all_length ? all_length.paint_length : 0) || 0
            }}</span>
                </div>
            </router-link>
            <router-link to="" @click="ActiveTabLink(3)" :class="{ activeTab: isActive === 3 }"
                class="inline-flex text-[13px] items-center mr-1 px-4 py-1 mb-1 text-sm font-medium text-center text-red hover:border-b-2 border-solid border-[#36d887] bg-[#e4e9e9] text-bold rounded">
                <i class="fa-solid fa-info mr-2 fa-xm"></i> To'quv
                <div class="flex flex-shrink-0 ml-2">
                    <span
                        class="inline-flex items-center justify-center h-5 text-[11px] font-medium text-white bg-[#36d887] px-3 py-2 rounded"><span
                            class=" ">0</span>/{{
                (all_length ? all_length.weaving_length : 0) || 0
            }}</span>
                </div>
            </router-link>
            <router-link to="" @click="ActiveTabLink(4)" :class="{ activeTab: isActive === 4 }"
                class="inline-flex text-[13px] items-center mr-1 px-4 py-1 mb-1 text-sm font-medium text-center text-red hover:border-b-2 border-solid border-[#36d887] bg-[#e4e9e9] text-bold rounded">
                <i class="fa-solid fa-info mr-2 fa-xm"></i> Yigiruv
                <div class="flex flex-shrink-0 ml-2">
                    <span
                        class="inline-flex items-center justify-center h-5 text-[11px] font-medium text-white bg-[#36d887] px-3 py-2 rounded"><span
                            class=" ">0</span>/{{
                (all_length ? all_length.spinning_length : 0) || 0
                        }}</span>
                </div>
            </router-link>
        </div>
    </div>
</template>
<style>
.activeTab {
    border-bottom: 2px solid #36d887;
}
</style>
