import axios from "axios";
import type { Team, RequestsTeam } from "../types/interface";

axios.defaults.baseURL = "http://localhost:8000";

export async function deleteTeam(team_name: string): Promise<void> {
  try {
    const response = await axios.post(`/team/delete-request/${team_name}`);
    console.log("Успешно:", response.data);
  } catch (error) {
    console.error("Ошибка при удалении команды:", error);
    throw error;
  }
}

export async function tokenTeam(token: string): Promise<void> {
  try {
    const response = await axios.delete(`/team/delete/${token}`); 
    console.log("Успешно:", response.data);
  } catch (error) {
    console.error("Ошибка при удалении команды по токену:", error);
    throw error;
  }
}

export async function createTeam(team: RequestsTeam): Promise<void> {
  try {
    const response = await axios.post("/team", team);
    console.log("Успешно:", response.data);
  } catch (error) {
    console.error("Ошибка при создании команды:", error);
    throw error;
  }
}

export async function editTeam(team_id: string, team: RequestsTeam): Promise<void> {
  try {
    const response = await axios.patch(`/team/${team_id}`, team);
    console.log("Успешно:", response.data);
  } catch (error) {
    console.error("Ошибка при редактировании команды:", error);
    throw error; 
  }
}

export async function getTeamName(name: string): Promise<Team> {
  try {
    const response = await axios.get(`/team/${name}`);
    console.log("Успешно:", response.data);
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении команды по имени:", error);
    throw error;
  }
}

export async function getTeamId(id: string): Promise<Team> {
  try {
    const response = await axios.get(`/team/${id}`);
    console.log("Успешно:", response.data);
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении команды по ID:", error);
    throw error;
  }
}