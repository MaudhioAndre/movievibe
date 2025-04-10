<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const search = ref("");

const router = useRouter();

function HandleSubmit(e) {
  e.preventDefault();
  router.push({ name: "movie-search", params: { movieName: search.value, page: 1 } });
}
</script>

<template>
  <section>
    <div>
      <form :onsubmit="HandleSubmit">
        <input type="text" placeholder="Enter movie name..." v-model="search" required />
        <button type="submit">Search</button>
      </form>
    </div>
  </section>
</template>

<style lang="scss" scoped>
section {
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
}

div {
  width: -webkit-fill-available;
  text-align: center;
}

input {
  background-color: transparent;
  border: 2px solid lightgrey;
  width: 50%;
  height: 46px;
  padding: 0 10px;
  color: white;

  &:focus {
    border: 2px solid lightgrey !important;
    border-radius: 0px !important;
  }
}

button {
  border: unset;
  background-color: lightgrey;
  padding: 11px 20px;
  font-weight: 600;
}
</style>
