<template>
  <div>
    <!-- Sidebar backdrop (mobile only) -->
    <div
      class="fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200"
      :class="sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'"
      aria-hidden="true"
    ></div>

    <!-- Sidebar -->
    <div
      id="sidebar"
      ref="sidebar"
      class="flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-slate-800 p-4 transition-all duration-200 ease-in-out"
      :class="sidebarOpen ? 'translate-x-0' : '-translate-x-64'"
    >
      <!-- Sidebar header -->
      <div class="flex justify-between mb-10 pr-3 sm:px-2">
        <!-- Close button -->
        <button
          ref="trigger"
          class="lg:hidden text-slate-500 hover:text-slate-400"
          @click.stop="$emit('close-sidebar')"
          aria-controls="sidebar"
          :aria-expanded="sidebarOpen"
        >
          <span class="sr-only">Close sidebar</span>
          <svg
            class="w-6 h-6 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z"
            />
          </svg>
        </button>
        <!-- Logo -->
        <router-link class="flex" to="/explore">
          <svg width="40" height="40" viewBox="0 0 32 32">
            <defs>
              <linearGradient
                x1="28.538%"
                y1="20.229%"
                x2="100%"
                y2="108.156%"
                id="logo-a"
              >
                <stop stop-color="#A5B4FC" stop-opacity="0" offset="0%" />
                <stop stop-color="#A5B4FC" offset="100%" />
              </linearGradient>
              <linearGradient
                x1="88.638%"
                y1="29.267%"
                x2="22.42%"
                y2="100%"
                id="logo-b"
              >
                <stop stop-color="#38BDF8" stop-opacity="0" offset="0%" />
                <stop stop-color="#38BDF8" offset="100%" />
              </linearGradient>
            </defs>
            <rect fill="#6366F1" width="32" height="32" rx="16" />
            <path
              d="M18.277.16C26.035 1.267 32 7.938 32 16c0 8.837-7.163 16-16 16a15.937 15.937 0 01-10.426-3.863L18.277.161z"
              fill="#4F46E5"
            />
            <path
              d="M7.404 2.503l18.339 26.19A15.93 15.93 0 0116 32C7.163 32 0 24.837 0 16 0 10.327 2.952 5.344 7.404 2.503z"
              fill="url(#logo-a)"
            />
            <path
              d="M2.223 24.14L29.777 7.86A15.926 15.926 0 0132 16c0 8.837-7.163 16-16 16-5.864 0-10.991-3.154-13.777-7.86z"
              fill="url(#logo-b)"
            />
          </svg>
          <h5 class="text-white mt-2 ml-7 font-serif font-bold">HAJ ERP</h5>
        </router-link>
      </div>

      <!-- Links -->
      <div class="space-y-5">
        <!-- Dashboard -->
        <SidebarLinkGroup
          v-slot="parentLink"
          :activeCondition="
            currentRoute.fullPath === '/' ||
            currentRoute.fullPath.includes('dashboard')
          "
        >
          <a
            class="block text-slate-200 truncate transition duration-150"
            :class="
              currentRoute.fullPath === '/' ||
              currentRoute.fullPath.includes('dashboard')
                ? 'hover:text-slate-200'
                : 'hover:text-white'
            "
            href="#0"
            @click.prevent="
              sidebarExpanded
                ? parentLink.handleClick()
                : (sidebarExpanded = true)
            "
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <img
                  class="shrink-0 h-8 w-8"
                  viewBox="0 0 24 24"
                  src="https://cdn2.iconfinder.com/data/icons/business-yuk/32/analytic-512.png"
                  alt="package-"
                />

                <span
                  class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                  >Dashboard</span
                >
              </div>
              <!-- Icon -->
              <div class="flex shrink-0 ml-2">
                <svg
                  class="w-3 h-3 shrink-0 ml-1 fill-current text-slate-400"
                  :class="parentLink.expanded && 'rotate-180'"
                  viewBox="0 0 12 12"
                >
                  <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                </svg>
              </div>
            </div>
          </a>
          <div class="lg:hidden lg:sidebar-expanded:block 2xl:block">
            <ul class="pl-9 mt-1" :class="!parentLink.expanded && 'hidden'">
              <router-link
                to="/explore"
                custom
                v-slot="{ href, navigate, isExactActive }"
              >
                <li class="mb-1 last:mb-0">
                  <a
                    class="block transition duration-150 truncate"
                    :class="
                      isExactActive
                        ? 'text-[#36d887]'
                        : 'text-slate-400 hover:text-slate-200'
                    "
                    :href="href"
                    @click="navigate"
                  >
                    <span
                      class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                      >Graphical statistics</span
                    >
                  </a>
                </li>
              </router-link>
            </ul>
          </div>
        </SidebarLinkGroup>
        <!-- Buyurtmalar-->
        <div v-if="role == 1 || role === 1000">
          <h3 class="text-xs uppercase text-slate-500 font-semibold pl-3">
            <span
              class="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
              aria-hidden="true"
              >•••</span
            >
            <span class="lg:hidden lg:sidebar-expanded:block 2xl:block"
              >Buyurtmalar</span
            >
          </h3>
          <ul class="mt-3">
            <!-- Sotuv  -->
            <SidebarLinkGroup
              v-slot="parentLink"
              :activeCondition="currentRoute.fullPath.includes('ecommerce')"
            >
              <a
                class="block text-slate-200 truncate transition duration-150"
                :class="
                  currentRoute.fullPath.includes('ecommerce')
                    ? 'hover:text-slate-200'
                    : 'hover:text-white'
                "
                href="#0"
                @click.prevent="
                  sidebarExpanded
                    ? parentLink.handleClick()
                    : (sidebarExpanded = true)
                "
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <img
                      class="shrink-0 h-7 w-7"
                      viewBox="0 0 24 24"
                      src="https://cdn4.iconfinder.com/data/icons/back-to-school-151/64/file-sheet-document-paper-report-512.png"
                      alt="package-"
                    />
                    <span
                      class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                      >Sotuv
                    </span>
                  </div>
                  <!-- Icon -->
                  <div class="flex shrink-0 ml-2">
                    <svg
                      class="w-3 h-3 shrink-0 ml-1 fill-current text-slate-400"
                      :class="parentLink.expanded && 'rotate-180'"
                      viewBox="0 0 12 12"
                    >
                      <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                    </svg>
                  </div>
                </div>
              </a>
              <div class="lg:hidden lg:sidebar-expanded:block 2xl:block">
                <ul class="pl-9 mt-1" :class="!parentLink.expanded && 'hidden'">
                  <router-link
                    :to="{ name: 'legal' }"
                    custom
                    v-slot="{ href, navigate, isExactActive }"
                  >
                    <li class="mb-1 last:mb-0">
                      <a
                        class="block transition duration-150 truncate"
                        :class="
                          isExactActive
                            ? 'text-[#36d887]'
                            : 'text-slate-400 hover:text-slate-200'
                        "
                        :href="href"
                        @click="navigate"
                      >
                        <span
                          class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                          >Yuridik</span
                        >
                      </a>
                    </li>
                  </router-link>
                  <router-link
                    to="/explore/sale/physical"
                    custom
                    v-slot="{ href, navigate, isExactActive }"
                  >
                    <li class="mb-1 last:mb-0">
                      <a
                        class="block transition duration-150 truncate"
                        :class="
                          isExactActive
                            ? 'text-[#36d887]'
                            : 'text-slate-400 hover:text-slate-200'
                        "
                        :href="href"
                        @click="navigate"
                      >
                        <span
                          class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                          >Jismoniy</span
                        >
                      </a>
                    </li>
                  </router-link>
                </ul>
              </div>
            </SidebarLinkGroup>
          </ul>
        </div>

        <!-- Harakatlar group -->
        <div
          v-if="
            role === 2 ||
            role === 1000 ||
            role === 2 ||
            role === 3 ||
            role === 4 ||
            role === 5 ||
            role === 6
          "
        >
          <h3 class="text-xs uppercase text-slate-500 font-semibold pl-3">
            <span
              class="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
              aria-hidden="true"
              >•••</span
            >
            <span class="lg:hidden lg:sidebar-expanded:block 2xl:block"
              >Harakatlar</span
            >
          </h3>
          <ul v-if="role === 2 || role === 1000" class="mt-3">
            <!-- Bo'yash harakati  -->
            <SidebarLinkGroup
              v-slot="parentLink"
              :activeCondition="currentRoute.fullPath.includes('ecommerce')"
            >
              <a
                class="block text-slate-200 truncate transition duration-150"
                :class="
                  currentRoute.fullPath.includes('ecommerce')
                    ? 'hover:text-slate-200'
                    : 'hover:text-white'
                "
                href="#0"
                @click.prevent="
                  sidebarExpanded
                    ? parentLink.handleClick()
                    : (sidebarExpanded = true)
                "
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <img
                      class="shrink-0 h-7 w-7"
                      viewBox="0 0 24 24"
                      src="https://cdn3.iconfinder.com/data/icons/leto-finance-money-1/64/finance_growth_money_income-512.png"
                      alt="package-"
                    />

                    <span
                      class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                      >Bo'yash harakati
                    </span>
                  </div>
                  <!-- Icon -->
                  <div class="flex shrink-0 ml-2">
                    <svg
                      class="w-3 h-3 shrink-0 ml-1 fill-current text-slate-400"
                      :class="parentLink.expanded && 'rotate-180'"
                      viewBox="0 0 12 12"
                    >
                      <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                    </svg>
                  </div>
                </div>
              </a>
              <div class="lg:hidden lg:sidebar-expanded:block 2xl:block">
                <ul class="pl-9 mt-1" :class="!parentLink.expanded && 'hidden'">
                  <!-- //Xommato skladi -->
                  <router-link
                    to="/explore/products/list"
                    custom
                    v-slot="{ href, navigate, isExactActive }"
                  >
                    <li class="mb-1 last:mb-0">
                      <a
                        class="block transition duration-150 truncate"
                        :class="
                          isExactActive
                            ? 'text-[#36d887]'
                            : 'text-slate-400 hover:text-slate-200'
                        "
                        :href="href"
                        @click="navigate"
                      >
                        <span
                          class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                          >Xom mato sklad</span
                        >
                      </a>
                    </li>
                  </router-link>
                  <!-- // -->
                  <ul class="mt-1">
                    <!-- ishlab chiqarish  -->
                    <SidebarLinkGroup
                      v-slot="parentLink"
                      :activeCondition="
                        currentRoute.fullPath.includes('ecommerce')
                      "
                    >
                      <a
                        class="block text-slate-200 truncate transition duration-150"
                        :class="
                          currentRoute.fullPath.includes('ecommerce')
                            ? 'hover:text-slate-200'
                            : 'hover:text-white'
                        "
                        href="#0"
                        @click.prevent="
                          sidebarExpanded
                            ? parentLink.handleClick()
                            : (sidebarExpanded = true)
                        "
                      >
                        <div class="flex items-center justify-between">
                          <div class="flex items-center">
                            <span
                              class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                              >Ishlab chiqarish
                            </span>
                          </div>
                          <!-- Icon -->
                          <div class="flex shrink-0 ml-2">
                            <svg
                              class="w-3 h-3 shrink-0 ml-1 fill-current text-slate-400"
                              :class="parentLink.expanded && 'rotate-180'"
                              viewBox="0 0 12 12"
                            >
                              <path
                                d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z"
                              />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div
                        class="lg:hidden lg:sidebar-expanded:block 2xl:block"
                      >
                        <ul
                          class="mt-1"
                          :class="!parentLink.expanded && 'hidden'"
                        >
                          <!-- //Reja iqtisod -->
                          <router-link
                            to="/explore/department/paint/working/plan"
                            custom
                            v-slot="{ href, navigate, isExactActive }"
                          >
                            <li class="mb-1 ml-2 ml-2 last:mb-0">
                              <a
                                class="block transition duration-150 truncate"
                                :class="
                                  isExactActive
                                    ? 'text-[#36d887]'
                                    : 'text-slate-400 hover:text-slate-200'
                                "
                                :href="href"
                                @click="navigate"
                              >
                                <span
                                  class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                                  >Reja iqtisod</span
                                >
                              </a>
                            </li>
                          </router-link>
                          <!-- // -->
                          <!-- //Xommato skladi -->
                          <router-link
                            to="/explore/products/list"
                            custom
                            v-slot="{ href, navigate, isExactActive }"
                          >
                            <li class="mb-1 ml-2 last:mb-0">
                              <a
                                class="block transition duration-150 truncate"
                                :class="
                                  isExactActive
                                    ? 'text-[#36d887]'
                                    : 'text-slate-400 hover:text-slate-200'
                                "
                                :href="href"
                                @click="navigate"
                              >
                                <span
                                  class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                                  >Xom mato sklad</span
                                >
                              </a>
                            </li>
                          </router-link>
                          <!-- // -->
                          <!-- //fipsa -->
                          <router-link
                            to="/explore/products/islabchiqarish/fipsa"
                            custom
                            v-slot="{ href, navigate, isExactActive }"
                          >
                            <li class="mb-1 ml-2 last:mb-0">
                              <a
                                class="block transition duration-150 truncate"
                                :class="
                                  isExactActive
                                    ? 'text-[#36d887]'
                                    : 'text-slate-400 hover:text-slate-200'
                                "
                                :href="href"
                                @click="navigate"
                              >
                                <span
                                  class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                                  >Fipsa</span
                                >
                              </a>
                            </li>
                          </router-link>
                          <!-- // -->
                          <!-- //Bo'yoq -->
                          <router-link
                            to="/explore/products/ishlabchiqarish/bo'yoq"
                            custom
                            v-slot="{ href, navigate, isExactActive }"
                          >
                            <li class="mb-1 ml-2 last:mb-0">
                              <a
                                class="block transition duration-150 truncate"
                                :class="
                                  isExactActive
                                    ? 'text-[#36d887]'
                                    : 'text-slate-400 hover:text-slate-200'
                                "
                                :href="href"
                                @click="navigate"
                              >
                                <span
                                  class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                                  >Bo'yoq</span
                                >
                              </a>
                            </li>
                          </router-link>
                          <!-- // -->
                          <!-- //Qurutma-->
                          <router-link
                            to="/explore/products/ishlabciqarish/qurutma"
                            custom
                            v-slot="{ href, navigate, isExactActive }"
                          >
                            <li class="mb-1 ml-2 last:mb-0">
                              <a
                                class="block transition duration-150 truncate"
                                :class="
                                  isExactActive
                                    ? 'text-[#36d887]'
                                    : 'text-slate-400 hover:text-slate-200'
                                "
                                :href="href"
                                @click="navigate"
                              >
                                <span
                                  class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                                  >Qurutma</span
                                >
                              </a>
                            </li>
                          </router-link>
                          <!-- // -->
                          <!-- //pechat -->
                          <router-link
                            to="/explore/products/ishlabciqarish/pechat"
                            custom
                            v-slot="{ href, navigate, isExactActive }"
                          >
                            <li class="mb-1 ml-2 last:mb-0">
                              <a
                                class="block transition duration-150 truncate"
                                :class="
                                  isExactActive
                                    ? 'text-[#36d887]'
                                    : 'text-slate-400 hover:text-slate-200'
                                "
                                :href="href"
                                @click="navigate"
                              >
                                <span
                                  class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                                  >Pechat</span
                                >
                              </a>
                            </li>
                          </router-link>
                          <!-- // -->
                          <!-- //Rolik -->
                          <router-link
                            to="/explore/products/ishlabciqarish/rolik"
                            custom
                            v-slot="{ href, navigate, isExactActive }"
                          >
                            <li class="mb-1 ml-2 last:mb-0">
                              <a
                                class="block transition duration-150 truncate"
                                :class="
                                  isExactActive
                                    ? 'text-[#36d887]'
                                    : 'text-slate-400 hover:text-slate-200'
                                "
                                :href="href"
                                @click="navigate"
                              >
                                <span
                                  class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                                  >Rolik</span
                                >
                              </a>
                            </li>
                          </router-link>
                          <!-- // -->
                          <!-- //Tarozi -->
                          <router-link
                            to="/explore/products/ishlabciqarish/tarozi"
                            custom
                            v-slot="{ href, navigate, isExactActive }"
                          >
                            <li class="mb-1 ml-2 last:mb-0">
                              <a
                                class="block transition duration-150 truncate"
                                :class="
                                  isExactActive
                                    ? 'text-[#36d887]'
                                    : 'text-slate-400 hover:text-slate-200'
                                "
                                :href="href"
                                @click="navigate"
                              >
                                <span
                                  class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                                  >Tarozi</span
                                >
                              </a>
                            </li>
                          </router-link>
                          <!-- // -->
                          <!-- //Sklad -->
                          <router-link
                            to="/explore/products/ishlabciqarish/skalad"
                            custom
                            v-slot="{ href, navigate, isExactActive }"
                          >
                            <li class="mb-1 ml-2 last:mb-0">
                              <a
                                class="block transition duration-150 truncate"
                                :class="
                                  isExactActive
                                    ? 'text-[#36d887]'
                                    : 'text-slate-400 hover:text-slate-200'
                                "
                                :href="href"
                                @click="navigate"
                              >
                                <span
                                  class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                                  >Tayyor mato sklad</span
                                >
                              </a>
                            </li>
                          </router-link>
                          <!-- // -->
                        </ul>
                      </div>
                    </SidebarLinkGroup>
                  </ul>
                </ul>
              </div>
            </SidebarLinkGroup>
          </ul>
          <ul v-if="role === 3 || role === 1000" class="mt-3">
            <!-- To'quv harakatlari  -->
            <SidebarLinkGroup
              v-slot="parentLink"
              :activeCondition="currentRoute.fullPath.includes('ecommerce')"
            >
              <a
                class="block text-slate-200 truncate transition duration-150"
                :class="
                  currentRoute.fullPath.includes('ecommerce')
                    ? 'hover:text-slate-200'
                    : 'hover:text-white'
                "
                href="#0"
                @click.prevent="
                  sidebarExpanded
                    ? parentLink.handleClick()
                    : (sidebarExpanded = true)
                "
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <img
                      class="shrink-0 h-7 w-7"
                      viewBox="0 0 24 24"
                      src="https://cdn0.iconfinder.com/data/icons/business-and-management-flat-8/24/PRODUCT_products_new_product_cube_product_design-512.png"
                      alt="package-"
                    />

                    <span
                      class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                      >To'quv harakatlari
                    </span>
                  </div>
                  <!-- Icon -->
                  <div class="flex shrink-0 ml-2">
                    <svg
                      class="w-3 h-3 shrink-0 ml-1 fill-current text-slate-400"
                      :class="parentLink.expanded && 'rotate-180'"
                      viewBox="0 0 12 12"
                    >
                      <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                    </svg>
                  </div>
                </div>
              </a>
              <div class="lg:hidden lg:sidebar-expanded:block 2xl:block">
                <ul class="pl-9 mt-1" :class="!parentLink.expanded && 'hidden'">
                  <ul class="mt-1">
                    <!-- ishlab chiqarish  -->
                    <SidebarLinkGroup
                      v-slot="parentLink"
                      :activeCondition="
                        currentRoute.fullPath.includes('ecommerce')
                      "
                    >
                      <a
                        class="block text-slate-200 truncate transition duration-150"
                        :class="
                          currentRoute.fullPath.includes('ecommerce')
                            ? 'hover:text-slate-200'
                            : 'hover:text-white'
                        "
                        href="#0"
                        @click.prevent="
                          sidebarExpanded
                            ? parentLink.handleClick()
                            : (sidebarExpanded = true)
                        "
                      >
                        <div class="flex items-center justify-between">
                          <div class="flex items-center">
                            <span
                              class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                              >Ishlab chiqarish
                            </span>
                          </div>
                          <!-- Icon -->
                          <div class="flex shrink-0 ml-2">
                            <svg
                              class="w-3 h-3 shrink-0 ml-1 fill-current text-slate-400"
                              :class="parentLink.expanded && 'rotate-180'"
                              viewBox="0 0 12 12"
                            >
                              <path
                                d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z"
                              />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div
                        class="lg:hidden lg:sidebar-expanded:block 2xl:block"
                      >
                        <ul
                          class="mt-1"
                          :class="!parentLink.expanded && 'hidden'"
                        >
                          <!-- //Reja iqtisod to'quv -->
                          <router-link
                            to="/explore/department/weaving/working/plan"
                            custom
                            v-slot="{ href, navigate, isExactActive }"
                          >
                            <li class="mb-1 ml-2 last:mb-0">
                              <a
                                class="block transition duration-150 truncate"
                                :class="
                                  isExactActive
                                    ? 'text-[#36d887]'
                                    : 'text-slate-400 hover:text-slate-200'
                                "
                                :href="href"
                                @click="navigate"
                              >
                                <span
                                  class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                                  >Reja iqtisod</span
                                >
                              </a>
                            </li>
                          </router-link>
                          <!-- // -->
                          <router-link
                            to="/explore/products/tuquv/kolsa"
                            custom
                            v-slot="{ href, navigate, isExactActive }"
                          >
                            <li class="mb-1 last:mb-0">
                              <a
                                class="block transition duration-150 truncate"
                                :class="
                                  isExactActive
                                    ? 'text-[#36d887]'
                                    : 'text-slate-400 hover:text-slate-200'
                                "
                                :href="href"
                                @click="navigate"
                              >
                                <span
                                  class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                                  >Kolsa</span
                                >
                              </a>
                            </li>
                          </router-link>
                          <!-- // -->
                          <!-- //opela -->
                          <router-link
                            to="/explore/products/tuquv/opelad"
                            custom
                            v-slot="{ href, navigate, isExactActive }"
                          >
                            <li class="mb-1 last:mb-0">
                              <a
                                class="block transition duration-150 truncate"
                                :class="
                                  isExactActive
                                    ? 'text-[#36d887]'
                                    : 'text-slate-400 hover:text-slate-200'
                                "
                                :href="href"
                                @click="navigate"
                              >
                                <span
                                  class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                                  >Opelad</span
                                >
                              </a>
                            </li>
                          </router-link>
                          <!-- // -->
                        </ul>
                      </div>
                    </SidebarLinkGroup>
                  </ul>
                  <!-- Xom mato skaldi -->
                  <router-link
                    to="/explore/products/tikuv/xommato_skladi"
                    custom
                    v-slot="{ href, navigate, isExactActive }"
                  >
                    <li class="mb-1 last:mb-0">
                      <a
                        class="block transition duration-150 truncate"
                        :class="
                          isExactActive
                            ? 'text-[#36d887]'
                            : 'text-slate-400 hover:text-slate-200'
                        "
                        :href="href"
                        @click="navigate"
                      >
                        <span
                          class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                          >Xom mato sklad</span
                        >
                      </a>
                    </li>
                  </router-link>
                  <!-- // -->
                  <!-- Ip-Polister Sklad -->
                  <router-link
                    to="/explore/products/tikuv/ip_skald"
                    custom
                    v-slot="{ href, navigate, isExactActive }"
                  >
                    <li class="mb-1 last:mb-0">
                      <a
                        class="block transition duration-150 truncate"
                        :class="
                          isExactActive
                            ? 'text-[#36d887]'
                            : 'text-slate-400 hover:text-slate-200'
                        "
                        :href="href"
                        @click="navigate"
                      >
                        <span
                          class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                          >Ip-Polister Sklad</span
                        >
                      </a>
                    </li>
                  </router-link>
                  <!-- /// -->
                </ul>
              </div>
            </SidebarLinkGroup>
          </ul>
          <ul v-if="role === 4 || role === 1000" class="mt-3">
            <!-- Yigiruv harakatlari  -->
            <SidebarLinkGroup
              v-slot="parentLink"
              :activeCondition="currentRoute.fullPath.includes('ecommerce')"
            >
              <a
                class="block text-slate-200 truncate transition duration-150"
                :class="
                  currentRoute.fullPath.includes('ecommerce')
                    ? 'hover:text-slate-200'
                    : 'hover:text-white'
                "
                href="#0"
                @click.prevent="
                  sidebarExpanded
                    ? parentLink.handleClick()
                    : (sidebarExpanded = true)
                "
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <img
                      class="shrink-0 h-7 w-7"
                      viewBox="0 0 24 24"
                      src="https://cdn0.iconfinder.com/data/icons/business-and-management-flat-8/24/PRODUCT_products_new_product_cube_product_design-512.png"
                      alt="package-"
                    />

                    <span
                      class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                      >Yigiruv harakatlari
                    </span>
                  </div>
                  <!-- Icon -->
                  <div class="flex shrink-0 ml-2">
                    <svg
                      class="w-3 h-3 shrink-0 ml-1 fill-current text-slate-400"
                      :class="parentLink.expanded && 'rotate-180'"
                      viewBox="0 0 12 12"
                    >
                      <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                    </svg>
                  </div>
                </div>
              </a>
              <div class="lg:hidden lg:sidebar-expanded:block 2xl:block">
                <ul class="pl-9 mt-1" :class="!parentLink.expanded && 'hidden'">
                  <div class="mt-1">
                    <!-- ishlab chiqarish  -->
                    <SidebarLinkGroup
                      v-slot="parentLink"
                      :activeCondition="
                        currentRoute.fullPath.includes('ecommerce')
                      "
                    >
                      <a
                        class="block text-slate-200 truncate transition duration-150"
                        :class="
                          currentRoute.fullPath.includes('ecommerce')
                            ? 'hover:text-slate-200'
                            : 'hover:text-white'
                        "
                        href="#0"
                        @click.prevent="
                          sidebarExpanded
                            ? parentLink.handleClick()
                            : (sidebarExpanded = true)
                        "
                      >
                        <div class="flex items-center justify-between">
                          <div class="flex items-center">
                            <span
                              class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                              >Ishlab chiqarish
                            </span>
                          </div>
                          <!-- Icon -->
                          <div class="flex shrink-0 ml-2">
                            <svg
                              class="w-3 h-3 shrink-0 ml-1 fill-current text-slate-400"
                              :class="parentLink.expanded && 'rotate-180'"
                              viewBox="0 0 12 12"
                            >
                              <path
                                d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z"
                              />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div
                        class="lg:hidden lg:sidebar-expanded:block 2xl:block"
                      >
                        <ul
                          class="mt-1"
                          :class="!parentLink.expanded && 'hidden'"
                        >
                          <!-- //kolsa -->
                          <!-- //Reja iqtisod to'quv -->
                          <router-link
                            to="/explore/department/spinning/working/plan"
                            custom
                            v-slot="{ href, navigate, isExactActive }"
                          >
                            <li class="mb-1 ml-2 last:mb-0">
                              <a
                                class="block transition duration-150 truncate"
                                :class="
                                  isExactActive
                                    ? 'text-[#36d887]'
                                    : 'text-slate-400 hover:text-slate-200'
                                "
                                :href="href"
                                @click="navigate"
                              >
                                <span
                                  class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                                  >Reja iqtisod</span
                                >
                              </a>
                            </li>
                          </router-link>
                          <!-- // -->
                          <router-link
                            to="/explore/products/tuquv/kolsa"
                            custom
                            v-slot="{ href, navigate, isExactActive }"
                          >
                            <li class="mb-1 last:mb-0">
                              <a
                                class="block transition duration-150 truncate"
                                :class="
                                  isExactActive
                                    ? 'text-[#36d887]'
                                    : 'text-slate-400 hover:text-slate-200'
                                "
                                :href="href"
                                @click="navigate"
                              >
                                <span
                                  class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                                  >Kolsa</span
                                >
                              </a>
                            </li>
                          </router-link>
                          <!-- // -->
                          <!-- //opela -->
                          <router-link
                            to="/explore/products/tuquv/opelad"
                            custom
                            v-slot="{ href, navigate, isExactActive }"
                          >
                            <li class="mb-1 last:mb-0">
                              <a
                                class="block transition duration-150 truncate"
                                :class="
                                  isExactActive
                                    ? 'text-[#36d887]'
                                    : 'text-slate-400 hover:text-slate-200'
                                "
                                :href="href"
                                @click="navigate"
                              >
                                <span
                                  class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                                  >Opelad</span
                                >
                              </a>
                            </li>
                          </router-link>
                          <!-- // -->
                        </ul>
                      </div>
                    </SidebarLinkGroup>
                  </div>
                  <!-- PAXTA SKLADI -->
                  <router-link
                    to="/explore/products/yigiruv/cotton_sklad"
                    custom
                    v-slot="{ href, navigate, isExactActive }"
                  >
                    <li class="mb-1 last:mb-0">
                      <a
                        class="block transition duration-150 truncate"
                        :class="
                          isExactActive
                            ? 'text-[#36d887]'
                            : 'text-slate-400 hover:text-slate-200'
                        "
                        :href="href"
                        @click="navigate"
                      >
                        <span
                          class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                          >Paxta skalad</span
                        >
                      </a>
                    </li>
                  </router-link>
                  <!-- //// -->
                  <!-- STELAJ -->
                  <router-link
                    to="/explore/products/yigiruv/staris"
                    custom
                    v-slot="{ href, navigate, isExactActive }"
                  >
                    <li class="mb-1 last:mb-0">
                      <a
                        class="block transition duration-150 truncate"
                        :class="
                          isExactActive
                            ? 'text-[#36d887]'
                            : 'text-slate-400 hover:text-slate-200'
                        "
                        :href="href"
                        @click="navigate"
                      >
                        <span
                          class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                          >Staris</span
                        >
                      </a>
                    </li>
                  </router-link>
                  <!-- /// -->

                  <!-- // kolsa -->
                  <router-link
                    to="/explore/products/yigiruv/kolsa"
                    custom
                    v-slot="{ href, navigate, isExactActive }"
                  >
                    <li class="mb-1 last:mb-0">
                      <a
                        class="block transition duration-150 truncate"
                        :class="
                          isExactActive
                            ? 'text-[#36d887]'
                            : 'text-slate-400 hover:text-slate-200'
                        "
                        :href="href"
                        @click="navigate"
                      >
                        <span
                          class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                          >Kolsa</span
                        >
                      </a>
                    </li>
                  </router-link>
                  <!-- //// -->
                  <!-- ///opened -->
                  <router-link
                    to="/explore/products/yigiruv/opened"
                    custom
                    v-slot="{ href, navigate, isExactActive }"
                  >
                    <li class="mb-1 last:mb-0">
                      <a
                        class="block transition duration-150 truncate"
                        :class="
                          isExactActive
                            ? 'text-[#36d887]'
                            : 'text-slate-400 hover:text-slate-200'
                        "
                        :href="href"
                        @click="navigate"
                      >
                        <span
                          class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                          >Opened</span
                        >
                      </a>
                    </li>
                  </router-link>
                  <!-- ///< -->
                  <!-- // Ip sklad -->
                  <router-link
                    to="/explore/products/yigiruv/ip_skald"
                    custom
                    v-slot="{ href, navigate, isExactActive }"
                  >
                    <li class="mb-1 last:mb-0">
                      <a
                        class="block transition duration-150 truncate"
                        :class="
                          isExactActive
                            ? 'text-[#36d887]'
                            : 'text-slate-400 hover:text-slate-200'
                        "
                        :href="href"
                        @click="navigate"
                      >
                        <span
                          class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                          >Ip sklad</span
                        >
                      </a>
                    </li>
                  </router-link>
                  <!-- // -->
                </ul>
              </div>
            </SidebarLinkGroup>
          </ul>
          <ul v-if="role === 5 || role === 1000" class="mt-3">
            <!-- Tikuv harakati  -->
            <SidebarLinkGroup
              v-slot="parentLink"
              :activeCondition="currentRoute.fullPath.includes('ecommerce')"
            >
              <a
                class="block text-slate-200 truncate transition duration-150"
                :class="
                  currentRoute.fullPath.includes('ecommerce')
                    ? 'hover:text-slate-200'
                    : 'hover:text-white'
                "
                href="#0"
                @click.prevent="
                  sidebarExpanded
                    ? parentLink.handleClick()
                    : (sidebarExpanded = true)
                "
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <img
                      class="shrink-0 h-7 w-7"
                      viewBox="0 0 24 24"
                      src="https://cdn4.iconfinder.com/data/icons/success-filloutline/64/Income-cash-money-banking-business-512.png"
                      alt="package-"
                    />

                    <span
                      class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                      >Tikuv harakati
                    </span>
                  </div>
                  <!-- Icon -->
                  <div class="flex shrink-0 ml-2">
                    <svg
                      class="w-3 h-3 shrink-0 ml-1 fill-current text-slate-400"
                      :class="parentLink.expanded && 'rotate-180'"
                      viewBox="0 0 12 12"
                    >
                      <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                    </svg>
                  </div>
                </div>
              </a>
              <div class="lg:hidden lg:sidebar-expanded:block 2xl:block">
                <ul class="pl-9 mt-1" :class="!parentLink.expanded && 'hidden'">
                  <router-link
                    to="/explore/department/seam/warehouse/raw_material"
                    custom
                    v-slot="{ href, navigate, isExactActive }"
                  >
                    <li class="mb-1 last:mb-0">
                      <a
                        class="block transition duration-150 truncate"
                        :class="
                          isExactActive
                            ? 'text-[#36d887]'
                            : 'text-slate-400 hover:text-slate-200'
                        "
                        :href="href"
                        @click="navigate"
                      >
                        <span
                          class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                          >Sklad (xom mato)</span
                        >
                      </a>
                    </li>
                  </router-link>
                  <router-link
                    to="/explore/products/lab"
                    custom
                    v-slot="{ href, navigate, isExactActive }"
                  >
                    <li class="mb-1 last:mb-0">
                      <a
                        class="block transition duration-150 truncate"
                        :class="
                          isExactActive
                            ? 'text-[#36d887]'
                            : 'text-slate-400 hover:text-slate-200'
                        "
                        :href="href"
                        @click="navigate"
                      >
                        <span
                          class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                          >Bichuv</span
                        >
                      </a>
                    </li>
                  </router-link>
                  <router-link
                    to="/explore/products/lab"
                    custom
                    v-slot="{ href, navigate, isExactActive }"
                  >
                    <li class="mb-1 last:mb-0">
                      <a
                        class="block transition duration-150 truncate"
                        :class="
                          isExactActive
                            ? 'text-[#36d887]'
                            : 'text-slate-400 hover:text-slate-200'
                        "
                        :href="href"
                        @click="navigate"
                      >
                        <span
                          class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                          >Tasnif</span
                        >
                      </a>
                    </li>
                  </router-link>
                  <router-link
                    to="/explore/products/lab"
                    custom
                    v-slot="{ href, navigate, isExactActive }"
                  >
                    <li class="mb-1 last:mb-0">
                      <a
                        class="block transition duration-150 truncate"
                        :class="
                          isExactActive
                            ? 'text-[#36d887]'
                            : 'text-slate-400 hover:text-slate-200'
                        "
                        :href="href"
                        @click="navigate"
                      >
                        <span
                          class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                          >Patoklar</span
                        >
                      </a>
                    </li>
                  </router-link>
                  <router-link
                    to="/explore/products/lab"
                    custom
                    v-slot="{ href, navigate, isExactActive }"
                  >
                    <li class="mb-1 last:mb-0">
                      <a
                        class="block transition duration-150 truncate"
                        :class="
                          isExactActive
                            ? 'text-[#36d887]'
                            : 'text-slate-400 hover:text-slate-200'
                        "
                        :href="href"
                        @click="navigate"
                      >
                        <span
                          class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                          >Sifat</span
                        >
                      </a>
                    </li>
                  </router-link>
                  <router-link
                    to="/explore/products/lab"
                    custom
                    v-slot="{ href, navigate, isExactActive }"
                  >
                    <li class="mb-1 last:mb-0">
                      <a
                        class="block transition duration-150 truncate"
                        :class="
                          isExactActive
                            ? 'text-[#36d887]'
                            : 'text-slate-400 hover:text-slate-200'
                        "
                        :href="href"
                        @click="navigate"
                      >
                        <span
                          class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                          >Dazmol</span
                        >
                      </a>
                    </li>
                  </router-link>
                  <router-link
                    to="/explore/products/lab"
                    custom
                    v-slot="{ href, navigate, isExactActive }"
                  >
                    <li class="mb-1 last:mb-0">
                      <a
                        class="block transition duration-150 truncate"
                        :class="
                          isExactActive
                            ? 'text-[#36d887]'
                            : 'text-slate-400 hover:text-slate-200'
                        "
                        :href="href"
                        @click="navigate"
                      >
                        <span
                          class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                          >Upakofka</span
                        >
                      </a>
                    </li>
                  </router-link>
                  <router-link
                    to="/explore/products/lab"
                    custom
                    v-slot="{ href, navigate, isExactActive }"
                  >
                    <li class="mb-1 last:mb-0">
                      <a
                        class="block transition duration-150 truncate"
                        :class="
                          isExactActive
                            ? 'text-[#36d887]'
                            : 'text-slate-400 hover:text-slate-200'
                        "
                        :href="href"
                        @click="navigate"
                      >
                        <span
                          class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                          >Sklad (tayyor mahsulot)
                        </span>
                      </a>
                    </li>
                  </router-link>
                </ul>
              </div>
            </SidebarLinkGroup>
          </ul>
          <ul v-if="role === 6 || role === 1000" class="mt-3">
            <!-- Taminot bo'limi harakati  -->
            <SidebarLinkGroup
              v-slot="parentLink"
              :activeCondition="currentRoute.fullPath.includes('ecommerce')"
            >
              <a
                class="block text-slate-200 truncate transition duration-150"
                :class="
                  currentRoute.fullPath.includes('ecommerce')
                    ? 'hover:text-slate-200'
                    : 'hover:text-white'
                "
                href="#0"
                @click.prevent="
                  sidebarExpanded
                    ? parentLink.handleClick()
                    : (sidebarExpanded = true)
                "
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <img
                      class="shrink-0 h-7 w-7"
                      viewBox="0 0 24 24"
                      src="https://cdn4.iconfinder.com/data/icons/success-filloutline/64/Income-cash-money-banking-business-512.png"
                      alt="package-"
                    />

                    <span
                      class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                      >Taminot harakati
                    </span>
                  </div>
                  <!-- Icon -->
                  <div class="flex shrink-0 ml-2">
                    <svg
                      class="w-3 h-3 shrink-0 ml-1 fill-current text-slate-400"
                      :class="parentLink.expanded && 'rotate-180'"
                      viewBox="0 0 12 12"
                    >
                      <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                    </svg>
                  </div>
                </div>
              </a>
              <div class="lg:hidden lg:sidebar-expanded:block 2xl:block">
                <ul class="pl-9 mt-1" :class="!parentLink.expanded && 'hidden'">
                  <router-link
                    to="/explore/department/provide/working/plan"
                    custom
                    v-slot="{ href, navigate, isExactActive }"
                  >
                    <li class="mb-1 last:mb-0">
                      <a
                        class="block transition duration-150 truncate"
                        :class="
                          isExactActive
                            ? 'text-[#36d887]'
                            : 'text-slate-400 hover:text-slate-200'
                        "
                        :href="href"
                        @click="navigate"
                      >
                        <span
                          class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                          >Reja iqtisod</span
                        >
                      </a>
                    </li>
                  </router-link>
                </ul>
              </div>
            </SidebarLinkGroup>
          </ul>
        </div>

        <!-- Hisobotlar group-->
        <div>
          <h3 class="text-xs uppercase text-slate-500 font-semibold pl-3">
            <span
              class="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
              aria-hidden="true"
              >•••</span
            >
            <span class="lg:hidden lg:sidebar-expanded:block 2xl:block"
              >Hisobotlar</span
            >
          </h3>
          <ul class="mt-3">
            <!-- Sklad hisoboti -->
            <SidebarLinkGroup
              v-slot="parentLink"
              :activeCondition="currentRoute.fullPath.includes('ecommerce')"
            >
              <a
                class="block text-slate-200 truncate transition duration-150"
                :class="
                  currentRoute.fullPath.includes('ecommerce')
                    ? 'hover:text-slate-200'
                    : 'hover:text-white'
                "
                href="#0"
                @click.prevent="
                  sidebarExpanded
                    ? parentLink.handleClick()
                    : (sidebarExpanded = true)
                "
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <img
                      class="shrink-0 h-7 w-7"
                      viewBox="0 0 24 24"
                      src="https://cdn4.iconfinder.com/data/icons/back-to-school-151/64/file-sheet-document-paper-report-512.png"
                      alt="package-"
                    />
                    <span
                      class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                    >
                      Sklad hisoboti
                    </span>
                  </div>
                  <!-- Icon -->
                  <div class="flex shrink-0 ml-2">
                    <svg
                      class="w-3 h-3 shrink-0 ml-1 fill-current text-slate-400"
                      :class="parentLink.expanded && 'rotate-180'"
                      viewBox="0 0 12 12"
                    >
                      <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                    </svg>
                  </div>
                </div>
              </a>
              <div class="lg:hidden lg:sidebar-expanded:block 2xl:block">
                <ul class="pl-9 mt-1" :class="!parentLink.expanded && 'hidden'">
                  <router-link
                    to="/explore/products/list"
                    custom
                    v-slot="{ href, navigate, isExactActive }"
                  >
                    <li class="mb-1 last:mb-0">
                      <a
                        class="block transition duration-150 truncate"
                        :class="
                          isExactActive
                            ? 'text-[#36d887]'
                            : 'text-slate-400 hover:text-slate-200'
                        "
                        :href="href"
                        @click="navigate"
                      >
                        <span
                          class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                          >Kirimlar ro'yxati</span
                        >
                      </a>
                    </li>
                  </router-link>
                  <router-link
                    to="/explore/products/lab"
                    custom
                    v-slot="{ href, navigate, isExactActive }"
                  >
                    <li class="mb-1 last:mb-0">
                      <a
                        class="block transition duration-150 truncate"
                        :class="
                          isExactActive
                            ? 'text-[#36d887]'
                            : 'text-slate-400 hover:text-slate-200'
                        "
                        :href="href"
                        @click="navigate"
                      >
                        <span
                          class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                          >Kirim jarayoni</span
                        >
                      </a>
                    </li>
                  </router-link>
                </ul>
              </div>
            </SidebarLinkGroup>
          </ul>
        </div>
        <!-- Settings group-->
        <div v-if="role === 1000">
          <h3 class="text-xs uppercase text-slate-500 font-semibold pl-3">
            <span
              class="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
              aria-hidden="true"
              >•••</span
            >
            <span class="lg:hidden lg:sidebar-expanded:block 2xl:block"
              >Sozlamalar</span
            >
          </h3>
          <ul class="mt-3">
            <!-- Admin  -->
            <SidebarLinkGroup
              v-slot="parentLink"
              :activeCondition="currentRoute.fullPath.includes('ecommerce')"
            >
              <a
                class="block text-slate-200 truncate transition duration-150"
                :class="
                  currentRoute.fullPath.includes('ecommerce')
                    ? 'hover:text-slate-200'
                    : 'hover:text-white'
                "
                href="#0"
                @click.prevent="
                  sidebarExpanded
                    ? parentLink.handleClick()
                    : (sidebarExpanded = true)
                "
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <img
                      class="shrink-0 h-7 w-7"
                      viewBox="0 0 24 24"
                      src="https://cdn4.iconfinder.com/data/icons/success-filloutline/64/Income-cash-money-banking-business-512.png"
                      alt="package-"
                    />

                    <span
                      class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                      >Admin
                    </span>
                  </div>
                  <!-- Icon -->
                  <div class="flex shrink-0 ml-2">
                    <svg
                      class="w-3 h-3 shrink-0 ml-1 fill-current text-slate-400"
                      :class="parentLink.expanded && 'rotate-180'"
                      viewBox="0 0 12 12"
                    >
                      <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                    </svg>
                  </div>
                </div>
              </a>
              <div class="lg:hidden lg:sidebar-expanded:block 2xl:block">
                <ul class="pl-9 mt-1" :class="!parentLink.expanded && 'hidden'">
                  <router-link
                    to="/explore/admin/users"
                    custom
                    v-slot="{ href, navigate, isExactActive }"
                  >
                    <li class="mb-1 last:mb-0">
                      <a
                        class="block transition duration-150 truncate"
                        :class="
                          isExactActive
                            ? 'text-[#36d887]'
                            : 'text-slate-400 hover:text-slate-200'
                        "
                        :href="href"
                        @click="navigate"
                      >
                        <span
                          class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                          >Foydalanuvchilar</span
                        >
                      </a>
                    </li>
                  </router-link>
                </ul>

                <ul class="pl-9 mt-1" :class="!parentLink.expanded && 'hidden'">
                  <router-link
                    to="/explore/admin/role"
                    custom
                    v-slot="{ href, navigate, isExactActive }"
                  >
                    <li class="mb-1 last:mb-0">
                      <a
                        class="block transition duration-150 truncate"
                        :class="
                          isExactActive
                            ? 'text-[#36d887]'
                            : 'text-slate-400 hover:text-slate-200'
                        "
                        :href="href"
                        @click="navigate"
                      >
                        <span
                          class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                          >Role</span
                        >
                      </a>
                    </li>
                  </router-link>
                </ul>
              </div>
            </SidebarLinkGroup>
          </ul>
        </div>
        <!-- More group -->
        <div>
          <h3 class="text-xs uppercase text-slate-500 font-semibold pl-3">
            <span
              class="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
              aria-hidden="true"
              >•••</span
            >
            <span class="lg:hidden lg:sidebar-expanded:block 2xl:block"
              >Ko'proq</span
            >
          </h3>
          <ul class="mt-3">
            <!-- Authentication  -->
            <SidebarLinkGroup v-slot="parentLink">
              <a
                class="block text-slate-200 truncate transition duration-150"
                :class="
                  parentLink.expanded
                    ? 'hover:text-slate-200'
                    : 'hover:text-white'
                "
                href="#0"
                @click.prevent="
                  sidebarExpanded
                    ? parentLink.handleClick()
                    : (sidebarExpanded = true)
                "
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path
                        class="fill-current text-slate-600"
                        d="M8.07 16H10V8H8.07a8 8 0 110 8z"
                      />
                      <path
                        class="fill-current text-slate-400"
                        d="M15 12L8 6v5H0v2h8v5z"
                      />
                    </svg>
                    <span
                      class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                      >Authentication</span
                    >
                  </div>
                  <!-- Icon -->
                  <div class="flex shrink-0 ml-2">
                    <svg
                      class="w-3 h-3 shrink-0 ml-1 fill-current text-slate-400"
                      :class="parentLink.expanded && 'rotate-180'"
                      viewBox="0 0 12 12"
                    >
                      <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                    </svg>
                  </div>
                </div>
              </a>
              <div class="lg:hidden lg:sidebar-expanded:block 2xl:block">
                <ul class="pl-9 mt-1" :class="!parentLink.expanded && 'hidden'">
                  <router-link to="/signin" custom v-slot="{ href, navigate }">
                    <li class="mb-1 last:mb-0">
                      <a
                        class="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                        :href="href"
                        @click="navigate"
                      >
                        <span
                          class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                          >Sign in</span
                        >
                      </a>
                    </li>
                  </router-link>
                  <router-link to="/signup" custom v-slot="{ href, navigate }">
                    <li class="mb-1 last:mb-0">
                      <a
                        class="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                        :href="href"
                        @click="navigate"
                      >
                        <span
                          class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                          >Sign up</span
                        >
                      </a>
                    </li>
                  </router-link>
                  <router-link
                    to="/reset-password"
                    custom
                    v-slot="{ href, navigate }"
                  >
                    <li class="mb-1 last:mb-0">
                      <a
                        class="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                        :href="href"
                        @click="navigate"
                      >
                        <span
                          class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                          >Reset Password</span
                        >
                      </a>
                    </li>
                  </router-link>
                </ul>
              </div>
            </SidebarLinkGroup>

            <!-- Messages -->
            <router-link
              to="/messages"
              custom
              v-slot="{ href, navigate, isExactActive }"
            >
              <li
                class="px-3 py-2 rounded-sm mb-0.5 last:mb-0"
                :class="isExactActive && 'bg-slate-900'"
              >
                <a
                  class="block text-slate-200 truncate transition duration-150"
                  :class="
                    isExactActive ? 'hover:text-slate-200' : 'hover:text-white'
                  "
                  :href="href"
                  @click="navigate"
                >
                  <div class="flex items-center justify-between">
                    <div class="grow flex items-center">
                      <img
                        class="shrink-0 h-8 w-8"
                        viewBox="0 0 24 24"
                        src="https://cdn4.iconfinder.com/data/icons/online-shop-7/128/message-envelope-email-512.png"
                        alt="package-"
                      />
                      <span
                        class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                        >Messages</span
                      >
                    </div>
                    <!-- Badge -->
                    <div class="flex flex-shrink-0 ml-2">
                      <span
                        class="inline-flex items-center justify-center h-5 text-xs font-medium text-white bg-[#6563FF] px-2 rounded"
                        >4</span
                      >
                    </div>
                  </div>
                </a>
              </li>
            </router-link>
          </ul>
        </div>
      </div>

      <!-- Expand / collapse button -->
      <div class="pt-3 hidden lg:inline-flex justify-end mt-auto">
        <div class="px-3 py-2">
          <button @click.prevent="sidebarExpanded = !sidebarExpanded">
            <span class="sr-only">Expand / collapse sidebar</span>

            <svg
              class="w-6 h-6 fill-current sidebar-expanded:rotate-180"
              viewBox="0 0 24 24"
            >
              <path
                class="text-slate-400"
                d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"
              />
              <path class="text-slate-600" d="M3 23H1V1h2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import { ref, onMounted, onUnmounted, watch } from "vue";
