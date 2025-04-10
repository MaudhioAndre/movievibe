<style lang="scss" scoped>
.div-button {
  display: flex;
  justify-content: center;
  padding: 0 6%;
}

button {
  border: unset;
  padding: 10px 30px;
  font-weight: 600;

  &:hover:not(:disabled) {
    background-color: lightgray;
  }
}
</style>

<script setup>
import { RouterLink } from "vue-router";
const { route, movieLength } = defineProps(["route", "movieLength"]);
</script>

<template>
  <div class="div-button">
    <RouterLink
      :to="{
        name: route.name,
        params: { ...route.params, page: parseInt(route.params.page) - 1 },
      }"
    >
      <button :disabled="route.params.page == 1">Prev</button>
    </RouterLink>
    &nbsp;
    <RouterLink
      :to="{
        name: route.name,
        params: { ...route.params, page: parseInt(route.params.page) + 1 },
      }"
    >
      <button :disabled="movieLength == 0">Next</button>
    </RouterLink>
  </div>
</template>
