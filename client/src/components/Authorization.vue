<script lang="ts">
import { defineComponent, ref, onBeforeUnmount } from "vue";
import Register from "../auth/Register.vue";
import Entrance from "../auth/Entrance.vue";
import VerifyToken from "../auth/Verify.vue";
import "./scss/button.scss";

export default defineComponent({
  components: {
    Register,
    Entrance,
    VerifyToken,
  },
  setup() {
    const isLoginForm = ref(false);
    const isModalOpen = ref(false);
    const isRegistrationSuccess = ref(false);
    const showVerifyToken = ref(false);
    const formContainer = ref<HTMLElement | null>(null);
    const authButton = ref<HTMLElement | null>(null);


    const openModal = () => {
      isModalOpen.value = true;
      setTimeout(() => {
        document.addEventListener("click", handleClickOutside);
      }, 100);
    };

    const closeModal = () => {
      isModalOpen.value = false;
      document.removeEventListener("click", handleClickOutside);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        formContainer.value &&
        !formContainer.value.contains(event.target as Node) &&
        authButton.value &&
        !authButton.value.contains(event.target as Node)
      ) {
        console.log("Клик вне формы и не по кнопке");
        closeModal();
      }
    };

    const toggleForm = () => {
      isLoginForm.value = !isLoginForm.value;
    };

    const onVerifySuccess = () => {
      isRegistrationSuccess.value = true;
      showVerifyToken.value = false;
      closeModal();
    };

    const onLoginSuccess = () => {
      isRegistrationSuccess.value = true;
      closeModal();
    };

    const onRegisterSuccess = () => {
      showVerifyToken.value = true;
    };

    onBeforeUnmount(() => {
      document.removeEventListener("click", handleClickOutside);
    });

    return {
      isLoginForm,
      isModalOpen,
      isRegistrationSuccess,
      showVerifyToken,
      formContainer,
      authButton,
      openModal,
      closeModal,
      toggleForm,
      onVerifySuccess,
      onLoginSuccess,
      onRegisterSuccess,
    };
  },
});
</script>

<template>
  <div>
    <div
      v-if="isModalOpen"
      ref="formContainer"
      class="form-container"
      @click.stop
    >
      <span class="closeModalBtn" @click="closeModal">&times;</span>
      <component
        :is="showVerifyToken ? 'VerifyToken' : isLoginForm ? 'Entrance' : 'Register'"
        @toggle-form="toggleForm"
        @verify-success="onVerifySuccess"
        @login-success="onLoginSuccess"
        @register-success="onRegisterSuccess"
      />
    </div>

    <div v-if="isRegistrationSuccess" class="account-message">
      Вы в аккаунте
    </div>

    <button v-else @click="openModal" class="auth-button" ref="authButton">
      Войдите/Зарегистрируйтесь
    </button>
  </div>
</template>
