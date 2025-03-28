import { createRouter, createWebHistory } from 'vue-router';
import Team from './views/Team.vue'; 
import Guild from "./views/Guild.vue"


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/team',
      name: 'Team',
      component: Team,
    },
    {
      path: '/guild',
      name: 'Guild',
      component: Guild,
    }
  ],
});

export default router;