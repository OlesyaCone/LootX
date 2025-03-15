<script lang="ts">
import { defineComponent } from "vue";
import Register from "../auth/Register.vue";
import Entrance from "../auth/Entrance.vue";
import "./scss/button.scss";

export default defineComponent({
  components: {
    Register,
    Entrance,
  },
  data() {
    return {
      isLoginForm: false,
      isModalOpen: false,
    };
  },
  methods: {
    toggleForm() {
      this.isLoginForm = !this.isLoginForm;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    openModal() {
      this.isModalOpen = true;
    },
    handleClickOutside(event: MouseEvent) {
      const formContainer = this.$el.querySelector(".form-container");
      if (formContainer && !formContainer.contains(event.target as Node)) {
        this.closeModal();
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
  <div class="form-container" v-if="isModalOpen">
    <span class="closeModalBtn" @click="closeModal">&times;</span>
    <component
      :is="isLoginForm ? 'Entrance' : 'Register'"
      @toggle-form="toggleForm"
    />
  </div>
  <button v-if="!isModalOpen" @click="openModal" class="auth-button">
    Войдите/Зарегистрируйтесь
  </button>
</template>
