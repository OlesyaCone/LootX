<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from "vue";
import { defineAsyncComponent } from "vue";
import "./scss/button.scss";

export default defineComponent({
  components: {
    Register: defineAsyncComponent(() => import("../auth/Register.vue")),
    Entrance: defineAsyncComponent(() => import("../auth/Entrance.vue")),
    VerifyToken: defineAsyncComponent(() => import("../auth/Verify.vue")),
  },
  setup() {
    const isLoginForm = ref(false);
    const isModalOpen = ref(false);
    const isRegistrationSuccess = ref(false);
    const showVerifyToken = ref(false);
    const formContainer = ref<HTMLElement | null>(null);
    const authButton = ref<HTMLElement | null>(null);

    const handleClickOutside = (event: MouseEvent) => {
      if (
        formContainer.value &&
        !formContainer.value.contains(event.target as Node) &&
        authButton.value &&
        !authButton.value.contains(event.target as Node)
      ) {
        closeModal();
      }
    };

    const openModal = () => {
      isModalOpen.value = true;
    };

    const closeModal = () => {
      isModalOpen.value = false;
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

    onMounted(() => {
      document.addEventListener("click", handleClickOutside);
    });

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
