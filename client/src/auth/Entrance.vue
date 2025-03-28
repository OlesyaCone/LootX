<script lang="ts">
import { defineComponent } from "vue";
import "./authorization.scss";
import type { User } from "../types/interface";
import { entranceUser } from "../requests/auth";

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
    async validateForm(): Promise<void> {
      this.isEmailError = false;
      this.isPasswordError = false;

      if (!this.isEmailError && !this.isPasswordError) {
        try {
          await entranceUser(this.user);
        } catch (error) {
          this.user.username = "";
          this.user.password = "";
          this.isEmailError = false;
          this.isPasswordError = false;
        }
      }
    },
    handleClickOutside(event: MouseEvent): void {
      const form = this.$el as HTMLElement;
      if (!form.contains(event.target as Node)) {
        this.user.username = "";
        this.user.password = "";
        this.isEmailError = false;
        this.isPasswordError = false;
      }
    },
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  },
});
</script>

<template>
  <form class="login-box" @submit.prevent="validateForm">
    <h1 class="title">Вход</h1>
    <div class="user-box">
      <input class="input" type="text" v-model="user.username" required />
      <label>Имя</label>
    </div>
    <div class="user-box">
      <input class="input" type="password" v-model="user.password" required />
      <label>Пароль</label>
    </div>
    <button class="submit" type="submit">Войти</button>
    <p class="signin">
      Нет аккаунта?
      <a href="#" @click.prevent="$emit('toggle-form')">Зарегистрируйтесь</a>
    </p>
  </form>
</template>