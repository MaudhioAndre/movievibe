<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

defineOptions({
  inheritAttrs: false,
});

const route = useRoute();

const movieDetails = ref(null); // Ubah nama variabel
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/Movie/Detail?Items=${
        route.params.id
      }&Language=en-US`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": import.meta.env.VITE_RAPIDAPI_HOST,
          "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const Detail = await response.json();
    console.log(Detail[0]);

    movieDetails.value = Detail[0];
    loading.value = false;
    console.log(movieDetails.value);
  } catch (err) {
    error.value = err;
    loading.value = false;
    console.error("Error fetching data:", err);
  }
});
</script>

<template>
  <section>
    <div v-if="loading" class="text-center">Loading...</div>
    <div v-else-if="error" class="text-center">Error: {{ error.message }}</div>
    <article v-else class="movie-container">
      <div class="movie-image">
        <img :src="movieDetails.image" :alt="movieDetails.originalTitle" />
      </div>
      <div class="movie-details">
        <h1>{{ movieDetails.title }}</h1>
        <p>{{ movieDetails.overview }}</p>
        <div class="movie-info">
          <div>
            <h2>Information</h2>
            <dl>
              <dt><b>Release Date:</b></dt>
              <dd>{{ movieDetails.releaseDate }}</dd>
              <dt><b>Duration:</b></dt>
              <dd>{{ movieDetails.runtime }} Minutes</dd>
              <dt><b>Rating:</b></dt>
              <dd>{{ movieDetails.voteAverage }}</dd>
              <dt><b>Popularity:</b></dt>
              <dd>{{ movieDetails.popularity }}</dd>
            </dl>

            <div v-if="movieDetails.genres && movieDetails.genres.length > 0">
              <h2>Genre</h2>
              <ul>
                <li v-for="genre in movieDetails.genres" :key="genre">
                  {{ genre.name }}
                </li>
              </ul>
            </div>
            <div v-if="movieDetails.directors && movieDetails.directors.length > 0">
              <h2>Directors</h2>
              <ul>
                <li v-for="director in movieDetails.directors" :key="director.id">
                  {{ director.fullName }}
                </li>
              </ul>
            </div>
          </div>

          <div>
            <section
              v-if="
                movieDetails.cast &&
                movieDetails.cast.filter((f) => f.job == 'actor' || f.job == 'actress')
                  .length > 0
              "
            >
              <h2>Cast</h2>
              <ul>
                <li
                  v-for="data in movieDetails.cast.filter(
                    (f) => f.job == 'actor' || f.job == 'actress'
                  )"
                  :key="data.id"
                >
                  {{ data.fullName }}
                </li>
              </ul>
            </section>
            <section
              v-if="
                movieDetails.productionCompanies &&
                movieDetails.productionCompanies.length > 0
              "
            >
              <h2>Companies</h2>
              <ul>
                <li v-for="company in movieDetails.productionCompanies" :key="company.id">
                  {{ company.name }}
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </article>
  </section>
</template>

<style lang="scss" scoped>
@media only screen and (max-width: 678px) {
  .movie-image {
    width: 100% !important;
  }

  h1 {
    font-size: 30px !important;
  }

  .movie-details {
    width: 100% !important;
    padding: 0 2%;
  }

  .movie-info {
    div {
      width: 100% !important;
    }
  }
}

.text-center {
  text-align: center;
  font-size: 20px;
  margin-top: 30px;
}

dd {
  font-size: 17px;
}
h1 {
  font-size: 50px;
  color: #ffb300;
  margin: unset;
  margin-bottom: 20px;
}

h2 {
  color: #ffb300;
  margin: unset;
}

ul {
  margin-top: 5px;
}

img {
  width: 500px;
}
.movie-container {
  display: flex;
  flex-wrap: wrap;
  padding: 0 6%;
  margin-top: 40px;
}

.movie-image {
  width: 40%;
}

.movie-image img {
  width: 100%;
}

.movie-details {
  width: 56%;
  padding: 0 2%;
}

.movie-info {
  display: flex;
  flex-wrap: wrap;

  div {
    width: 50%;
  }
}

p {
  margin-bottom: 30px;
}
</style>
