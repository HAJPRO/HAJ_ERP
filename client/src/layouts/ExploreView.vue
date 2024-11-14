<template>
  <div class="h-screen w-screen">
    <div class="flex h-screen   ">
      <!-- Sidebar -->
      <Sidebar :sidebarOpen="sidebarOpen" @close-sidebar="sidebarOpen = false" />
      <!-- Content area -->
      <div class="relative flex flex-col justify-between flex-1 overflow-y-auto overflow-x-hidden  ">
        <div class="overflow-y-auto overflow-x-auto ">
          <!-- Site header -->
          <Header :sidebarOpen="sidebarOpen" @toggle-sidebar="sidebarOpen = !sidebarOpen" />
          <!-- //view -->
          <div class="m-2">
            <router-view />
          </div>
        </div>
        <!-- /// -->
        <!-- // FOOTER -->
        <div>
          <Footer />
        </div>
        <!-- //// -->
      </div>

    </div>

  </div>
</template>

<script>
import { ref } from "vue";
import Sidebar from "../partials/Sidebar.vue";
import Header from "../partials/Header.vue";
import Title from "@/components/Title.vue";
import Footer from "../partials/Footer.vue";


export default {
  name: "Dashboard",
  components: {
    Sidebar,
    Header,
    Title,
    Footer
  },
  setup() {
    const sidebarOpen = ref(false);

    return {
      sidebarOpen,
    };
  },
};
</script>
