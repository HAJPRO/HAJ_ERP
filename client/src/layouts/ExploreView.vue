<template>
  <div class="flex h-screen overflow-hidden">
    <!-- Sidebar -->
    <Sidebar :sidebarOpen="sidebarOpen" @close-sidebar="sidebarOpen = false" />

    <!-- Content area -->
    <div
      class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden"
    >
      <!-- Site header -->
      <Header
        :sidebarOpen="sidebarOpen"
        @toggle-sidebar="sidebarOpen = !sidebarOpen"
      />

      <div>
        <div class="m-2">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import Sidebar from "../partials/Sidebar.vue";
import Header from "../partials/Header.vue";
import Title from "@/components/Title.vue";

export default {
  name: "Dashboard",
  components: {
    Sidebar,
    Header,
    Title,
  },
  setup() {
    const sidebarOpen = ref(false);

    return {
      sidebarOpen,
    };
  },
};
</script>
