<script lang="ts">
import { defineComponent } from "vue";
import "./authorization.scss";
import axios from "axios";

interface User {
  email: string;
  password: string;
}

export default defineComponent({
  emits: ["toggle-form"],
  data() {
    return {
      user: {
        email: "",
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

      if (!this.user.email.includes("@") || !this.user.email.includes(".")) {
        this.isEmailError = true;
      }
      if (this.user.password.length < 5) {
        this.isPasswordError = true;
      }
      if (!this.isEmailError && !this.isPasswordError) {
        this.login();
      }
    },

    login(): void {
      const userData: User = {
        email: this.user.email,
        password: this.user.password,
      };
      this.entrance(userData);
    },

    resetForm(): void {
      this.user.email = "";
      this.user.password = "";
      this.isEmailError = false;
      this.isPasswordError = false;
    },

    async entrance(userData: User): Promise<void> {
      try {
        const response = await axios.post("/auth", userData); 
        this.user = response.data; 
        console.log("Успешный вход:", this.user);
      } catch (error) {
        console.error("Ошибка при входе:", error);
        this.isEmailError = true; 
        this.isPasswordError = true;
      }
    },
  },
});
</script>

<template>
  <form class="form" @submit.prevent="validateForm">
    <p class="title">Вход</p>
    <label>
      <input
        class="input"
        type="email"
        placeholder="email"
        v-model="user.email"
      />
      <span>Email</span>
      <p class="limitation" :class="{ visible: isEmailError }">
        Пользователь с таким email не существует!
      </p>
    </label>
    <label>
      <input
        class="input"
        type="password"
        placeholder="пароль"
        v-model="user.password"
      />
      <span>Пароль</span>
      <p class="limitation" :class="{ visible: isPasswordError }">
        Неверный пароль!
      </p>
    </label>
    <button class="submit" type="submit">Войти</button>
    <p class="signin">
      Нет аккаунта?
      <a href="#" @click.prevent="$emit('toggle-form')">Зарегистрируйтесь</a>
    </p>
  </form>
</template>