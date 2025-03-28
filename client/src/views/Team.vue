<script lang="ts">
import { defineComponent } from "vue";
import TeamCard from "../team/Card.vue";
import TeamModal from "../team/Edit.vue";
import TeamDelete from "../team/Delete.vue";
import AddTeam from "../team/Add.vue";
import { getTeamName, getTeamId } from "../requests/team"; 
import type { Team } from "../types/interface"; 

export default defineComponent({
  components: {
    TeamCard,
    TeamModal,
    TeamDelete,
    AddTeam,
  },
  data() {
    return {
      team: {
        id: "",
        name: "1234",
        addon: { value: "" },
        is_vip: false,
        vip_end: "",
        owner: {
          username: "",
        },
      } as Team, 
      showEditModal: false,
      showDeleteModal: false,
      showAddModal: false,
      isLoading: false, 
      error: null as string | null, 
    };
  },
  async mounted() {
    await this.fetchTeamById("12345"); 
  },
  methods: {
    // async fetchTeamById(id: string) {
    //   this.isLoading = true;
    //   this.error = null;
    //   try {
    //     const team = await getTeamId(id);
    //     this.team = team;
    //   } catch (error) {
    //     this.error = "Ошибка при загрузке команды";
    //     console.error(error);
    //   } finally {
    //     this.isLoading = false;
    //   }
    // },

    async fetchTeamByName(name: string) {
      this.isLoading = true;
      this.error = null;
      try {
        const team = await getTeamName(name);
        this.team = team;
      } catch (error) {
        this.error = "Ошибка при загрузке команды";
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },

    handleOpenEditModal() {
      this.showEditModal = true;
    },
    handleCloseEditModal() {
      this.showEditModal = false;
    },
    handleSaveTeam(updatedTeam: Team) {
      this.team = updatedTeam;
      this.showEditModal = false;
    },
    handleOpenDeleteModal() {
      this.showDeleteModal = true;
    },
    handleCloseDeleteModal() {
      this.showDeleteModal = false;
    },
    handleDeleteTeam() {
      console.log("Команда удалена:", this.team);
      this.showDeleteModal = false;
    },
    handleOpenAddModal() {
      this.showAddModal = true;
    },
    handleCloseAddModal() {
      this.showAddModal = false;
    },
    handleCreateTeam(newTeam: Team) {
      console.log("Новая команда создана:", newTeam);
      this.showAddModal = false;
    },
  },
});
</script>
<template>
  <div>
    <div v-if="isLoading">Загрузка данных о команде...</div>
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
    <TeamCard
      v-if="!isLoading && !error"
      :team="team"
      @openEditModal="handleOpenEditModal"
      @openDeleteModal="handleOpenDeleteModal"
    />
    <TeamModal
      :team="team"
      :showModal="showEditModal"
      @closeModal="handleCloseEditModal"
      @saveTeam="handleSaveTeam"
    />
    <TeamDelete
      :team="team"
      :showModal="showDeleteModal"
      @closeModal="handleCloseDeleteModal"
      @deleteTeam="handleDeleteTeam"
    />
    <button @click="handleOpenAddModal" class="other-button">
      Создать команду
    </button>
    <AddTeam
      v-if="showAddModal"
      @closeModal="handleCloseAddModal"
      @createTeam="handleCreateTeam"
    />
  </div>
</template>

<style scoped>
.error-message {
  color: red;
  font-weight: bold;
}
</style>