<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
const store = useStore();

const user = {
  username: "",
  password: "",
};
function ToastError(data) {
  toast.error(data.msg, {
    autoClose: 1000,
  });
}
function ToastSuccess(data) {
  toast.success(data.msg, {
    autoClose: 1000,
  });
}
function ToastInfo(data) {
  toast.info(data.msg, {
    autoClose: 1000,
  });
}
const login = async () => {
  try {
    if (!user.username || !user.password) {
      ToastInfo({ msg: " Barcha qatorlarni to'diring" });
    } else {
      store.dispatch("login", user);
    }
  } catch (err) {
    console.log(err.message);
  }
};
</script>

<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="bg-white rounded-md p-2 shadow-md border-t-[2px] border-[#36d887] text-xl font-bold leading-tight text-center tracking-tight text-gray-800 md:text-xl dark:text-white"
          >
            HAJ ERP
          </h1>
          <h1
            class="text-[18px] font-bold leading-tight text-center tracking-tight text-gray-500 md:text-md dark:text-white"
          >
            Login
          </h1>
          <form class="space-y-4 md:space-y-6" @submit.prevent="login">
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Username</label
              >
              <input
                v-model="user.username"
                type="text"
                name="email"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="jhondoe@gmail.com"
                required=""
              />
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Password</label
              >
              <input
                v-model="user.password"
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
              />
            </div>
            <div class="mt-2 text-[13px]">
              <router-link
                to="/login/forget_password"
                class="text-[#36d887] hover:underline dark:text-primary-500"
              >
                Forgot your password?</router-link
              >
            </div>

            <button
              type="submit"
              class="w-full text-white bg-[#36d887] hover:bg-[#36d887] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Send
            </button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Not registered yet?
              <router-link
                to="/register"
                class="font-medium text-[#36d887] hover:underline dark:text-primary-500"
              >
                Registration</router-link
              >
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style></style>
