<script setup>
import GenreMovie from "@/components/GenreMovie.vue";
import InputSearch from "@/components/InputSearch.vue";
import MovieListComp from "@/components/MovieListComp.vue";
</script>

<template>
  <main>
    <InputSearch />
    <MovieListComp
      endpoint="/Movie/NowPlaying?Page=1&Language=en-US&Adult=true"
      title="Now Playing"
    />
    <MovieListComp
      endpoint="/Movie/UpComing?Page=1&Language=en-US&Adult=true"
      title="Upcoming Movies"
    />
    <!-- <GenreMovie /> -->
  </main>
</template>
