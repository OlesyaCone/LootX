import axios from "axios";
import type { Register } from "../types/interface";

axios.defaults.baseURL = "http://0.0.0.0";

export async function registerUser(userData: Register): Promise<void> {
  try {
    const response = await axios.post("/auth/registration", userData);
    console.log("Успешная регистрация:", response.data);
  } catch (error) {
    console.error("Ошибка при регистрации:", error);
  }
}

export async function verifyUser(token: string): Promise<void> {
  try {
    const response = await axios.get(`/auth/verify-email/${token}`);
    console.log("Успешно:", response.data);
  } catch (error) {
    console.error("Ошибка при верификации:", error);
    throw error;
  }
}