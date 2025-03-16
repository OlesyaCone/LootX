<script lang="ts">
import { defineComponent } from "vue";
import "./authorization.scss";
import type { User } from "../types/interface";

export default defineComponent({
  emits: ["toggle-form"],
  data() {
    return {
      user: {
        username: "",
        password: "",
      } as User,
      isEmailError: false,
      isPasswordError: false,
    };
  },
  methods: {
    validateForm(): void {
      this.isEmailError = false;
      this.isPasswordError = false;

      if (
        !this.user.username.includes("@") ||
        !this.user.username.includes(".")
      ) {
        this.isEmailError = true;
      }
      if (this.user.password.length < 5) {
        this.isPasswordError = true;
      }
      if (!this.isEmailError && !this.isPasswordError) {
      }
    },
    resetForm(): void {
      this.user.username = "";
      this.user.password = "";
      this.isEmailError = false;
      this.isPasswordError = false;
    },
  },
});
</script>

<template>
  <form class="login-box" @submit.prevent="validateForm">
    <h1 class="title">Вход</h1>
    <div class="user-box">
      <input class="input" type="text" v-model="user.username" required />
      <label>Имя</label>
      <p class="limitation" :class="{ visible: isEmailError }">
        Пользователь с таким именем не существует!
      </p>
    </div>
    <div class="user-box">
      <input class="input" type="password" v-model="user.password" required />
      <label>Пароль</label>
      <p class="limitation" :class="{ visible: isPasswordError }">
        Неверный пароль!
      </p>
    </div>
    <button class="submit" type="submit">Войти</button>
    <p class="signin">
      Нет аккаунта?
      <a href="#" @click.prevent="$emit('toggle-form')">Зарегистрируйтесь</a>
    </p>
  </form>
</template>
