<script setup>
import { onMounted, ref } from "vue";
import { RouterLink, useRoute } from "vue-router";
import CardMovie from "../components/CardMovie.vue";
import ChunkArray from "@/components/micro/ChunkArray";
import ButtonPage from "@/components/ButtonPage.vue";
import NormalizeApiResult from "@/components/micro/NormalizeApiResult";

const { endpoint, pageTitle } = defineProps(["endpoint", "pageTitle"]);

const route = useRoute();

const movie = ref([]);
const jumlahData = ref(20);
const page = ref(1);
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
    movie.value = ChunkArray(NormalizeApiResult(result), jumlahData.value);

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
    <h1>{{ pageTitle }}</h1>
    <div v-if="loading" class="text-center">Loading...</div>
    <div v-else-if="error" class="text-center">Error: {{ error.message }}</div>
    <div v-else-if="movie.length == 0" class="text-center">
      <div>Movie Not Found...</div>
      <br />
      <ButtonPage :route :movieLength="movie.length" />
    </div>
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
      <ButtonPage :route :movieLength="movie.length" />
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
