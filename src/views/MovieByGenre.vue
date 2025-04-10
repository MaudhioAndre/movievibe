<script setup>
import { onMounted, ref } from "vue";
import { RouterLink, useRoute } from "vue-router";
import CardMovie from "../components/CardMovie.vue";
import ChunkArray from "@/components/micro/ChunkArray";

const { endpoint, pageTitle } = defineProps(["endpoint", "pageTitle"]);
console.log(endpoint);

const movie = ref([]);
const jumlahData = ref(20);
const page = ref(1);
const loading = ref(true);
const error = ref(null);

function NormalizeApiResult(result) {
  if (Array.isArray(result)) return result;
  if (Array.isArray(result.results)) return result.results;
  return [];
}

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
    movie.value = chunkArray(NormalizeApiResult(result), jumlahData.value);

    loading.value = false;
    console.log(result);
  } catch (err) {
    error.value = err;
    loading.value = false;
    console.error("Error fetching data:", err);
  }
});

ChunkArray;

function chunkArray(arr, chunkSize) {
  const result = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    result.push(chunk);
  }
  return result;
}
</script>

<template>
  <section>
    <h1>{{ pageTitle }}</h1>
    <div v-if="loading" class="text-center">Loading...</div>
    <div v-else-if="error" class="text-center">Error: {{ error.message }}</div>
    <div v-else v-memo="[movie[page - 1]]">
      <div class="div-card-movie">
        <RouterLink
          v-for="item in movie[page - 1]"
          :key="item.id"
          :to="{ name: 'movie-detail', params: { id: item.id } }"
          class="card-link"
        >
          <CardMovie
            :title="item.title"
            :rating="item.voteAverage"
            :year="item.releaseDate"
            :img="item.image"
          />
        </RouterLink>
      </div>
      <div class="div-button" v-if="movie.length > 1">
        <!-- <div class="div-button" v-if="movie.length > 1"> -->
        <button
          v-for="item in movie.length"
          :disabled="page == item"
          @click="page = item"
        >
          {{ item }}
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.text-center {
  text-align: center;
}

h1 {
  text-align: center;
  margin-bottom: 50px;
  font-size: 40px;
  margin-top: 50px;
}

.div-card-movie {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  padding: 0 6%;
  margin-bottom: 20px;
}

.div-button {
  display: flex;
  justify-content: center;
  padding: 0 6%;
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
  .card-link {
    width: 40%;
  }

  h1 {
    margin-bottom: 30px;
    font-size: 20px;
  }
}
</style>
