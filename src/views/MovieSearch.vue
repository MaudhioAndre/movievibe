<script setup>
import { onMounted, ref } from "vue";
import { RouterLink, useRoute } from "vue-router";
import CardMovie from "../components/CardMovie.vue";

const route = useRoute();

const movie = ref([]);
const jumlahData = ref(20);
const page = ref(1);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    const response = await fetch(
      `https://imdb236.p.rapidapi.com/imdb/autocomplete?query=${route.params.movieName}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "imdb236.p.rapidapi.com",
          "x-rapidapi-key": "b89ab6cc8dmshc2c2bd9a32000a7p136e81jsnba2cfa90fafd",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result);
    // movie.value = result;
    if (result.length > 0) {
      movie.value = chunkArray(result, jumlahData.value);
    }

    loading.value = false;
    console.log(result);
  } catch (err) {
    error.value = err;
    loading.value = false;
    console.error("Error fetching data:", err);
  }
});

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
    <h1>Search Result for "{{ route.params.movieName }}"</h1>
    <div v-if="loading"><center>Loading...</center></div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <div v-else-if="movie.length == 0"><center>Movie not found</center></div>
    <div v-else v-memo="[movie[page - 1]]">
      <div class="div-card-movie">
        <RouterLink
          v-for="item in movie[page - 1]"
          :key="item.id"
          :to="{ name: 'movie-detail', params: { id: item.id } }"
          class="card-link"
        >
          <CardMovie
            :title="item.originalTitle"
            :rating="item.contentRating"
            :year="item.startYear"
            :img="item.primaryImage"
          />
        </RouterLink>
      </div>
      <div class="div-button">
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
  h1 {
    margin-bottom: 30px;
    font-size: 20px;
  }

  .card-link {
    width: 40%;
  }
}
</style>
