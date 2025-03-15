<script lang="ts">
import { defineComponent } from "vue";
import "./authorization.scss";

export default defineComponent({
  emits: ["toggle-form"],
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
    };
  },
  methods: {
    validateForm() {
      this.isUsernameError = false;
      this.isEmailError = false;
      this.isPasswordError = false;
      this.isConfirmPasswordError = false;

      if (this.name.length < 2 || this.name.length > 12) {
        this.isUsernameError = true;
      }

      if (!this.email.includes("@")) {
        this.isEmailError = true;
      }

      if (this.password.length < 5) {
        this.isPasswordError = true;
      }

      if (
        this.password !== this.confirmPassword &&
        this.confirmPassword !== ""
      ) {
        this.isConfirmPasswordError = true;
      }

      if (this.confirmPassword == "") {
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
    register() {
      const userData = {
        name: this.name,
        email: this.email,
        password: this.password,
      };
      console.log("Регистрация:", userData);
    },
    resetForm() {
      this.name = "";
      this.email = "";
      this.password = "";
      this.confirmPassword = "";
      this.isUsernameError = false;
      this.isEmailError = false;
      this.isPasswordError = false;
      this.isConfirmPasswordError = false;
      this.notConfirmPassword = false;
    },
  },
});
</script>

<template>
  <form class="form" @submit.prevent="validateForm">
    <p class="title">Регистрация</p>
    <label>
      <input class="input" type="text" placeholder="имя" v-model="name" />
      <span>Имя</span>
      <p class="limitation" :class="{ visible: isUsernameError }">
        Юзернейм должен быть от 2 до 12 символов!
      </p>
    </label>
    <label>
      <input class="input" type="email" placeholder="email" v-model="email" />
      <span>Email</span>
      <p class="limitation" :class="{ visible: isEmailError }">
        Пользователь с таким email существует!
      </p>
    </label>
    <label>
      <input
        class="input"
        type="password"
        placeholder="пароль"
        v-model="password"
      />
      <span>Пароль</span>
      <p class="limitation" :class="{ visible: isPasswordError }">
        Пароль должен содержать не менее 5 символов!
      </p>
    </label>
    <label>
      <input
        class="input"
        type="password"
        placeholder="повторите пароль"
        v-model="confirmPassword"
      />
      <span>Повторите пароль</span>
      <p class="limitation" :class="{ visible: isConfirmPasswordError }">
        Пароли не совпадают!
      </p>
    </label>
    <button class="submit" type="submit">Зарегистрируйтесь</button>
    <p class="signin">
      Есть аккаунт?
      <a href="#" @click.prevent="$emit('toggle-form')">Войти</a>
    </p>
  </form>
</template>
