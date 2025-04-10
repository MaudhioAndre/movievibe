<script setup>
import Logo from "./Logo.vue";
</script>

<template>
  <INavbar color="dark">
    <INavbarBrand to="/"> <Logo /> </INavbarBrand>
    <INavbarCollapsible class="_justify-content:flex-end">
      <INav>
        <INavItem to="/"> Home </INavItem>
        <INavItem to="/top-rated/1"> Top Rated </INavItem>
        <INavItem to="/popular/1"> Popular </INavItem>
        <INavItem to="/recommendation/1"> Recommendation </INavItem>
        <!-- <INavItem to="/about">About </INavItem> -->
      </INav>
    </INavbarCollapsible>
  </INavbar>
</template>

<style scoped>
/* .logo {
  background: -webkit-linear-gradient(#eee, #ff5200);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 700;
  font-size: 20px;
} */
</style>
