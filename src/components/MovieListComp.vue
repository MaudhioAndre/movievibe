<script setup>
import { onMounted, ref } from "vue";
import { RouterLink } from "vue-router";

const { endpoint, title } = defineProps(["endpoint", "title"]);

import CardMovie from "./CardMovie.vue";

const movie = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
      method: "GET",
      headers: {
        "x-rapidapi-host": import.meta.env.VITE_RAPIDAPI_HOST,
        "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    movie.value = result.slice(0, 10);
    loading.value = false;
    console.log(result);
  } catch (err) {
    error.value = err;
    loading.value = false;
    console.error("Error fetching data:", err);
  }
});
</script>

<template>
  <section>
    <h1>{{ title }}</h1>
    <div v-if="loading" class="text-center">Loading...</div>
    <div v-else-if="error" class="text-center">Error: {{ error.message }}</div>
    <div v-else class="div-card-movie">
      <RouterLink
        v-for="item in movie"
        :key="item.id"
        :to="{ name: 'movie-detail', params: { id: item.id } }"
        class="card-link"
        v-memo="[
          item.id,
          item.originalTitle,
          item.voteAverage,
          item.releaseDate,
          item.image,
        ]"
      >
        <CardMovie
          :title="item.originalTitle"
          :rating="item.voteAverage"
          :year="item.releaseDate"
          :img="item.image"
        />
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
.text-center {
  text-align: center;
  margin-bottom: 50px;
}
h1 {
  text-align: center;
  margin-bottom: 50px;
  font-size: 40px;
}
.div-card-movie {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  padding: 0 6%;
  margin-bottom: 60px;
}

.card-link {
  width: 18%;
  margin-bottom: 30px;
  color: white;
  text-decoration: unset;
  /* 
  &:hover {
    border: 1px solid white;
  } */
}

img {
  width: 100% !important;
}

@media only screen and (max-width: 600px) {
  .div-card-movie {
    margin-bottom: 30px;
  }

  .card-link {
    width: 40%;
  }

  h1 {
    margin-bottom: 30px;
    font-size: 20px;
  }
}
</style>
