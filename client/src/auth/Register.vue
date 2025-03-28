<script lang="ts">
import { defineComponent } from "vue";
import "./authorization.scss";
import type { Register } from "../types/interface";
import { registerUser } from "../requests/auth";
import Verify from "../auth/Verify.vue";

export default defineComponent({
  components: {
    Verify,
  },
  emits: ["toggle-form", "register-success"],
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      isUsernameError: false,
      isEmailError: false,
      isPasswordError: false,
      isConfirmPasswordError: false,
      notConfirmPassword: false,
      showVerifyToken: false,
    };
  },
  methods: {
    validateForm(): void {
      this.isUsernameError = false;
      this.isEmailError = false;
      this.isPasswordError = false;
      this.isConfirmPasswordError = false;
      this.notConfirmPassword = false;

      if (this.name.length < 2 || this.name.length > 12) {
        this.isUsernameError = true;
      }
      if (!this.email.includes("@")) {
        this.isEmailError = true;
      }
      if (this.password.length < 5) {
        this.isPasswordError = true;
      }
      if (this.password !== this.confirmPassword) {
        this.isConfirmPasswordError = true;
      }
      if (this.confirmPassword === "") {
        this.notConfirmPassword = true;
      }

      if (
        !this.isUsernameError &&
        !this.isEmailError &&
        !this.isPasswordError &&
        !this.isConfirmPasswordError
      ) {
        this.register(); 
      }
    },
    async register(): Promise<void> {
      const userData: Register = {
        username: this.name,
        email: this.email,
        password: this.password,
      };

      try {
        await registerUser(userData);
        this.showVerifyToken = true; 
        this.resetForm();
        this.$emit("register-success");
      } catch (error) {
        console.error("Ошибка регистрации:", error);
      }
    },
    resetForm(): void {
      this.name = "";
      this.email = "";
      this.password = "";
      this.confirmPassword = "";
    },
  },
});
</script>

<template>
  <div>
    <form v-if="!showVerifyToken" class="login-box" @submit.prevent="validateForm">
      <h1 class="title">Регистрация</h1>

      <div class="user-box">
        <input class="input" type="text" v-model="name" required />
        <label>Имя</label>
        <span v-if="isUsernameError" class="limitation" :class="{ visible: isUsernameError }">
          Имя должно быть от 2 до 12 символов
        </span>
      </div>

      <div class="user-box">
        <input class="input" type="text" v-model="email" required />
        <label>Email</label>
        <span v-if="isEmailError" class="limitation" :class="{ visible: isEmailError }">
          Введите корректный email
        </span>
      </div>

      <div class="user-box">
        <input class="input" type="password" v-model="password" required />
        <label>Пароль</label>
        <span v-if="isPasswordError" class="limitation" :class="{ visible: isPasswordError }">
          Пароль должен быть не менее 5 символов
        </span>
      </div>

      <div class="user-box">
        <input class="input" type="password" v-model="confirmPassword" required />
        <label>Повторите пароль</label>
        <span v-if="isConfirmPasswordError" class="limitation" :class="{ visible: isConfirmPasswordError }">
          Пароли не совпадают
        </span>
        <span v-if="notConfirmPassword" class="limitation" :class="{ visible: notConfirmPassword }">
          Подтвердите пароль
        </span>
      </div>

      <button class="submit" type="submit">Зарегистрироваться</button>
      <p class="signin">
        Есть аккаунт?
        <a href="#" @click.prevent="$emit('toggle-form')">Войти</a>
      </p>
    </form>

    <Verify v-else @verify-success="$emit('register-success')" />
  </div>
</template>