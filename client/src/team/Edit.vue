<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import type { Team, RequestsTeam } from "../types/interface";
import { editTeam } from "../requests/team";
import "./scss/modal.scss";

export default defineComponent({
  name: "TeamModal",
  props: {
    team: {
      type: Object as PropType<Team>,
      required: true,
    },
    showModal: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["closeModal", "saveTeam"],
  data() {
    return {
      editedTeam: {
        name: this.team.name,
        addon: this.team.addon.value, 
        password: "",
      } as RequestsTeam,
    };
  },
  watch: {
    team: {
      handler(newValue) {
        this.editedTeam = {
          name: newValue.name,
          addon: newValue.addon.value, 
          password: "",
        };
      },
      deep: true,
    },
  },
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
    async saveTeam() {
      const teamToSave = { ...this.editedTeam };
      this.$emit("saveTeam", teamToSave);
      try {
        await editTeam(this.team.id, teamToSave);
      } catch (error) {
        console.error("Ошибка при редактировании команды:", error);
      }
      this.closeModal();
    },
  },
});
</script>

<template>
  <div v-if="showModal" class="modal show">
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="modal-title">Редактирование команды</h2>
        <span class="close-modal" @click="closeModal">&times;</span>
      </div>
      <div class="modal-body">
        <form id="editTeamForm" @submit.prevent="saveTeam">
          <div class="form-group">
            <label for="teamName">Название команды</label>
            <input
              type="text"
              id="teamName"
              class="form-control"
              v-model="editedTeam.name"
            />
          </div>

          <div class="form-group">
            <label for="teamAddon">Addon</label>
            <select
              id="teamAddon"
              class="form-control"
              v-model="editedTeam.addon"
            >
              <option value="retail">retail</option>
              <option value="classic">classic</option>
              <option value="cata">cata</option>
              <option value="tbc">tbc</option>
              <option value="wotlk">wotlk</option>
            </select>
          </div>

          <div class="form-group">
            <label for="teamPassword">Пароль команды</label>
            <input
              type="password"
              id="teamPassword"
              class="form-control"
              placeholder="Новый пароль"
              v-model="editedTeam.password"
            />
            <small class="form-text"
              >Оставьте пустым, если не хотите менять пароль</small
            >
          </div>

          <div class="modal-footer">
            <button type="submit" id="saveTeam" class="btn-save">
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>