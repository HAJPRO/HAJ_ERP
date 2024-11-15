<script setup></script>
<template>
    <div class="grid grid-cols-12 grid-flow-col justify-between bg-white rounded-md shadow-md p-2 mb-2">
        <div class="col-span-9 grid-flow-col">
            <router-link @click="ActiveTabLink()" to="" :class="{ activeTab: isActive === 0 }"
                class="inline-flex text-[13px] items-center mr-1 px-4 py-1 mb-1 text-sm font-medium text-center text-red hover:border-b-2 border-solid border-[#36d887] bg-[#e4e9e9] text-bold rounded">
                <i class="fa-solid fa-info mr-2 fa-xm"></i> Bajarilgan
                <div class="flex flex-shrink-0 ml-2">
                    <span
                        class="inline-flex items-center justify-center h-5 text-[11px] font-medium text-white bg-red-500 px-3 py-2 rounded">
                        <span class=" ">1</span>/{{
                (all_length ? all_length.notConfirmed_length : 0) || 0
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
            <router-link to="" @click="ActiveTabLink(5)" :class="{ activeTab: isActive === 5 }"
                class="inline-flex text-[13px] items-center px-4 py-1 mb-1 text-sm font-medium text-center text-red hover:border-b-2 border-solid border-[#36d887] bg-[#e4e9e9] text-bold rounded">
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
    </div>
</template>
