<script lang="ts">
import { defineComponent } from "vue";
import { tokenTeam } from "../requests/team";
import { deleteTeam } from "../requests/team";
import type { Team } from "../types/interface";
import "./scss/modal.scss";
import "../auth/authorization.scss";

export default defineComponent({
  name: "TeamDelete",
  props: {
    team: {
      type: Object as () => Team,
      required: true,
    },
    showModal: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["closeModal", "deleteTeam", "verify-success"],
  data() {
    return {
      access_token: "",
      isTokenError: false,
      isRegistrationSuccess: false,
    };
  },
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
    async confirmDelete() {
      this.$emit("deleteTeam", this.team);
      try {
        await deleteTeam(this.team.name);
      } catch (error) {
        console.error("Ошибка при удалении команды:", error);
      }
      this.closeModal();
    },
    async verify() {
      try {
        const token = this.access_token;
        await tokenTeam(token);
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
  <div v-if="showModal" class="login-box">
    <h1>Удаление команды</h1>
    <button class="close-modal" @click="closeModal">&times;</button>
    <p>
      Вы уверены, что хотите <strong>удалить</strong> команду
      <strong>{{ team.name }}</strong
      >?<br />
      Это действие нельзя отменить.
    </p>
    <hr />
    <form v-if="!isRegistrationSuccess" @submit.prevent="verify">
      <button type="button" class="submit" @click="confirmDelete">
        Удалить
      </button>
    </form>
  </div>
</template>

<style lang="scss">
.login-box {
  p {
    font-size: 16px;
    line-height: 1.5;
    margin-bottom: 25px;
    text-align: center;

    strong {
      color: #ff0000;
      font-weight: 600;
    }
  }
  form {
    display: flex;
    justify-content: center;
  }
}
</style>
