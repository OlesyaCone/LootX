<script setup lang="ts">
import Header from "./components/Header.vue";
import Authorization from "./components/Authorization.vue";
import axios from "axios";

axios.defaults.baseURL = "http://26.43.217.164:8000";
</script>

<template>
  <Header></Header>
  <Authorization></Authorization>
  <router-view></router-view>
</template>

<style>
body {
  background-color: #212529;
  margin: 0;
  padding: 0;
  width: 100%;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

* {
  box-sizing: border-box;
}

.overflow-hidden {
  overflow-y: hidden;
}
</style>