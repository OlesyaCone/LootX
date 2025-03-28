<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import type { Team } from "../types/interface";
import "./scss/team.scss";

export default defineComponent({
  name: "TeamCard",
  props: {
    team: {
      type: Object as PropType<Team>,
      required: true,
    },
  },
  emits: ["openEditModal", "openDeleteModal"], 
  methods: {
    openEditModal() {
      this.$emit("openEditModal");
    },
    openDeleteModal() {
      this.$emit("openDeleteModal");
    },
  },
});
</script>

<template>
  <div class="team-card">
    <div class="team-header">
      <h1 class="team-title">Команда: {{ team.name }}</h1>
      <div class="header-actions">
        <button id="editTeamBtn" class="edit-btn" @click="openEditModal">
          <i class="fas fa-edit"></i> Редактировать
        </button>
        <button id="deleteTeamBtn" class="delete-btn" @click="openDeleteModal">
          <i class="fas fa-trash"></i> Удалить
        </button>
      </div>
    </div>

    <div class="team-content">
      <div class="info-row">
        <div class="info-item">
          <div class="info-icon">
            <i class="fas fa-fingerprint"></i>
          </div>
          <div class="info-details">
            <span class="info-label">ID команды</span>
            <div class="info-value">{{ team.id }}</div>
          </div>
        </div>

        <div class="info-item">
          <div class="info-icon">
            <i class="fas fa-puzzle-piece"></i>
          </div>
          <div class="info-details">
            <span class="info-label">Addon</span>
            <div class="info-value">{{ team.addon.value }}</div>
          </div>
        </div>
      </div>

      <div class="info-row">
        <div class="info-item">
          <div class="info-icon">
            <i class="fas fa-crown"></i>
          </div>
          <div class="info-details">
            <span class="info-label">Статус</span>
            <div class="info-value">
              <span v-if="team.is_vip" class="vip-badge">VIP</span>
              <span v-else class="regular-badge">Обычная</span>
            </div>
          </div>
        </div>

        <div class="info-item">
          <div class="info-icon">
            <i class="fas fa-hourglass-end"></i>
          </div>
          <div class="info-details">
            <span class="info-label">Дата окончания VIP</span>
            <div class="info-value">
              <span v-if="team.vip_end">{{ team.vip_end }}</span>
              <span v-else class="text-muted">Не задан</span>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div class="owner-section">
        <div class="info-item">
          <div class="info-icon">
            <i class="fas fa-user-shield"></i>
          </div>
          <div class="info-details">
            <span class="info-label">Владелец команды</span>
            <div class="info-value">{{ team.owner.username }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
  />
</template>