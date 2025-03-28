<script setup lang="ts">
import "./scss/header.scss";
</script>

<template>
  <header>
    <img src="../assets/logo_dark.svg" />
    <div class="search">
      <select>
        <option value="ru">Русский</option>
        <option value="en">English</option>
        <option value="de">Deutsch</option>
        <option value="es">Español</option>
        <option value="fr">Français</option>
        <option value="it">Italiano</option>
        <option value="pt">Português</option>
        <option value="ko">한국어</option>
        <option value="cn">中文</option>
      </select>
      <form class="d-flex" role="search">
        <input placeholder="Search" />
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </header>
</template>