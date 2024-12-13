<template>
  <div class="relative inline-flex">
    <button
      ref="trigger"
      class="inline-flex justify-center items-center group"
      aria-haspopup="true"
      @click.prevent="dropdownOpen = !dropdownOpen"
      :aria-expanded="dropdownOpen"
    >
      <div class="flex items-center truncate">
        <span
          class="font-serif truncate ml-2 text-sm mr-2 font-medium dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-slate-100"
          >{{ username }}
        </span>
        <!-- <svg class="w-3 h-3 shrink-0 ml-1 fill-current text-slate-400" viewBox="0 0 12 12">
          <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
        </svg> -->
      </div>
      <img
        class="w-9 h-9 rounded-full"
        src="https://avatars.mds.yandex.net/i?id=b91a04260c5720443b62928bb0051a479d0e3a1c-9221446-images-thumbs&n=13"
        width="35"
        height="35"
        alt="User"
      />
    </button>
    <transition
      enter-active-class="transition ease-out duration-200 transform"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-out duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-show="dropdownOpen"
        class="origin-top-right z-10 absolute top-full min-w-44 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-1.5 rounded shadow-lg overflow-hidden mt-1"
        :class="align === 'right' ? 'right-0' : 'left-0'"
      >
        <div
          class="pt-0.5 pb-2 px-3 mb-1 border-b border-slate-200 dark:border-slate-700"
        >
          <div
            class="font-medium text-slate-800 dark:text-slate-100 font-serif"
          >
            {{ username }}
          </div>
          <div class="text-xs text-slate-500 dark:text-slate-400 italic">
            {{ department }} bo'limi
          </div>
        </div>
        <ul
          ref="dropdown"
          @focusin="dropdownOpen = true"
          @focusout="dropdownOpen = false"
        >
          <li>
            <router-link
              class="font-medium text-sm text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center py-1 px-3"
              :to="{ name: 'profile_card' }"
              >My profile</router-link
            >
          </li>

          <li>
            <router-link
              :to="{ name: 'profile_settings' }"
              class="font-medium text-sm text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center py-1 px-3"
              @click="dropdownOpen = false"
              >Settings</router-link
            >
          </li>
          <li>
            <router-link
              class="font-medium text-sm text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center py-1 px-3"
              to=""
              @click="logout"
              >Sign Out</router-link
            >
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";
import Cookie from "js-cookie";
import UserAvatar from "../images/user-avatar-32.png";

export default {
  name: "DropdownProfile",
  props: ["align"],

  data() {
    return {
      UserAvatar: UserAvatar,
    };
  },
  setup() {
    const dropdownOpen = ref(false);
    const trigger = ref(null);
    const dropdown = ref(null);
    const username = ref(JSON.parse(Cookie.get("account")).username);
    const department = ref(JSON.parse(Cookie.get("account")).department);
    function logout() {
      Cookie.remove("token");
      Cookie.remove("account");
      dropdownOpen.value = false;
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }

    // close on click outside
    const clickHandler = ({ target }) => {
      if (
        !dropdownOpen.value ||
        dropdown.value.contains(target) ||
        trigger.value.contains(target)
      )
        return;
      dropdownOpen.value = false;
    };

    // close if the esc key is pressed
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen.value || keyCode !== 27) return;
      dropdownOpen.value = false;
    };

    onMounted(() => {
      document.addEventListener("click", clickHandler);
      document.addEventListener("keydown", keyHandler);
    });

    onUnmounted(() => {
      document.removeEventListener("click", clickHandler);
      document.removeEventListener("keydown", keyHandler);
    });

    return {
      dropdownOpen,
      trigger,
      dropdown,
      logout,
      username,
      department,
    };
  },
};
</script>