import { useRouter } from "vue-router";
import SidebarLinkGroup from "./SidebarLinkGroup.vue";

export default {
  name: "Sidebar",
  props: ["sidebarOpen"],
  components: {
    SidebarLinkGroup,
  },
  setup(props, { emit }) {
    const trigger = ref(null);
    const sidebar = ref(null);
    const role = ref(JSON.parse(Cookies.get("account")).role);
    const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
    const sidebarExpanded = ref(
      storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
    );

    const currentRoute = useRouter().currentRoute.value;

    // close on click outside
    const clickHandler = ({ target }) => {
      if (!sidebar.value || !trigger.value) return;
      if (
        !props.sidebarOpen ||
        sidebar.value.contains(target) ||
        trigger.value.contains(target)
      )
        return;
      emit("close-sidebar");
    };

    // close if the esc key is pressed
    const keyHandler = ({ keyCode }) => {
      if (!props.sidebarOpen || keyCode !== 27) return;
      emit("close-sidebar");
    };

    onMounted(() => {
      document.addEventListener("click", clickHandler);
      document.addEventListener("keydown", keyHandler);
    });

    onUnmounted(() => {
      document.removeEventListener("click", clickHandler);
      document.removeEventListener("keydown", keyHandler);
    });

    watch(sidebarExpanded, () => {
      localStorage.setItem("sidebar-expanded", sidebarExpanded.value);
      if (sidebarExpanded.value) {
        document.querySelector("body").classList.add("sidebar-expanded");
      } else {
        document.querySelector("body").classList.remove("sidebar-expanded");
      }
    });

    return {
      role,
      trigger,
      sidebar,
      sidebarExpanded,
      currentRoute,
    };
  },
};
</script>
