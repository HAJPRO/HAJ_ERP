<script setup>
import { computed, ref } from "vue";
import { AuthStore } from "../../stores/Auth/auth.js";
const store = AuthStore()
import { storeToRefs } from "pinia"

const user = {
  username: "",
  department: "",
  password: "",
};

const register = async () => {
  try {
    if (!user.username || !user.password || !user.department) {
      alert("Barcha qatorlarni to'diring");
    } else {
      await store.register(user);
    }
  } catch (err) {
    console.log(err.message);
  }
};
</script>

<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="bg-white rounded-md p-2 shadow-md border-t-[2px] border-[#36d887] text-xl font-bold leading-tight text-center tracking-tight text-gray-800 md:text-xl dark:text-white">
            HAJ ERP
          </h1>
          <h1
            class="text-xl font-bold leading-tight text-center tracking-tight text-gray-500 md:text-[18px] dark:text-white">
            Ro'yxatdan o'tish
          </h1>
          <form class="space-y-4 md:space-y-6" @submit.prevent="register">
            <div>
              <label for="String" class="block mb-2 text-sm font-medium text-gray-600 dark:text-white">Username</label>
              <input v-model="user.username" type="string" name="username" id="username"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="" required="" />
            </div>
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-600 dark:text-white">Department</label>
              <input v-model="user.department" type="string" name="username" id="username"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="" required="" />
            </div>
            <div>
              <label for="password"
                class="block mb-2 text-sm font-medium text-gray-600 dark:text-white">Password</label>
              <input v-model="user.password" type="password" name="password" id="password" placeholder=""
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required="" />
            </div>

            <!-- <div class="flex items-start">
              <div class="flex items-center h-5">
                <input id="terms" aria-describedby="terms" type="checkbox"
                  class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  required="" />
              </div>
              <div class="ml-3 text-sm">
                <label for="terms" class="font-light text-gray-500 dark:text-gray-300">Do you remember?
                </label>
              </div>
            </div> -->
            <button type="submit"
              class="w-full text-white bg-[#36d887] hover:bg-[#36d887] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              Yuborish
            </button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Allaqachon ro'yxatdan o'tganmisiz?
              <router-link to="/login"
                class="font-medium text-[#36d887] hover:underline dark:text-primary-500">Kirish</router-link>
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
