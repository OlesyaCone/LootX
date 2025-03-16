<script lang="ts">
import { defineComponent } from "vue";
import { verifyUser } from "../requests/auth";
import "./authorization.scss";

export default defineComponent({
  emits: ["verify-success"],
  data() {
    return {
      access_token: "",
      isTokenError: false,
      isRegistrationSuccess: false,
    };
  },
  methods: {
    async verify() {
      try {
        const token = this.access_token;
        await verifyUser(token);
        this.access_token = "";
        this.isTokenError = false;
        this.isRegistrationSuccess = true;
        this.$emit("verify-success");
      } catch (error) {
        this.isTokenError = true;
        console.error("Ошибка при верификации:", error);
      }
    },
  },
});
</script>

<template>
  <form
    v-if="!isRegistrationSuccess"
    class="login-box"
    @submit.prevent="verify"
  >
    <h1 class="title">Регистрация</h1>
    <p>На вашу почту пришло письмо</p>
    <div class="user-box">
      <input class="input" type="text" v-model="access_token" required />
      <label>Введите токен</label>
      <p class="limitation" :class="{ visible: isTokenError }">
        Неверный токен
      </p>
    </div>
    <button class="submit" type="submit">Отправить</button>
  </form>
</template>