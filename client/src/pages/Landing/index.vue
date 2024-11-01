<template>
  <div>Landing page</div>
</template>

<script setup>
import { useStore } from "vuex";

const store = useStore();

console.log(store.state.auth);
</script>

<style></style>
