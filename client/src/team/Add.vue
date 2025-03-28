<script lang="ts">
import { defineComponent } from "vue";
import type { RequestsTeam } from "../types/interface.ts";
import { createTeam } from "../requests/team";
import "./scss/team.scss";

export default defineComponent({
  name: "AddTeam",
  emits: ["closeModal", "createTeam"],
  data() {
    return {
      team: {
        name: "",
        addon: "",
        password: "",
      } as RequestsTeam,
    };
  },
  methods: {
    async createTeam() {
      this.$emit("createTeam", this.team);
      try {
        await createTeam(this.team);
      } catch (error) {
        console.error("Ошибка при создании команды:", error);
      }
      this.resetForm();
    },
    resetForm() {
      this.team = {
        name: "",
        addon: "",
        password: "",
      };
    },
  },
});
</script>

<template>
  <div class="login-box">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title">Создание команды</h1>
        <span class="close-modal" @click="$emit('closeModal')">&times;</span>
      </div>
      <div class="modal-body">
        <form @submit.prevent="createTeam">
          <div class="user-box">
            <input id="teamName" type="text" v-model="team.name" required />
            <label for="teamName">Название команды</label>
          </div>
          <div class="user-box">
            <input
              id="teamPassword"
              type="password"
              v-model="team.password"
              required
            />
            <label for="teamPassword">Пароль</label>
          </div>
          <div class="owner-section">
            <div class="info-icon">
              <i class="fas fa-puzzle-piece"></i>
            </div>
            <div class="info-details">
              <span class="info-label">Addon</span>
              <select
                id="teamAddon"
                class="form-control"
                v-model="team.addon"
                required
              >
                <option value="retail">retail</option>
                <option value="classic">classic</option>
                <option value="cata">cata</option>
                <option value="tbc">tbc</option>
                <option value="wotlk">wotlk</option>
              </select>
            </div>
          </div>

          <div class="modal-footer">
            <button type="submit" class="btn-save">Создать команду</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
  />
</template>

<style scoped lang="scss">
.login-box {
  background-color: #24282c;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}

.modal-content {
  color: #e6e6e6;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  .modal-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #e6e6e6;
  }

  .close-modal {
    font-size: 1.5rem;
    cursor: pointer;
    color: #9aa0a9;
    transition: color 0.2s ease;

    &:hover {
      color: #e6e6e6;
    }
  }
}

.modal-body {
  .owner-section {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    .info-icon {
      background-color: #3a404c;
      width: 48px;
      height: 48px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 15px;
      font-size: 1.5rem;
      color: #1e88e5;
    }

    .info-details {
      flex-grow: 1;

      .info-label {
        display: block;
        font-size: 0.8rem;
        color: #9aa0a9;
        margin-bottom: 5px;
      }

      .form-control {
        width: 100%;
        padding: 10px;
        background-color: #32363a;
        border: 1px solid #3a404c;
        border-radius: 6px;
        color: #e6e6e6;
        font-size: 1rem;
        transition: border-color 0.2s ease, box-shadow 0.2s ease;

        &:focus {
          outline: none;
          border-color: #2196f3;
          box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.2);
        }

        appearance: none;
        background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%239aa0a9%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
        background-repeat: no-repeat;
        background-position: right 10px center;
        background-size: 12px;
      }
    }
  }
}

.modal-footer {
  text-align: right;

  .btn-save {
    background-color: #2196f3;
    border: none;
    border-radius: 6px;
    padding: 10px 20px;
    color: #e6e6e6;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #1976d2;
    }
  }
}
</style>