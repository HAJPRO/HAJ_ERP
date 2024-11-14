<script setup>
import { ref, onMounted } from "vue";
import { SaleLegalService } from "../../ApiServices/Sale/saleLegal.service";
import { SaleStore } from "../../stores/Sale/sale.store";
const store = SaleStore();
import { storeToRefs } from "pinia";
const all_length = ref({});
const getAllLength = async () => {
    const data = await SaleLegalService.getAllLength();
    all_length.value = data.data ? data.data : {};
};
const getAll = async () => {
    const data = await store.getAll({ status: isActive.value });
};
const isActive = ref(1);
const ActiveTabLink = (num) => {
    if (num === 0) {
        isActive.value = 0;
        return getAllLength(), getAll();
    }
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
        await getAll(), getAllLength();
    } catch (err) {
        console.log(err);
    }
});
</script>
<template>
    <div class="grid grid-cols-12 grid-flow-col justify-between bg-white rounded-md shadow-md p-2 mb-2">
        <div class="col-span-9 grid-flow-col">
            <router-link @click="ActiveTabLink(1)" to="" :class="{ activeTab: isActive === 1 }"
                class="inline-flex text-[13px] items-center mr-1 px-4 py-1 mb-1  font-medium text-center text-red hover:border-b-2 border-solid border-[#36d887] bg-[#e4e9e9] text-bold rounded">
                <i class="fa-solid fa-info mr-2 fa-xm"></i> Sotuv
                <div class="flex flex-shrink-0 ml-2">
                    <span
                        class="inline-flex items-center justify-center h-5 text-[11px] font-medium text-white bg-red-500 px-3 py-2 rounded">
                        <span class=" ">1</span>/{{
                (all_length ? all_length.notConfirmed_length : 0) || 0
            }}</span>
                </div>
            </router-link>
            <router-link to="" @click="ActiveTabLink(2)" :class="{ activeTab: isActive === 2 }"
                class="inline-flex text-[13px] items-center mr-1 px-4 py-1 mb-1  font-medium text-center text-red hover:border-b-2 border-solid border-[#36d887] bg-[#e4e9e9] text-bold rounded">
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
                class="inline-flex text-[13px] items-center mr-1 px-4 py-1 mb-1  font-medium text-center text-red hover:border-b-2 border-solid border-[#36d887] bg-[#e4e9e9] text-bold rounded">
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
                class="inline-flex text-[13px] items-center mr-1 px-4 py-1 mb-1  font-medium text-center text-red hover:border-b-2 border-solid border-[#36d887] bg-[#e4e9e9] text-bold rounded">
                <i class="fa-solid fa-info mr-2 fa-xm"></i> Yigiruv
                <div class="flex flex-shrink-0 ml-2">
                    <span
                        class="inline-flex items-center justify-center h-5 text-[11px] font-medium text-white bg-[#36d887] px-3 py-2 rounded"><span
                            class=" ">0</span>/{{
                (all_length ? all_length.spinning_length : 0) || 0
            }}</span>
                </div>
            </router-link>
            <router-link to="" @click="ActiveTabLink(5)" :class="{ activeTab: isActive === 5 }"
                class="inline-flex text-[13px] items-center px-4 py-1 mb-1  font-medium text-center text-red hover:border-b-2 border-solid border-[#36d887] bg-[#e4e9e9] text-bold rounded">
                <i class="fa-solid fa-info mr-2 fa-xm"></i> Taminot
                <div class="flex flex-shrink-0 ml-2">
                    <span
                        class="inline-flex items-center justify-center h-5 text-[11px] font-medium text-white bg-[#36d887] px-3 py-2 rounded">
                        <span class=" ">0</span>/{{
                (all_length ? all_length.provide_length_length : 0) || 0
                        }}</span>
                </div>
            </router-link>
        </div>
        <div class="row-span-1 flex justify-end flex-wrap col-span-3 grid-flow-col">
            <div class="col-span-2"></div>
            <div class="col-span-1">
                <router-link to="/explore/sale/legal/create"
                    class="inline-flex items-center px-3 py-1 mb-1 text-[13px] font-medium text-center text-white bg-[#36d887] text-bold rounded">
                    <i class="fa-solid fa-plus mr-2 fa-sm"></i> Karta qo'shish
                </router-link>
            </div>
        </div>
    </div>
</template>
<style>
.activeTab {
    border-bottom: 2px solid #36d887;
}
</style>
