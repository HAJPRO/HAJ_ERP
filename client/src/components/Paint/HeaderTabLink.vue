<script setup>
import { ref, onMounted } from "vue"
import { ToastifyService } from "../../utils/Toastify";
import { loading } from "../../utils/Loader";
import { SaleLegalService } from "../../ApiServices/Sale/saleLegal.service";
import { SaleStore } from "../../stores/Sale/sale.store";
const store = SaleStore()
import { storeToRefs } from "pinia"
const all_length = ref();
const getAllLength = async () => {
    const loader = loading.show();
    const data = await SaleLegalService.getAllLength();
    loader.hide();
    all_length.value = data.data ? data.data : {};

};

const getAll = async () => {
    const loader = loading.show();
    const items = await store.getAll({ status: isActive.value })
    loader.hide();
};
const isActive = ref(0);
const ActiveTabLink = (num) => {
    if (num === 0) {
        isActive.value = 0;
        return getAll();
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
        await getAllLength(), getAll()
    } catch (err) {
        console.log(err);
    }
});

</script>
<template>
    <div class="grid grid-cols-12 grid-flow-col justify-between bg-white rounded-md shadow-md p-3 mb-2 ">
        <div class="col-span-9 grid-flow-col flex-wrap">
            <router-link to="" @click="ActiveTabLink(0)" :class="{ activeTab: isActive === 0 }"
                class="inline-flex text-[13px] items-center  mr-2 px-4 py-1 mb-1 text-sm font-medium text-center text-red hover:border-b-2 border-solid border-[#36d887] bg-[#e4e9e9] text-bold rounded ">
                <i class="fa-solid fa-info mr-2 fa-xm"></i> Bajarilgan
                <div class="flex flex-shrink-0 ml-2">
                    <span
                        class="inline-flex items-center justify-center h-5 text-[11px] font-medium text-white bg-[#36d887] px-3 py-2 rounded">
                        <span class=" ">0</span>/{{ 1 }}</span>
                </div>
            </router-link>
            <router-link @click="ActiveTabLink(1)" to="" :class="{ activeTab: isActive === 1 }"
                class="inline-flex  text-[13px] items-center mr-2 px-4 py-1 mb-1 text-sm font-medium text-center text-red hover:border-b-2 border-solid border-[#36d887] bg-[#e4e9e9] text-bold rounded ">
                <i class="fa-solid fa-info mr-2 fa-xm"></i> Sotuv
                <div class="flex flex-shrink-0 ml-2">
                    <span
                        class=" inline-flex items-center justify-center h-5 text-[11px] font-medium text-white bg-red-500 px-3 py-2 rounded">
                        <span class=" ">1</span>/{{ sales_length }}</span>
                </div>
            </router-link>
            <router-link to="" @click="ActiveTabLink(3)" :class="{ activeTab: isActive === 3 }"
                class="inline-flex text-[13px] items-center mr-2 px-4 py-1 mb-1 text-sm font-medium text-center text-red hover:border-b-2 border-solid border-[#36d887] bg-[#e4e9e9] text-bold rounded ">
                <i class="fa-solid fa-info mr-2 fa-xm"></i> To'quv
                <div class="flex flex-shrink-0 ml-2">
                    <span
                        class="inline-flex items-center justify-center h-5 text-[11px] font-medium text-white bg-[#36d887] px-3 py-2 rounded"><span
                            class=" ">0</span>/{{ weaving_length || 0 }}</span>
                </div>
            </router-link>
            <router-link to="" @click="ActiveTabLink(5)" :class="{ activeTab: isActive === 5 }"
                class="inline-flex text-[13px] items-center  px-4 py-1 mb-1 text-sm font-medium text-center text-red hover:border-b-2 border-solid border-[#36d887] bg-[#e4e9e9] text-bold rounded ">
                <i class="fa-solid fa-info mr-2 fa-xm"></i> Taminot
                <div class="flex flex-shrink-0 ml-2">
                    <span
                        class="inline-flex items-center justify-center h-5 text-[11px] font-medium text-white bg-[#36d887] px-3 py-2 rounded">
                        <span class=" ">0</span>/{{ provide_length || 0 }}</span>
                </div>
            </router-link>

        </div>

    </div>
</template>
<style>
.activeTab {
    border-bottom: 2px solid #36d887
}
</style>