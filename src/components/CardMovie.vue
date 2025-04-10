<script setup>
const { title, rating, year, img } = defineProps(["title", "rating", "year", "img"]);
import { useDateFormat, useNow } from "@vueuse/core";
const formattedDate = useDateFormat(year, "D-MMM-YYYY");
</script>

<template>
  <figcaption :style="{ backgroundImage: `url(${img})` }">
    <!-- <img :src="img" loading="lazy" /> -->
    <div>
      <h2>
        {{ title }}
      </h2>
      <h3>
        <span>Rating : {{ rating }}</span
        ><span>{{ formattedDate }}</span>
      </h3>
    </div>
  </figcaption>
</template>

<style scoped>
figcaption {
  height: 300px;
  background-repeat: no-repeat;
  background-position: center;
  /* background-size: cover; */
  background-size: 200px 300px;
  display: flex;
  align-items: end;
}

div {
  background-color: #000000ba;
  width: -webkit-fill-available;
  padding: 8px;
}

h3 {
  display: flex;
  justify-content: space-between;
  margin: unset;
  font-size: 15px;
}

h2 {
  margin: unset;
  margin-bottom: 5px;
  font-size: 18px;
}

@media only screen and (max-width: 600px) {
  figcaption {
    height: 200px;
    background-size: 130px 200px;
  }

  h3 {
    display: flex;
    justify-content: space-between;
    margin: unset;
    font-size: 12px;
  }

  h2 {
    margin: unset;
    margin-bottom: 5px;
    font-size: 14px;
  }
}
</style>
