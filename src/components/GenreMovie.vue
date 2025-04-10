<script setup>
import { onMounted, reactive, ref } from "vue";
import { RouterLink } from "vue-router";

const genreList = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/Genre/Movie?Language=en-US' `,
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

    const result = await response.json();
    genreList.value = result;

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
    <h1>Explore By Genre</h1>
    <div v-if="loading" class="text-center">Loading...</div>
    <div v-else-if="error" class="text-center">Error: {{ error.message }}</div>
    <div v-else>
      <RouterLink
        v-for="data in genreList"
        :key="data.name"
        :to="{ name: 'genre', params: { genre: data.name } }"
        v-memo="[data]"
      >
        <button>
          {{ data.name }}
        </button>
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
.text-center {
  justify-content: center;
}
h1 {
  font-size: 40px;
  text-align: center;
  margin-bottom: 30px;
}
section {
  margin-top: 50px;
}

div {
  display: flex;
  flex-wrap: wrap;
  padding: 0 6%;
  margin-top: 30px;
  /* justify-content: space-evenly; */
}

a {
  width: 13%;
  margin: 0 0.6%;
}

button {
  width: 100%;
  height: 40px;
  /* margin: ; */
  /* padding: 10px 30px; */
  margin-top: 20px;
  border: unset;
  border-radius: 5px;
  cursor: pointer;
}

@media only screen and (max-width: 600px) {
  section {
    margin-top: 30px;
  }
  a {
    width: 21%;
    margin: 0 2%;
  }

  h1 {
    font-size: 20px;
    margin-bottom: 10px;
  }

  button {
    width: 100%;
    height: 30px;
    font-size: 10px;
  }
}
</style>
