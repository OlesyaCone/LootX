<script setup lang="ts">
import Header from "./components/Header.vue";
import Authorization from "./components/Authorization.vue";
import axios from "axios";

axios.defaults.baseURL = "http://192.168.0.82:8000";
</script>

<template>
  <Header></Header>
  <Authorization></Authorization>
  <!-- <router-view></router-view> -->
</template>

<style>
body {
  background-color: #212529;
  margin: 0;
  padding: 0;
  width: 100%;
}

* {
  box-sizing: border-box;
}

.overflow-hidden {
  overflow-y: hidden;
}
</style>
